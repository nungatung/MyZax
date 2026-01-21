import React from 'react';
import Image from 'next/image';
import MostPopular from './components/MostPopular';
import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen font-sans text-gray-800">

      {/* --- NAVBAR --- */}
      <Navbar/>

      {/* --- PRODUCT MARQUEE HERO --- */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-white flex items-center">
        
        {/* 1. Background Scrolling Marquee (Faded) */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-12 opacity-30 pointer-events-none">
          
          {/* Row 1: Images 1-7 (Moving Left) */}
          <div className="flex w-[200%] gap-12 animate-marquee">
            {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((num, i) => (
              <img 
                key={i} 
                src={`/${num}.png`} 
                className="h-32 md:h-44 w-auto object-contain " 
                alt="Zax Product" 
              />
            ))}
          </div>

          {/* Row 2: Images 8-14 (Moving Right) */}
          <div className="flex w-[200%] gap-12 animate-marquee-reverse">
            {[8, 9, 10, 11, 12, 13, 14, 8, 9, 10, 11, 12, 13, 14].map((num, i) => (
              <img 
                key={i} 
                src={`/${num}.png`} 
                className="h-32 md:h-44 w-auto object-contain" 
                alt="Zax Product" 
              />
            ))}
          </div>
        </div>

        {/* 2. Content Overlay (The text stays clear and readable) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Headline */}
          <div className="drop-shadow-sm">
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-gray-900 tracking-tighter">
              Reliable <br />
              <span className="text-zax-green">Supplies</span> <br />
              & Services
            </h1>
          </div>

          {/* Right Column: About Brief Card */}
          <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-100 relative opacity-100">
            
            <h2 className="text-2xl font-black mb-4 text-gray-900">About Zax Reliable Services</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              We are your dedicated partner for premium food service packaging 
              and janitorial essentials. From high-quality takeout containers to 
              durable paper products, we deliver the reliability your business deserves.
            </p>
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <MostPopular/>
      <Testimonials/>

      {/* --- BRANDING & FEATURES SECTION (Clean White Version) --- */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE: "Why Zax Products?" List */}
          <div className="space-y-10">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                Our Clients Become Our Partners
              </p>
              <h2 className="text-5xl font-black text-gray-900">
                Why Zax Products?
              </h2>
            </div>

            <div className="space-y-12">
              {/* Feature 1: Just In Time Services */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-24 h-24 relative">
                  {/* Replace /icon-jit.png with your actual file name */}
                  <img src="/delivery.png" alt="Just In Time Delivery Icon" className="object-contain w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Just In Time Services</h3>
                  <p className="text-gray-500 leading-relaxed max-w-md">
                    Our products arrive exactly when you need them and Zax consistently beats
                    competitor pricing without compromising on quality.
                  </p>
                </div>
              </div>

              {/* Feature 2: The Zax Model */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-24 h-24 relative">
                  {/* Replace /icon-model.png with your actual file name */}
                  <img src="/people.png" alt="Zax Model Icon" className="object-contain w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">The Zax Model</h3>
                  <p className="text-gray-500 leading-relaxed max-w-md">
                    Our client focused solutions are based on going beyond the extra mile for our partners.
                  </p>
                </div>
              </div>

              {/* Feature 3: Zax Support Services */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-24 h-24 relative">
                  {/* Replace /icon-support.png with your actual file name */}
                  <img src="/support1.png" alt="Support Services Icon" className="object-contain w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Zax Support Services</h3>
                  <p className="text-gray-500 leading-relaxed max-w-md">
                    Zax brings unscripted project specific solutions to all of our technical and non-technical services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Large Circular Logo */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Circle color matches #BEE7DC from your screenshot */}
            <div className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] bg-[#BEE7DC] rounded-full flex items-center justify-center shadow-sm relative">
              <img
                src="/zax-logo.png"
                className="w-2/3 h-auto"
                alt="Zax Branding"
              />
            </div>
          </div>
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
    </main>
  );
}