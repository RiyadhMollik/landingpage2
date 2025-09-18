'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PurchasePage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    email: ''
  });
  const [submitting, setSubmitting] = useState(false);
  // Removed gateway selection - using EPS only

  useEffect(() => {
    // Fetch the single product
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const products = await response.json();
      // Always use the first product
      setProduct(products[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product information');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // First create the order - always using product id 1
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerAddress: 'unknown',
          customerMobile: formData.mobile,
          customerEmail: formData.email,
          productId: 1, // Always use product id 1
          paymentMethod: 'eps', // Only EPS payment available
          productName: 'সারা বাংলাদেশের মৌজা ম্যাপ'
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Check if we need to redirect to payment gateway
      if (orderData.redirectToBkash || orderData.redirectToPayment) {
        // Only EPS payment gateway is available
        const paymentEndpoint = '/api/payment/eps';

        // Initiate payment with selected gateway
        const paymentResponse = await fetch(paymentEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: orderData.id,
            customerData: {
              name: formData.name,
              email: formData.email,
              phone: formData.mobile,
              address: formData.address || 'Dhaka, Bangladesh'
            }
          })
        });

        if (!paymentResponse.ok) {
          throw new Error('Failed to initiate payment');
        }

        const paymentData = await paymentResponse.json();

        // Redirect to EPS payment gateway
        window.location.href = paymentData.redirectURL;
      }

    } catch (error) {
      console.error('Error processing order:', error);
      setError('Failed to process your order. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto bg-neutral-800/50 backdrop-blur rounded-lg shadow-glow border border-primary-500/20 overflow-hidden">
          <div className="md:flex">
            {/* Product Information Section */}
            <div className="md:w-1/3 bg-neutral-800/30 border-r border-primary-500/20 p-6">
              <h2 className="text-2xl font-bold text-gradient-primary mb-4">পণ্যসমূহ</h2>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-10 bg-neutral-700 rounded"></div>
                  <div className="h-20 bg-neutral-700 rounded"></div>
                  <div className="h-20 bg-neutral-700 rounded"></div>
                </div>
              ) : error ? (
                <div className="bg-red-900/20 border border-red-400/50 text-red-300 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              ) : product ? (
                <>
                  <div className="mb-6 border-b border-neutral-700/50 pb-4">
                    <div className="flex items-start">
                      <div className="bg-primary-900/30 border border-primary-500/50 rounded-md p-2 mr-3">
                        <svg className="w-8 h-8 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-100">{product.name} × ১</h3>
                        <p className="text-accent-400 text-sm font-medium">{product.price}৳</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-300">সাবটোটাল</span>
                      <span className="font-medium text-neutral-100">{product.price}৳</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">ডেলিভারি চার্জ</span>
                      <span className="font-medium text-neutral-100">০.০০৳</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-neutral-700/50">
                      <span className="text-neutral-100 font-bold">মোট</span>
                      <span className="font-bold text-accent-400">{product.price}৳</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-neutral-400">No products available</p>
              )}
            </div>

            {/* Order Form Section */}
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold text-gradient-primary mb-6">ক্রয়ের জন্য আপনার তথ্য দিন</h2>

              {error && (
                <div className="bg-red-900/20 border border-red-400/50 text-red-300 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-neutral-200 font-medium mb-2">
                    আপনার নাম লিখুন <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="সম্পূর্ণ নাম লিখুন"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-neutral-200 font-medium mb-2">
                    আপনার মোবাইল নাম্বর লিখুন <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="১১ ডিজিটের মোবাইল নাম্বর লিখুন"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-neutral-200 font-medium mb-2">
                    আপনার ইমেইল লিখুন <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="আপনি যে মেইলে এসএমএস নিবেন সেটি দিন"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                {/* EPS Payment - Only Option Available */}
                <div>
                  <label className="block text-neutral-200 font-medium mb-4">
                    পেমেন্ট মেথড <span className="text-red-400">*</span>
                  </label>
                  <div className="border border-success-500/50 bg-success-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                        <span className="text-white font-bold text-xs">EPS</span>
                      </div>
                      <div>
                        <div className="font-medium text-neutral-100">
                          EPS পেমেন্ট গেটওয়ে
                        </div>
                        <p className="text-sm text-neutral-300">ব্যাংক কার্ড, মোবাইল ব্যাংকিং ও অন্যান্য পেমেন্ট মেথড</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full font-bold py-4 px-4 rounded-md transition-all duration-300 flex justify-center items-center bg-gradient-primary text-white shadow-glow hover:shadow-glow-pink transform hover:scale-105 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      প্রসেসিং...
                    </>
                  ) : (
                    <>
                      EPS পেমেন্টের মাধ্যমে পারচেজ সম্পন্ন করুন
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}