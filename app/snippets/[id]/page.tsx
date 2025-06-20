"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/app/Components/NavigationHeader";
import { Code, MessageSquare, User, Calendar, Eye, Sparkles, Code2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import CopyButton from "./_components/CopyContent";
import Comments from "./_components/Comments";
import { motion } from "framer-motion";
import Image from "next/image";

function SnippetDetailPage() {
  const snippetId = useParams().id;

  const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
  const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavigationHeader />

      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-3xl pointer-events-none" />

      <main className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-[1200px] mx-auto space-y-4 sm:space-y-5">
          
          {/* Compact Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-lg border border-slate-700/50 shadow-xl p-4 sm:p-5">
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Compact Language Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 ring-1 ring-slate-600/50 shadow-lg">
                        <Image
                          src={`/${snippet.language}.png`}
                          alt={`${snippet.language} logo`}
                          className="w-6 h-6 sm:w-8 sm:h-8 object-contain relative z-10"
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                    
                    {/* Compact Title and Meta */}
                    <div className="flex-1 min-w-0">
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text mb-3 leading-tight">
                        {snippet.title}
                      </h1>
                      
                      {/* Compact Meta Information */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                          <User className="w-3 h-3 text-emerald-400" />
                          <span className="text-xs font-medium text-slate-300">{snippet.userName}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          <span className="text-xs font-medium text-slate-300">{formatDate(snippet._creationTime)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                          <MessageSquare className="w-3 h-3 text-violet-400" />
                          <span className="text-xs font-medium text-slate-300">{comments?.length || 0} comment{(comments?.length || 0) !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Language Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 rounded-lg border border-violet-400/30 backdrop-blur-sm shadow-lg">
                    <Code2 className="w-3 h-3" />
                    <span className="text-xs font-bold capitalize">{snippet.language}</span>
                    <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compact Code Editor Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-bl from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-lg border border-slate-700/50 shadow-xl overflow-hidden">
              
              {/* Compact Header */}
              <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs font-semibold text-slate-300">Source Code</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded border border-slate-600/50">
                    <Eye className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-400">Read-only</span>
                  </div>
                  <CopyButton code={snippet.code} />
                </div>
              </div>
              
              {/* Compact Editor */}
              <div className="relative bg-slate-900/50">
                <Editor
                  height="400px" // Reduced from 600px
                  language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                  value={snippet.code}
                  theme="vs-dark"
                  beforeMount={defineMonacoThemes}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14, // Reduced from 16
                    readOnly: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 12, bottom: 12 }, // Reduced from 20
                    renderWhitespace: "selection",
                    fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    renderLineHighlight: "all",
                    lineHeight: 1.5, // Reduced from 1.6
                    letterSpacing: 0.3, // Reduced from 0.5
                    roundedSelection: true,
                    scrollbar: {
                      verticalScrollbarSize: 6, // Reduced from 8
                      horizontalScrollbarSize: 6, // Reduced from 8
                    },
                    bracketPairColorization: {
                      enabled: true,
                    },
                    guides: {
                      indentation: true,
                      bracketPairs: true,
                    },
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Compact Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Comments snippetId={snippet._id} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
export default SnippetDetailPage;
