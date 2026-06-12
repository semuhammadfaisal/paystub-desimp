import { Users, Home, Building, Calculator, Briefcase, UserCheck } from "lucide-react"

export function AudienceSection() {
  const audiences = [
    {
      title: "Freelancers & Contractors",
      description: "Independent workers who need proof of income for loans, rentals, or financial applications",
      icon: Users,
    },
    {
      title: "Homebuyers & Renters",
      description: "Individuals seeking mortgage approval or rental applications requiring income verification",
      icon: Home,
    },
    {
      title: "Small Business Owners",
      description: "Entrepreneurs who need professional payroll documents for their employees",
      icon: Building,
    },
    {
      title: "Tax Professionals",
      description: "CPAs and tax preparers helping clients organize financial documents for tax season",
      icon: Calculator,
    },
    {
      title: "Self-Employed Workers",
      description: "Business owners and consultants who need legitimate income documentation",
      icon: Briefcase,
    },
    {
      title: "HR Professionals",
      description: "Human resources teams managing payroll documentation and employee records",
      icon: UserCheck,
    },
  ]

  return (
    <section id="audiences" className="saas-section bg-white">
      <div className="saas-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-kicker">Audience</div>
          <h2 className="section-title">
            Who can use 
            <span className="text-primary">
              SRS Financials?
            </span>
          </h2>
          <p className="section-copy">
            Our professional document services are designed for anyone who needs reliable, accurate financial documentation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div key={audience.title} className="saas-card saas-card-hover group p-8">
              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-105">
                <audience.icon className="w-8 h-8 text-primary transition-colors duration-300" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-4">
                {audience.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {audience.description}
              </p>
              
              {/* Decorative element */}
              <div className="mt-6 h-1 w-12 scale-0 rounded-full bg-primary transition-transform duration-500 group-hover:scale-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
