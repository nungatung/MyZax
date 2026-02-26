'use client';
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; 
import Link from 'next/link';

export default function MostPopular() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProductsPopular] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_popular', true); 

        if (error) throw error;
        if (data) setProductsPopular(data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPopularProducts();
  }, []);

  // UPDATED SCROLL LOGIC FOR CONTINUOUS WRAPPING
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 340; // Card width + gap
      
      let newScrollPosition;

      if (direction === 'left') {
        // If we are at the very start, wrap to the end
        if (scrollLeft <= 0) {
          newScrollPosition = scrollWidth;
        } else {
          newScrollPosition = scrollLeft - scrollAmount;
        }
      } else {
        // If we are at the very end, wrap to the start
        // We use a -5px buffer to account for sub-pixel rendering differences
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          newScrollPosition = 0;
        } else {
          newScrollPosition = scrollLeft + scrollAmount;
        }
      }

      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Loading Favorites...</div>;

  return (
   <section className="py-20 bg-gray-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative">
      
      {/* 1. CUSTOM QUANTITY SERVICE BANNER */}
      <div className="mb-12 p-6 md:p-8 rounded-[32px] bg-white border border-zax-green/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden group">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-zax-green/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative z-10">
          <div className="bg-zax-green p-4 rounded-2xl shadow-lg shadow-zax-green/20 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3v8.5Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-zax-dark leading-tight uppercase tracking-tight">
              Ordering for a <span className="text-zax-green">smaller</span> operation?
            </h3>
            <p className="text-gray-500 text-[13px] mt-1 font-medium max-w-md">
              We offer break pack options and custom wholesale quantities to suit all your needs.
            </p>
          </div>
        </div>

        <Link 
          href="/contact" 
          className="bg-zax-green text-white px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-zax-dark transition-all hover:scale-105 shadow-md shadow-zax-green/10 w-full md:w-auto text-center"
        >
          Request Custom Quantity
        </Link>
      </div>

      {/* 2. HEADER SECTION (Existing) */}
      <div className="flex justify-between items-end mb-10">
        <div className="text-left">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Customer <span className="text-zax-green font-black">Favorites</span>
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border-2 border-zax-green text-zax-green flex items-center justify-center hover:bg-zax-green hover:text-white transition-all font-bold cursor-pointer"
          >
            ←
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border-2 border-zax-green text-zax-green flex items-center justify-center hover:bg-zax-green hover:text-white transition-all font-bold cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* 3. PRODUCT SLIDER (Existing) */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-scroll snap-x snap-mandatory pb-8 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="min-w-[280px] md:min-w-[320px] bg-white p-6 rounded-2xl shadow-sm transition-all transform hover:shadow-xl hover:scale-105 duration-500 snap-center group border border-gray-100"
          >
            <Link href={`/shop/${product.id}`}>
              <div className="h-56 bg-gray-50 rounded-xl mb-6 overflow-hidden relative">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <h3 className="font-bold text-lg mb-1 text-gray-800">{product.name}</h3>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-zax-green font-black text-2xl">${product.price.toFixed(2)}</p>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{product.unit}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link 
          href="/shop" 
          className="inline-block text-gray-500 font-bold hover:text-zax-green transition-colors border-b-2 border-transparent hover:border-zax-green pb-1"
        >
          Explore Full Inventory →
        </Link>
      </div>
    </div>
  </section>
  );
}