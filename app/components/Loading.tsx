'use client';
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
      <div className="relative">
        {/* The Logo with a pulse animation */}
        <img 
          src="/zax-500.png" 
          alt="Zax Loading" 
          className="w-48 md:w-64 h-auto animate-pulse"
        />
        
        {/* A subtle loading bar underneath */}
        <div className="absolute -bottom-4 left-0 w-full h-1 bg-gray-50 rounded-full overflow-hidden">
          <div className="h-full bg-zax-green animate-loading-bar"></div>
        </div>
      </div>
      
      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
        Preparing....   
      </p>
    </div>
  );
}