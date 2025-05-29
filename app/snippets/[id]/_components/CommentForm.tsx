import { CodeIcon, SendIcon, Eye, Edit3, Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";
import CommentContent from "./CommentContent";
import { motion } from "framer-motion";

interface CommentFormProps {
  onSubmit: (comment: string) => Promise<void>; 
  isSubmitting: boolean;
}

function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newComment = comment.substring(0, start) + "  " + comment.substring(end);
      setComment(newComment);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await onSubmit(comment);

    setComment("");
    setIsPreview(false);
    setIsFocused(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="relative mb-6 sm:mb-8"
    >
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      <div className={`
        relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-2xl 
        rounded-xl lg:rounded-2xl border transition-all duration-300 overflow-hidden shadow-xl
        ${isFocused || isPreview 
          ? "border-emerald-400/50 shadow-emerald-500/20" 
          : "border-slate-600/50 hover:border-emerald-400/30"
        }
      `}>
        
        {/* Subtle animated border */}
        <div className={`
          absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 
          transition-opacity duration-500 blur-sm
          ${isFocused || isPreview ? "opacity-100" : "opacity-0"}
        `} />
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Add Comment</h3>
              <p className="text-xs text-slate-400">Share your thoughts about this snippet</p>
            </div>
          </div>
          
          {/* Preview Toggle */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={`
                relative group flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 backdrop-blur-sm
                ${isPreview 
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-400/30 shadow-lg shadow-emerald-500/25" 
                  : "bg-gradient-to-r from-slate-700/80 to-slate-600/80 hover:from-emerald-500/10 hover:to-cyan-500/10 text-slate-400 hover:text-emerald-400 border border-slate-600/50 hover:border-emerald-400/50"
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isPreview ? (
                <>
                  <Edit3 className="w-3 h-3 relative z-10" />
                  <span className="text-xs font-semibold relative z-10">Edit</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 relative z-10" />
                  <span className="text-xs font-semibold relative z-10">Preview</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10">
          {isPreview ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[120px] sm:min-h-[140px] p-4 sm:p-6 bg-slate-900/30"
            >
              {comment.trim() ? (
                <CommentContent content={comment} />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500">
                  <div className="text-center">
                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nothing to preview yet</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Share your thoughts, ask questions, or provide feedback..."
                className="w-full bg-transparent border-0 text-slate-200 placeholder:text-slate-500 outline-none 
                resize-none min-h-[120px] sm:min-h-[140px] p-4 sm:p-6 font-mono text-sm leading-relaxed
                selection:bg-emerald-500/20"
              />
              
              {/* Character count */}
              {comment.length > 0 && (
                <div className="absolute bottom-2 right-4 text-xs text-slate-500">
                  {comment.length} characters
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-t border-slate-700/50">
          
          {/* Help Text */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CodeIcon className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span className="font-medium">Format code with ```/language```</span>
            </div>
            <div className="hidden sm:block text-xs text-slate-500 pl-5">
              Use Tab for indentation -  Preview before posting -  Markdown supported
            </div>
          </div>
          
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className={`
              relative group flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl overflow-hidden
              font-semibold transition-all duration-300 backdrop-blur-sm min-w-[120px] justify-center
              ${comment.trim() && !isSubmitting
                ? "bg-gradient-to-r from-emerald-500/80 via-cyan-500/80 to-violet-500/80 hover:from-emerald-400/90 hover:via-cyan-400/90 hover:to-violet-400/90 text-white border border-emerald-400/30 hover:border-emerald-400/60 shadow-lg hover:shadow-emerald-500/25"
                : "bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-500 border border-slate-600/50 cursor-not-allowed"
              }
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full relative z-10"
                />
                <span className="text-sm relative z-10">Posting...</span>
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4 relative z-10" />
                <span className="text-sm relative z-10">Post Comment</span>
                {comment.trim() && (
                  <Sparkles className="w-3 h-3 text-emerald-300 animate-pulse relative z-10" />
                )}
              </>
            )}
            
            {comment.trim() && !isSubmitting && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}
export default CommentForm;
