'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { useCart } from '@/context/CartContext';
import Loading from '@/app/components/Loading';
import Footer from '@/app/components/Footer';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [related, setRelated] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isVisible, setIsVisible] = useState(false); // 1. Added visibility state
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProductData() {
            setLoading(true);
            const { data: mainProduct } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (mainProduct) {
                setProduct(mainProduct);
                const { data: relatedData } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category', mainProduct.category)
                    .neq('id', id)
                    .limit(4);

                setRelated(relatedData || []);
            }
            setLoading(false);

            // 2. Trigger entrance after data is loaded
            setTimeout(() => setIsVisible(true), 100);
        }
        fetchProductData();
    }, [id]);

    if (loading) return <Loading />;
    if (!product) return <div className="min-h-screen flex items-center justify-center font-bold">Product not found.</div>;

    return (
        <main className="min-h-screen font-sans text-gray-800 bg-white">
            <Navbar />
            

            {/* Breadcrumbs */}
            <nav className="max-w-7xl mx-auto px-6 pt-40 md:pt-52 pb-8 text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <Link href="/shop" className="hover:text-zax-green transition-colors">Shop</Link>
                <span className="mx-3 text-gray-200">/</span>
                <span className="text-zax-dark">{product.category}</span>
            </nav>

            {/* 3. Wrap Content in a transition container */}
            <div className={`max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24 pb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>

                {/* LEFT: Image Gallery */}
                <div className="relative group">
                    <div className="bg-gray-50 rounded-[40px] aspect-square flex items-center justify-center p-12 border border-gray-100 shadow-inner overflow-hidden">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div className="flex flex-col justify-center">
                    <div className="mb-8">
                        <span className="bg-[#BEE7DC] text-zax-dark px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest">
                            {product.category}
                        </span>
                        <h1 className="text-4xl lg:text-4xl font-black text-gray-900 mt-6 leading-[1.1]">
                            {product.name}
                        </h1>
                        <p className="text-gray-400 font-bold mt-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zax-green"></span>
                            {product.unit || "Bulk Packaging"}
                        </p>
                    </div>

                    {product.size_info && (
                        <p className="font-black text-lg -mt-1 mb-12 ">
                            {product.size_info}
                        </p>
                    )}

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-gray-100">
                        {['Wholesale Price', 'Just in time delivery', 'Exceptional customer service', 'Excellent product quality'].map((text) => (
                            <div key={text} className="flex items-center gap-3 text-[12px] font-black text-gray-400 uppercase tracking-widest">
                                <span className="text-zax-green text-lg">✓</span> {text}
                            </div>
                        ))}
                    </div>

                    {/* --- PRICE AND QUANTITY BOX --- */}
                    <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-5xl font-black text-zax-green tracking-tighter">
                                ${Number(product.price).toFixed(2)}
                            </span>
                            <div className="text-right">
                                {product.stock_level > 10 ? (
                                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> In Stock
                                    </span>
                                ) : product.stock_level > 0 ? (
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">
                                        Low Stock: {product.stock_level} units left
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                                        Out of Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className={`flex items-center justify-center border-2 border-gray-200 rounded-2xl bg-white h-16 w-full sm:w-auto ${product.stock_level <= 0 ? 'opacity-50 grayscale' : ''}`}>
                                <button
                                    disabled={product.stock_level <= 0}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-6 h-full hover:text-zax-green transition font-black text-xl cursor-pointer disabled:cursor-not-allowed"
                                >-</button>
                                <span className="w-12 text-center font-black text-lg">{product.stock_level <= 0 ? 0 : quantity}</span>
                                <button
                                    disabled={product.stock_level <= 0}
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-6 h-full hover:text-zax-green transition font-black text-xl cursor-pointer disabled:cursor-not-allowed"
                                >+</button>
                            </div>

                            <button
                                disabled={product.stock_level <= 0}
                                className={`w-full h-16 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-[0.98] cursor-pointer
                                    ${product.stock_level > 0 ? "bg-zax-dark text-white hover:bg-zax-green" : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"}`}
                                onClick={() => addToCart(product, quantity)}
                            >
                                {product.stock_level > 0 ? 'Add to Cart' : 'Currently Unavailable'}
                            </button>
                        </div>

                        {/* SMALLER QUANTITIES NUDGE */}
                        <div className="mt-8 pt-8 border-t border-gray-200/60">
                            <div className="flex items-start gap-4">
                                <div className="bg-zax-green/10 p-2.5 rounded-xl">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00703C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3v8.5Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-zax-dark">Looking for smaller quantities?</h4>
                                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                                        We offer custom break pack options to suit all your needs.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-zax-green mt-3 hover:gap-2 transition-all"
                                    >
                                        Get a Custom Quote <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RECOMMENDED ITEMS SECTION --- */}
            {related.length > 0 && (
                <section className="bg-gray-50 py-24 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <p className="text-zax-green font-black uppercase tracking-[0.3em] text-[10px] mb-3">You might also need</p>
                                <h2 className="text-4xl font-black text-gray-900">Similar Items</h2>
                            </div>
                            <Link href="/shop" className="hidden sm:block text-xs font-black uppercase tracking-widest pb-1 border-b-2 border-zax-green hover:text-zax-green transition">
                                View All
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {related.map((item) => (
                                <Link href={`/shop/${item.id}`} key={item.id} className="group">
                                    <div className="bg-white rounded-[32px] p-8 aspect-square mb-6 flex items-center justify-center border border-gray-100 group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-zax-green transition-colors text-lg line-clamp-1">
                                        {item.name}
                                    </h3>
                                    <p className="text-zax-green font-black text-xl mt-2">
                                        ${Number(item.price).toFixed(2)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- FOOTER --- */}
            <Footer />
        </main>
    );
}