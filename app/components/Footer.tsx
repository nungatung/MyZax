'use client';
import React from 'react';

export default function Footer() {
    return (
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
          <div className="flex justify-center mt-12 overflow-hidden">
            {/* FIX: Added 'shrink-0' to prevent compression and 'aspect-square' to force 1:1.
                Reduced width slightly for 'md' (iPad) screens to ensure it fits the 3-column grid.
            */}
            <div className="w-[220px] h-[220px] md:w-[200px] md:h-[200px] lg:w-[280px] lg:h-[280px] bg-[#BEE7DC] rounded-full flex items-center justify-center shrink-0 aspect-square shadow-lg">
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
    );
}