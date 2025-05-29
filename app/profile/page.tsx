"use client";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import NavigationHeader from "@/app/Components/NavigationHeader";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";
import { ChevronRight, Clock, Code, ListVideo, Loader2, Star, Calendar, Eye, Sparkles, Code2, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import StarButton from "@/app/Components/StarButton";
import CodeBlock from "./_components/CodeBlock";

const TABS = [
  {
    id: "executions",
    label: "Code Executions",
    icon: ListVideo,
    color: "from-violet-500/20 to-cyan-500/20",
    iconColor: "text-violet-400",
  },
  {
    id: "starred",
    label: "Starred Snippets",
    icon: Star,
    color: "from-emerald-500/20 to-cyan-500/20",
    iconColor: "text-emerald-400",
  },
];

function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"executions" | "starred">("executions");

  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id ?? "",
  });

  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  const {
    results: executions,
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecution,
    {
      userId: user?.id ?? "",
    },
    { initialNumItems: 5 }
  );

  const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

  const handleLoadMore = () => {
    if (executionStatus === "CanLoadMore") loadMore(5);
  };

  if (!user && isLoaded) return router.push("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavigationHeader />

      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Profile Header */}
        {userStats && userData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProfileHeader userStats={userStats} userData={userData} user={user!} />
          </motion.div>
        )}

        {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mt-8"
        >
          {/* Ambient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-3xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 overflow-hidden">
            
            {/* Subtle animated border */}
            <div className="absolute inset-0 rounded-xl lg:rounded-3xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-20 blur-sm" />
            
            {/* Tabs */}
            <div className="relative z-10 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
              <div className="flex space-x-1 p-4 sm:p-6">
                {TABS.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id as "executions" | "starred")}
                    className={`
                      group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 backdrop-blur-sm
                      ${activeTab === tab.id 
                        ? `bg-gradient-to-r ${tab.color} ${tab.iconColor} border border-current/30 shadow-lg` 
                        : "text-slate-400 hover:text-slate-300 bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/50 hover:to-slate-500/50 border border-slate-600/50 hover:border-slate-500/50"
                      }
                    `}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <tab.icon className={`w-4 h-4 sm:w-5 sm:h-5 relative z-10 ${activeTab === tab.id ? tab.iconColor : ""}`} />
                    <span className="text-sm sm:text-base font-semibold relative z-10">{tab.label}</span>
                    {activeTab === tab.id && (
                      <Sparkles className="w-3 h-3 animate-pulse relative z-10" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 p-4 sm:p-6 lg:p-8"
              >
                {/* ACTIVE TAB IS EXECUTIONS */}
                {activeTab === "executions" && (
                  <div className="space-y-6 sm:space-y-8">
                    {executions?.map((execution, index) => (
                      <motion.div
                        key={execution._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        {/* Ambient glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-600/50 hover:border-violet-400/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-violet-500/20">
                          
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-b border-slate-700/50">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-emerald-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 ring-2 ring-slate-500/50 group-hover:ring-violet-400/50 transition-all duration-300 flex items-center justify-center shadow-lg">
                                  <Image
                                    src={"/" + execution.language + ".png"}
                                    alt={execution.language}
                                    className="w-8 h-8 object-contain relative z-10"
                                    width={32}
                                    height={32}
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 rounded-lg text-sm font-bold border border-violet-400/30">
                                    <Code2 className="w-3 h-3" />
                                    {execution.language.toUpperCase()}
                                  </span>
                                  <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Calendar className="w-3 h-3 text-cyan-400" />
                                    <span className="font-medium">
                                      {new Date(execution._creationTime).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold ${
                                      execution.error
                                        ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border border-red-400/30"
                                        : "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-400/30"
                                    }`}
                                  >
                                    {execution.error ? "❌ Error" : "✅ Success"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Play className="w-4 h-4 text-slate-400" />
                              <span className="text-xs text-slate-500 font-medium">Execution #{executions.length - index}</span>
                            </div>
                          </div>

                          {/* Code Block */}
                          <div className="p-4 sm:p-6 bg-slate-900/30">
                            <CodeBlock code={execution.code} language={execution.language} />

                            {(execution.output || execution.error) && (
                              <div className="mt-6 relative">
                                <div className={`
                                  p-4 rounded-xl border backdrop-blur-sm
                                  ${execution.error
                                    ? "bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-400/30"
                                    : "bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-400/30"
                                  }
                                `}>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Eye className={`w-4 h-4 ${execution.error ? "text-red-400" : "text-emerald-400"}`} />
                                    <h4 className={`text-sm font-semibold ${execution.error ? "text-red-400" : "text-emerald-400"}`}>
                                      Output
                                    </h4>
                                  </div>
                                  <pre className={`text-sm font-mono leading-relaxed ${
                                    execution.error ? "text-red-300" : "text-emerald-300"
                                  }`}>
                                    {execution.error || execution.output}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Hover glow line */}
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-700" />
                        </div>
                      </motion.div>
                    ))}

                    {/* Loading State */}
                    {isLoadingExecutions && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 sm:py-16"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-slate-600/50 shadow-lg mb-6">
                          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-violet-400 animate-spin" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Loading executions...</h3>
                        <p className="text-slate-400">Fetching your code execution history</p>
                      </motion.div>
                    )}

                    {/* Empty State */}
                    {!isLoadingExecutions && executions.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 sm:py-16"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-slate-600/50 shadow-lg mb-6">
                          <Code className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No executions yet</h3>
                        <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                          Start coding to see your execution history appear here
                        </p>
                      </motion.div>
                    )}

                    {/* Load More Button */}
                    {executionStatus === "CanLoadMore" && (
                      <div className="flex justify-center mt-8">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLoadMore}
                          className="relative group flex items-center gap-3 px-6 py-3 
                          bg-gradient-to-r from-violet-500/80 to-cyan-500/80 hover:from-violet-400/90 hover:to-cyan-400/90
                          text-white rounded-xl border border-violet-400/30 hover:border-violet-400/60
                          transition-all duration-300 shadow-lg hover:shadow-violet-500/25 font-semibold"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                          <span className="relative z-10">Load More</span>
                          <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}

                {/* ACTIVE TAB IS STARRED */}
                {activeTab === "starred" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {starredSnippets?.map((snippet, index) => (
                      <motion.div
                        key={snippet._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        {/* Ambient glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        
                        <Link href={`/snippets/${snippet._id}`}>
                          <div className="relative h-full bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-600/50 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-emerald-500/20 group-hover:scale-[1.02]">
                            
                            {/* Subtle animated border */}
                            <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                            
                            <div className="relative z-10 p-4 sm:p-6">
                              {/* Header */}
                              <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-violet-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 ring-2 ring-slate-500/50 group-hover:ring-emerald-400/50 transition-all duration-300 flex items-center justify-center shadow-lg">
                                      <Image
                                        src={`/${snippet.language}.png`} 
                                        alt={`${snippet.language} logo`}
                                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain relative z-10"
                                        width={32}
                                        height={32}
                                      />
                                    </div>
                                  </div>
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 rounded-lg text-sm font-bold border border-emerald-400/30">
                                    <Code2 className="w-3 h-3" />
                                    {snippet.language}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                                  <StarButton snippetId={snippet._id} />
                                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
                                </div>
                              </div>
                              
                              {/* Title */}
                              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:via-cyan-300 group-hover:to-violet-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 leading-tight">
                                {snippet.title}
                              </h2>
                              
                              {/* Meta */}
                              <div className="flex items-center gap-2 mb-4 text-sm">
                                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-600/50">
                                  <Calendar className="w-3 h-3 text-cyan-400" />
                                  <span className="text-slate-300 font-medium">
                                    {new Date(snippet._creationTime).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Code Preview */}
                            <div className="relative z-10 px-4 sm:px-6 pb-4 sm:pb-6">
                              <div className="relative bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-b border-slate-700/50">
                                  <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                                  </div>
                                  <Eye className="w-3 h-3 text-slate-500 ml-2" />
                                </div>
                                <div className="p-4 overflow-hidden">
                                  <pre className="text-xs sm:text-sm text-slate-300 font-mono line-clamp-3 leading-relaxed">
                                    {snippet.code}
                                  </pre>
                                </div>
                              </div>
                            </div>
                            
                            {/* Hover glow line */}
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 group-hover:w-full transition-all duration-700" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}

                    {/* Empty State */}
                    {(!starredSnippets || starredSnippets.length === 0) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="col-span-full text-center py-12 sm:py-16"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-slate-600/50 shadow-lg mb-6">
                          <Star className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No starred snippets yet</h3>
                        <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                          Start exploring and star the snippets you find useful
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default ProfilePage;
