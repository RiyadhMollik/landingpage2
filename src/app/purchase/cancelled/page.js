"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PaymentCancelledContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cancelMessage =
    searchParams.get("message") || "আপনি পেমেন্ট বাতিল করেছেন।";

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-neutral-800/50 backdrop-blur rounded-lg shadow-glow border border-primary-500/20 overflow-hidden p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning-900/30 border border-warning-500/50 mb-6 shadow-glow">
              <svg
                className="w-8 h-8 text-warning-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gradient-primary mb-4">
              পেমেন্ট বাতিল করা হয়েছে
            </h1>
            <p className="text-lg text-neutral-300 mb-8">{cancelMessage}</p>

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

export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <PaymentCancelledContent />
    </Suspense>
  );
}
