import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export function SupportSection() {
  return (
    <section id="support" className="saas-section bg-white">
      <div className="saas-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Support</div>
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl">
              Get <span className="text-primary">Support</span>
            </h2>
            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-gray-600">
              Need help? Message us anytime or start a chat. We respond fast and are here to help you succeed.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <button className="w-full rounded-2xl bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 sm:w-auto">
                  Send us a message
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full rounded-2xl border border-primary bg-white px-8 py-4 font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white sm:w-auto">
                  Start Chat
                </button>
              </Link>
            </div>
          </div>

          <div className="saas-card p-8">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">Contact Information</h3>

            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">Florida, USA</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <a href="tel:+12067045757" className="font-semibold text-primary hover:underline">
                  +1 (206) 704-5757
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <a href="mailto:srssolutionltd@gmail.com" className="font-semibold text-primary hover:underline">
                  srssolutionltd@gmail.com
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-gray-100 pt-6 text-sm sm:grid-cols-3">
              <div>
                <div className="mb-3 font-semibold text-gray-900">Services</div>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="/create-paystub" className="transition-colors hover:text-primary">Paystubs</a></li>
                  <li><a href="/contact" className="transition-colors hover:text-primary">W-2 Forms</a></li>
                  <li><a href="/contact" className="transition-colors hover:text-primary">1099-MISC</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-3 font-semibold text-gray-900">Company</div>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#about" className="transition-colors hover:text-primary">About Us</a></li>
                  <li><a href="#pricing" className="transition-colors hover:text-primary">Pricing</a></li>
                  <li><a href="#reviews" className="transition-colors hover:text-primary">Reviews</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-3 font-semibold text-gray-900">Support</div>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#support" className="transition-colors hover:text-primary">Contact Us</a></li>
                  <li><a href="#faq" className="transition-colors hover:text-primary">FAQ</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} SRS Financials. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
