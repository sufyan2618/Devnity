import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Activity, Code2, Star, Timer, TrendingUp, Trophy, UserIcon,  Crown, Sparkles, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Id } from "../../../convex/_generated/dataModel";
import { UserResource } from "@clerk/types";
import Image from "next/image";

interface ProfileHeaderProps {
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    languages: string[];
    last24Hours: number;
    favoriteLanguage: string;
    languageStats: Record<string, number>;
    mostStarredLanguage: string;
  };
  userData: {
    _id: Id<"users">;
    _creationTime: number;
    proSince?: number | undefined;
    lemonSqueezyCustomerId?: string | undefined;
    lemonSqueezyOrderId?: string | undefined;
    name: string;
    userId: string;
    email: string;
    isPro: boolean;
  };
  user: UserResource;
}

function ProfileHeader({ userStats, userData, user }: ProfileHeaderProps) {
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const STATS = [
    {
      label: "Code Executions",
      value: userStats?.totalExecutions ?? 0,
      icon: Activity,
      color: "from-violet-500/80 to-cyan-500/80",
      hoverColor: "hover:from-violet-400/90 hover:to-cyan-400/90",
      iconColor: "text-violet-400",
      description: "Total code runs",
      metric: {
        label: "Last 24h",
        value: userStats?.last24Hours ?? 0,
        icon: Timer,
        iconColor: "text-cyan-400",
      },
    },
    {
      label: "Starred Snippets",
      value: starredSnippets?.length ?? 0,
      icon: Star,
      color: "from-emerald-500/80 to-cyan-500/80",
      hoverColor: "hover:from-emerald-400/90 hover:to-cyan-400/90",
      iconColor: "text-emerald-400",
      description: "Saved for later",
      metric: {
        label: "Most starred",
        value: userStats?.mostStarredLanguage ?? "N/A",
        icon: Trophy,
        iconColor: "text-emerald-400",
      },
    },
    {
      label: "Languages Used",
      value: userStats?.languagesCount ?? 0,
      icon: Code2,
      color: "from-cyan-500/80 to-violet-500/80",
      hoverColor: "hover:from-cyan-400/90 hover:to-violet-400/90",
      iconColor: "text-cyan-400",
      description: "Different languages",
      metric: {
        label: "Most used",
        value: userStats?.favoriteLanguage ?? "N/A",
        icon: TrendingUp,
        iconColor: "text-violet-400",
      },
    },
  ];

  return (
    <div className="relative mb-8">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl" />
      
      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-xl lg:rounded-3xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 overflow-hidden p-6 sm:p-8 lg:p-10">
        
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-xl lg:rounded-3xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-20 blur-sm" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Profile Section */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative group flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/50 via-cyan-500/50 to-emerald-500/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
            
            <div className="relative">
              <Image
              src={user?.imageUrl || "/default-avatar.png"}
                alt="Profile"
                className="sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-slate-600/50 group-hover:border-violet-400/50 relative z-10 group-hover:scale-105 transition-all duration-500 shadow-2xl"
                width={20}
                height={20}
              />
              
              {userData.isPro && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-500 to-emerald-500 p-2 sm:p-2.5 rounded-full z-20 shadow-lg border-2 border-slate-900"
                >
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text">
                {userData.name}
              </h1>
              
              {userData.isPro && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 text-violet-300 rounded-xl border border-violet-400/30 backdrop-blur-sm shadow-lg">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-bold">Pro Member</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <UserIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium truncate">{userData.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Member since {formatDate(userData._creationTime)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              key={index}
              className="group relative"
            >
              {/* Ambient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-600/50 hover:border-violet-400/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-violet-500/20 group-hover:scale-[1.02]">
                
                {/* Subtle animated border */}
                <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs sm:text-sm font-medium text-slate-400">{stat.description}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-1">
                        {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                      </h3>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                    </div>
                    
                    <div className={`relative p-3 sm:p-4 rounded-xl lg:rounded-2xl bg-gradient-to-br ${stat.color} ${stat.hoverColor} transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl lg:rounded-2xl" />
                      <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 ${stat.iconColor}`} />
                    </div>
                  </div>

                  {/* Additional metric */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-600/50 backdrop-blur-sm">
                      <stat.metric.icon className={`w-3 h-3 ${stat.metric.iconColor}`} />
                      <span className="text-xs font-medium text-slate-400">{stat.metric.label}:</span>
                      <span className="text-xs font-bold text-white">{stat.metric.value}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                
                {/* Hover glow line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
