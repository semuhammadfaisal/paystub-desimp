"use client"

import React from "react"

interface StepHeaderProps {
  step: number | string
  title: string
}

export function StepHeader({ step, title }: StepHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-sm">
        {step}
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
  )
}


