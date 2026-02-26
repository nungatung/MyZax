'use client';

export default function ScrollArrow() {
  return (
    <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 group">
      {/* 1. Higher contrast label - Switched to zax-dark with a tracking boost */}
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zax-dark/50 group-hover:text-zax-green transition-colors duration-500">
        Scroll
      </span>
      
      <button 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="relative w-12 h-12 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] flex items-center justify-center border-2 border-transparent hover:border-zax-green/30 transition-all duration-500 animate-bounce cursor-pointer"
      >
        {/* 2. The "Pop" - A subtle green pulse ring that appears on hover */}
        <span className="absolute inset-0 rounded-full bg-zax-green/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* 3. Bolder Icon - Switched to brand green with a thicker stroke */}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#00703C" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="relative z-10 transition-transform duration-300 group-hover:translate-y-0.5"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </button>
    </div>
  );
}