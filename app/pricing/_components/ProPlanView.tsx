import NavigationHeader from "@/app/Components/NavigationHeader";
import { ArrowRight, Command, Star, Sparkles, Crown, Zap, Code2 } from "lucide-react";
import Link from "next/link";

function ProPlanView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavigationHeader />

      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center py-12 sm:py-16">
        <div
          className="relative max-w-2xl mx-auto text-center"
        >
          {/* Ambient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-emerald-500/20 blur-3xl opacity-50 animate-pulse" />
          
          {/* Animated gradient borders */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent animate-pulse" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-slate-700/50 shadow-2xl shadow-violet-500/20 p-8 sm:p-12 lg:p-16 overflow-hidden">
            
            {/* Subtle animated border */}
            <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-20 blur-sm" />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />

            <div className="relative z-10">
              {/* Pro Icon */}
              <div
                className="inline-flex items-center justify-center p-4 sm:p-6 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-emerald-500/20 mb-6 sm:mb-8 ring-2 ring-violet-400/30 shadow-2xl relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10 rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-violet-400 relative z-10" />
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-cyan-500 p-1.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-white animate-pulse" />
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text mb-4 sm:mb-6 leading-tight"
              >
                Pro Plan Active
              </h1>

              {/* Subtitle */}
              <p
                className="text-slate-400 mb-8 sm:mb-12 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto"
              >
                Experience the full power of professional development with unlimited access to all features
              </p>

              {/* Features List */}
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
              >
                {[
                  { icon: Code2, text: "All Languages", color: "text-violet-400" },
                  { icon: Zap, text: "Unlimited Runs", color: "text-cyan-400" },
                  { icon: Star, text: "Premium Support", color: "text-emerald-400" }
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/50 backdrop-blur-sm">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    <span className="text-sm font-medium text-slate-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div
             
              >
                <Link
                  href="/"
                  className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 
                  bg-gradient-to-r from-violet-500/80 via-cyan-500/80 to-emerald-500/80 
                  hover:from-violet-400/90 hover:via-cyan-400/90 hover:to-emerald-400/90
                  text-white rounded-xl lg:rounded-2xl transition-all duration-300 
                  border border-violet-400/30 hover:border-violet-400/60
                  shadow-2xl hover:shadow-violet-500/30 font-semibold text-lg
                  hover:scale-105 transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-cyan-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl lg:rounded-2xl" />
                  
                  <Command className="w-6 h-6 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Open Editor</span>
                  <ArrowRight className="w-6 h-6 text-white relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl lg:rounded-t-2xl" />
                </Link>
              </div>

              {/* Additional Info */}
              <div
         
                className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700/50"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span>Pro features unlocked</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                    <span>Premium experience active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400/30 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProPlanView;
