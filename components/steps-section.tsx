import { FileEdit, Eye, DownloadCloud } from "lucide-react"
import Link from "next/link"

export function StepsSection() {
  const steps = [
    {
      title: "Add your info",
      desc: "Use our secure online forms to enter your personal details in the fields provided.",
      icon: FileEdit,
    },
    {
      title: "Preview your document",
      desc: "Make edits before you order. Get documents delivered to your inbox in minutes.",
      icon: Eye,
    },
    {
      title: "Download your Paystubs",
      desc: "Download and print the secure PDF. We’ll print and mail your Paystubs and W‑2s.",
      icon: DownloadCloud,
    },
  ]

  return (
    <section id="how-it-works" className="bg-white py-14 sm:py-16">
      <div className="saas-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-kicker">How It Works</div>
          <h2 className="section-title">
            Creating paystubs has never been 
            <span className="text-primary">
              this simple.
            </span>
          </h2>
          <p className="section-copy">Seriously!</p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, index) => (
            <div key={s.title} className="group relative">
              {/* Step number */}
              <div className="absolute -left-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-lg">
                {index + 1}
              </div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-8 z-0 hidden h-0.5 w-full -translate-x-1/2 bg-primary/30 md:block"></div>
              )}
              
              <div className="saas-card saas-card-hover relative overflow-hidden p-6">
                <div className="relative">
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-500 group-hover:scale-105">
                    <s.icon className="h-7 w-7 text-primary transition-colors duration-500" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-500 group-hover:text-primary">
                    {s.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/create-paystub">
            <button className="relative overflow-hidden rounded-xl bg-primary px-10 py-3.5 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg">
              <span className="relative flex items-center justify-center gap-3">
                GET STARTED NOW
                <span className="transform hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
