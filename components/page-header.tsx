"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PageHeader() {
  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.replace('/');
          }}
          className="relative z-50 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
      </div>
    </div>
  );
}
