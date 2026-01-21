'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';  
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Loading from '@/app/components/Loading';

const categories = ["All", "Foil Lids & Steam Pans", "Bathroom Products", "Napkins", "Kitchen Supplies", "Straws", "Take-Out Containers", "Cups", "Paper Towel"];

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
      <div className="bg-gray-50 border-b border-gray-100 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black text-gray-900">Our Supplies</h1>
          <p className="text-gray-500 mt-2">Filter by category or price to find your essentials.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        {/* --- LEFT SIDEBAR: FILTERS --- */}
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                  className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === cat 
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
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id}>
              <div key={product.id} className="group border border-gray-100 p-4 rounded-3xl hover:shadow-xl  transition-all transform hover:scale-105 duration-500 cursor-pointer">
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-6" />
                </div>
                <p className="text-[10px] font-black text-zax-green uppercase mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-900 mb-4 h-12 line-clamp-2">{product.name}</h3><br/><p className="text-xs text-gray-400 font-medium uppercase">{product.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  <button className="bg-zax-dark text-white p-3 rounded-xl hover:bg-zax-green transition-colors cursor-pointer">🛒</button>
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
      <footer className="bg-zax-dark text-white pt-2 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-start">
          
          {/* 1. Contact Info Column with New Icons */}
          <div className="space-y-4 mt-20">
            <div className="flex items-start gap-4">
              <img src="/email.png" alt="Email" className="w-12 h-12 object-contain" />
              <div>
                <p className="font-bold text-lg text-zax-green">Email</p>
                <p className="text-gray-300 hover:text-zax-green transition"><a href="mailto:[EMAIL_ADDRESS]">info@myzax.ca</a></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <img src="/phone.png" alt="Phone" className="w-12 h-12 object-contain" />
              <div>
                <p className="font-bold text-lg text-zax-green">Phone</p>
                <p className="text-gray-300 hover:text-zax-green transition"><a href="tel:+17803182241">780-318-2241</a></p>
              </div>
            </div>
          </div>

          {/* 2. Middle Logo Column */}
          <div className="flex justify-center mt-12">
            <div className="w-[280px] h-[280px] bg-[#BEE7DC] rounded-full flex items-center justify-center">
              <img src="/zax-logo.png" className="w-2/3 h-auto" alt="Zax Branding" />
            </div>
          </div>

          {/* 3. Quick Links & Socials */}
          <div className="md:pl-12 mt-20">
            <h4 className="text-zax-green font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li><a href="/shop" className="hover:text-zax-green transition">Shop Zax</a></li>
              <li><a href="/about" className="hover:text-zax-green transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-zax-green transition">Contact</a></li>
            </ul>
            <div className="flex gap-4">
              {/* Social buttons simplified */}
              <div className="w-10 h-10 bg-blue-800 rounded flex items-center justify-center font-bold">f</div>
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold">in</div>
            </div>
          </div>
        </div>

        {/* --- THE BOTTOM BAR (The part you requested) --- */}
        <div className="mt-16 border-t border-gray-800 pt-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Left Side: Copyright and Powered By */}
            <div className="text-left space-y-1">
              <p className="text-sm text-gray-400">
                Zax Reliable Services Inc. © 2024 All Rights Reserved.
              </p>
              <p className="text-sm text-gray-500">
                Made with ❤️ by STW Insights.
              </p>
            </div>

            {/* Right Side: Payment Icons */}
            <div className="flex items-center gap-3">
              <img src="/payment.png" alt="Accepted Payments" className="h-6 w-auto opacity-80" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
