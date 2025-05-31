const FeatureCategory = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <div className="space-y-4 sm:space-y-6">
      <div className="relative">
        <h3 className="text-sm sm:text-base font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text uppercase tracking-wider mb-2">
          {label}
        </h3>
        <div className="h-px bg-gradient-to-r from-violet-400/50 via-cyan-400/50 to-emerald-400/50 w-full opacity-30" />
      </div>
      <div className="space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
  
  export default FeatureCategory;
  