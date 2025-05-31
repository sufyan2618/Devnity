import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles, } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-cyan-500/5 to-violet-500/5 blur-3xl" />

      <div
        className="relative flex flex-col lg:flex-row items-center lg:justify-between justify-center 
        bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl 
        p-4 sm:p-6 mb-4 rounded-xl lg:rounded-2xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 
        space-y-4 lg:space-y-0"
      >
        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-violet-500/20 opacity-0 hover:opacity-100 transition-opacity duration-700 blur-sm" />

        {/* Mobile/Tablet Header */}
        <div className="flex items-center justify-between w-full lg:hidden relative z-10">
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Mobile logo hover effect */}
            <div
              className="absolute -inset-2 bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-violet-500/30 rounded-xl opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
            />

            {/* Mobile logo */}
            <div
              className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-2 sm:p-2.5 rounded-xl ring-1
              ring-slate-600/50 group-hover:ring-violet-400/50 transition-all duration-500 shadow-lg group-hover:shadow-violet-500/25"
            >
              <Blocks className="size-5 sm:size-6 text-violet-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500 drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="block text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 text-transparent bg-clip-text tracking-tight">
                Sufi Codes
              </span>
              <span className="hidden sm:block text-xs text-slate-400 font-medium tracking-wide">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Mobile profile button */}
          <div className="flex items-center gap-2">
            <HeaderProfileBtn />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center gap-8 relative z-10">
          <Link href="/" className="flex items-center gap-4 group relative">
            {/* Enhanced logo hover effect */}
            <div
              className="absolute -inset-3 bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-violet-500/30 rounded-2xl opacity-0 
                group-hover:opacity-100 transition-all duration-700 blur-2xl animate-pulse"
            />

            {/* Enhanced logo */}
            <div
              className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 p-3 rounded-2xl ring-2
              ring-slate-600/50 group-hover:ring-violet-400/50 transition-all duration-500 shadow-lg group-hover:shadow-violet-500/25"
            >
              <Blocks className="size-7 text-violet-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="block text-xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 text-transparent bg-clip-text tracking-tight">
                Sufi Codes
              </span>
              <span className="block text-xs text-slate-400 font-medium tracking-wide">
                Interactive Code Editor
              </span>
            </div>
          </Link>

          {/* Enhanced navigation */}
          <nav className="flex items-center space-x-2">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-3 px-5 py-2.5 rounded-xl text-slate-300 
                bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-violet-500/20 hover:to-cyan-500/20
                border border-slate-600/50 hover:border-violet-400/50 transition-all duration-500 shadow-lg 
                hover:shadow-violet-500/25 overflow-hidden backdrop-blur-sm"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 
                to-violet-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
              />
              <Code2 className="w-5 h-5 relative z-10 group-hover:rotate-3 transition-transform duration-300 text-violet-400" />
              <span
                className="text-sm font-semibold relative z-10 group-hover:text-white
                 transition-colors duration-300"
              >
                Snippets
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-500" />
            </Link>
          </nav>
        </div>

        {/* Mobile Controls Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:hidden relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 w-full sm:w-auto justify-center">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="relative group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-amber-500/30 
                  hover:border-amber-400/60 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10
                  hover:from-amber-500/25 hover:via-orange-500/25 hover:to-amber-500/25 
                  transition-all duration-500 shadow-lg hover:shadow-amber-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 group-hover:rotate-12" />
                <span className="text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 tracking-wide">
                  Pro
                </span>
              </Link>
            )}

            <SignedIn>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg blur-lg opacity-50" />
                <RunButton />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Navigation */}
          <Link
            href="/snippets"
            className="flex lg:hidden items-center gap-2 px-4 py-2 rounded-lg text-slate-300 
              bg-gradient-to-r from-slate-800/80 to-slate-700/80 hover:from-violet-500/20 hover:to-cyan-500/20
              border border-slate-600/50 hover:border-violet-400/50 transition-all duration-300 shadow-lg 
              hover:shadow-violet-500/25 w-full sm:w-auto justify-center"
          >
            <Code2 className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold">Snippets</span>
          </Link>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-5 relative z-10">
          <div className="flex items-center gap-4 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <ThemeSelector />
            <div className="relative w-full sm:w-auto">
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>
  
          </div>

          {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="relative group flex items-center gap-3 px-5 py-2.5 rounded-xl border border-amber-500/30 
                hover:border-amber-400/60 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10
                hover:from-amber-500/25 hover:via-orange-500/25 hover:to-amber-500/25 
                transition-all duration-500 shadow-lg hover:shadow-amber-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 group-hover:rotate-12" />
              <span className="text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10 tracking-wide">
                Pro
              </span>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          )}

          <SignedIn>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-50" />
              <RunButton />
            </div>
          </SignedIn>

          <div className="pl-4 border-l border-slate-600/50">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl blur-sm" />
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
