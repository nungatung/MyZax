'use client';

export default function ScrollArrow() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
        Scroll
      </span>
      <button 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-white/50 backdrop-blur-sm hover:border-zax-green hover:text-zax-green transition-all animate-bounce cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </button>
    </div>
  );
}