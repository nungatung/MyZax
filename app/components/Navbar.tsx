'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext'; // Import the cart hook
import LoginModal from './LoginModal';
import CartDrawer from './CartDrawer'; // Import the drawer
import Link from 'next/link';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Get cart data and the function to open the drawer
  const { cart, setIsCartOpen } = useCart();

  // Calculate total items (sum of all quantities)
  const itemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-12 py-3 bg-white backdrop-blur-md sticky top-0 z-50 border-b border-gray-100/50">
        {/* LOGO */}
        <div className="flex-shrink-0 w-48 md:w-56 lg:w-72">
          <Link href="/">
            <img src="/zax-hor-v3.png" alt="Zax Logo" className="w-full h-auto cursor-pointer" />
          </Link>
        </div>

        {/* NAV LINKS & ACTIONS */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-sm font-black uppercase tracking-widest text-gray-800 hover:text-zax-green transition-colors">Shop Zax</Link>
          <Link href="/about" className="text-sm font-black uppercase tracking-widest text-gray-800 hover:text-zax-green transition-colors">About Us</Link>
          <Link href="/contact" className="text-sm font-black uppercase tracking-widest text-gray-800 hover:text-zax-green transition-colors">Contact</Link>
          
          <div className="h-6 w-[1px] bg-gray-200 mx-2"></div> {/* Divider */}

          {/* CART BUTTON WITH BUBBLE */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-50 rounded-full transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform inline-block">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-zax-green text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </button>

          {/* USER ACTIONS */}
          {user ? (
            <div className="flex items-center gap-6">
              {/* Link to Account Page */}
              <Link href="/account" className="transition-transform hover:scale-105 active:scale-95">
                <span className="text-[10px] font-black uppercase tracking-tighter text-zax-green bg-[#BEE7DC] px-4 py-2 rounded-full cursor-pointer hover:bg-zax-green hover:text-white transition-colors">
                  Hi, {user.user_metadata.full_name?.split(' ')[0] || 'Partner'}
                </span>
              </Link>
              
              <button 
                onClick={handleSignOut}
                className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-black uppercase tracking-widest text-gray-800 hover:text-zax-green transition-colors cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* MODALS & DRAWERS */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CartDrawer /> 
    </>
  );
}