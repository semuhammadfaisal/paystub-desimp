import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50/80 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="saas-card p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <div className="mb-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-xl bg-primary px-3 py-2 text-sm font-bold leading-none text-white">SRS</span>
                  <span className="text-lg font-semibold leading-none tracking-tight text-primary">FINANCIALS</span>
                </div>
                <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">SRS Financials</h3>
              </div>
              <p className="mb-6 text-sm font-light leading-relaxed text-gray-600">
                SRS Financials offers fast, accurate paystubs, tax returns, and proof of income documents. We provide personalized support and secure, reliable service. Your trusted partner for all financial documentation needs.
              </p>
              <div className="space-y-3 text-sm font-light text-gray-600">
                <p className="flex items-center">
                  <MapPin className="mr-3 h-4 w-4 text-primary" />
                  Florida, USA
                </p>
                <p className="flex items-center">
                  <Phone className="mr-3 h-4 w-4 text-primary" />
                  <a href="tel:+12067045757" className="transition-colors duration-200 hover:text-primary">+1 (206) 704-5757</a>
                </p>
                <p className="flex items-center">
                  <Mail className="mr-3 h-4 w-4 text-primary" />
                  <a href="mailto:srssolutionltd@gmail.com" className="transition-colors duration-200 hover:text-primary">srssolutionltd@gmail.com</a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="mb-6 font-semibold tracking-tight text-gray-900">Services</h4>
              <ul className="space-y-3 text-sm font-light text-gray-600">
                <li><a href="/create-paystub" className="transition-colors duration-200 hover:text-primary">Paystubs</a></li>
                <li><a href="/contact" className="transition-colors duration-200 hover:text-primary">W2 Forms</a></li>
                <li><a href="/contact" className="transition-colors duration-200 hover:text-primary">Tax Returns</a></li>
                <li><a href="/contact" className="transition-colors duration-200 hover:text-primary">1099 Forms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-semibold tracking-tight text-gray-900">Support</h4>
              <ul className="space-y-3 text-sm font-light text-gray-600">
                <li><a href="/contact" className="transition-colors duration-200 hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="transition-colors duration-200 hover:text-primary">FAQ</a></li>
                <li><a href="#" className="transition-colors duration-200 hover:text-primary">Help Center</a></li>
                <li><a href="/contact" className="transition-colors duration-200 hover:text-primary">Live Chat</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-semibold tracking-tight text-gray-900">Legal</h4>
              <ul className="space-y-3 text-sm font-light text-gray-600">
                <li><a href="#" className="transition-colors duration-200 hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="transition-colors duration-200 hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="transition-colors duration-200 hover:text-primary">Refund Policy</a></li>
                <li><a href="#" className="transition-colors duration-200 hover:text-primary">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm font-light text-gray-500">&copy; 2024 SRS Financials. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
