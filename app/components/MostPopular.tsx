'use client';
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; 
import Link from 'next/link';

export default function MostPopular() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 1. Create a state to store your products
  const [products, setProductsPopular] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data from Supabase
  useEffect(() => {
    async function fetchPopularProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_popular', true); // Only grab items marked popular

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Calculate 340px (card width + gap)
      const scrollAmount = 340; 
      const currentScroll = scrollRef.current.scrollLeft;
      
      scrollRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // 3. Handle the "Loading" state so the site doesn't look broken
  if (loading) return <div className="py-20 text-center text-gray-400">Loading Favorites...</div>;

  return (
    
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        <div className="flex justify-between items-end mb-10">
          <div className="text-left">
            <h2 className="text-4xl text-zax-green font-bold text-gray-900">Customer Favorites</h2>
          </div>
          
          {/* Navigation Arrows */}
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

        {/* The Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-scroll  snap-x snap-mandatory pb-8 cursor-pointer scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[280px] md:min-w-[320px] bg-gray-100 p-6 rounded-2xl shadow-md transition-all transform hover:scale-105 duration-500 border-gray-100 snap-center group"
            >
              <div className="h-56 bg-gray-50 rounded-xl mb-6 overflow-hidden relative">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="object-contain w-full h-full" 
                />
              </div>
              <Link href={`/shop/${product.id}`}>
              <h3 className="font-bold text-lg mb-1 text-gray-800">{product.name}</h3>
              
              <p className="text-xs text-gray-400 mb-4 font-medium uppercase">{product.unit}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <p className="text-zax-green font-black text-2xl">${product.price.toFixed(2)}</p>
                <button className="bg-zax-dark text-white p-3 rounded-lg hover:shadow-lg transition-colors cursor-pointer">
                  🛒
                </button>
              </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/shop" 
            className="inline-block text-gray-500 font-bold hover:text-zax-green transition-colors border-b-2 border-transparent hover:border-zax-green"
          >
            Explore Full Inventory →
          </a>
        </div>
      </div>
    </section>
  );
}