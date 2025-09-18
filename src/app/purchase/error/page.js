"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Extract the actual error content into its own component
function PaymentErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorMessage =
    searchParams.get("message") ||
    "পেমেন্ট প্রক্রিয়াকরণে একটি সমস্যা হয়েছে।";

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-neutral-800/50 backdrop-blur rounded-lg shadow-glow border border-primary-500/20 overflow-hidden p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/30 border border-red-500/50 mb-6 shadow-glow">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gradient-primary mb-4">
              পেমেন্ট ব্যর্থ হয়েছে
            </h1>
            <p className="text-lg text-neutral-300 mb-8">{errorMessage}</p>

            <div className="mb-6 p-4 bg-neutral-800/30 border border-neutral-700 rounded-md">
              <p className="text-neutral-200">
                আপনি আবার চেষ্টা করতে পারেন অথবা অন্য পেমেন্ট পদ্ধতি ব্যবহার করতে পারেন।
              </p>
            </div>

            <div className="mt-6 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={() => router.push("/purchase")}
                className="w-full sm:w-auto bg-gradient-primary text-white font-bold py-3 px-6 rounded-md transition-all duration-300 shadow-glow hover:shadow-glow-pink transform hover:scale-105"
              >
                আবার চেষ্টা করুন
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full sm:w-auto bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-bold py-3 px-6 rounded-md transition-colors duration-300"
              >
                হোম পেজে ফিরে যান
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Main page component with Suspense
export default function PaymentErrorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <PaymentErrorContent />
    </Suspense>
  );
}
