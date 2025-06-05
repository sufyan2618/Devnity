import { create } from "zustand";
import { CodeEditorState } from "../Types";
import { LANGUAGE_CONFIG } from "../(root)/_constants";

const getInitialState = () => {
    if(typeof window == "undefined"){
        return {
            language : "javascript",
            fontSize: 16,
            theme: "vs-dark",            
        }
    }

    const savedLanguage = localStorage.getItem("language") || "javascript";
    const savedFontSize = parseInt(localStorage.getItem("fontSize") || "16", 10);
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
    return {
        language : savedLanguage,
        fontSize: savedFontSize,
        theme: savedTheme,
        }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
    const initialState = getInitialState();

    return{
        ...initialState,
        editor: null, 
        output: "",
        isRunning: false,
        error: "",
        executionResult: null,

        getCode: () => {
            return get().editor?.getValue() || "";
        },

        setCode: (code: string) => {
            const { editor, language } = get();
            if (editor) {
                editor.setValue(code);
                // Save to localStorage
                localStorage.setItem(`editor-code-${language}`, code);
            }
        },

        setEditor: (editor) => {
            const savedCode = localStorage.getItem("editor-code-" + get().language) || "";
            if(savedCode) {
                editor.setValue(savedCode);
            }
            set({ editor });
        },

        setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({ theme });
        },

        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());
            set({ fontSize });
        },

        setLanguage: (language: string) => {
            const currentCode = get().editor?.getValue() || "";
            if(currentCode)
            {
                localStorage.setItem("editor-code-" + get().language, currentCode);
            }
            localStorage.setItem("editor-language", language);
            set({ language, output: "", error: "" });
        },

        runCode: async () => {
            const { language, getCode } = get();
            const code = getCode();
            if(!code) {
                set({ error: "Please enter some code to run." });
                return;
            }
            set({ isRunning: true, output: "", error: "" });

            try {
                const runtime = LANGUAGE_CONFIG[language]?.pistonRuntime;
                const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{ content: code }],
                    })
                });

                const data = await response.json();
                console.log("Piston API response:", data);

                // Check for API errors
                if(data.message) {
                    set({ 
                        error: data.message, 
                        isRunning: false,
                        executionResult: {
                            code,
                            output: "",
                            error: data.message
                        }
                    });
                    return;
                }

                // Fixed typo: compile instead of complile
                if(data.compile && data.compile.code !== 0) {
                    const error = data.compile.stderr || data.compile.output || "Unknown compilation error";
                    set({ 
                        error: error, 
                        isRunning: false, 
                        executionResult: {
                            code,
                            output: "",
                            error
                        } 
                    });
                    return;
                }

                if(data.run && data.run.code !== 0) {
                    const error = data.run.stderr || data.run.output || "Unknown runtime error";
                    set({ 
                        error: error, 
                        isRunning: false, 
                        executionResult: {
                            code,
                            output: "",
                            error
                        } 
                    });
                    return;
                }

                const output = data.run.output || "No output";
                set({ 
                    output, 
                    isRunning: false, 
                    executionResult: {
                        code,
                        output,
                        error: null
                    } 
                });  
                
            } catch (error) {
                console.error("Error running code:", error);
                const errorMessage = "Failed to run code. Please try again later.";
                set({ 
                    error: errorMessage, 
                    isRunning: false, 
                    executionResult: {
                        code,
                        output: "",
                        error: errorMessage
                    } 
                });
            } finally {
                set({ isRunning: false });
            }
        },

        // New method for clearing errors (useful for AI correction)
        clearError: () => {
            set({ error: "" });
        },
        newMethod: () => {
            
        },
        // New method for updating execution state
        setExecutionState: (state: { output?: string; error?: string; isRunning?: boolean }) => {
            set(state);
        }
    };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;
