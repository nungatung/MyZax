'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading'; // Ensure this matches your loading component path
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false); // 1. Added visibility state
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/'); 
      } else {
        setUser(session.user);
      }
      setLoading(false);
      
      // 2. Trigger the entrance animation after a tiny delay once loading is false
      setTimeout(() => setIsVisible(true), 100);
    }
    getProfile();
  }, [router]);

  // Use your new brand Loading component instead of text
  if (loading) return <Loading />;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar: Profile Card */}
          <div className={`lg:col-span-1 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-zax-green rounded-2xl mb-6 flex items-center justify-center text-3xl">
                👤
              </div>
              <h1 className="text-3xl font-black text-zax-dark tracking-tighter mb-1">
                {user?.user_metadata?.full_name || 'Partner'}
              </h1>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">
                {user?.email}
              </p>
              
              <div className="space-y-2">
                <button className="w-full text-left p-4 rounded-xl bg-gray-50 text-zax-dark font-black uppercase text-[10px] tracking-[0.2em] cursor-pointer">
                  Dashboard
                </button>
                <button className="w-full text-left p-4 rounded-xl text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-50 transition-colors cursor-pointer">
                  Order History
                </button>
                <button 
                  onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
                  className="w-full text-left p-4 rounded-xl text-red-400 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Content Area (Delayed slightly more for a staggered effect) */}
          <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 delay-150 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-zax-dark uppercase tracking-widest mb-6">Recent Activity</h2>
              <div className="border-2 border-dashed border-gray-100 rounded-2xl py-20 text-center">
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No recent orders found</p>
                <Link href="/shop" className="text-zax-green font-black text-xs uppercase mt-4 inline-block hover:underline">Start Shopping</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}