'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingCard() {
  const [product, setProduct] = useState({
    name: 'স্ক্যান হয়ে সার্ভারে আসা সব মৌজা ম্যাপ',
    originalPrice: 15000,
    currentPrice: 399,
    discount: 97,
    description: 'স্ক্যান হয়ে সার্ভারে আসা সব মৌজা ম্যাপ',
    features: [
      { title: 'সম্পূর্ণ বাংলাদেশের মৌজা ম্যাপ', icon: 'map' },
      { title: 'উচ্চ রেজুলেশন', icon: 'eye' },
      { title: 'সহজে ব্যবহারযোগ্য', icon: 'device' },
      { title: 'সরাসরি ডাউনলোড', icon: 'download' },
      { title: '২৪/৭ সাপোর্ট', icon: 'support' }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(product.features, 'product.features');

  useEffect(() => {
    async function fetchProduct() {
      try {
        console.log('Fetching product from client side...');
        const response = await fetch('/api/products');

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API response not OK:', response.status, errorText);
          throw new Error(`Failed to fetch product: ${response.status} ${errorText}`);
        }

        const products = await response.json();
        console.log('Product fetched successfully:', products);

        // Always use the first product
        if (products && products.length > 0) {
          setProduct(products[0]);
        } else {
          console.log('No product returned, using default data');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, []);

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'map':
        return (
          <svg className="h-5 w-5 text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
        );
      case 'eye':
        return (
          <svg className="h-5 w-5 text-accent-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        );
      case 'device':
        return (
          <svg className="h-5 w-5 text-primary-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        );
      case 'download':
        return (
          <svg className="h-5 w-5 text-success-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
        );
      case 'infinity':
        return (
          <svg className="h-5 w-5 text-accent-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
          </svg>
        );
      case 'support':
        return (
          <svg className="h-5 w-5 text-warning-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-success-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
    }
  };

  return (
    <section className="py-16 px-4 bg-neutral-900 text-neutral-100 font-noto-bengali" id="pricing">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">আমাদের মূল্য</h2>
        <p className="text-lg text-neutral-300 mb-12 max-w-2xl mx-auto">সর্বোচ্চ মানের ডিজিটাল মৌজা ম্যাপ সর্বনিম্ন মূল্যে</p>

        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : error ? (
          <p className="text-red-400">Error: {error}</p>
        ) : (
          <div className="max-w-md mx-auto rounded-2xl overflow-hidden">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-primary rounded-2xl blur opacity-75 shadow-glow"></div>

              <div className="relative bg-neutral-800/50 backdrop-blur p-8 rounded-2xl border border-primary-500/30">
                <div className="absolute top-0 right-0 bg-gradient-accent text-white text-sm font-bold px-4 py-1 rounded-bl-lg shadow-glow-pink">
                  99% ছাড়
                </div>

                <h3 className="text-2xl font-bold text-center mb-4 text-white">{product.name}</h3>

                <div className="text-center mb-6">
                  <span className="text-lg line-through text-neutral-400 mr-2">15000৳</span>
                  <span className="text-5xl font-bold text-gradient-primary">{product.price}৳</span>
                </div>

                <div className="bg-neutral-800/30 border border-primary-500/20 p-4 rounded-lg mb-6">
                  <p className="text-center text-neutral-100">{product.description}</p>
                </div>

                <ul className="mb-8 space-y-3">
                  {features && features.length > 0 ? (
                    features.map((feature, index) => {
                      console.log('Rendering feature:', feature.title);
                      return (
                        <li
                          key={index}
                          className="flex items-center py-2 border-b border-neutral-700/50 last:border-0"
                        >
                          {renderIcon(feature.icon)}
                          <span className="text-neutral-100">
                            {feature.title || 'Feature not available'}
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <li className="flex items-center py-2 border-b border-neutral-700/50">
                      {renderIcon('default')}
                      <span className="text-neutral-100">সম্পূর্ণ বাংলাদেশের মৌজা ম্যাপ</span>
                    </li>
                  )}
                </ul>

                <div className="space-y-4">
                  <Link href="/purchase" className="block w-full bg-gradient-primary text-white text-center py-4 rounded-lg font-bold text-lg shadow-glow hover:shadow-glow-pink transform hover:scale-105 transition-all duration-300">
                    মাত্র {product.currentPrice}৳ এখনই কিনুন
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}