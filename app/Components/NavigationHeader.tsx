import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl backdrop-saturate-150">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-cyan-500/5 to-violet-500/5" />
      
      {/* Subtle animated border */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-14 sm:h-16 flex items-center justify-between">
          
          {/* Left Section */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative flex-shrink-0">
              {/* Enhanced logo hover effect */}
              <div
                className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-violet-500/30 rounded-xl opacity-0 
                group-hover:opacity-100 transition-all duration-700 blur-2xl animate-pulse"
              />

              {/* Enhanced logo */}
              <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-1.5 sm:p-2 lg:p-3 rounded-lg lg:rounded-xl ring-1 lg:ring-2 ring-slate-600/50 group-hover:ring-violet-400/50 transition-all duration-500 shadow-lg group-hover:shadow-violet-500/25">
                <Blocks className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-violet-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="hidden sm:flex flex-col">
                <span
                  className="block text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r
                  from-violet-400 via-cyan-300 to-violet-400 text-transparent bg-clip-text tracking-tight"
                >
                  Sufi Codes
                </span>
                <span className="hidden lg:block text-xs text-slate-400 font-medium tracking-wide">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* Snippets Link - Hidden on mobile, shown on tablet+ */}
            <Link
              href="/snippets"
              className="hidden md:flex relative group items-center gap-2 lg:gap-3 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl text-slate-300 
              bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-violet-500/20 hover:to-cyan-500/20
              border border-slate-600/50 hover:border-violet-400/50 transition-all duration-500 shadow-lg 
              hover:shadow-violet-500/25 overflow-hidden backdrop-blur-sm"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 
                to-violet-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
              />
              <Code2 className="w-4 h-4 lg:w-5 lg:h-5 relative z-10 group-hover:rotate-3 transition-transform duration-300 text-violet-400" />
              <span className="text-sm font-semibold relative z-10 group-hover:text-white transition-colors duration-300">
                Snippets
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-500" />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            
            {/* Mobile Snippets Link */}
            <Link
              href="/snippets"
              className="md:hidden relative group p-2 rounded-lg text-slate-300 
              bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-violet-500/20 hover:to-cyan-500/20
              border border-slate-600/50 hover:border-violet-400/50 transition-all duration-300 shadow-lg 
              hover:shadow-violet-500/25"
            >
              <Code2 className="w-4 h-4 text-violet-400" />
            </Link>

            {/* Pro Button */}
            <SignedOut>
              <Link
                href="/pricing"
                className="relative group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl border border-amber-500/30 
                hover:border-amber-400/60 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10
                hover:from-amber-500/25 hover:via-orange-500/25 hover:to-amber-500/25 
                transition-all duration-500 shadow-lg hover:shadow-amber-500/25 overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 group-hover:rotate-12" />
                <span className="hidden sm:inline text-xs lg:text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 tracking-wide">
                  Pro
                </span>
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </SignedOut>

            {/* Profile Button */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg lg:rounded-xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only show on small screens */}
      <div className="md:hidden border-t border-slate-700/50 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <Link
            href="/snippets"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-slate-300 
            bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-violet-500/20 hover:to-cyan-500/20
            border border-slate-600/50 hover:border-violet-400/50 transition-all duration-300"
          >
            <Code2 className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold">Browse Snippets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;
