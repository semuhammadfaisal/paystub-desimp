import { Star } from "lucide-react"

export function Testimonials() {
  const quotes = [
    {
      name: "Georgia Austin",
      role: "Blog Writer",
      text: "SRS Financials created a paystub as proof of income for my bank in 2 minutes. Approved instantly!",
      rating: 5,
    },
    {
      name: "Jay Hinge",
      role: "Catering Business Owner",
      text: "With SRS, I created a check stub that got me approved for a mortgage. Game changer!",
      rating: 5,
    },
    {
      name: "Sarah Miles",
      role: "Yoga Instructor",
      text: "Their system is by far the easiest I've used. Thank you so much!",
      rating: 5,
    },
    {
      name: "Cindi Yung",
      role: "Cafe Owner",
      text: "I use SRS to create check stubs for my employees. A lifesaver and budget helper!",
      rating: 5,
    },
  ]

  return (
    <section id="reviews" className="saas-section bg-white">
      <div className="saas-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-kicker">Reviews</div>
          <h2 className="section-title">
            Customers 
            <span className="text-primary">
              Trust Us
            </span>
          </h2>
          <p className="section-copy">
            Join thousands of satisfied customers who trust our professional document services
          </p>
        </div>
        
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-4">
          {quotes.map((q, index) => (
            <div key={q.name} className="saas-card saas-card-hover group flex flex-col p-6">
              <div className="flex items-center mb-6">
                {[...Array(q.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="mb-6 flex-1 text-base leading-7 text-gray-700 transition-colors duration-300 group-hover:text-gray-800">
                "{q.text}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
                  {q.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                    {q.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {q.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        

      </div>
    </section>
  )
}
