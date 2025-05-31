"use client";
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, Lock, Sparkles, Code } from "lucide-react";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return;
    setLanguage(langId);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full sm:w-auto group relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 
        bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-violet-500/20 hover:to-cyan-500/20
        rounded-lg transition-all duration-300 border border-slate-600/50 hover:border-violet-400/50 
        shadow-lg hover:shadow-violet-500/25 backdrop-blur-sm
        ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-hidden="true"
        />

        <div className="relative size-5 sm:size-6 rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-0.5 sm:p-1 group-hover:scale-110 transition-all duration-300 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src={currentLanguageObj.logoPath}
            alt="programming language logo"
            width={24}
            height={24}
            className="w-full h-full object-contain relative z-10"
          />
        </div>

        <span className="text-slate-300 min-w-0 sm:min-w-[80px] text-left group-hover:text-white transition-colors relative z-10 truncate font-medium">
          {currentLanguageObj.label}
        </span>

        <ChevronDownIcon
          className={`size-4 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300 relative z-10
            ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full left-0 mt-2
              w-full sm:w-64
              min-w-0 sm:min-w-[280px]
              max-w-xs sm:max-w-none
              z-50
              bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
              backdrop-blur-2xl rounded-xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 py-2
              overflow-x-auto
            "
            role="listbox"
            tabIndex={-1}
          >
            {/* Responsive horizontal bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 my-2 rounded" />

            <div className="relative z-10">
              <div className="px-3 pb-2 mb-2 border-b border-slate-700/50">
                <p className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                  <Code className="w-3 h-3 text-cyan-400" />
                  Select Language
                </p>
              </div>

              <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
                {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                  const isLocked = !hasAccess && lang.id !== "javascript";
                  return (
                    <motion.div
                      key={lang.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="relative group px-1"
                    >
                      <button
                        className={`
                          relative w-full flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg
                          transition-all duration-300 overflow-hidden
                          ${
                            language === lang.id
                              ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-400/30"
                              : isLocked
                              ? "text-slate-500 opacity-50"
                              : "text-slate-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50"
                          }
                        `}
                        onClick={() => handleLanguageSelect(lang.id)}
                        disabled={isLocked}
                        role="option"
                        aria-selected={language === lang.id}
                      >
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            language === lang.id
                              ? "bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-100"
                              : isLocked
                              ? "opacity-0"
                              : "bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100"
                          }`}
                        />

                        <div
                          className={`
                            relative size-8 rounded-lg p-1.5 transition-all duration-300
                            ${
                              language === lang.id
                                ? "bg-gradient-to-br from-cyan-500/20 to-violet-500/20 shadow-lg"
                                : isLocked
                                ? "bg-gradient-to-br from-slate-700/30 to-slate-600/30"
                                : "bg-gradient-to-br from-slate-700/50 to-slate-600/50 group-hover:from-violet-500/10 group-hover:to-cyan-500/10"
                            }
                            ${!isLocked ? "group-hover:scale-110" : ""}
                          `}
                        >
                          <div
                            className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                              language === lang.id
                                ? "bg-gradient-to-br from-cyan-400/20 to-violet-400/20 opacity-100"
                                : isLocked
                                ? "opacity-0"
                                : "bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"
                            }`}
                          />
                          <Image
                            width={24}
                            height={24}
                            src={lang.logoPath}
                            alt={`${lang.label} logo`}
                            className="w-full h-full object-contain relative z-10"
                          />
                          {language === lang.id && (
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-violet-400/20 rounded-lg blur-sm" />
                          )}
                        </div>

                        <span
                          className={`flex-1 text-left transition-colors duration-300 font-medium relative z-10 ${
                            !isLocked ? "group-hover:text-white" : ""
                          }`}
                        >
                          {lang.label}
                        </span>

                        {language === lang.id && (
                          <motion.div
                            className="absolute inset-0 border border-cyan-400/30 rounded-lg shadow-lg shadow-cyan-500/25"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}

                        {isLocked ? (
                          <div className="flex items-center gap-1">
                            <Lock className="w-4 h-4 text-slate-500" />
                            <span className="text-xs text-slate-500 font-medium">Pro</span>
                          </div>
                        ) : (
                          language === lang.id && (
                            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse relative z-10" />
                          )
                        )}

                        {!isLocked && (
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-full transition-all duration-300" />
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default LanguageSelector;
