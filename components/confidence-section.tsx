import { ShieldCheck, CreditCard, ThumbsUp } from "lucide-react"

export function ConfidenceSection() {
  const items = [
    { title: "Money Back Guarantee", icon: ShieldCheck, desc: "If you’re not satisfied, we’ll make it right or refund you." },
    { title: "Secure Payment Processing", icon: CreditCard, desc: "Your transactions are protected with industry‑standard security." },
    { title: "High Customer Satisfaction Rating", icon: ThumbsUp, desc: "Thousands of happy customers trust our check stub maker." },
  ]

  return (
    <section className="saas-section bg-white">
      <div className="saas-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-kicker">Confidence</div>
          <h2 className="section-title">
            Buy with 
            <span className="text-primary">
              Confidence
            </span>
          </h2>
          <p className="section-copy">
            Trusted platform, accurate documents, secure checkout
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-primary p-2 shadow-2xl shadow-primary/20">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.6rem] bg-white/15 md:grid-cols-3">
            {items.map((it) => (
              <div key={it.title} className="bg-primary px-8 py-8 text-white">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <it.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {it.title}
                </h3>
                <p className="text-sm leading-7 text-white/80">
                  {it.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-px border-t border-white/15 bg-white/15 md:grid-cols-3">
            <div className="bg-primary px-8 py-5 text-white">
              <div className="text-3xl font-semibold">24/7</div>
              <div className="text-sm text-white/75">Support</div>
            </div>
            <div className="bg-primary px-8 py-5 text-white">
              <div className="text-3xl font-semibold">100%</div>
              <div className="text-sm text-white/75">Secure</div>
            </div>
            <div className="bg-primary px-8 py-5 text-white">
              <div className="text-3xl font-semibold">2 min</div>
              <div className="text-sm text-white/75">Setup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
