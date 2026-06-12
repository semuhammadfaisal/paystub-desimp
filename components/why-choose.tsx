import { ShieldCheck, Sparkles, Timer, BadgeCheck } from "lucide-react"

export function WhyChoose() {
  const items = [
    {
      title: "Trust a Seamless Process",
      desc:
        "You need paystubs fast. In a few steps, you’ll have legitimate Paystubs that show employment details, gross and net salary, payroll tax deductions and more.",
      icon: Timer,
    },
    {
      title: "Select from Professional Templates",
      desc:
        "Looks are important – especially for official documentation. Choose from clean, professional templates for paystubs and IRS‑compliant W‑2 and 1099 forms.",
      icon: Sparkles,
    },
    {
      title: "Avoid Issues with the IRS",
      desc:
        "Accurate calculations matter. Our auto‑calculation logic follows the latest federal, state and local guidance to help you stay compliant.",
      icon: ShieldCheck,
    },
    {
      title: "Access Support, 24/7",
      desc:
        "Made a mistake or have a question? Our friendly support team is here for you by email or chat – day or night.",
      icon: BadgeCheck,
    },
  ]

  return (
    <section id="about" className="saas-section bg-white">
      <div className="saas-container">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-kicker">Why Choose</div>
          <h2 className="section-title">
            Why Choose <span className="text-primary">SRS Financials?</span>
          </h2>
          <p className="section-copy">
            We're committed to providing legitimate, accurate payroll documents you can trust.
            Whether you're an independent contractor, entrepreneur, or small business owner.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="saas-card saas-card-hover group overflow-hidden"
            >
              <div className="relative flex h-full flex-col p-6 sm:p-7">
                {/* Icon and Title */}
                <div className="mb-5 flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-500 group-hover:scale-105">
                    <item.icon className="h-6 w-6 text-primary transition-colors duration-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors duration-500 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <div className="h-px w-full bg-gray-100" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-7 text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
