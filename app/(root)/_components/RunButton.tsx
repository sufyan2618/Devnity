"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { getExecutionResult, useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import { api } from "@/convex/_generated/api";

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning, executionResult,  } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);


  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      })
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`
        group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl
        border border-emerald-400/30 hover:border-emerald-400/60
        bg-gradient-to-r from-emerald-500/80 via-cyan-500/80 to-violet-500/80
        hover:from-emerald-400/90 hover:via-cyan-400/90 hover:to-violet-400/90
        shadow-lg hover:shadow-emerald-500/20
        backdrop-blur-sm
        transition-all duration-300
        focus:outline-none
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
      style={{ minWidth: 120 }}
    >
      {/* Animated gradient overlay for hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex items-center gap-2.5 z-10">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-5 h-5 animate-spin text-white/80" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-semibold text-white/90 tracking-wide">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-5 h-5">
              <Play className="w-5 h-5 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white drop-shadow" />
            </div>
            <span className="text-sm font-semibold text-white/90 group-hover:text-white tracking-wide">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}
export default RunButton;
