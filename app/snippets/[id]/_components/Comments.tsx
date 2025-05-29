import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquare, Users, Sparkles, Lock } from "lucide-react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { motion } from "framer-motion";

function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletinCommentId, setDeletingCommentId] = useState<string | null>(null);

  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);

    try {
      await addComment({ snippetId, content });
      toast.success("Comment added successfully");
    } catch (error) {
      console.log("Error adding comment:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment({ commentId });
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.log("Error deleting comment:", error);
      toast.error("Something went wrong");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="relative">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-violet-500/5 blur-3xl" />
      
      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
        
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 opacity-20 blur-sm" />
        
        {/* Header */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 ring-2 ring-slate-600/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl opacity-50" />
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 relative z-10" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 text-transparent bg-clip-text">
                  Discussion
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-cyan-400" />
                  {comments.length} comment{comments.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {comments.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg border border-emerald-400/30 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400">Active</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-2xl rounded-xl border border-slate-600/50 p-6 sm:p-8 text-center shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 rounded-xl" />
                
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-slate-600/50 shadow-lg mb-4">
                    <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Join the Discussion</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      Sign in to share your thoughts and engage with the community
                    </p>
                  </div>
                  
                  <SignInButton mode="modal">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group/btn inline-flex items-center gap-2 px-6 py-3 
                      bg-gradient-to-r from-violet-500/80 via-cyan-500/80 to-emerald-500/80
                      hover:from-violet-400/90 hover:via-cyan-400/90 hover:to-emerald-400/90
                      text-white rounded-xl border border-violet-400/30 hover:border-violet-400/60
                      transition-all duration-300 shadow-lg hover:shadow-violet-500/25 font-semibold"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-cyan-400/20 to-emerald-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl" />
                      <Lock className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Sign In to Comment</span>
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-t-xl" />
                    </motion.button>
                  </SignInButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* Comments List */}
          <div className="space-y-4 sm:space-y-6">
            {comments.length > 0 ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent flex-1" />
                  <span className="text-sm font-semibold text-slate-400 px-3 py-1 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50">
                    {comments.length} Response{comments.length !== 1 ? 's' : ''}
                  </span>
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent flex-1" />
                </div>
                
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Comment
                        comment={comment}
                        onDelete={handleDeleteComment}
                        isDeleting={deletinCommentId === comment._id}
                        currentUserId={user?.id}
                    />
                  </motion.div>
                ))}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-12 sm:py-16"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-slate-600/50 shadow-lg mb-4">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No comments yet</h3>
                <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                  Be the first to start the conversation about this code snippet
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Comments;
