"use client"

import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

export function PricingSection() {
  const router = useRouter()

  const packages = [
    {
      name: "Basic",
      subtitle: "For individuals who need quick essentials",
      price: 20,
      features: ["1 Paystub", "Basic Formatting", "24-Hour Delivery"],
      buttonText: "Get Started",
      popular: false,
      type: "basic",
    },
    {
      name: "Standard",
      subtitle: "Our most popular package with added benefits",
      price: 30,
      features: ["1 W2 Form", "Professional Formatting", "24-Hour Delivery"],
      buttonText: "Choose Standard",
      popular: true,
      type: "standard",
    },
    {
      name: "Premium",
      subtitle: "For professionals who need comprehensive docs",
      price: 50,
      features: ["1 1040 Form", "Premium Formatting", "Priority Delivery"],
      buttonText: "Go Premium",
      popular: false,
      type: "premium",
    },
  ]

  const handleOrderClick = (packageType: string) => {
    router.push(`/checkout?package=${packageType}`)
  }

  return (
    <section id="pricing" className="border-y border-gray-200 bg-gray-50/70 py-14 sm:py-16">
      <div className="saas-container">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-kicker">Pricing</div>
          <h2 className="section-title">
            Simple, 
            <span className="text-primary">
              Transparent Pricing
            </span>
          </h2>
          <p className="section-copy">
            Choose the plan that best fits your needs. No hidden fees, no hassle.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`saas-card saas-card-hover relative ${
                pkg.popular
                  ? "border-primary"
                  : "border-gray-200 hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 text-sm font-semibold rounded-full">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Package Name & Description */}
                <div className="text-center mb-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-900">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700"
                      >
                        <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleOrderClick(pkg.type)}
                  className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                    pkg.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {pkg.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              <span className="text-sm font-medium">Instant Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
