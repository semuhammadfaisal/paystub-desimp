"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [taxDropdownOpen, setTaxDropdownOpen] = useState(false)

  useEffect(() => {
    // Check localStorage for mock user session
    const mockUser = localStorage.getItem("mockUser")
    if (mockUser) {
      setUser(JSON.parse(mockUser))
    }
  }, [])

  const handleSignOut = async () => {
    localStorage.removeItem("mockUser")
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <header className="sticky top-0 z-50 px-3 py-3">
      <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200/80 bg-white/90 px-4 shadow-sm backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex h-[64px] items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="rounded-xl bg-secondary px-3 py-2 text-sm font-bold leading-none text-secondary-foreground shadow-sm">SRS</div>
                <span className="text-lg font-semibold leading-none tracking-tight text-primary">FINANCIALS</span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:block">
            <div className="flex items-center gap-1">
              <Link
                href="/create-paystub"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted/70 hover:text-primary"
              >
                Paystubs
              </Link>

              <Link
                href="/contact"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted/70 hover:text-primary"
              >
                W2 Form
              </Link>

              {/* Custom Tax Return Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTaxDropdownOpen(!taxDropdownOpen)}
                  onMouseEnter={() => setTaxDropdownOpen(true)}
                  onMouseLeave={() => setTaxDropdownOpen(false)}
                  className="flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted/70 hover:text-primary"
                >
                  Tax Return
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${taxDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {taxDropdownOpen && (
                  <div 
                    className="absolute left-0 top-full z-50 mt-2 w-[600px] rounded-2xl border bg-white shadow-xl"
                    onMouseEnter={() => setTaxDropdownOpen(true)}
                    onMouseLeave={() => setTaxDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-2 gap-3 p-4">
                      <div className="row-span-3">
                        <Link
                          href="/contact"
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl border border-gray-200 bg-muted/60 p-6 text-foreground no-underline outline-none transition-all hover:border-primary/30 hover:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Tax Returns
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            File your taxes accurately and efficiently with our professional tax return services.
                          </p>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/contact"
                          className="block select-none space-y-1 rounded-xl p-3 leading-none text-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Individual Tax Return</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Personal income tax filing for individuals
                          </p>
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="/contact"
                          className="block select-none space-y-1 rounded-xl p-3 leading-none text-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Business Tax Return</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Tax services for small businesses and entrepreneurs
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted/70 hover:text-primary"
              >
                1099 Misc Form
              </Link>

              <Link
                href="/blogs"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted/70 hover:text-primary"
              >
                Blogs
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-3">
            {loading ? (
              <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
            ) : user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="font-medium bg-transparent">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/create-paystub" className="hidden sm:block">
                <Button size="sm" className="h-10 rounded-xl px-5 font-semibold">
                  Create Paystub Now
                </Button>
              </Link>
            )}

            <button
              className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted/70 hover:text-primary lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/50 py-4 lg:hidden">
            <div className="flex flex-col space-y-2 rounded-2xl bg-white p-2 shadow-sm">
              <Link
                href="/create-paystub"
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
              >
                Paystubs
              </Link>
              <Link
                href="/create-w2"
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
              >
                W2 Form
              </Link>

              {/* Mobile Tax Return Dropdown */}
              <div className="px-4 py-2">
                <div className="text-foreground text-sm font-medium mb-2">Tax Return</div>
                <div className="ml-4 space-y-2">
                  <Link
                    href="/create-tax-return"
                    className="block rounded-lg py-1 text-sm text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
                  >
                    Overview
                  </Link>
                  <Link
                    href="/create-tax-return/individual"
                    className="block rounded-lg py-1 text-sm text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
                  >
                    Individual Tax Return
                  </Link>
                  <Link
                    href="/create-tax-return/business"
                    className="block rounded-lg py-1 text-sm text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
                  >
                    Business Tax Return
                  </Link>
                </div>
              </div>

              <Link
                href="/create-1099"
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
              >
                1099 Misc Form
              </Link>
              <Link
                href="/blogs"
                className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/70 hover:text-primary"
              >
                Blogs
              </Link>
              {/* Support and Sign In links removed as requested */}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
