"use client";
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon, Code2, Sparkles } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/app/Hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import ErrorCorrection from "@/app/Components/ErrorCorrection";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, error, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();
  const mounted = useMounted();



  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if(!mounted) {
    return null;
  }


  return (
    <div className="relative">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-violet-500/5 blur-3xl" />
      
      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 p-4 sm:p-6">
        
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-violet-500/20 opacity-0 hover:opacity-100 transition-opacity duration-700 blur-sm" />
        
        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 ring-2 ring-slate-600/50 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-xl opacity-50" />
              <Image 
                src={"/" + language + ".png"} 
                alt="Logo" 
                width={28} 
                height={28} 
                className="relative z-10"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 text-transparent bg-clip-text">
                Code Editor
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Write and execute your {LANGUAGE_CONFIG[language].label} code
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex  items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Font Size Slider */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg border border-slate-600/50 shadow-lg backdrop-blur-sm">
              <TypeIcon className="size-4 text-violet-400" />
              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-16 sm:w-20 h-1.5 bg-slate-600 rounded-lg cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${((fontSize - 12) / 12) * 100}%, rgb(71, 85, 105) ${((fontSize - 12) / 12) * 100}%, rgb(71, 85, 105) 100%)`
                  }}
                />
                <span className="text-sm font-semibold text-slate-300 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>
            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="relative group p-2.5 bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-orange-500/20 hover:to-red-500/20 rounded-lg border border-slate-600/50 hover:border-orange-400/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
              aria-label="Reset to default code"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <RotateCcwIcon className="size-4 text-slate-400 group-hover:text-orange-400 transition-colors duration-300 relative z-10" />
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="relative group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg overflow-hidden 
              bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 hover:from-emerald-500 hover:to-cyan-500 
              border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300 
              shadow-lg hover:shadow-emerald-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ShareIcon className="size-4 text-white relative z-10" />
              <span className="text-sm font-semibold text-white relative z-10">Share</span>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Editor Container */}
        <div className="relative z-10">
          <div className="relative group rounded-xl lg:rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-slate-900/50">
            {/* Editor Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Code2 className="w-4 h-4" />
                  <span className="text-sm font-medium">{LANGUAGE_CONFIG[language].label}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">Live Editor</span>
              </div>
            </div>

            {/* Editor */}
            <div className="relative bg-slate-900/50">
              {clerk.loaded && (
                <Editor
                  height="600px"
                  language={LANGUAGE_CONFIG[language].monacoLanguage}
                  onChange={handleEditorChange}
                  theme={theme}
                  beforeMount={defineMonacoThemes}
                  onMount={(editor) => setEditor(editor)}
                  options={{
                    minimap: { enabled: false },
                    fontSize,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 20, bottom: 20 },
                    renderWhitespace: "selection",
                    fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    formatOnPaste: true,
                    showUnused: true,
                    wordWrap: "on",
                    wordWrapColumn: 80,
                    formatOnType: true,
                    smoothScrolling: true,
                    contextmenu: true,
                    renderLineHighlight: "all",
                    lineHeight: 1.6,
                    tabCompletion: "on",
                    quickSuggestions: {
                      other: true,
                      comments: true,
                      strings: true,
                    },

                    letterSpacing: 0.5,
                    roundedSelection: true,
                    suggest:{
                        showKeywords: true,
                        showSnippets: true,
                        preview: true,
                        showStatusBar: true,

                    },
                    scrollbar: {
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                    },
                    bracketPairColorization: {
                      enabled: true,
                    },
                    guides: {
                      indentation: true,
                      bracketPairs: true,
                    },
                  }}
                />
              )}

              {!clerk.loaded && <EditorPanelSkeleton />}
            </div>
          </div>
        </div>
      </div>
      {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
      
    </div>
  );
}
export default EditorPanel;
