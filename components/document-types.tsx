import Link from "next/link"
import Image from "next/image"

export function DocumentTypes() {
  const documents = [
    {
      title: "Paystub",
      image: "/paystub.jpg",
      href: "/create-paystub",
      cta: "Create your paystub",
    },
    {
      title: "W-2",
      image: "/w2.jpg",
      href: "/contact",
      cta: "Order your W-2",
    },
    {
      title: "Tax Return",
      image: "/1099.jpg",
      href: "/contact",
      cta: "Order your Tax Return",
    },
    {
      title: "1099-MISC",
      image: "/1099.jpg",
      href: "/contact",
      cta: "Order your 1099-MISC",
    },
  ]

  return (
    <section id="documents" className="border-y border-gray-200 bg-gray-50/60 py-12 sm:py-14">
      <div className="saas-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="section-kicker">Documents</div>
          <h2 className="section-title">
            Professional
            <span className="block text-primary">
              Documents
            </span>
          </h2>
          <p className="section-copy">Create stunning, bank-ready financial documents in minutes with our premium templates</p>
        </div>
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {documents.map((doc, index) => (
            <div key={index} className="saas-card saas-card-hover group flex min-h-[260px] flex-col p-4">
              <h3 className="mb-3 text-center text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">{doc.title}</h3>
              <div className="mb-3 flex flex-1 items-center justify-center rounded-xl bg-gray-50 p-3">
                <Image
                  src={doc.image}
                  alt={doc.title}
                  width={320}
                  height={320}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="max-h-32 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <Link href={doc.href} className="block rounded-lg bg-primary py-2 text-center font-semibold text-white transition-all duration-300 hover:bg-primary/90">
                {doc.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
