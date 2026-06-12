import Image from "next/image"

export function AnatomySection() {
  const items = [
    { title: "Employment Details", desc: "Name of employer and address, payment date, etc." },
    { title: "Local Taxes", desc: "Some local governments impose income taxes, shown as deductions." },
    { title: "Back Pay", desc: "In case of overpayment in taxes, back pay will appear on your stub." },
    { title: "Sick/Holiday Pay", desc: "Paid sick leave and paid vacation are noted in this section." },
    { title: "Federal Taxes", desc: "Federal withholding taxes based on your W‑4 form." },
    { title: "Net Salary", desc: "Take home pay — the amount paid to you after deductions." },
    { title: "Gross Salary", desc: "Your total salary before mandatory deductions." },
    { title: "State Taxes", desc: "State income taxes, depending on where you live and work." },
  ]

  return (
    <section id="anatomy" className="saas-section border-y border-gray-200 bg-gray-50/70">
      <div className="saas-container">
        <div className="mb-16 text-center">
          <div className="section-kicker">Anatomy</div>
          <h2 className="section-title">
            The Anatomy of a 
            <span className="text-primary">
              Paystub
            </span>
          </h2>
          <p className="section-copy">
            42% of U.S. employees say taxes and deductions on their paystubs are confusing. We're breaking down the key elements below so you can better understand your paystub.
          </p>
          
          {/* Paystub Anatomy Visual */}
          <div className="relative max-w-5xl mx-auto mt-12 mb-16">
            <div className="saas-card relative overflow-hidden p-3">
              <Image
                src="/downimage.jpg"
                alt="The Anatomy of a Paystub - Visual breakdown showing Employment Details, Gross Salary, Taxes, Net Salary, and other key components"
                width={800}
                height={600}
                className="h-auto w-full rounded-xl bg-white object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, index) => (
            <div key={it.title} className="saas-card saas-card-hover group p-6">
              {/* Number badge */}
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                {index + 1}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-3">
                {it.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {it.desc}
              </p>
              
              {/* Decorative element */}
              <div className="mt-4 h-1 w-12 scale-0 rounded-full bg-primary transition-transform duration-500 group-hover:scale-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
