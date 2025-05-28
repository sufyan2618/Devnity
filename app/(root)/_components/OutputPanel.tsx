"use client";

import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal, Play, Zap } from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";
import { motion } from "framer-motion";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/5 via-emerald-500/5 to-cyan-500/5 blur-3xl" />
      
      <div className="relative bg-gradient-to-bl from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10 p-4 sm:p-6">
        
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-700 blur-sm" />
        
        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 ring-2 ring-slate-600/50 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-xl opacity-50" />
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 relative z-10" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-400 text-transparent bg-clip-text">
                Output Console
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                {isRunning ? "Executing code..." : "Code execution results"}
              </p>
            </div>
          </div>

          {hasContent && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              className="relative group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
              bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-emerald-500/20 hover:to-cyan-500/20
              rounded-lg border border-slate-600/50 hover:border-emerald-400/50 transition-all duration-300 
              shadow-lg hover:shadow-emerald-500/25 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {isCopied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400 relative z-10" />
                  <span className="text-sm font-semibold text-emerald-400 relative z-10">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300 relative z-10" />
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300 relative z-10">Copy</span>
                </>
              )}
              
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          )}
        </div>

        {/* Output Container */}
        <div className="relative z-10">
          <div className="relative group rounded-xl lg:rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-slate-900/50">
            {/* Console Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm font-medium">Console</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isRunning ? (
                  <>
                    <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <span className="text-xs text-yellow-400 font-medium">Running</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-slate-400 font-medium">Ready</span>
                  </>
                )}
              </div>
            </div>

            {/* Output Area */}
            <div className="relative bg-slate-900/50 h-[600px]">
              <div className="h-full overflow-auto p-4 sm:p-6 font-mono text-sm">
                {isRunning ? (
                  <RunningCodeSkeleton />
                ) : error ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex-shrink-0 mt-1">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-red-400">Execution Error</span>
                        <div className="h-px bg-gradient-to-r from-red-400/50 to-transparent flex-1" />
                      </div>
                      <div className="relative p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
                        <pre className="whitespace-pre-wrap text-red-300 text-sm leading-relaxed">{error}</pre>
                      </div>
                    </div>
                  </motion.div>
                ) : output ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="font-semibold text-emerald-400">Execution Successful</span>
                      <div className="h-px bg-gradient-to-r from-emerald-400/50 to-transparent flex-1" />
                    </div>
                    <div className="relative p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                      <pre className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed">{output}</pre>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/50 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 rounded-2xl" />
                        <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 relative z-10" />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-slate-400 font-medium">Ready to execute</p>
                        <p className="text-sm text-slate-500">Run your code to see the output here...</p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;
