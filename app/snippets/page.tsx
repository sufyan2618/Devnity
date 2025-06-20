"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/app/Components/NavigationHeader";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, X, Sparkles, Filter } from "lucide-react";
import SnippetCard from "./_components/SnippetCard";
import Image from "next/image";

function SnippetsPage() {
  const snippets = useQuery(api.snippets.getSnippet);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  if (snippets === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavigationHeader />

      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Compact Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
            bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-emerald-500/10 
            border border-violet-400/20 text-sm text-slate-300 mb-4 backdrop-blur-sm"
          >
            <BookOpen className="w-3 h-3 text-violet-400" />
            Community Code Library
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold 
            bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 
            text-transparent bg-clip-text mb-3 leading-tight"
          >
            Discover & Share Code Snippets
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 mb-4 leading-relaxed"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </div>

        {/* Compact Filters Section */}
        <div className="relative max-w-6xl mx-auto mb-6 space-y-3 sm:space-y-4">
          {/* Compact Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-2xl rounded-lg border border-slate-600/50 shadow-lg">
              <div className="flex items-center">
                <Search className="absolute left-3 sm:left-4 w-4 h-4 text-violet-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search snippets by title, language, or author..."
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-transparent text-white
                    placeholder:text-slate-400 focus:outline-none text-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Compact Filters Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col lg:flex-row gap-3 lg:items-center"
          >
            {/* Language Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                <Filter className="w-3 h-3 text-cyan-400" />
                <span className="text-xs font-medium text-slate-300">Languages:</span>
              </div>
              
              {popularLanguages.map((lang) => (
                <motion.button
                  key={lang}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
                  className={`
                    group relative px-2.5 py-1.5 rounded-lg transition-all duration-300 backdrop-blur-sm
                    ${
                      selectedLanguage === lang
                        ? "text-violet-300 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/50 shadow-lg"
                        : "text-slate-400 hover:text-slate-300 bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-slate-700/80 hover:to-slate-600/80 border border-slate-600/50 hover:border-slate-500/50"
                    }
                  `}
                >
                  <div className="flex items-center gap-1.5">
                    <Image src={`/${lang}.png`} alt={lang} className="object-contain" width={12} height={12} />
                    <span className="text-xs font-medium">{lang}</span>
                  </div>
                </motion.button>
              ))}

              {selectedLanguage && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSelectedLanguage(null)}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-red-400 
                  bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-red-500/20 hover:to-orange-500/20 
                  rounded-lg border border-slate-600/50 hover:border-red-400/50 transition-all duration-300"
                >
                  <X className="w-3 h-3" />
                  Clear
                </motion.button>
              )}
            </div>

            {/* Results & View Toggle */}
            <div className="flex items-center justify-between lg:ml-auto gap-3">
              <span className="text-xs text-slate-500 font-medium">
                {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} found
              </span>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    view === "grid"
                      ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-400 shadow-lg"
                      : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <Grid className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    view === "list"
                      ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-400 shadow-lg"
                      : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Compact Snippets Grid */}
        <motion.div
          className={`grid gap-3 sm:gap-4 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet, index) => (
              <motion.div
                key={snippet._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <SnippetCard snippet={snippet} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Compact Empty State */}
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-lg mx-auto mt-8"
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-2xl rounded-xl border border-slate-600/50 p-6 text-center shadow-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-slate-600/50 mb-4 shadow-lg">
                <Code className="w-6 h-6 text-slate-400" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">No snippets found</h3>
              <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>
              
              {(searchQuery || selectedLanguage) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 
                  bg-gradient-to-r from-violet-500/80 to-cyan-500/80 hover:from-violet-400/90 hover:to-cyan-400/90
                  text-white rounded-lg border border-violet-400/30 hover:border-violet-400/60
                  transition-all duration-300 shadow-lg hover:shadow-violet-500/25 font-medium text-sm"
                >
                  <X className="w-3 h-3" />
                  Clear all filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
export default SnippetsPage;
