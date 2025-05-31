import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 
      bg-gradient-to-r from-violet-500/80 via-cyan-500/80 to-emerald-500/80 
      hover:from-violet-400/90 hover:via-cyan-400/90 hover:to-emerald-400/90
      text-white rounded-lg transition-all duration-300 
      border border-violet-400/30 hover:border-violet-400/60
      shadow-lg hover:shadow-violet-500/25 font-medium text-sm
      hover:scale-105 transform backdrop-blur-sm"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-cyan-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        
        {/* Icon */}
        <LogIn className="w-4 h-4 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Text */}
        <span className="relative z-10">Sign In</span>
        
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />
      </button>
    </SignInButton>
  );
}
export default LoginButton;
