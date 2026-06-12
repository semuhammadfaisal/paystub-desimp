import React from 'react';
import Link from "next/link";
import { Clock, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="saas-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.84fr_1.16fr]">
          
          {/* Left Content */}
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>2-minute setup</span>
            </div>

            <h1 className="mb-6 text-5xl font-semibold leading-[0.98] tracking-tight text-gray-950 md:text-7xl">
              Create Professional
              <span className="text-primary block">Paystubs Instantly</span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl lg:mx-0">
              Generate bank-approved paystubs in under 2 minutes. No downloads, no hassle.
            </p>
            
            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/create-paystub">
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25">
                  Create Paystub Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-md">
                  Contact Us
                </button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 lg:justify-start">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>2-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Bank approved</span>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-3xl lg:mx-0">
            <div className="absolute inset-x-8 -bottom-8 h-20 rounded-[50%] bg-primary/10 blur-3xl" />

            <div className="absolute right-2 top-20 z-20 hidden h-[250px] w-[124px] rounded-[26px] border border-gray-200 bg-white p-2 shadow-2xl sm:block lg:-right-2 lg:top-24">
              <div className="h-full overflow-hidden rounded-[20px] border border-gray-100 bg-white">
                <div className="flex items-center justify-between border-b border-gray-100 px-3 py-3">
                  <div className="text-sm font-black text-primary">SRS</div>
                  <div className="h-1.5 w-5 rounded-full bg-gray-300" />
                </div>
                <div className="space-y-3 p-3">
                  <div className="text-[10px] font-bold text-gray-900">PAYROLL STATEMENT</div>
                  <div className="rounded-xl bg-primary p-3 text-center text-white">
                    <div className="text-[9px] font-semibold uppercase opacity-80">NET PAY</div>
                    <div className="text-lg font-black">$1,832.47</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded bg-gray-100" />
                    <div className="h-2 w-10/12 rounded bg-gray-100" />
                    <div className="h-2 w-8/12 rounded bg-gray-100" />
                  </div>
                  <div className="rounded-lg bg-primary px-3 py-2 text-center text-[9px] font-bold text-white">
                    Download Paystub
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mr-0 rounded-[2rem] border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:mr-20 lg:mr-24">
              <div className="rounded-2xl border border-gray-100 bg-white">
                <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
                  <div>
                    <div className="text-xl font-black leading-none text-primary">SRS</div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500">FINANCIALS</div>
                  </div>
                  <div className="text-center text-sm font-black text-gray-950">PAYROLL STATEMENT</div>
                  <div className="text-right text-[11px] font-semibold text-gray-500">
                    <div>Pay Date</div>
                    <div className="text-gray-900">May 31, 2024</div>
                  </div>
                </div>

                <div className="grid gap-5 px-6 py-5 md:grid-cols-[0.8fr_1.2fr]">
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="font-bold text-gray-950">John Doe</div>
                    <div>123 Main Street</div>
                    <div>Anywhere, USA 12345</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-gray-500">Pay Period</div>
                      <div className="font-bold text-gray-950">May 1, 2024 - May 31, 2024</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-gray-500">Check #</div>
                      <div className="font-bold text-gray-950">123456</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-[10px] font-black uppercase text-gray-500">
                      <div className="col-span-2">Earnings</div>
                      <div>Hours</div>
                      <div>Rate</div>
                      <div className="text-right">Current</div>
                    </div>
                    {[
                      ["Regular Pay", "40.00", "30.00", "1,200.00"],
                      ["Overtime Pay", "5.00", "37.50", "187.50"],
                      ["Bonus", "", "", "250.00"],
                    ].map((row) => (
                      <div key={row[0]} className="grid grid-cols-5 border-t border-gray-100 px-4 py-3 text-xs text-gray-700">
                        <div className="col-span-2 font-semibold text-gray-900">{row[0]}</div>
                        <div>{row[1]}</div>
                        <div>{row[2]}</div>
                        <div className="text-right font-bold">{row[3]}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl bg-gray-50 p-4">
                    <div className="text-sm font-black text-gray-950">NET PAY</div>
                    <div className="rounded-xl bg-white px-5 py-3 text-lg font-black text-primary shadow-sm">$1,832.47</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
