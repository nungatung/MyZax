'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-zax-dark/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />

      {/* Side Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-black text-zax-dark uppercase tracking-tight">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-zax-dark font-bold cursor-pointer">CLOSE ✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 font-bold">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 border border-gray-100">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase">{item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition cursor-pointer">✕</button>
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Subtotal</span>
            <span className="text-3xl font-black text-zax-dark">${cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-zax-green text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zax-dark transition-all shadow-xl active:scale-95 cursor-pointer">
            Checkout with Stripe
          </button>
          <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">Taxes and shipping calculated at checkout</p>
        </div>
      </div>
    </div>
  );
}