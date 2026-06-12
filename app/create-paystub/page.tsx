import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PaystubGenerator } from "@/components/paystub-generator"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export default async function CreatePaystubPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Await Next.js dynamic searchParams API before using its properties
  const { template } = await searchParams

  return (
    <div className="saas-shell min-h-screen">
      <PageHeader />
      <div className="relative mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mb-10">
          <div className="saas-card overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="rounded-2xl bg-primary p-4 shadow-sm">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
              </div>
              <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
                <span className="text-gray-900">Create Your </span>
                <span className="text-primary">
                  Paystub
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-gray-600">Professional paystubs in 3 simple steps</p>
            </div>
          </div>
        </div>

        {/* Template selection now handled by dropdown inside PaystubGenerator */}

        <PaystubGenerator user={user} initialTemplateId={typeof template === 'string' ? template : 'template2'} />

        {/* Expert Help CTA */}
        <section className="mt-16">
          <div className="saas-card p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Need Expert Assistance?</h3>
                <p className="text-gray-600">Let our professionals create your paystub with 100% accuracy and compliance</p>
              </div>
              <a href="https://wa.me/12067045757" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-medium">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Expert Help
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
