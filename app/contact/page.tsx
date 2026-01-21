'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setIsVisible(true), 50);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-zax-green font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Direct Support
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-zax-dark tracking-tighter leading-none mb-6">
              How can we <span className="text-zax-green">help?</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
              Whether you're looking to place a bulk order or need a custom logistics solution, our team is ready to move when you are.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTACT GRID --- */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* FORM SIDE */}
          <div className={`bg-gray-50 p-10 md:p-16 rounded-[40px] border border-gray-100 transition-all duration-1000 delay-150 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-2xl font-black text-zax-dark uppercase tracking-tight mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full text-zax-dark bg-white border-none rounded-2xl p-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-zax-green outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                  <input type="email" placeholder="john@business.com" className="w-full text-zax-dark bg-white border-none rounded-2xl p-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-zax-green outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Subject</label>
                <select className="w-full bg-white text-gray-500 border-none rounded-2xl p-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-zax-green outline-none appearance-none transition-all cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Bulk Order Request</option>
                  <option>Shipping & Logistics</option>
                  <option>Account Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Your Message</label>
                <textarea rows={5} placeholder="How can we assist you today?" className="w-full bg-white text-zax-dark border-none rounded-2xl p-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-zax-green outline-none transition-all resize-none"></textarea>
              </div>

              <button className="w-full bg-zax-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zax-green transition-all shadow-xl active:scale-95 cursor-pointer">
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO SIDE */}
        <div className={`space-y-8 transition-all duration-1000 delay-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        
        <div className="grid sm:grid-cols-2 gap-6">
            {/* Phone Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:border-zax-green transition-colors group">
            <div className="w-22 h-22 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2.5">
                <img 
                src="/phone.png" 
                alt="Call Us"
                className="w-full h-full object-contain"
                />
            </div>
            <h3 className="font-black text-gray-500 uppercase tracking-widest text-xs mb-2">Call Us</h3>
            <p className="text-gray-500 font-bold text-sm">+1 (555) 000-0000</p>
            <p className="text-gray-400 text-[11px] uppercase font-black mt-1">Mon-Fri: 9am - 5pm</p>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:border-zax-green transition-colors group">
            <div className="w-22 h-22 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-2.5">
                <img 
                src="/email.png" 
                alt="Email Us"
                className="w-full h-full object-contain"
                />
            </div>
            <h3 className="font-black text-gray-500 uppercase tracking-widest text-xs mb-2">Email Us</h3>
            <p className="text-gray-500 font-bold text-sm">info@myzax.ca</p>
            <p className="text-gray-400 text-[11px] uppercase font-black mt-1">Speedy Response</p>
            </div>
        </div>

        <div className="bg-zax-dark p-10 rounded-[32px] relative overflow-hidden group">
            <div className="relative z-10">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-4">Corporate Office</h3>
            <p className="text-white/70 font-medium leading-relaxed max-w-[200px]">
                123 Reliable Way<br />
                Warehouse District<br />
                Supply City, ST 12345
            </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-zax-green/20 rounded-full blur-3xl group-hover:bg-zax-green/40 transition-all"></div>
        </div>
        

            <div className="p-8 border-2 border-dashed border-gray-100 rounded-[32px]">
                <h3 className="font-black uppercase tracking-widest text-xs mb-4 text-gray-400">Common Questions</h3>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm font-bold text-gray-500 cursor-pointer hover:text-zax-green transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-zax-green"></span>
                        How do I track my wholesale order?
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-gray-500 cursor-pointer hover:text-zax-green transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-zax-green"></span>
                        Do you offer custom branded packaging?
                    </li>
                </ul>
            </div>

          </div>
        </div>
      </section>
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