import { Check } from "lucide-react";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 group">
    <div className="relative mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-400/30 group-hover:border-emerald-400/60 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all duration-300 shadow-lg group-hover:shadow-emerald-500/25">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 relative z-10 group-hover:scale-110 transition-transform duration-300" />
    </div>
    
    <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-sm sm:text-base leading-relaxed font-medium">
      {children}
    </span>
  </div>
);

export default FeatureItem;
