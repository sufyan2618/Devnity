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
            const{language, getCode } = get();
            const code = getCode();
            if(!code) {
                set({ error: "Please enter some code to run." });
                return;
            }
            set({isRunning: true, output: "", error: "" });

            try {
                const runtime = LANGUAGE_CONFIG[language]?.pistonRuntime;
                const response = await fetch("https://emkc.org/api/v2/piston/execute",{
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{content: code}],
                    })
                })
                const data = await response.json();
                console.log("Piston API response:", data);

                //this if check is for API errors
                if(data.message) {
                    set({ error: data.message });
                    return;
                }

                if(data.complile && data.complile.code !== 0) {
                    const error =  data.complile.stderr || data.complile.output || "Unknown compilation error";
                    set({ error: error, isRunning: false, executionResult: {
                        code,
                        output: "",
                        error
                    } });
                    return;
                }

                if(data.run && data.run.code !== 0) {
                    const error = data.run.stderr || data.run.output || "Unknown runtime error";
                    set({ error: error, isRunning: false, executionResult: {
                        code,
                        output: "",
                        error
                    } });
                    return;
                }
                const output = data.run.output || "No output";
                set({ output, isRunning: false, executionResult: {
                    code,
                    output,
                    error: null
                } });  
                
            } catch (error) {
                console.error("Error running code:", error);
                set({ error: "Failed to run code. Please try again later.", isRunning: false, executionResult: {
                    code,
                    output: "",
                    error: "Failed to run code. Please try again later."
                    } });
                
            }
            finally{
                set({isRunning: false});
            }

        }

    };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;
