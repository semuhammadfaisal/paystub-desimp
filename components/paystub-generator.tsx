"use client"

import { useCallback, useDeferredValue, useState } from "react"
import { PaystubForm } from "@/components/paystub-form-new"
import { PaystubPreview } from "@/components/paystub-preview"
import { LogoUpload } from "@/components/logo-upload"
import { StepHeader } from "@/components/step-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DownloadHtmlButton } from "@/components/download-html-button"
import { DownloadHtmlFileButton } from "@/components/download-html-file-button"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export interface PaystubData {
  // Template Selection
  templateId: string
  // Theme Selection
  themeId?: string
  themeColor?: string

  // Additional Template Fields
  coNumber: string
  fileNumber: string
  deptNumber: string
  clockNumber: string
  vchrNumber: string

  // Payment Details
  paymentType: string
  employmentType: string
  email: string
  numberOfPaystubs: number
  taxState: string

  // Company Information
  companyName: string
  companyAddress: string
  companyAddress2?: string
  companyCity: string
  companyState: string
  companyZip: string
  companyPhone: string
  companyEIN: string
  companyLogo?: string

  // Employee Information
  employeeName: string
  employeeAddress: string
  employeeAddress2?: string
  employeeCity: string
  employeeState: string
  employeeZip: string
  employeeSSN: string
  employeeId: string
  employeePhone: string
  exemptions: number
  maritalStatus: "single" | "married" | "head_of_household"
  directDeposit: boolean

  // Pay Period Information
  payPeriodNumber: number
  payPeriodStart: string
  payPeriodEnd: string
  payDate: string
  payFrequency:
    | "daily"
    | "weekly"
    | "bi-weekly"
    | "semi-monthly"
    | "monthly"
    | "quarterly"
    | "semi-annually"
    | "annually"
  adviceNumber: string
  accountNumber: string
  transitNumber: string
  abaNumber: string

  // Earnings Details
  payType: "hourly" | "salary"
  // Hourly fields (used when payType === "hourly")
  hourlyRate: number
  hoursWorked: number
  regularRate: number
  regularHours: number
  overtimeRate: number
  overtimeHours: number
  // Salary field (used when payType === "salary")
  salary: number
  bonusAmount: number
  commissionAmount: number
  holidayHours: number
  sickHours: number
  vacationHours: number

  // Deductions
  federalTax: number
  stateTax: number
  socialSecurity: number
  medicare: number
  stateDisability: number
  healthInsurance: number
  dentalInsurance: number
  visionInsurance: number
  lifeInsurance: number
  retirement401k: number
  rothIRA: number
  hsa: number
  parkingFee: number
  unionDues: number
  otherDeductions: number

  // Year to Date Totals
  ytdGrossPay: number
  ytdFederalTax: number
  ytdStateTax: number
  ytdSocialSecurity: number
  ytdMedicare: number
  ytdOvertimePay: number
  ytdTotalDeductions: number
  ytdNetPay: number

  // Calculated fields
  grossPay: number
  totalDeductions: number
  netPay: number
}

interface PaystubGeneratorProps {
  user: any
  initialTemplateId?: string
}

const initialData: PaystubData = {
  templateId: "template1",
  themeId: "blue",
  themeColor: "#60a5fa",
  coNumber: "",
  fileNumber: "",
  deptNumber: "",
  clockNumber: "",
  vchrNumber: "",
  paymentType: "",
  employmentType: "",
  email: "",
  numberOfPaystubs: 26,
  taxState: "",
  companyName: "",
  companyAddress: "",
  companyCity: "",
  companyState: "",
  companyZip: "",
  companyPhone: "",
  companyEIN: "",
  employeeName: "",
  employeeAddress: "",
  employeeCity: "",
  employeeState: "",
  employeeZip: "",
  employeeSSN: "",
  employeeId: "",
  employeePhone: "",
  exemptions: 0,
  maritalStatus: "single",
  directDeposit: false,
  payPeriodNumber: 1,
  payPeriodStart: "",
  payPeriodEnd: "",
  payDate: "",
  payFrequency: "bi-weekly",
  adviceNumber: "",
  accountNumber: "",
  transitNumber: "",
  abaNumber: "",
  payType: "hourly",
  hourlyRate: 25,
  hoursWorked: 40,
  regularRate: 0,
  regularHours: 0,
  overtimeRate: 37.5,
  overtimeHours: 0,
  salary: 50000,
  bonusAmount: 0,
  commissionAmount: 0,
  holidayHours: 0,
  sickHours: 0,
  vacationHours: 0,
  federalTax: 0,
  stateTax: 0,
  socialSecurity: 0,
  medicare: 0,
  stateDisability: 0,
  healthInsurance: 0,
  dentalInsurance: 0,
  visionInsurance: 0,
  lifeInsurance: 0,
  retirement401k: 0,
  rothIRA: 0,
  hsa: 0,
  parkingFee: 0,
  unionDues: 0,
  otherDeductions: 0,
  ytdGrossPay: 0,
  ytdFederalTax: 0,
  ytdStateTax: 0,
  ytdSocialSecurity: 0,
  ytdMedicare: 0,
  ytdOvertimePay: 0,
  ytdTotalDeductions: 0,
  ytdNetPay: 0,
  grossPay: 0,
  totalDeductions: 0,
  netPay: 0,
}

