"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Image } from "lucide-react"

interface LogoUploadProps {
  logo?: string
  onLogoChange: (logo: string | undefined) => void
}

export function LogoUpload({ logo, onLogoChange }: LogoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onLogoChange(result)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image file (JPG, PNG, GIF, etc.)')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveLogo = () => {
    onLogoChange(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-3">
      {logo ? (
        <div className="relative">
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3">
            <div className="flex items-center justify-center">
              <img 
                src={logo} 
                alt="Company Logo" 
                className="max-h-24 max-w-full object-contain"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleRemoveLogo}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          className={`rounded-lg border border-dashed p-4 text-center transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-3">
            <div className="flex justify-center">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Upload logo</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or GIF</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleUploadClick}
              className="h-9"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose file
            </Button>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  )
}
