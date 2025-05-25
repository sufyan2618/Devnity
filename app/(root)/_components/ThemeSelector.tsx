"use client";

import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";

import { Moon,CircleOff, Sun, Laptop, Cloud, Palette } from "lucide-react";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "moonlight": <Cloud className="size-4" />,
  "tokyo-night": <Laptop className="size-4" />,
  "synthwave-84": <Palette className="size-4" />,
  "cyberpunk-2077": <Palette className="size-4" />,
  "night-owl": <Moon className="size-4" />,
  "city-lights": <Sun className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useCodeEditorStore();
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
        }
  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-48 group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
        bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-violet-500/20 hover:to-cyan-500/20
        rounded-lg transition-all duration-300 border border-slate-600/50 hover:border-violet-400/50 
        shadow-lg hover:shadow-violet-500/25 backdrop-blur-sm"
      >
        {/* Enhanced hover state bg decorator */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />

        <Palette className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors relative z-10" />

        <span className="text-slate-300 min-w-0 sm:min-w-[80px] text-left group-hover:text-white transition-colors relative z-10 truncate">
          {currentTheme?.label}
        </span>

        {/* Enhanced color indicator */}
        <div
          className="relative w-4 h-4 rounded-full border-2 border-slate-500/50 group-hover:border-violet-400/50 transition-all duration-300 shadow-lg"
          style={{ background: currentTheme?.color }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] 
            bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 
            backdrop-blur-2xl rounded-xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 py-2 z-50"
          >
            {/* Subtle animated border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-violet-500/20 opacity-20 blur-sm" />
            
            <div className="relative z-10">
              <div className="px-3 pb-2 mb-2 border-b border-slate-700/50">
                <p className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                  <Palette className="w-3 h-3 text-violet-400" />
                  Select Theme
                </p>
              </div>

              {THEMES.map((t, index) => (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className={`
                  relative group w-full flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg
                  transition-all duration-300 overflow-hidden
                  ${theme === t.id 
                    ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 border border-violet-400/30" 
                    : "text-slate-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50"
                  }
                `}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                >
                  {/* Enhanced bg gradient */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      theme === t.id 
                        ? "bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-100" 
                        : "bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Enhanced icon */}
                  <div
                    className={`
                    relative flex items-center justify-center size-8 rounded-lg transition-all duration-300
                    ${theme === t.id 
                      ? "bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-400 shadow-lg" 
                      : "bg-gradient-to-br from-slate-700/50 to-slate-600/50 text-slate-400 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 group-hover:text-violet-400"
                    }
                    group-hover:scale-110
                  `}
                  >
                    {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                    {theme === t.id && (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-cyan-400/20 rounded-lg blur-sm" />
                    )}
                  </div>

                  {/* Enhanced label */}
                  <span className="flex-1 text-left group-hover:text-white transition-colors duration-300 font-medium relative z-10">
                    {t.label}
                  </span>

                  {/* Enhanced color indicator */}
                  <div
                    className="relative size-4 rounded-full border-2 border-slate-500/50 
                    group-hover:border-violet-400/50 transition-all duration-300 shadow-lg"
                    style={{ background: t.color }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                    {theme === t.id && (
                      <div className="absolute -inset-1 rounded-full border border-violet-400/50 animate-pulse" />
                    )}
                  </div>

                  {/* Active theme glow effect */}
                  {theme === t.id && (
                    <motion.div
                      className="absolute inset-0 border border-violet-400/30 rounded-lg shadow-lg shadow-violet-500/25"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Hover glow line */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ThemeSelector;
