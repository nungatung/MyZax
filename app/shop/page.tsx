'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import Footer from '@/app/components/Footer';


const categories = ["All", "Napkins", "Take-Out Containers", "Sugar Sachets", "Foil Lids & Steam Pans", "Bathroom Products", "Kitchen Supplies", "Straws", "Cups", "Paper Towel"];

export default function ShopPage() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(300);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch all products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (data) setDbProducts(data);
      if (error) console.error(error);
      setLoading(false);

      setTimeout(() => setIsVisible(true), 100);
    }
    fetchProducts();
  }, []);

  // Filter products based on UI selections
  const filteredProducts = dbProducts.filter(p => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const priceMatch = p.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen font-sans text-gray-800">

      {/* --- NAVBAR (Screenshot 184727) --- */}
      <Navbar />



      <div className="bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="h-24 md:h-32 w-full" aria-hidden="true" />
        <div className="bg-gray-50 border-b border-gray-100 py-16 mb-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-black text-gray-900">Our Supplies</h1>
            <p className="text-gray-500 mt-2">Filter by category or price to find your essentials.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">

          {/* --- LEFT SIDEBAR: FILTERS --- */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <aside className="w-full lg:w-64 space-y-10">
              {/* Price Filter */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Filter by Price</h4>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-zax-green"
                />
                <div className="flex justify-between mt-2 text-sm font-bold text-gray-600">
                  <span>$0</span>
                  <span className="text-zax-green cursor-pointer">Under ${maxPrice}</span>
                </div>
              </div>

              {/* Category List */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Categories</h4>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeCategory === cat
                          ? "bg-zax-green text-white shadow-md"
                          : "text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>


          {/* --- RIGHT SIDE: PRODUCT GRID --- */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link href={`/shop/${product.id}`} key={product.id}>
                    <div key={product.id} className="group border border-gray-100 p-4 rounded-3xl hover:shadow-xl  transition-all transform hover:scale-105 duration-500 cursor-pointer">
                      <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-6" />
                      </div>
                      <p className="text-[12px] font-black text-zax-green uppercase mb-1">{product.category}</p>
                      <h3 className="font-bold text-gray-900 mb-4 h-12 line-clamp-2">{product.name}</h3><br />
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                        <p className="text-xs text-gray-500 font-medium uppercase">{product.unit}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold">No products found in this price range.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* --- FOOTER --- */}
      <Footer />
    </main>
  );
}
