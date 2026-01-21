'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState(''); // New state
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLoginView) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Login Error: " + error.message);
      else onClose();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
            business_name: businessName // Passed as optional metadata
          }
        }
      });
      if (error) {
        alert("Signup Error: " + error.message);
      } else {
        alert("Account created! Check your email for a verification link.");
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-zax-dark/40 backdrop-blur-sm" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/20">
        
        {/* TOP CENTER LOGO ACCENT */}
        <div className="flex justify-center mb-6">
          <div className="w-42 h-42 bg-[#BEE7DC] rounded-full flex items-center justify-center">
            <img src="/zax-logo.png" alt="Zax" className="w-26 h-auto" />
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              {isLoginView ? 'Welcome Back' : 'Join Zax'}
            </h2>
            <p className="text-gray-500 text-sm font-medium mt-1">
              {isLoginView ? 'Access your partner account' : 'Register for wholesale supplies'}
            </p>
          </div>
          
          {!isLoginView && (
            <>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-4 text-zax-dark bg-gray-50 rounded-2xl border border-gray-500 focus:border-zax-green outline-none transition-all" 
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {/* BUSINESS NAME FIELD (Optional) */}
              <input 
                type="text" 
                placeholder="Business Name (Optional)" 
                className="w-full p-4 text-zax-dark bg-gray-50 rounded-2xl border border-gray-500 focus:border-zax-green outline-none transition-all" 
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </>
          )}
          
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-4 text-zax-dark bg-gray-50 rounded-2xl border border-gray-500 focus:border-zax-green outline-none transition-all" 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 text-zax-dark bg-gray-50 rounded-2xl border border-gray-500 focus:border-zax-green outline-none transition-all" 
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-zax-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zax-green transition-all cursor-pointer shadow-lg active:scale-95 disabled:bg-gray-300 mt-2"
          >
            {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <button 
          onClick={() => setIsLoginView(!isLoginView)} 
          className="w-full mt-6 text-sm font-bold text-zax-green cursor-pointer hover:underline"
        >
          {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-gray-300 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}