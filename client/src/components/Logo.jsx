const Logo = ({ dark = false, size = 'default' }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const imgClass = isLarge
    ? 'h-16 w-16 sm:h-20 sm:w-20'
    : isSmall
    ? 'h-9 w-9'
    : 'h-11 w-11 sm:h-12 sm:w-12';

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative shrink-0 overflow-hidden rounded-xl bg-white p-0.5 shadow-sm border border-slate-200/60 ${imgClass}`}>
        <img
          src="/rm-logo.jpg"
          alt="R M Home Cleaning Service Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="leading-tight">
        <p className={`font-display font-extrabold text-base sm:text-lg tracking-tight ${dark ? 'text-white' : 'text-navy-950'}`}>
          R M Home Cleaning
        </p>
        <p className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${dark ? 'text-amber-300' : 'text-skyline-600'}`}>
          House Cleaning · Sector 50, Chandigarh
        </p>
      </div>
    </div>
  );
};

export default Logo;
