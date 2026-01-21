'use client';
import React from 'react';

const MOCK_REVIEWS = [
  { id: 1, name: "Maria Rodriguez", role: "Cafe Owner", text: "The Kraft boxes are incredibly sturdy. My customers love the eco-friendly look!" },
  { id: 2, name: "David Chen", role: "Restaurant Manager", text: "Fastest shipping I've found in the wholesale market. Zax is our go-to partner." },
  { id: 3, name: "Sarah Jenkins", role: "Event Planner", text: "The quality of the napkins and straws is consistent every single time. 5 stars!" },
  { id: 4, name: "Chef Mike", role: "Food Truck Owner", text: "Reliable service and great prices. It’s hard to find a supplier that actually cares." },
  { id: 5, name: "Alex Thompson", role: "Supply Chain Director", text: "Switching to Zax saved us 15% on our monthly packaging costs. Highly recommend." },
];

export default function Testimonials() {
  // We double the array to create the infinite loop effect
  const doubledReviews = [...MOCK_REVIEWS, ...MOCK_REVIEWS];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <p className="text-zax-green font-black uppercase tracking-[0.3em] text-[10px] mb-3">Our Reputation</p>
        <h2 className="text-4xl md:text-5xl font-black text-zax-dark tracking-tighter">What Our Partners Say</h2>
      </div>

      {/* The Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-12 px-4 gap-8 group-hover:pause">
          {doubledReviews.map((review, idx) => (
            <div 
              key={idx} 
              className="w-[350px] bg-gray-50 p-8 rounded-[32px] border border-gray-100 flex flex-col justify-between hover:border-zax-green transition-colors duration-500"
            >
              <div className="mb-6">
                <div className="flex text-zax-green mb-4 text-xl">★★★★★</div>
                <p className="text-gray-600 font-medium italic leading-relaxed whitespace-normal">
                  "{review.text}"
                </p>
              </div>
              <div>
                <p className="font-black text-zax-dark uppercase tracking-widest text-xs">{review.name}</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}