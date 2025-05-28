import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { X, Share2, Sparkles, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSharing(true);

    try {
      const code = getCode();
      await createSnippet({ title, language, code });
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully");
    } catch (error) {
      console.log("Error creating snippet:", error);
      toast.error("Error creating snippet");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-violet-500/20 p-6 sm:p-8">
            
            {/* Subtle animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-20 blur-sm" />
            
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 ring-2 ring-slate-600/50 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-xl opacity-50" />
                  <Share2 className="w-5 h-5 text-violet-400 relative z-10" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text">
                    Share Snippet
                  </h2>
                  <p className="text-sm text-slate-400 font-medium">Share your code with the community</p>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="relative group p-2 rounded-lg bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-red-500/20 hover:to-orange-500/20 border border-slate-600/50 hover:border-red-400/50 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <X className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors duration-300 relative z-10" />
              </motion.button>
            </div>

            <form onSubmit={handleShare} className="relative z-10 space-y-6">
              {/* Language Display */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-slate-300">Language: </span>
                <span className="text-sm font-bold text-cyan-400 capitalize">{language}</span>
              </div>

              {/* Title Input */}
              <div className="space-y-3">
                <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Snippet Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/50 
                    focus:border-violet-400/50 rounded-xl text-white placeholder-slate-400 
                    focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all duration-300
                    backdrop-blur-sm shadow-lg"
                    placeholder="Enter a descriptive title for your snippet..."
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="relative group px-6 py-3 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 
                  hover:from-slate-700/80 hover:to-slate-600/80 border border-slate-600/50 hover:border-slate-500/50 
                  transition-all duration-300 shadow-lg backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 to-slate-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-300 transition-colors duration-300 relative z-10">
                    Cancel
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSharing || !title.trim()}
                  className="relative group px-6 py-3 rounded-xl overflow-hidden
                  bg-gradient-to-r from-violet-500/80 via-cyan-500/80 to-emerald-500/80
                  hover:from-violet-400/90 hover:via-cyan-400/90 hover:to-emerald-400/90
                  border border-violet-400/30 hover:border-violet-400/60
                  transition-all duration-300 shadow-lg hover:shadow-violet-500/25
                  disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm
                  min-w-[120px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-cyan-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSharing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4 text-white/80" />
                        </motion.div>
                        <span className="text-sm font-semibold text-white/90">Sharing...</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-white/90 group-hover:text-white transition-colors duration-300" />
                        <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                          Share Snippet
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
export default ShareSnippetDialog;
