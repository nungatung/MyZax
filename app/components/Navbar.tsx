'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import LoginModal from './LoginModal';
import CartDrawer from './CartDrawer';
import Link from 'next/link';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cart, setIsCartOpen } = useCart();
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

  const navLinks = [
    { name: 'Shop Zax', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 bg-white border-b border-gray-100 sticky top-0 z-[100]">
        {/* LOGO - Added hover scale to make it feel more "alive" */}
        <Link href="/" className="transition-transform hover:scale-105 active:scale-95 duration-300">
          <img 
            src="/zax-hor-v3.png" 
            alt="Zax Logo" 
            className="h-16 md:h-20 w-auto object-contain" 
          />
        </Link>

        {/* DESKTOP LINKS - Changed text color to zax-green and increased tracking */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="group relative text-[15px] font-black uppercase tracking-[0.4em] text-zax-green transition-all"
            >
              {link.name}
              {/* Added a subtle underline that appears on hover */}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-zax-green transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          >
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-zax-green text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link href="/account">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-zax-green bg-[#BEE7DC] px-4 py-2 rounded-full cursor-pointer hover:bg-zax-green hover:text-white transition-colors border border-zax-green/20">
                    Hi, {user.user_metadata.full_name?.split(' ')[0] || 'Partner'}
                  </span>
                </Link>
                <button onClick={handleSignOut} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="text-sm font-black uppercase tracking-widest text-zax-green border-2 border-zax-green px-6 py-2 rounded-xl hover:bg-zax-green hover:text-white transition-all cursor-pointer"
              >
                Login
              </button>
            )}
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-[110] cursor-pointer"
          >
            <div className={`w-6 h-0.5 bg-zax-dark transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-zax-dark transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-zax-dark transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`fixed inset-0 bg-white z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-[0.2em] text-zax-green"
            >
              {link.name}
            </Link>
          ))}
          <hr className="w-12 border-zax-green border-2" />
          {user ? (
            <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black uppercase text-zax-green">
              Account
            </Link>
          ) : (
            <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="text-xl font-black uppercase text-zax-green">
              Login
            </button>
          )}
        </div>
      </nav>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CartDrawer />
    </>
  );
}