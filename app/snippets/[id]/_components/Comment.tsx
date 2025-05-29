import { Trash2Icon, UserIcon, Calendar, MoreVertical } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { motion } from "framer-motion";
import { useState } from "react";
import CommentContent from "./CommentContent";

interface CommentProps {
  comment: {
    _id: Id<"snippetComments">;
    _creationTime: number;
    userId: string;
    userName: string;
    snippetId: Id<"snippets">;
    comment: string;
  };
  onDelete: (commentId: Id<"snippetComments">) => void;
  isDeleting: boolean;
  currentUserId?: string;
}

function Comment({ comment, currentUserId, isDeleting, onDelete }: CommentProps) {
  const [showActions, setShowActions] = useState(false);
  const isOwner = comment.userId === currentUserId;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-emerald-500/5 to-violet-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 p-4 sm:p-6 shadow-lg hover:shadow-cyan-500/20">
        
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        {/* Header */}
        <div className="relative z-10 flex items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-emerald-500/30 to-violet-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 ring-2 ring-slate-500/50 group-hover:ring-cyan-400/50 transition-all duration-300 flex items-center justify-center shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10" />
              </div>
            </div>
            
            {/* User Info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-sm sm:text-base font-bold text-white group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-emerald-300 group-hover:to-violet-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 truncate">
                  {comment.userName}
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400">
                  <Calendar className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="font-medium">
                    {formatDate(comment._creationTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isOwner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showActions ? 1 : 0, 
                  scale: showActions ? 1 : 0.8 
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(comment._id)}
                  disabled={isDeleting}
                  className={`
                    relative group/delete p-2 rounded-lg transition-all duration-300 backdrop-blur-sm
                    ${isDeleting
                      ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 cursor-not-allowed border border-red-400/30"
                      : "bg-gradient-to-r from-slate-700/80 to-slate-600/80 hover:from-red-500/20 hover:to-orange-500/20 text-slate-400 hover:text-red-400 border border-slate-500/50 hover:border-red-400/50 shadow-lg hover:shadow-red-500/25"
                    }
                  `}
                  title="Delete comment"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300" />
                  {isDeleting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full relative z-10"
                    />
                  ) : (
                    <Trash2Icon className="w-4 h-4 relative z-10" />
                  )}
                </motion.button>
              </motion.div>
            )}
            
            {/* More options indicator (for future features) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showActions ? 0.5 : 0 }}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-400 hover:bg-slate-700/50 transition-all duration-200"
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <CommentContent content={comment.comment} />
        </div>

        {/* Hover glow line */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
}
export default Comment;
