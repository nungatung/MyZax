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
  const [isScrolled, setIsScrolled] = useState(false);

  const { cart, setIsCartOpen } = useCart();
  const itemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'Shop Zax', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* OUTER WRAPPER: Handles the centering and spacing from top */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 md:pt-6 pointer-events-none">
        
        {/* THE PILL: Reduced 'py' to allow the logo to expand vertically */}
        <nav className={`
          flex items-center justify-between px-6 md:px-10 pointer-events-auto transition-all duration-500 ease-out
          bg-zax-green/90 backdrop-blur-xl rounded-full 
          border-2 border-white/20 shadow-[0_20px_50px_rgba(0,112,60,0.3)]
          ${isScrolled ? 'w-[90%] md:w-[65%] py-1.5' : 'w-[95%] md:w-[85%] py-2 md:py-3'}
        `}>

          {/* LOGO: Significant height increase for better legibility */}
          <Link href="/" className="transition-transform hover:scale-105 active:scale-95 shrink-0">
            <img 
              src="/zax-hor-v3.png" 
              alt="Zax Logo" 
              className={`
                object-contain brightness-0 invert transition-all duration-500
                ${isScrolled ? 'h-14' : 'h-20 md:h-24'} 
              `} 
            />
          </Link>

          {/* NAV LINKS: Switched to white for readability on the green background */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[13px] font-black uppercase tracking-[0.3em] text-white hover:text-white/80 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* ACTIONS: Icons and buttons adjusted for the dark green background */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 group hover:scale-110 transition-all duration-300 cursor-pointer rounded-xl bg-white/10 hover:bg-white/20 border border-white/10"
              aria-label="View Cart"
            >
              {/* CUSTOM SHOPPING BAG SVG: Matches your 512x512 reference */}
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white transition-transform group-hover:-rotate-3"
              >
                <path 
                  d="M8 6V5C8 2.79086 9.79086 1 12 1C14.2091 1 16 2.79086 16 5V6M5 6H19C20.1046 6 21 6.89543 21 8V19C21 21.2091 19.2091 23 17 23H7C4.79086 23 3 21.2091 3 19V8C3 6.89543 3.89543 6 5 6Z" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>

              {/* NOTIFICATION BADGE: High-contrast circle */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-zax-green text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-zax-green shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <Link href="/account">
                <div className="w-9 h-9 rounded-full bg-zax-green border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-md">
                  {user.user_metadata.full_name?.charAt(0) || 'P'}
                </div>
              </Link>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="hidden md:block text-[13px] font-black uppercase tracking-widest text-white bg-zax-green px-7 py-2.5 rounded-full hover:bg-zax-dark transition-all cursor-pointer shadow-md"
              >
                Login
              </button>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all active:scale-95"
              aria-label="Toggle Menu"
            >
              {/* Bars are now white and slightly thicker (h-[3px]) for better visibility */}
              <div className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-[3px] bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU (White Zen Variation with Staggered Entrance) */}
      <div className={`fixed inset-0 bg-white z-[105] flex flex-col items-center justify-center transition-all duration-700 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'
      }`}>
        
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className={`text-[40rem] font-black text-gray-50 transition-all duration-1000 select-none ${isMobileMenuOpen ? 'opacity-[0.03] scale-100' : 'opacity-0 scale-90'}`}>
            Z
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-12">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`
                text-4xl font-black uppercase tracking-[0.2em] text-zax-dark hover:text-zax-green 
                transition-all duration-700 ease-out
                ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              // This is the magic: each link waits slightly longer than the previous one to appear
              style={{ transitionDelay: isMobileMenuOpen ? `${(index + 1) * 100}ms` : '0ms' }}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Login Button with its own stagger delay */}
          {!user && (
            <button 
              onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
              className={`
                mt-4 px-10 py-4 bg-zax-green text-white font-black uppercase tracking-widest rounded-full shadow-xl shadow-zax-green/20
                transition-all duration-700 ease-out
                ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: isMobileMenuOpen ? `${(navLinks.length + 1) * 100}ms` : '0ms' }}
            >
              Login
            </button>
          )}
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="absolute top-10 right-10 text-zax-green text-4xl p-2 hover:rotate-90 transition-transform duration-300"
        >
          ✕
        </button>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CartDrawer />
    </>
  );
}