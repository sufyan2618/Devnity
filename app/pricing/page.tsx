import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import NavigationHeader from "@/app/Components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star, Crown, Sparkles, Zap, Check } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/app/Components/LoginButton";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 selection:bg-violet-500/20 selection:text-violet-200">
      <NavigationHeader />

      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Main content */}
      <main className="relative pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-16 sm:mb-24">
            <div className="relative inline-block mb-8 sm:mb-12">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 blur-3xl opacity-50 animate-pulse" />
              <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text leading-tight">
                Elevate Your <br />
                Development Experience
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Join the next generation of developers with our professional suite of tools designed for modern coding workflows
            </p>
          </div>

          {/* Enterprise Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
            {ENTERPRISE_FEATURES.map((feature, index) => (
              <div
                key={feature.label}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Ambient glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-emerald-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-slate-600/50 hover:border-violet-400/50 transition-all duration-500 p-6 shadow-lg hover:shadow-violet-500/20 group-hover:scale-[1.02] overflow-hidden">

                  {/* Subtle animated border */}
                  <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4 ring-2 ring-violet-400/30 group-hover:ring-violet-400/50 transition-all duration-300 shadow-lg">
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-violet-400" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:via-cyan-300 group-hover:to-emerald-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                      {feature.label}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>

                  {/* Hover glow line */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="relative max-w-5xl mx-auto">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-emerald-500/20 blur-3xl opacity-30 animate-pulse" />

            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-slate-700/50 shadow-2xl shadow-violet-500/20 overflow-hidden">

              {/* Animated gradient borders */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent animate-pulse" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent animate-pulse" />

              {/* Subtle animated border */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-emerald-500/20 opacity-20 blur-sm" />

              <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16">

                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center justify-center p-4 sm:p-6 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-emerald-500/20 ring-2 ring-violet-400/30 mb-6 sm:mb-8 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10 rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-violet-400 relative z-10" />
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-cyan-500 p-1.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-white animate-pulse" />
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text mb-6">
                    Lifetime Pro Access
                  </h2>

                  <div className="flex items-baseline justify-center gap-2 mb-6">
                    <span className="text-xl sm:text-2xl text-slate-400">$</span>
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text">
                      39
                    </span>
                    <span className="text-lg sm:text-xl text-slate-400">one-time</span>
                  </div>

                  <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
                    Unlock the full potential of CodeCraft with lifetime access
                  </p>

                  {/* Value proposition */}
                  <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl border border-emerald-400/30 backdrop-blur-sm">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400">Save $200+ vs monthly plans</span>
                  </div>
                </div>

                {/* Features grid */}
                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
                  <FeatureCategory label="Development">
                    {FEATURES.development.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Collaboration">
                    {FEATURES.collaboration.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Deployment">
                    {FEATURES.deployment.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>
                </div>


                {/* CTA Section */}
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <SignedIn>
                      <UpgradeButton />
                    </SignedIn>
                    <SignedOut>
                      <LoginButton />
                    </SignedOut>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>30-day money back guarantee</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span>Instant activation</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full" />
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-cyan-400" />
                      <span>Lifetime updates included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default PricingPage;
