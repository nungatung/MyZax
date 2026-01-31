'use client';
import React from 'react';

const MOCK_REVIEWS = [
  { id: 1, name: "Feras", role: "Goldies Chicken Plus", text: "It's a lifesaver having a local supplier – Zax always comes through when I'm in a pinch!" },
  { id: 2, name: " Kevin", role: "Khal's Steakhouse & Lounge", text: "Professional, friendly and on time service."},
  { id: 3, name: "Bobby", role: "The Bourbon House Tex Mex Cantina", text: "They're all about prompt service and getting things done on time – couldn't ask for more!" },
  { id: 4, name: "Chris", role: "The Local House", text: "Zax's personal, hands-on service is a breath of fresh air in today's world – super refreshing!" },
  { id: 5, name: "Paul ", role: "Mighty Learners", text: "Zax is our go-to for paper products – they always come through with what we need, on time and at a great price. Helps us focus on the kiddos, not just the little cleanups and spills! 😊" },
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