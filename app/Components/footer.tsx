import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-slate-800/60 mt-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-300 group">
            <div className="relative">
              <Blocks className="size-5 text-violet-400 transition-transform group-hover:rotate-12 duration-300" />
              <div className="absolute inset-0 bg-violet-400/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-medium bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">
              Built for developers, by developers
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div  
              className="relative text-slate-400 hover:text-violet-300 transition-all duration-300 font-medium group"
            >
              <span className="relative z-10">Support</span>
              <div className="absolute inset-0 bg-violet-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>



            <div className="relative text-slate-400 hover:text-cyan-300 transition-all duration-300 font-medium group">
    
              <span className="relative z-10">Privacy</span>
              <div className="absolute inset-0 bg-cyan-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>

              {/* Terms Section*/}
              <div className="relative text-slate-400 hover:text-emerald-300 transition-all duration-300 font-medium group">
              <span className="relative z-10">Terms</span>
              <div className="absolute inset-0 bg-emerald-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
