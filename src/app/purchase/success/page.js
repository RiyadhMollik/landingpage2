"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const transactionId = searchParams.get("trxID");

  useEffect(() => {
    if (transactionId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders?transactionId=${transactionId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setOrderDetails(data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto bg-neutral-800/50 backdrop-blur rounded-2xl shadow-glow border border-primary-500/20 overflow-hidden p-0">
                    <div className="flex flex-col items-center py-8 px-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-success-900/30 border border-success-500/50 mb-4 shadow-glow">
              <svg
                className="w-12 h-12 text-success-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">
              সফলভাবে ক্রয় সম্পন্ন!
            </h1>
            <p className="text-neutral-300 mb-6 text-center">
              আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে
            </p>

            {/* Product Info */}
            <div className="w-full bg-primary-900/20 border border-primary-500/30 rounded-lg p-4 mb-4 flex flex-col items-center">
              <div className="text-lg font-semibold text-primary-300 mb-1">
                আপনার প্রোডাক্ট
              </div>
              <div className="text-sm text-neutral-200 mb-1">
                স্ক্যান হওয়া ২ লাখ ৫০ হাজার ম্যাপ
              </div>
              {/* <div className="text-xs text-gray-500">ডিজিটাল প্রোডাক্ট</div> */}
            </div>

            {/* Download Section */}
            <div className="w-full mb-4">
              <div className="font-semibold text-center mb-2 text-neutral-100">
                আপনার ম্যাপ ডাউনলোড করুন
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  readOnly
                  value="https://drive.google.com/drive/folders/1T1GWNPpszx44Mj42u7tLXaP3ac3t4yRb?usp=drive_link"
                  className="flex-1 px-3 py-2 rounded-l-md border border-neutral-600 bg-neutral-800 text-neutral-200 text-sm"
                  style={{ minWidth: 0 }}
                  id="drive-link-input"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://drive.google.com/drive/folders/1T1GWNPpszx44Mj42u7tLXaP3ac3t4yRb?usp=drive_link"
                    );
                  }}
                  className="bg-gradient-accent text-white px-4 py-2 rounded-r-md font-bold text-sm transition shadow-glow-pink hover:shadow-glow"
                >
                  কপি করুন
                </button>
              </div>
              <a
                href="https://drive.google.com/drive/folders/1T1GWNPpszx44Mj42u7tLXaP3ac3t4yRb?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-primary text-white font-bold py-2 rounded-md text-center transition mb-2 shadow-glow hover:shadow-glow-pink"
              >
                ফাইল ওপেন করুন
              </a>
            </div>

            {/* Important Notice */}
                        {/* Important Notice
            <div className="w-full bg-warning-900/20 border-l-4 border-warning-400 text-warning-200 p-4 rounded-md mb-4 text-sm">
              <div className="font-bold mb-1">গুরুত্বপূর্ণ নির্দেশনা</div>
              ফাইলটি ডাউনলোড করতে হলে প্রথমে উপরের বাটনে ক্লিক - করে ফাইলটি ওপেন করুন। যদি কোনো সমস্যা হয় তাহলে আমাদের সাথে যোগাযোগ করুন। অনুগ্রহ করে অর্ডার আইডি/লেনদেন আইডি এবং মোবাইল নম্বর আমাদেরকে জানান।
              <div className="text-xs text-neutral-400 mt-2">প্রয়োজনে নোটিশ আপডেট হতে পারে</div>
            </div> */}

            {/* Order Details */}
            {transactionId && (
              <div className="w-full bg-neutral-800/50 border border-neutral-700 rounded-md p-3 mb-2 text-xs text-neutral-300">
                <span className="font-semibold">লেনদেন আইডি:</span> {transactionId}
              </div>
            )}
            {loading ? (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : orderDetails ? (
              <div className="w-full text-left border border-neutral-700 bg-neutral-800/30 rounded-md p-3 mb-2 text-xs text-neutral-300">
                <div>
                  <span className="font-semibold">নাম:</span> {orderDetails.customerName}
                </div>
                <div>
                  <span className="font-semibold">ঠিকানা:</span> {orderDetails.customerAddress}
                </div>
                <div>
                  <span className="font-semibold">মোবাইল:</span> {orderDetails.customerMobile}
                </div>
                <div>
                  <span className="font-semibold">মোট মূল্য:</span> {orderDetails.amount}৳
                </div>
              </div>
            ) : null}

            {/* Order Details */}
            {transactionId && (
              <div className="w-full bg-gray-50 rounded-md p-3 mb-2 text-xs text-gray-700">
                <span className="font-semibold">লেনদেন আইডি:</span> {transactionId}
              </div>
            )}
            {loading ? (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : orderDetails ? (
              <div className="w-full text-left border rounded-md p-3 mb-2 text-xs text-gray-700">
                <div>
                  <span className="font-semibold">নাম:</span> {orderDetails.customerName}
                </div>
                <div>
                  <span className="font-semibold">ঠিকানা:</span> {orderDetails.customerAddress}
                </div>
                <div>
                  <span className="font-semibold">মোবাইল:</span> {orderDetails.customerMobile}
                </div>
                <div>
                  <span className="font-semibold">মোট মূল্য:</span> {orderDetails.amount}৳
                </div>
              </div>
            ) : null}

            {/* Contact Section */}
            <div className="w-full flex flex-col items-center mt-4">
              <div className="text-xs text-neutral-400 mb-2">
                সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন
              </div>
              <div className="flex gap-2 w-full">
                <a
                  href="https://wa.me/8801540156124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-accent text-white font-bold py-2 rounded-md text-center transition flex items-center justify-center gap-2 shadow-glow-pink hover:shadow-glow"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.8a1 1 0 0 0 1.22 1.22l4.8-1.32A12 12 0 1 0 20.52 3.48zm-8.52 17a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.72.9-.88 1.08-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.09 9.09 0 0 1-1.68-2.08c-.18-.31 0-.48.13-.62.13-.13.28-.34.42-.51a2.13 2.13 0 0 0 .28-.47.56.56 0 0 0 0-.54c-.07-.14-.62-1.5-.85-2.06s-.45-.45-.62-.46h-.53a1.06 1.06 0 0 0-.77.36 3.23 3.23 0 0 0-1 2.38 5.63 5.63 0 0 0 1.2 3.09 13.09 13.09 0 0 0 4.1 3.91 11.56 11.56 0 0 0 1.13.42 2.7 2.7 0 0 0 1.24.08 2.62 2.62 0 0 0 1.7-1.19c.23-.34.23-.62.16-.76s-.25-.18-.53-.32z"/>
                  </svg>
                  WhatsApp
                </a>
                {/* <a
                  href="tel:+8801338022478"
                  className="flex-1 bg-gradient-primary text-white font-bold py-2 rounded-md text-center transition flex items-center justify-center gap-2 shadow-glow hover:shadow-glow-pink"
                >
                  কল করুন
                </a> */}
              </div>
              {/* <div className="text-xs text-neutral-300 mt-2">
                <span className="font-semibold">+880 1338-022478</span>
              </div> */}
            </div>

            <button
              onClick={() => router.push("/")}
              className="mt-6 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-bold py-2 px-6 rounded-md transition-colors duration-300"
            >
              হোম পেজে ফিরে যান
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
