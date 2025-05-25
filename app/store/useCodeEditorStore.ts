import { create } from "zustand";
import { CodeEditorState } from "../Types";



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
            //todo
        }

    };
});

