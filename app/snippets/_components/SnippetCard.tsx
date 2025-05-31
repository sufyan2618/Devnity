"use client";
import { Snippet } from "@/app/Types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trash2, User, Code2, Eye, Calendar } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/app/Components/StarButton";

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteSnippet({ snippetId: snippet._id });
      toast.success("Snippet deleted successfully");
    } catch (error) {
      console.log("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <div className="relative h-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-700/50 hover:border-violet-400/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-violet-500/20">
          
          {/* Subtle animated border */}
          <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
          
          <div className="relative z-10 p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-emerald-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative p-2 sm:p-2.5 rounded-lg lg:rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 ring-1 ring-slate-600/50 group-hover:ring-violet-400/50 transition-all duration-500 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain relative z-10"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 rounded-lg text-xs font-semibold border border-violet-400/30 backdrop-blur-sm">
                      <Code2 className="w-3 h-3" />
                      {snippet.language}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span className="font-medium">
                      {new Date(snippet._creationTime).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-2" onClick={(e) => e.preventDefault()}>
                <StarButton snippetId={snippet._id} />

                {user?.id === snippet.userId && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`
                      relative group/delete p-2 rounded-lg transition-all duration-300 backdrop-blur-sm
                      ${isDeleting
                        ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 cursor-not-allowed border border-red-400/30"
                        : "bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-red-500/20 hover:to-orange-500/20 text-slate-400 hover:text-red-400 border border-slate-600/50 hover:border-red-400/50 shadow-lg hover:shadow-red-500/25"
                      }
                    `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300" />
                    {isDeleting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full relative z-10"
                      />
                    ) : (
                      <Trash2 className="w-4 h-4 relative z-10" />
                    )}
                  </motion.button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 sm:space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:via-cyan-300 group-hover:to-emerald-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 leading-tight">
                  {snippet.title}
                </h2>
                
                {/* Author */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                    <div className="p-1 rounded-md bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30">
                      <User className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 font-medium truncate max-w-[120px] sm:max-w-[150px]">
                      {snippet.userName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Code Preview */}
              <div className="relative group/code">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 rounded-xl opacity-0 group-hover/code:opacity-100 transition-all duration-500" />
                
                {/* Code Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b border-slate-700/50 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium ml-2">{snippet.language}</span>
                  </div>
                  <Eye className="w-3 h-3 text-slate-500" />
                </div>
                
                {/* Code Content */}
                <div className="relative bg-slate-900/50 rounded-b-xl">
                  <pre className="relative p-4 overflow-hidden text-xs sm:text-sm text-slate-300 font-mono line-clamp-4 leading-relaxed">
                    {snippet.code}
                  </pre>
                  
                  {/* Fade overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Hover glow line */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-700" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
export default SnippetCard;
