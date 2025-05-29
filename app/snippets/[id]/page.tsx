"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/app/Components/NavigationHeader";
import { Clock, Code, MessageSquare, User, Calendar, Eye, Sparkles, Code2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import CopyButton from "./_components/CopyContent";
import Comments from "./_components/Comments";
import { motion } from "framer-motion";

function SnippetDetailPage() {
  const snippetId = useParams().id;

  const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
  const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavigationHeader />

      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <main className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto space-y-6 sm:space-y-8">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 p-6 sm:p-8">
              
              {/* Subtle animated border */}
              <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-20 blur-sm" />
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                  <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* Language Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-emerald-500/30 rounded-2xl blur-lg opacity-0 hover:opacity-100 transition-all duration-500" />
                      <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 ring-2 ring-slate-600/50 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-2xl opacity-50" />
                        <img
                          src={`/${snippet.language}.png`}
                          alt={`${snippet.language} logo`}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain relative z-10"
                        />
                      </div>
                    </div>
                    
                    {/* Title and Meta */}
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text mb-4 leading-tight">
                        {snippet.title}
                      </h1>
                      
                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                          <div className="p-1 rounded-md bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30">
                            <User className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="text-sm font-medium text-slate-300">{snippet.userName}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          <span className="text-sm font-medium text-slate-300">{formatDate(snippet._creationTime)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                          <MessageSquare className="w-3 h-3 text-violet-400" />
                          <span className="text-sm font-medium text-slate-300">{comments?.length || 0} comment{(comments?.length || 0) !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Language Badge */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 rounded-xl border border-violet-400/30 backdrop-blur-sm shadow-lg">
                    <Code2 className="w-4 h-4" />
                    <span className="text-sm font-bold capitalize">{snippet.language}</span>
                    <Sparkles className="w-3 h-3 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code Editor Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-emerald-500/10 to-violet-500/10 blur-3xl" />
            
            <div className="relative bg-gradient-to-bl from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10 overflow-hidden">
              
              {/* Subtle animated border */}
              <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-violet-500/20 opacity-20 blur-sm" />
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-slate-300">Source Code</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-600/50">
                    <Eye className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-400">Read-only</span>
                  </div>
                  <CopyButton code={snippet.code} />
                </div>
              </div>
              
              {/* Editor */}
              <div className="relative bg-slate-900/50">
                <Editor
                  height="600px"
                  language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                  value={snippet.code}
                  theme="vs-dark"
                  beforeMount={defineMonacoThemes}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    readOnly: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 20, bottom: 20 },
                    renderWhitespace: "selection",
                    fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
                    fontLigatures: true,
                    cursorBlinking: "smooth",
                    smoothScrolling: true,
                    renderLineHighlight: "all",
                    lineHeight: 1.6,
                    letterSpacing: 0.5,
                    roundedSelection: true,
                    scrollbar: {
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
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

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Comments snippetId={snippet._id} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
export default SnippetDetailPage;
