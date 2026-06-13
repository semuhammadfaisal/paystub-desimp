import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PaystubGenerator } from "@/components/paystub-generator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
    <div className="paystub-builder saas-shell min-h-screen">
      <Header />
      <main className="relative mx-auto max-w-[1280px] px-3 py-4 sm:px-5 lg:px-6">
        <div className="mb-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-950 sm:text-2xl">Create paystub</h1>
              <p className="mt-1 text-sm text-gray-500">Preview first, edit details below, then export when ready.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Autosaving locally
            </div>
          </div>
        </div>

        <PaystubGenerator user={user} initialTemplateId={typeof template === 'string' ? template : 'template2'} />
      </main>
      <Footer />
    </div>
  )
}
