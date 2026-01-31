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
        <div className="flex justify-between items-end mb-10">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-gray-900">
              Customer <span className="text-zax-green">Favorites</span>
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

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-scroll snap-x snap-mandatory pb-8 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[280px] md:min-w-[320px] bg-white p-6 rounded-2xl shadow-sm transition-all transform hover:shadow-xl transform hover:scale-105 duration-500 snap-center group border border-gray-100"
            >
              <Link href={`/shop/${product.id}`}>
                <div className="h-56 bg-gray-50 rounded-xl mb-6 overflow-hidden relative">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="object-contain w-full h-full transition-transform duration-500 " 
                  />
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-800">{product.name}</h3>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-zax-green font-black text-2xl">${product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 -mb-1 font-medium uppercase">{product.unit}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/shop" 
            className="inline-block text-gray-500 font-bold hover:text-zax-green transition-colors border-b-2 border-transparent hover:border-zax-green"
          >
            Explore Full Inventory →
          </Link>
        </div>
      </div>
    </section>
  );
}