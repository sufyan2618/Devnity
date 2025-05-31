import { Zap, Crown, Sparkles } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
  const CHEKOUT_URL =
    "https://sufi-codes.lemonsqueezy.com/buy/9a3799e6-ccd5-4294-9505-8305df4c588d";

  return (
    <Link
      href={CHEKOUT_URL}
      className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 
      bg-gradient-to-r from-violet-500/80 via-cyan-500/80 to-emerald-500/80 
      hover:from-violet-400/90 hover:via-cyan-400/90 hover:to-emerald-400/90
      text-white rounded-xl lg:rounded-2xl transition-all duration-300 
      border border-violet-400/30 hover:border-violet-400/60
      shadow-2xl hover:shadow-violet-500/30 font-bold text-base sm:text-lg
      hover:scale-105 transform backdrop-blur-sm min-w-[200px] sm:min-w-[240px]"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-cyan-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl lg:rounded-2xl" />
      
      {/* Icons */}
      <div className="relative z-10 flex items-center gap-2">
        <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Text */}
      <span className="relative z-10 tracking-wide">Upgrade to Pro</span>
      
      {/* Sparkles effect */}
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10 animate-pulse" />
      
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl lg:rounded-t-2xl" />
      
      {/* Floating particles effect */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{ animationDelay: '0s' }} />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
    </Link>
  );
}