const TEMPLATE_OPTIONS = [
  { value: "template1", label: "Classic" },
  { value: "template2", label: "Modern" },
  { value: "template3", label: "Detailed" },
  { value: "template4", label: "Compact" },
  { value: "template5", label: "Jose" },
  { value: "template6", label: "Stefanie" },
  { value: "template7", label: "Spencer" },
  { value: "template8", label: "Alyssa" },
  { value: "template9", label: "Charles" },
  { value: "template10", label: "KTownes" },
  { value: "template11", label: "Hector Cintron" },
]

const THEME_OPTIONS = [
  { id: "blue", color: "#60a5fa" },
  { id: "green", color: "#10b981" },
  { id: "gray", color: "#9ca3af" },
  { id: "purple", color: "#8b5cf6" },
  { id: "orange", color: "#f59e0b" },
  { id: "red", color: "#ef4444" },
]

const getMaxPaystubs = (frequency: string | undefined): number => {
  switch ((frequency || "bi-weekly").toLowerCase()) {
    case "daily": return 52
    case "weekly": return 52
    case "bi-weekly": return 26
    case "semi-monthly": return 24
    case "monthly": return 12
    case "quarterly": return 4
    case "semi-annually": return 2
    case "annually": return 1
    default: return 26
  }
}

export function PaystubGenerator({ user: _user, initialTemplateId }: PaystubGeneratorProps) {
  const [paystubData, setPaystubData] = useState<PaystubData>(() => ({
    ...initialData,
    templateId: initialTemplateId || initialData.templateId,
  }))
  const previewData = useDeferredValue(paystubData)

  const updatePaystubData = useCallback((updates: Partial<PaystubData>) => {
    setPaystubData((prev) => {
      const updated = { ...prev, ...updates }

      // Auto-calculate period end and pay date when frequency or start changes
      const shouldRecalculate =
        typeof updates.payPeriodStart !== "undefined" || typeof updates.payFrequency !== "undefined"
      const startDateStr = updated.payPeriodStart
      if (shouldRecalculate && startDateStr) {
        const base = new Date(startDateStr)
        const end = new Date(base.getTime())
        const pay = new Date(base.getTime())
        switch (updated.payFrequency) {
          case "daily":
            // same day
            end.setDate(base.getDate())
            pay.setTime(end.getTime())
            break
          case "weekly":
            end.setDate(end.getDate() + 6)
            pay.setTime(end.getTime())
            break
          case "bi-weekly":
            end.setDate(end.getDate() + 13)
            pay.setTime(end.getTime())
            break
          case "semi-monthly":
            // 1st-15th or 16th-end of month
            const day = base.getDate()
            if (day <= 15) {
              end.setDate(15)
            } else {
              // last day of month
              end.setMonth(end.getMonth() + 1, 0)
            }
            pay.setTime(end.getTime())
            break
          case "monthly":
            end.setMonth(end.getMonth() + 1)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
          case "quarterly":
            end.setMonth(end.getMonth() + 3)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
          case "semi-annually":
            end.setMonth(end.getMonth() + 6)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
          case "annually":
            end.setFullYear(end.getFullYear() + 1)
            end.setDate(end.getDate() - 1)
            pay.setTime(end.getTime())
            break
        }
        const toISO = (d: Date) => d.toISOString().slice(0, 10)
        updated.payPeriodEnd = toISO(end)
        updated.payDate = toISO(pay)
      }

      // Calculate gross pay only if it wasn't explicitly provided by the form logic
      if (typeof updates.grossPay === 'undefined') {
        if (updated.payType === "hourly") {
          const regularPay = (updated.hourlyRate || 0) * (updated.hoursWorked || 0)
          const overtimePay = (updated.overtimeRate || 0) * (updated.overtimeHours || 0)
          const holidayPay = (updated.holidayHours || 0) * (updated.hourlyRate || 0)
          const sickPay = (updated.sickHours || 0) * (updated.hourlyRate || 0)
          const vacationPay = (updated.vacationHours || 0) * (updated.hourlyRate || 0)
          updated.grossPay =
            regularPay + overtimePay + holidayPay + sickPay + vacationPay + (updated.bonusAmount || 0) + (updated.commissionAmount || 0)
        } else {
          // Salary-based per-period gross pay: divide annual salary by MAX periods for the selected frequency
          const periods = getMaxPaystubs(updated.payFrequency)
          const perPeriodSalary = (updated.salary || 0) / (periods || 1)
          updated.grossPay = perPeriodSalary + (updated.bonusAmount || 0) + (updated.commissionAmount || 0)
        }
      }

      // Calculate total deductions
      updated.totalDeductions =
        (updated.federalTax || 0) +
        (updated.stateTax || 0) +
        (updated.socialSecurity || 0) +
        (updated.medicare || 0) +
        (updated.stateDisability || 0) +
        (updated.healthInsurance || 0) +
        (updated.dentalInsurance || 0) +
        (updated.visionInsurance || 0) +
        (updated.lifeInsurance || 0) +
        (updated.retirement401k || 0) +
        (updated.rothIRA || 0) +
        (updated.hsa || 0) +
        (updated.parkingFee || 0) +
        (updated.unionDues || 0) +
        (updated.otherDeductions || 0)

      // Calculate net pay
      updated.netPay = updated.grossPay - updated.totalDeductions

      return updated
    })
  }, [])

  

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        {/* Template & Color Selection */}
        <div className="saas-card p-5 sm:p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">Template:</span>
              <Select value={paystubData.templateId} onValueChange={(v) => updatePaystubData({ templateId: v })}>
                <SelectTrigger className="h-11 w-full sm:w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATE_OPTIONS.map((template) => (
                    <SelectItem key={template.value} value={template.value}>{template.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">Color:</span>
              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updatePaystubData({ themeId: t.id, themeColor: t.color })}
                    className={`h-9 w-9 rounded-full border-2 shadow-sm transition-all duration-200 hover:scale-105 ${paystubData.themeId === t.id ? 'scale-110 border-gray-800 ring-4 ring-gray-200' : 'border-gray-300'}`}
                    style={{ backgroundColor: t.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(460px,0.92fr)] xl:items-start">
          <div className="space-y-8">
            <div className="saas-card p-6 sm:p-8">
              <StepHeader step={1} title="Company Logo" />
              <LogoUpload 
                logo={paystubData.companyLogo} 
                onLogoChange={(logo) => updatePaystubData({ companyLogo: logo })} 
              />
            </div>

            <PaystubForm data={paystubData} onUpdate={updatePaystubData} />
          </div>

          <aside className="xl:sticky xl:top-28">
            <div className="saas-card overflow-hidden">
              <div className="flex items-center justify-end border-b border-gray-200 bg-gray-50 px-5 py-4">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <div className="max-h-[calc(100vh-210px)] overflow-auto bg-gray-50/60 p-3 sm:p-5">
                <div className="mx-auto w-full min-w-[720px] origin-top rounded-xl bg-white shadow-sm xl:min-w-0">
                  <PaystubPreview data={previewData} />
                </div>
              </div>
            </div>

            {/* Custom Templates CTA */}
            <div className="mt-5 flex justify-center">
              <a
                href={`https://wa.me/12067045757?text=${encodeURIComponent("Hi! I'm interested in personalized and customized paystub templates. Can you help me?")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="px-6 py-3 font-medium text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Custom Templates
                </Button>
              </a>
            </div>
          </aside>
        </div>

        {/* Color options moved to top */}

        {/* Template selection and preview moved to top */}
      </div>

      <div className="saas-card flex flex-col items-center justify-center gap-4 p-5 sm:flex-row sm:p-6">
        <DownloadHtmlButton
          data={paystubData}
          label="Download PDF"
        />
        <div className="relative group">
          <DownloadHtmlFileButton 
            data={paystubData} 
            label="Complete Order" 
            className="relative bg-primary px-10 py-4 text-lg font-bold text-white shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg" 
          />
        </div>
      </div>
    </div>
  )
}
