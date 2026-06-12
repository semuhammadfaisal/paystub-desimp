import { FileText, Calculator, CreditCard, Receipt, Building, Users } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Paystubs Made Easy",
      description: "Custom paystubs that look professional. Perfect for rent, loans, or job verification.",
      icon: FileText,
    },
    {
      title: "Tax Return Assistance",
      description: "Complete tax document services for self-employed, freelancers, and employees.",
      icon: Calculator,
    },
    {
      title: "W2 Form Services",
      description: "Official-looking W2 forms for proof of income and tax purposes.",
      icon: CreditCard,
    },
    {
      title: "1099 For Contractors",
      description: "Detailed 1099-MISC and 1099-NEC forms for independent contractors.",
      icon: Receipt,
    },
    {
      title: "Bank Statements",
      description: "Professional bank statements for income verification and applications.",
      icon: Building,
    },
    {
      title: "Monthly Payroll",
      description: "Complete payroll management services for businesses of all sizes.",
      icon: Users,
    },
  ]

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="saas-container">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-kicker">Services</div>
          <h2 className="section-title">
            What We 
            <span className="text-primary">
              Do Best
            </span>
          </h2>
          <p className="section-copy">
            Professional document services that deliver results
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service, index) => (
            <div key={index} className="saas-card saas-card-hover group p-5 text-center">
              {/* Icon */}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-105">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="mb-3 text-base font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
