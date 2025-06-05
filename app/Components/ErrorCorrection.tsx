"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { useCodeEditorStore } from "../store/useCodeEditorStore";
import toast from "react-hot-toast";

interface ErrorCorrectionProps {
  error: string | null;
  language: string;
}

function ErrorCorrection({ error, language }: ErrorCorrectionProps) {
  const [isCorrecting, setIsCorrecting] = useState(false);
  const { getCode, setCode, clearError } = useCodeEditorStore();

  const correctCodeWithAI = async () => {
    setIsCorrecting(true);
    
    try {
      const currentCode = getCode();
      const response = await fetch('/api/correct-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: currentCode,
          error: error,
          language: language,
        }),
      });

      const data = await response.json();
      
      if (data.correctedCode) {
        setCode(data.correctedCode);
        clearError();
        toast.success("Code corrected successfully!");
      } else {
        toast.error("Failed to get corrected code");
      }
    } catch (error) {
      console.error('Error correcting code:', error);
      toast.error("Failed to correct code");
    } finally {
      setIsCorrecting(false);
    }
  };

  if (!error) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative mb-4"
      >
        <div className="flex items-center justify-between gap-3 p-3 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-lg border border-red-400/30">
          
          {/* Error Icon and Text */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-red-500/20 border border-red-400/30 flex-shrink-0">
              <AlertTriangle className="w-3 h-3 text-red-400" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-red-400 truncate">
              Error detected
            </span>
          </div>

          {/* AI Correction Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={correctCodeWithAI}
            disabled={isCorrecting}
            className="relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
            bg-gradient-to-r from-violet-500/80 to-cyan-500/80 hover:from-violet-400/90 hover:to-cyan-400/90
            text-white rounded-md sm:rounded-lg transition-all duration-300 
            border border-violet-400/30 hover:border-violet-400/60
            shadow-lg hover:shadow-violet-500/25 font-medium text-xs sm:text-sm
            disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md sm:rounded-lg" />
            
            {isCorrecting ? (
              <>
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin relative z-10" />
                <span className="relative z-10 hidden sm:inline">Fixing...</span>
              </>
            ) : (
              <>
                <Bot className="w-3 h-3 sm:w-4 sm:h-4 relative z-10" />
                <span className="relative z-10">Fix with AI</span>
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-pulse relative z-10" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ErrorCorrection;
