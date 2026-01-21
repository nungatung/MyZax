'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal from '../components/LoginModal';


export default function AboutPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-zax-green font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Behind the Brand
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-zax-dark tracking-tighter leading-[0.9] mb-8">
              The Backbone of Your <span className="text-zax-green">Business.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
              At Zax Reliable Services, we don't just sell packaging. We provide the peace of mind that allows your kitchen, your cafe, and your catering business to run without a hitch.
            </p>
            <div className="flex gap-4">
              <Link href="/shop" className="bg-zax-dark text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zax-green transition-all shadow-xl">
                Explore Supplies
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gray-100 rounded-[40px] aspect-[4/5] overflow-hidden relative z-10">
              <img 
                src="/woman-box.png" 
                alt="Modern Restaurant Supplies" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#BEE7DC] rounded-full -z-0 opacity-50 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Builds immediate trust) --- */}
      <section className="bg-zax-dark py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-5xl font-black text-white mb-2">10k+</p>
            <p className="text-zax-green font-black uppercase tracking-widest text-[10px]">Products Shipped</p>
          </div>
          <div>
            <p className="text-5xl font-black text-white mb-2">500+</p>
            <p className="text-zax-green font-black uppercase tracking-widest text-[10px]">Happy Partners</p>
          </div>
          <div>
            <p className="text-5xl font-black text-white mb-2">24h</p>
            <p className="text-zax-green font-black uppercase tracking-widest text-[10px]">Average Response</p>
          </div>
          <div>
            <p className="text-5xl font-black text-white mb-2">100%</p>
            <p className="text-zax-green font-black uppercase tracking-widest text-[10px]">Reliability Rate</p>
          </div>
        </div>
      </section>

      {/* --- OUR MISSION SECTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-zax-dark tracking-tighter mb-8 italic">
            "Your business depends on the details. We make sure those details are perfect."
          </h2>
          <div className="w-20 h-1 bg-zax-green mx-auto mb-12"></div>
          <p className="text-lg text-gray-500 leading-relaxed font-medium">
            Founded on the principle of absolute reliability, Zax Reliable Services started as a small operation with one goal: to eliminate the supply-chain headaches that plague the hospitality industry. Today, we serve businesses across the region, providing premium disposables, kitchen essentials, and wholesale solutions that never cut corners.
          </p>
        </div>
      </section>

        {/* --- THREE CORE PILLARS --- */}
        <section className="py-24 bg-gray-50 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                {[
                { 
                    title: "Wholesale Value", 
                    desc: "By cutting out the middleman, we pass direct savings onto your bottom line.", 
                    icon: "/savings.png" // Update these paths to match your filenames
                },
                { 
                    title: "Next-Day Mindset", 
                    desc: "Supplies when you need them, not weeks later. Our logistics are built for speed.", 
                    icon: "/on-time.png" 
                },
                { 
                    title: "Partner Support", 
                    desc: "You aren't just a client. You're a partner. We grow when your business grows.", 
                    icon: "/partner.png" 
                }
                ].map((pillar, i) => (
                <div key={i} className="bg-white p-12 rounded-[32px] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                    {/* Icon Container */}
                    <div className="w-18 h-18 mb-8 flex items-center justify-center">
                    <img 
                        src={pillar.icon} 
                        alt={pillar.title} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    </div>
                    
                    <h3 className="text-xl font-black text-zax-dark uppercase tracking-widest mb-4">
                    {pillar.title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                    {pillar.desc}
                    </p>
                </div>
                ))}
            </div>
        </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-[#BEE7DC] p-16 rounded-[60px] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-zax-dark tracking-tighter mb-6">
              Ready to scale your supply chain?
            </h2>
            <p className="text-lg text-zax-dark/70 font-bold mb-10">
              Join the hundreds of businesses that trust Zax for their daily essentials.
            </p>
            
            {/* 4. Change Link to a Button and add onClick */}
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-zax-dark text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all inline-block shadow-2xl cursor-pointer"
            >
              Open Your Account
            </button>
          </div>

          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full -ml-10 -mb-10"></div>
        </div>
      </section>

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
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </main>
  );
}