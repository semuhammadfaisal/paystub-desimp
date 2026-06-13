"use client"

import { useState } from "react"
import { FileDown } from "lucide-react"
import type { PaystubData as GeneratorPaystubData } from "@/components/paystub-generator"
import { useRouter } from "next/navigation"

interface Props {
  data: GeneratorPaystubData
  label?: string
  className?: string
  mode?: "download" | "checkout"
}

export function DownloadHtmlFileButton({ data, label = "Download HTML", className, mode = "checkout" }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    try {
      setLoading(true)

      // Find the best capture container across all templates
      const elTarget = document.getElementById("paystub-capture-target") as HTMLElement | null
      const elVisible = document.getElementById("paystub-preview-capture") as HTMLElement | null
      const elSnapshot = document.getElementById("paystub-capture-snapshot") as HTMLElement | null

      // Prefer the explicit in-template capture target first (unblurred and stable),
      // then the off-screen snapshot (clean of preview-only classes), and lastly the visible wrapper.
      let chosen: HTMLElement | null = elTarget || elSnapshot || elVisible
      if (!chosen) {
        alert("Preview element not found. Please make sure the preview is visible.")
        return
      }

      // Export only the actual PDF page, not the preview wrapper. The wrapper can
      // stretch to the browser width and make standalone HTML look wider than A4.
      let containerForExport: HTMLElement =
        ((chosen.matches('[data-pdf-page="true"]') ? chosen : chosen.querySelector('[data-pdf-page="true"]')) as HTMLElement | null) || chosen
      // Clone and strip any elements marked as non-export (e.g., buttons)
      const clone = containerForExport.cloneNode(true) as HTMLElement
      // If we cloned the snapshot wrapper, sanitize off-screen styles
      if ((containerForExport as HTMLElement).id === 'paystub-capture-snapshot') {
        try {
          clone.style.position = 'static'
          clone.style.left = 'auto'
          clone.style.top = 'auto'
          clone.style.visibility = 'visible'
          clone.style.zIndex = 'auto'
          if (!clone.style.width) clone.style.width = '800px'
          if (!clone.style.background) clone.style.background = '#ffffff'
          clone.style.margin = '0 auto'
          clone.style.padding = '0'
        } catch {}
      }
      const nonExport = clone.querySelectorAll('[data-nonexport="true"]')
      nonExport.forEach(n => n.parentNode?.removeChild(n))
      // Ensure preview-only blur class is removed from the export clone
      clone.classList?.remove('preview-blur')
      clone.querySelectorAll('.preview-blur').forEach(el => el.classList.remove('preview-blur'))

      // Inline computed styles from the live DOM to the clone to preserve exact appearance
      try {
        const applyComputed = (src: Element, dst: HTMLElement) => {
          const cs = window.getComputedStyle(src as HTMLElement)
          const styleText: string[] = []
          // Copy all computed properties
          for (let i = 0; i < cs.length; i++) {
            const prop = cs.item(i)
            const val = cs.getPropertyValue(prop)
            // Skip extremely large or dynamic properties if desired
            if (dst.classList?.contains('calc-val') && prop === 'filter') {
              // Do not bake in preview blur into the exported HTML
              continue
            }
            styleText.push(`${prop}:${val}`)
          }
          dst.setAttribute('style', `${dst.getAttribute('style') || ''};${styleText.join(';')}`)
        }
        const walk = (srcNode: Element, dstNode: Element) => {
          if (dstNode instanceof HTMLElement) {
            applyComputed(srcNode, dstNode)
          }
          const srcChildren = Array.from(srcNode.children)
          const dstChildren = Array.from(dstNode.children)
          for (let i = 0; i < Math.min(srcChildren.length, dstChildren.length); i++) {
            walk(srcChildren[i], dstChildren[i])
          }
        }
        walk(containerForExport, clone)
        // As a final safeguard, clear any inline filter on all nodes and strip calc-val class names
        const allEls = clone.querySelectorAll('*')
        allEls.forEach(n => {
          const el = n as HTMLElement
          el.style.removeProperty('filter')
          el.style.removeProperty('-webkit-filter')
          el.style.removeProperty('backdrop-filter')
          if (el.classList?.contains('calc-val')) el.classList.remove('calc-val')
        })
      } catch (e) {
        console.warn('Failed to inline computed styles (continuing):', e)
      }
      let htmlFragment = clone.outerHTML

      // Fallback: if somehow we captured too little (empty/blank), try another source
      const compactLen = htmlFragment.replace(/\s+/g, '').length
      if (compactLen < 200) {
        const fallback = (containerForExport !== (elTarget as HTMLElement | null) ? elTarget : elVisible) || elSnapshot
        if (fallback) {
          let exportEl: HTMLElement = fallback
          if (fallback.id === 'paystub-capture-snapshot' && fallback.firstElementChild) {
            exportEl = fallback.firstElementChild as HTMLElement
          }
          const clone2 = exportEl.cloneNode(true) as HTMLElement
          const nonExport2 = clone2.querySelectorAll('[data-nonexport="true"]')
          nonExport2.forEach(n => n.parentNode?.removeChild(n))
          try {
            const walk2 = (srcNode: Element, dstNode: Element) => {
              if (dstNode instanceof HTMLElement) {
                const cs = window.getComputedStyle(srcNode as HTMLElement)
                const styleText: string[] = []
                for (let i = 0; i < cs.length; i++) {
                  const prop = cs.item(i)
                  const val = cs.getPropertyValue(prop)
                  styleText.push(`${prop}:${val}`)
                }
                dstNode.setAttribute('style', `${dstNode.getAttribute('style') || ''};${styleText.join(';')}`)
              }
              const srcChildren = Array.from(srcNode.children)
              const dstChildren = Array.from(dstNode.children)
              for (let i = 0; i < Math.min(srcChildren.length, dstChildren.length); i++) {
                walk2(srcChildren[i], dstChildren[i])
              }
            }
            walk2(exportEl, clone2)
          } catch {}
          htmlFragment = clone2.outerHTML
        }
      }

      // Minimal standalone HTML document using a small base stylesheet.
      // We rely on the inlined computed styles above for layout and visuals.
      const title = `${data.employeeName || "Employee"} Paystub`
      const doc = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: 9.03in 10in; margin: 0; }
    html, body { margin:0; padding:0; min-height:100%; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
    body { background:#eeeeee; display:flex; justify-content:center; align-items:flex-start; padding:0; }
    .a4-screen-frame { width:650px; height:720px; margin:0 auto; }
    .a4-html-page { width:650px; height:720px; background:#fff; margin:0 auto; overflow:hidden; transform-origin:top left; }
    *, *::before, *::after { box-sizing: border-box; }
    img { max-width: 100%; display: block; }
    /* Prevent accidental text selection highlight from affecting appearance */
    ::selection { background: rgba(0,0,0,0.1); }
    @media print {
      html, body { width:9.03in; height:10in; background:#fff; display:block; padding:0; }
      .a4-screen-frame { width:9.03in !important; height:10in !important; margin:0 !important; }
      .a4-html-page { width:9.03in !important; height:10in !important; margin:0 !important; transform:none !important; }
    }
  </style>
</head>
<body>
<main class="a4-screen-frame">
<div class="a4-html-page">
${htmlFragment}
</div>
</main>
<script>
  (function () {
    var frame = document.querySelector('.a4-screen-frame');
    var page = document.querySelector('.a4-html-page');
    if (!frame || !page) return;
    function fitPage() {
      if (window.matchMedia && window.matchMedia('print').matches) return;
      var pageWidth = 650;
      var pageHeight = 720;
      var availableWidth = Math.max(320, window.innerWidth);
      var availableHeight = Math.max(320, window.innerHeight);
      var scale = Math.min(availableWidth / pageWidth, availableHeight / pageHeight, 1);
      page.style.transform = 'scale(' + scale + ')';
      frame.style.width = pageWidth * scale + 'px';
      frame.style.height = pageHeight * scale + 'px';
    }
    window.addEventListener('resize', fitPage);
    window.addEventListener('orientationchange', fitPage);
    fitPage();
  })();
</script>
</body>
</html>`

      const safeName = (data.employeeName || 'employee').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '')
      const filename = `${safeName || 'employee'}-PAYSTUB.html`
      if (mode === "download") {
        const blob = new Blob([doc], { type: "text/html;charset=utf-8" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        return
      }

      // Store in localStorage and redirect to checkout for the order flow.
      try {
        localStorage.setItem('paystub-html-doc', doc)
        localStorage.setItem('paystub-html-filename', filename)
      } catch {}

      // Navigate to checkout for simulated payment flow
      router.push('/checkout?package=basic')
      return
    } catch (e) {
      console.error('Download HTML error:', e)
      alert('Failed to download HTML.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      data-nonexport="true"
      onClick={onClick}
      disabled={loading}
      className={className || "inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium bg-white hover:bg-gray-50"}
    >
      <FileDown className="w-4 h-4" />
      {loading ? 'Preparing…' : label}
    </button>
  )
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
