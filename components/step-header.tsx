"use client"

import React from "react"

interface StepHeaderProps {
  step: number | string
  title: string
}

export function StepHeader({ step, title }: StepHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-white shadow-sm">
        {step}
      </div>
      <h2 className="text-base font-semibold tracking-tight text-gray-900">{title}</h2>
    </div>
  )
}


