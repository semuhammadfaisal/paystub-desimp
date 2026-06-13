"use client"

import type { CSSProperties, ReactNode } from "react"
import type { PaystubData as GeneratorPaystubData } from "@/components/paystub-generator"

interface PdfTemplatePreviewProps {
  data: GeneratorPaystubData
  pdfSrc: string
  templateName: string
  templateKey: string
}

const numberFmt = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const money = (n: number) => numberFmt.format(n || 0)
const shortDate = (ds: string) => (ds ? new Date(`${ds}T00:00:00`).toLocaleDateString("en-US") : "")
const maskSSN = (ssn: string) => (!ssn ? "XXX-XX-XXXX" : `XXX-XX-${ssn.slice(-4)}`)
const formatPhone = (phone: string) => {
  const digits = (phone || "").replace(/\D/g, "")
  const usDigits = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits.length === 11 && digits.startsWith("0") ? digits.slice(1) : digits
  if (usDigits.length !== 10) return phone
  return `(${usDigits.slice(0, 3)}) ${usDigits.slice(3, 6)}-${usDigits.slice(6)}`
}

function AdpMark({ small = false }: { small?: boolean }) {
  return (
    <div style={{ fontSize: small ? 34 : 48, lineHeight: 0.85, fontWeight: 900, letterSpacing: -4, fontStyle: "italic" }}>
      ADP
    </div>
  )
}

function BrandMark({ logo, small = false }: { logo?: string; small?: boolean }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt="Company logo"
        style={{
          maxWidth: small ? 74 : 86,
          maxHeight: small ? 42 : 56,
          objectFit: "contain",
          display: "block",
        }}
      />
    )
  }

  return <AdpMark small={small} />
}

const page: CSSProperties = {
  width: 860,
  minHeight: 1114,
  margin: "0 auto",
  background: "#fff",
  border: "3px solid #111",
  color: "#000",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: 12,
  lineHeight: 1.18,
  position: "relative",
  overflow: "hidden",
  padding: "22px 34px 24px",
}

const sectionHeader: CSSProperties = {
  display: "grid",
  alignItems: "end",
  borderBottom: "1.5px solid #111",
  fontWeight: 700,
  paddingBottom: 2,
}

const summaryLabel: CSSProperties = {
  background: "#f7f7f7",
  border: "1px solid #cfcfcf",
  padding: "4px 6px",
  fontWeight: 800,
}

function Amount({ children, bold }: { children: ReactNode; bold?: boolean }) {
  return <span className="calc-val tabular-nums" style={{ fontWeight: bold ? 700 : 400 }}>{children}</span>
}

function SmallLabel({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{children}</div>
}

function InfoLine({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "86px 1fr", columnGap: 8 }}>
      <span>{label}</span>
      <span className="calc-val">{value}</span>
    </div>
  )
}

function HashBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ minWidth: 60, textAlign: "center" }}>
      <div style={{ fontSize: 8, fontWeight: 700, borderBottom: "1px solid #b5b5b5", paddingBottom: 2 }}>{label}</div>
      <div className="calc-val" style={{ fontSize: 9, paddingTop: 4 }}>{value || "000"}</div>
    </div>
  )
}

function LinedPanel({ children, minHeight = 280, lineStart = 130 }: { children: ReactNode; minHeight?: number; lineStart?: number }) {
  return (
    <div style={{ position: "relative", minHeight, background: "#f7f9ff", padding: "6px 0 0", overflow: "hidden" }}>
      {Array.from({ length: Math.ceil((minHeight - lineStart) / 4) }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: lineStart + index * 4,
            height: 1,
            background: "#d3ddf6",
          }}
        />
      ))}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  )
}

function StefanieTemplatePreview({ data, templateKey }: { data: GeneratorPaystubData; templateKey: string }) {
  const isSpencer = templateKey === "spencer-05-15"
  const defaultEmployeeName = isSpencer ? "SPENCER" : "STEFANIE PIERRE"
  const defaultCheckNumber = isSpencer ? "000005" : "000005"
  const payPeriodNumber = data.payPeriodNumber || 1
  const regularHours = data.regularHours || data.hoursWorked || 0
  const regularRate = data.payType === "hourly" ? data.hourlyRate || data.regularRate || 0 : data.salary || data.regularRate || 0
  const regularPay = data.grossPay || (data.payType === "hourly" ? regularRate * regularHours : 0)
  const ytdGross = data.ytdGrossPay || data.grossPay * payPeriodNumber
  const ytdFederal = data.ytdFederalTax || data.federalTax * payPeriodNumber
  const ytdState = data.ytdStateTax || data.stateTax * payPeriodNumber
  const ytdSocialSecurity = data.ytdSocialSecurity || data.socialSecurity * payPeriodNumber
  const ytdMedicare = data.ytdMedicare || data.medicare * payPeriodNumber
  const ytdTotalDeductions = data.ytdTotalDeductions || data.totalDeductions * payPeriodNumber
  const ytdNet = data.ytdNetPay || data.netPay * payPeriodNumber
  const priorYtdNet = data.netPay * Math.max(0, payPeriodNumber - 1)
  const companyCityLine = [data.companyCity, data.companyState, data.companyZip].filter(Boolean).join(" ")
  const employeeCityLine = [data.employeeCity, data.employeeState, data.employeeZip].filter(Boolean).join(" ")
  const taxStatus = data.maritalStatus === "married" ? "Married" : data.maritalStatus === "head_of_household" ? "Head of Household" : "Single"
  const checkNumber = data.adviceNumber || data.vchrNumber || defaultCheckNumber
  const netCheck = data.netPay || 0

  const stefaniePage: CSSProperties = {
    width: 860,
    minHeight: 1114,
    margin: "0 auto",
    background: "#fff",
    color: "#000",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 12,
    lineHeight: 1.15,
    position: "relative",
    overflow: "hidden",
    padding: "28px 42px 38px",
  }

  const rule: CSSProperties = { borderBottom: "1.5px solid #111", marginTop: 7, marginBottom: 5 }
  const cellRight: CSSProperties = { textAlign: "right" }
  const headerGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 74px 82px 92px 106px",
    columnGap: 10,
    alignItems: "end",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "lowercase",
    background: "#f7f9ff",
  }
  const rowGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 74px 82px 92px 106px",
    columnGap: 10,
    alignItems: "center",
    padding: "6px 0 4px",
    background: "#f7f9ff",
  }
  const deductionHeaderGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 118px 96px 108px",
    columnGap: 10,
    alignItems: "end",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "lowercase",
    background: "#f7f9ff",
  }
  const deductionRowGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 118px 96px 108px",
    columnGap: 10,
    alignItems: "center",
    padding: "4px 0",
    background: "#f7f9ff",
  }
  const summaryBox: CSSProperties = {
    border: "1px solid #cfcfcf",
    background: "#f8f8f8",
    padding: "4px 6px",
    fontWeight: 700,
  }

  return (
    <div id="paystub-capture-target" data-template={templateKey} className="bg-white overflow-x-auto p-4">
      <div data-pdf-page="true" style={stefaniePage}>
        <header style={{ display: "grid", gridTemplateColumns: "1.22fr 0.68fr 72px", gap: 28, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: 8, width: 320, marginBottom: 10 }}>
              <HashBox label="CO." value={data.coNumber || "XF1M"} />
              <HashBox label="FILE" value={data.fileNumber || "293523"} />
              <HashBox label="DEPT." value={data.deptNumber || "206211"} />
              <HashBox label="CLOCK" value={data.clockNumber || "HA0H1"} />
              <HashBox label="VCHR. NO." value={data.vchrNumber || "000755497"} />
            </div>
            <div style={{ fontWeight: 800, fontStyle: "italic" }}>{data.companyName || "BLACKPLEDGE NETWORK"}</div>
            <div style={{ marginTop: 3 }}>{data.companyAddress || "21150 S CENTRAL EXPRESSWAY"}</div>
            <div>{companyCityLine || "MCKINNEY, TX 75070"}</div>
          </div>

          <div>
            <h1 style={{ fontSize: 21, lineHeight: 1, margin: "0 0 18px", fontWeight: 900 }}>Earnings Statement</h1>
            <InfoLine label="Period Start:" value={shortDate(data.payPeriodStart)} />
            <InfoLine label="Period Ending:" value={shortDate(data.payPeriodEnd)} />
            <InfoLine label="Pay Date:" value={shortDate(data.payDate)} />
          </div>

          <BrandMark logo={data.companyLogo} small />
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, marginTop: 44 }}>
          <div style={{ fontSize: 11 }}>
            <div style={{ display: "grid", gridTemplateColumns: "128px 1fr", columnGap: 8 }}>
              <span>Taxable Marital Status:</span>
              <span className="calc-val">{taxStatus}</span>
              <span>Exemptions/Allowances:</span>
              <span />
              <span style={{ paddingLeft: 26 }}>Federal:</span>
              <span className="calc-val">{data.exemptions || 0}</span>
              <span style={{ paddingLeft: 26 }}>State:</span>
              <span className="calc-val">{data.exemptions || 0}</span>
              <span style={{ paddingLeft: 26 }}>Local:</span>
              <span className="calc-val">0</span>
            </div>
            <div style={{ marginTop: 20 }}>
              Social Security Number: <span className="calc-val" style={{ marginLeft: 18 }}>{maskSSN(data.employeeSSN)}</span>
            </div>
          </div>

          <div style={{ fontSize: 16, fontWeight: 900, textTransform: "uppercase", paddingTop: 4 }}>
            <div className="calc-val">{data.employeeName || defaultEmployeeName}</div>
            <div className="calc-val">{data.employeeAddress || "Employee Address"}</div>
            <div className="calc-val">{employeeCityLine || "City ST ZIP"}</div>
          </div>
        </section>

        <main style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 0.94fr", gap: 16, position: "relative", zIndex: 1 }}>
          <section>
            <LinedPanel minHeight={280} lineStart={252}>
              <div style={headerGrid}>
                <div style={{ fontSize: 15, textTransform: "none" }}>Earnings</div>
                <div>rate</div>
                <div>hours/units</div>
                <div>this period</div>
                <div>year to date</div>
              </div>
              <div style={rule} />
              <div style={rowGrid}>
                <div>Regular</div>
                <div style={cellRight}><Amount>{money(regularRate)}</Amount></div>
                <div style={cellRight}><Amount>{money(regularHours)}</Amount></div>
                <div style={cellRight}><Amount>{money(regularPay)}</Amount></div>
                <div style={cellRight}><Amount>{money(ytdGross)}</Amount></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 96px 108px", columnGap: 10, marginTop: 28, alignItems: "center", background: "#f7f9ff" }}>
                <div style={summaryBox}>Gross Pay</div>
                <div style={cellRight}><Amount bold>{money(data.grossPay)}</Amount></div>
                <div style={cellRight}><Amount>{money(ytdGross)}</Amount></div>
              </div>

              <div style={{ ...deductionHeaderGrid, marginTop: 22 }}>
                <div style={{ fontSize: 15, textTransform: "none" }}>Deductions</div>
                <div>statutory</div>
                <div>this period</div>
                <div>year to date</div>
              </div>
              <div style={rule} />
              {[
                ["Withholding", data.federalTax, ytdFederal],
                ["Social Security", data.socialSecurity, ytdSocialSecurity],
                ["Medicare", data.medicare, ytdMedicare],
                ["State Tax", data.stateTax, ytdState],
              ].map(([label, current, ytd]) => (
                <div key={String(label)} style={deductionRowGrid}>
                  <div />
                  <div>{label}</div>
                  <div style={cellRight}><Amount>{money(Number(current))}</Amount></div>
                  <div style={cellRight}><Amount>{money(Number(ytd))}</Amount></div>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 96px 108px", columnGap: 10, marginTop: 10, alignItems: "center", background: "#f7f9ff" }}>
                <div style={summaryBox}>Net Pay</div>
                <div style={cellRight}><Amount bold>{money(data.netPay)}</Amount></div>
                <div style={cellRight}><Amount>{money(ytdNet)}</Amount></div>
              </div>
            </LinedPanel>
          </section>

          <section>
            <LinedPanel minHeight={280} lineStart={160}>
              <div style={{ ...deductionHeaderGrid, gridTemplateColumns: "1fr 90px 104px" }}>
                <div style={{ fontSize: 14, textTransform: "none" }}>Other Benefits and<br />Information</div>
                <div>this period</div>
                <div>total to date</div>
              </div>
              <div style={rule} />
              <div style={{ marginTop: 10, fontWeight: 800, fontSize: 15, lineHeight: 1.15, padding: "2px 0", background: "#f7f9ff" }}>Important Notes</div>
              <div style={rule} />
              <div style={{ paddingTop: 8, lineHeight: 1.2, background: "#f7f9ff" }}>BASIS OF PAY: {data.payType === "hourly" ? "HOURLY" : "SALARY"}</div>
            </LinedPanel>
          </section>
        </main>

        <section style={{ position: "absolute", left: 42, right: 42, bottom: 242, zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "86px 1fr 1fr", alignItems: "end", gap: 28 }}>
            <BrandMark logo={data.companyLogo} />
            <div>
              <div>{data.companyName || "BLACKPLEDGE NETWORK"}</div>
              <div>{data.companyAddress || "21150 S CENTRAL EXPRESSWAY"}</div>
              <div>{companyCityLine || "MCKINNEY, TX 75070"}</div>
            </div>
            <div style={{ textAlign: "right" }}>{formatPhone(data.companyPhone) || "90-70830135"}</div>
          </div>
        </section>

        <section style={{ position: "absolute", left: 42, right: 42, bottom: 84, zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
            <div />
            <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", rowGap: 6 }}>
              <strong>Payroll Check Number:</strong>
              <strong className="calc-val">{checkNumber}</strong>
              <strong>Pay Date:</strong>
              <span className="calc-val">{shortDate(data.payDate)}</span>
            </div>
          </div>
          <div style={{ borderTop: "1.5px solid #111", borderBottom: "1.5px solid #111", padding: "7px 0", display: "grid", gridTemplateColumns: "0.75fr 1.35fr 1.1fr", gap: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700 }}>
              <div>Pay to the</div>
              <div>order of:</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, textTransform: "uppercase" }} className="calc-val">
              {data.employeeName || defaultEmployeeName}
            </div>
            <div style={{ textAlign: "right", fontSize: 16, fontWeight: 900 }} className="calc-val">
              ${money(netCheck)}
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 10, fontWeight: 700, display: "grid", gridTemplateColumns: "0.75fr 1.7fr" }}>
            <span>This amount:</span>
            <span className="calc-val">VOID - NON NEGOTIABLE&nbsp;&nbsp;&nbsp;&nbsp; VOID - NON NEGOTIABLE</span>
          </div>
        </section>
      </div>
    </div>
  )
}

function SpencerTemplatePreview({ data, templateKey }: { data: GeneratorPaystubData; templateKey: string }) {
  const payPeriodNumber = data.payPeriodNumber || 1
  const regularHours = data.regularHours || data.hoursWorked || 0
  const regularRate = data.payType === "hourly" ? data.hourlyRate || data.regularRate || 0 : 0
  const regularPay = data.grossPay || (data.payType === "hourly" ? regularRate * regularHours : data.salary || 0)
  const ytdGross = data.ytdGrossPay || data.grossPay * payPeriodNumber
  const ytdFederal = data.ytdFederalTax || data.federalTax * payPeriodNumber
  const ytdState = data.ytdStateTax || data.stateTax * payPeriodNumber
  const ytdSocialSecurity = data.ytdSocialSecurity || data.socialSecurity * payPeriodNumber
  const ytdMedicare = data.ytdMedicare || data.medicare * payPeriodNumber
  const ytdTotalDeductions = data.ytdTotalDeductions || data.totalDeductions * payPeriodNumber
  const ytdNet = data.ytdNetPay || data.netPay * payPeriodNumber
  const companyCityLine = [data.companyCity, data.companyState, data.companyZip].filter(Boolean).join(" ")
  const employeeCityLine = [data.employeeCity, data.employeeState, data.employeeZip].filter(Boolean).join(" ")
  const accountSuffix = (data.accountNumber || data.employeeSSN || "1963").slice(-4)
  const blue = "#18008a"

  const spencerPage: CSSProperties = {
    width: 860,
    minHeight: 1114,
    margin: "0 auto",
    background: "#fff",
    color: "#000",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 12,
    lineHeight: 1.08,
    position: "relative",
    overflow: "hidden",
    padding: "0 52px 44px",
  }
  const topRule: CSSProperties = { height: 6, background: blue, margin: "18px -52px 0" }
  const middleRule: CSSProperties = { height: 6, background: blue, margin: "62px -52px 0" }
  const blockTitle: CSSProperties = { fontWeight: 900, textTransform: "uppercase" }
  const tableHeader: CSSProperties = {
    display: "grid",
    fontWeight: 900,
    borderBottom: "1.5px solid #111",
    paddingBottom: 2,
  }
  const row: CSSProperties = { display: "grid", paddingTop: 4 }
  const right: CSSProperties = { textAlign: "right" }

  const companyName = data.companyName || "A&E Investigators LLC"
  const companyAddress = data.companyAddress || "1825 NW Corporate Blvd Ste 110"
  const companyCity = companyCityLine || "Boca Raton FL 33431"
  const employeeName = data.employeeName || "Spencer Forster"
  const employeeAddress = data.employeeAddress || "4150 Bonita Way"
  const employeeCity = employeeCityLine || "Deerfield FL 33064"

  return (
    <div id="paystub-capture-target" data-template={templateKey} className="bg-white overflow-x-auto p-4">
      <div data-pdf-page="true" style={spencerPage}>
        <div style={topRule} />

        <header style={{ minHeight: 300, position: "relative" }}>
          <div style={{ position: "absolute", left: 55, top: 40 }}>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyCity}</div>
          </div>

          <div style={{ position: "absolute", right: 65, top: 108, textAlign: "center" }}>
            <div>Pay Stub Detail</div>
            <div>PAY DATE: <span className="calc-val">{shortDate(data.payDate)}</span></div>
            <div>NET PAY: $<Amount bold>{money(data.netPay)}</Amount></div>
          </div>

          <div style={{ position: "absolute", left: 55, top: 204 }}>
            <div>{employeeName}</div>
            <div>{employeeAddress}</div>
            <div>{employeeCity}</div>
          </div>
        </header>

        <div style={middleRule} />

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr", gap: 58, marginTop: 54, minHeight: 290 }}>
          <div>
            <div style={blockTitle}>Employer</div>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyCity}</div>

            <div style={{ ...blockTitle, marginTop: 46 }}>Employee</div>
            <div>{employeeName}</div>
            <div>{employeeAddress}</div>
            <div>{employeeCity}</div>

            <div style={{ ...blockTitle, marginTop: 76 }}>Memo:</div>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 110px", columnGap: 20 }}>
              <div>
                <div style={blockTitle}>Pay Period</div>
                <div>Period Beginning</div>
                <div>Period Ending:</div>
                <div>Pay Date:</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div>&nbsp;</div>
                <div className="calc-val">{shortDate(data.payPeriodStart)}</div>
                <div className="calc-val">{shortDate(data.payPeriodEnd)}</div>
                <div className="calc-val">{shortDate(data.payDate)}</div>
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ ...tableHeader, gridTemplateColumns: "1fr 88px 88px" }}>
                <div>OTHER PAY/CONTRIBUTIONS</div>
                <div style={right}>Current</div>
                <div style={right}>Year To Date</div>
              </div>
              <div style={{ ...row, gridTemplateColumns: "1fr 88px 88px" }}>
                <div>Aflac Accident Adv.</div>
                <div style={right}><Amount>{money(data.healthInsurance || 0)}</Amount></div>
                <div style={right}><Amount>{money((data.healthInsurance || 0) * payPeriodNumber)}</Amount></div>
              </div>
              <div style={{ ...row, gridTemplateColumns: "1fr 88px 88px" }}>
                <div>Aflac Disability Ins.</div>
                <div style={right}><Amount>{money(data.stateDisability || 0)}</Amount></div>
                <div style={right}><Amount>{money((data.stateDisability || 0) * payPeriodNumber)}</Amount></div>
              </div>
            </div>

            <div style={{ marginTop: 92, display: "grid", gridTemplateColumns: "1fr 126px", columnGap: 16 }}>
              <div>
                <div style={blockTitle}>Net Pay:</div>
                <div>Acct#....<span className="calc-val">{accountSuffix}</span>:</div>
              </div>
              <div style={{ textAlign: "right", fontWeight: 900 }}>
                <div>$<Amount bold>{money(data.netPay)}</Amount></div>
                <div>$<Amount>{money(data.netPay)}</Amount></div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ borderTop: "1px dashed #d7d7d7", margin: "0 -44px" }} />

        <section style={{ display: "grid", gridTemplateColumns: "1.02fr 1fr", gap: 38, marginTop: 44 }}>
          <div>
            <div style={{ ...tableHeader, gridTemplateColumns: "1fr 58px 58px 90px 98px" }}>
              <div>PAY</div>
              <div style={right}>Hours</div>
              <div style={right}>Rate</div>
              <div style={right}>Current</div>
              <div style={right}>YTD</div>
            </div>
            <div style={{ ...row, gridTemplateColumns: "1fr 58px 58px 90px 98px" }}>
              <div>{data.payType === "salary" ? "Salary" : "Regular"}</div>
              <div style={right}>{data.payType === "salary" ? "-" : money(regularHours)}</div>
              <div style={right}>{data.payType === "salary" ? "-" : money(regularRate)}</div>
              <div style={right}><Amount>{money(regularPay)}</Amount></div>
              <div style={right}><Amount>{money(ytdGross)}</Amount></div>
            </div>

            <div style={{ marginTop: 126 }}>
              <div style={{ ...tableHeader, gridTemplateColumns: "1fr 90px 90px" }}>
                <div>TAXES</div>
                <div style={right}>Current</div>
                <div style={right}>YTD</div>
              </div>
              {[
                ["Federal Income Tax", data.federalTax, ytdFederal],
                ["Social Security", data.socialSecurity, ytdSocialSecurity],
                ["Medicare", data.medicare, ytdMedicare],
                ["State Tax", data.stateTax, ytdState],
              ].map(([label, current, ytd]) => (
                <div key={String(label)} style={{ ...row, gridTemplateColumns: "1fr 90px 90px", paddingTop: 2 }}>
                  <div>{label}</div>
                  <div style={right}><Amount>{money(Number(current))}</Amount></div>
                  <div style={right}><Amount>{money(Number(ytd))}</Amount></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ ...tableHeader, gridTemplateColumns: "1fr 92px 92px" }}>
              <div>DEDUCTIONS</div>
              <div style={right}>Current</div>
              <div style={right}>YTD</div>
            </div>
            <div style={{ ...row, gridTemplateColumns: "1fr 92px 92px" }}>
              <div>Aflac Accident Adv.</div>
              <div style={right}><Amount>{money(data.healthInsurance || 0)}</Amount></div>
              <div style={right}><Amount>{money((data.healthInsurance || 0) * payPeriodNumber)}</Amount></div>
            </div>

            <div style={{ marginTop: 150, border: "1.5px solid #111" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 92px 92px", fontWeight: 900, borderBottom: "1.5px solid #111", padding: "4px 6px 2px" }}>
                <div>SUMMARY</div>
                <div style={right}>Current</div>
                <div style={right}>YTD</div>
              </div>
              {[
                ["Total Pay", data.grossPay, ytdGross],
                ["Taxes", data.federalTax + data.stateTax + data.socialSecurity + data.medicare, ytdFederal + ytdState + ytdSocialSecurity + ytdMedicare],
                ["Deductions", data.totalDeductions, ytdTotalDeductions],
              ].map(([label, current, ytd]) => (
                <div key={String(label)} style={{ display: "grid", gridTemplateColumns: "1fr 92px 92px", padding: "2px 6px" }}>
                  <div>{label}</div>
                  <div style={right}><Amount>{label === "Total Pay" ? `$${money(Number(current))}` : `$${money(Number(current))}`}</Amount></div>
                  <div style={right}><Amount>${money(Number(ytd))}</Amount></div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", marginTop: 10, fontSize: 15, fontWeight: 900 }}>
              <div>Net Pay</div>
              <div style={right}>$<Amount bold>{money(data.netPay)}</Amount></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function AlyssaTemplatePreview({ data, templateKey }: { data: GeneratorPaystubData; templateKey: string }) {
  const payPeriodNumber = data.payPeriodNumber || 1
  const regularHours = data.regularHours || data.hoursWorked || 0
  const regularRate = data.payType === "hourly" ? data.hourlyRate || data.regularRate || 0 : 0
  const regularPay = data.grossPay || (data.payType === "hourly" ? regularRate * regularHours : data.salary || 0)
  const ytdGross = data.ytdGrossPay || data.grossPay * payPeriodNumber
  const ytdFederal = data.ytdFederalTax || data.federalTax * payPeriodNumber
  const ytdState = data.ytdStateTax || data.stateTax * payPeriodNumber
  const ytdSocialSecurity = data.ytdSocialSecurity || data.socialSecurity * payPeriodNumber
  const ytdMedicare = data.ytdMedicare || data.medicare * payPeriodNumber
  const ytdTotalDeductions = data.ytdTotalDeductions || data.totalDeductions * payPeriodNumber
  const ytdNet = data.ytdNetPay || data.netPay * payPeriodNumber
  const ytdTaxes = ytdFederal + ytdState + ytdSocialSecurity + ytdMedicare
  const currentTaxes = data.federalTax + data.stateTax + data.socialSecurity + data.medicare
  const companyCityLine = [data.companyCity, data.companyState, data.companyZip].filter(Boolean).join(" ")
  const employeeCityLine = [data.employeeCity, data.employeeState, data.employeeZip].filter(Boolean).join(" ")
  const accountSuffix = (data.accountNumber || data.employeeSSN || "1263").slice(-4)
  const adviceNumber = data.adviceNumber || data.vchrNumber || "567078"
  const taxStatus = data.maritalStatus === "married" ? "Married" : data.maritalStatus === "head_of_household" ? "Head of Household" : "Single"

  const companyName = data.companyName || "AZ FACE AND BODY"
  const companyAddress = data.companyAddress || "4643 N 12TH ST"
  const companyCity = companyCityLine || "PHOENIX, AZ 85014"
  const employeeName = data.employeeName || "ALYSSA SCOTT"
  const employeeAddress = data.employeeAddress || "6828 S 58TH AVE"
  const employeeCity = employeeCityLine || "LAVEEN, AZ 85339"

  const alyssaPage: CSSProperties = {
    width: 860,
    minHeight: 1114,
    margin: "0 auto",
    background: "#fff",
    color: "#000",
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: 11,
    lineHeight: 1.05,
    position: "relative",
    overflow: "hidden",
    padding: "0 58px 38px",
  }
  const box: CSSProperties = { border: "2px solid #111" }
  const thinBox: CSSProperties = { border: "1.5px solid #111" }
  const right: CSSProperties = { textAlign: "right" }
  const titleCell: CSSProperties = { fontWeight: 700, textTransform: "uppercase" }
  const tableTitle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    textAlign: "center",
    borderBottom: "1px solid #111",
    textTransform: "uppercase",
    fontSize: 9,
    lineHeight: 1,
    minHeight: 22,
    padding: "5px 4px 4px",
    boxSizing: "border-box",
  }
  const gridLine = (columns: string, extra: CSSProperties = {}): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: columns,
    columnGap: 6,
    alignItems: "center",
    minHeight: 20,
    lineHeight: 1,
    padding: "5px 4px 4px",
    boxSizing: "border-box",
    ...extra,
  })

  return (
    <div id="paystub-capture-target" data-template={templateKey} className="bg-white overflow-x-auto p-4">
      <div data-pdf-page="true" style={alyssaPage}>
        <header style={{ height: 430, position: "relative" }}>
          <div style={{ position: "absolute", left: 8, top: 24 }}>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyCity}</div>
          </div>
          <div style={{ position: "absolute", left: 350, top: 10, fontWeight: 700 }} className="calc-val">
            {shortDate(data.payDate)}
          </div>
          <div style={{ position: "absolute", right: 60, top: 10, textAlign: "center", fontWeight: 700 }}>
            <div>Advice No.</div>
            <div className="calc-val" style={{ marginTop: 10 }}>{adviceNumber}</div>
          </div>

          <div style={{ position: "absolute", right: 0, top: 150, width: 306, height: 128, ...thinBox }}>
            <div style={{ ...tableTitle, justifyContent: "flex-start", textAlign: "left", paddingLeft: 8 }}>DIRECT DEPOSIT DISTRIBUTION</div>
            <div style={gridLine("82px 96px 1fr", { fontSize: 9, borderBottom: "1px solid #111", minHeight: 20 })}>
              <div>Account Type</div>
              <div>Account Number</div>
              <div style={right}>Transit/ABA</div>
            </div>
            <div style={gridLine("82px 96px 1fr", { fontSize: 10 })}>
              <div>Checking</div>
              <div className="calc-val">XXXXX{accountSuffix}</div>
              <div style={right} className="calc-val">{data.abaNumber || "XXXXXXXXX"}</div>
            </div>
          </div>

          <div style={{ position: "absolute", left: 8, top: 262, display: "grid", gridTemplateColumns: "96px 1fr", columnGap: 10 }}>
            <div style={{ fontWeight: 700 }}>
              <div>To The</div>
              <div>Account(s) Of</div>
            </div>
            <div>
              <div>{employeeName}</div>
              <div>{employeeAddress}</div>
              <div>{employeeCity}</div>
            </div>
          </div>

          <div style={{ position: "absolute", right: 0, top: 304, width: 306, display: "grid", gridTemplateColumns: "1fr 100px" }}>
            <div>Total:</div>
            <div style={right}>$<Amount>{money(data.netPay)}</Amount></div>
          </div>

          <div style={{ position: "absolute", left: 8, bottom: 12 }}>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyCity}</div>
          </div>
        </header>

        <section style={{ position: "relative", marginTop: 0 }}>
          <div style={{ position: "absolute", right: 0, top: -48, width: 424, ...box, borderBottom: 0, textAlign: "center", fontSize: 18, lineHeight: 1, padding: "10px 0 8px", boxSizing: "border-box" }}>
            EMPLOYEE EARNINGS STATEMENT
          </div>

          <div style={{ ...box, display: "grid", gridTemplateColumns: "254px 252px 1fr", minHeight: 78 }}>
            <div style={{ padding: "10px 18px", borderRight: "2px solid #111" }}>
              <div>{employeeName}</div>
              <div>{employeeAddress}</div>
              <div>{employeeCity}</div>
            </div>
            <div style={{ padding: "8px 10px", borderRight: "2px solid #111" }}>
              <div>Period Start: <span className="calc-val">{shortDate(data.payPeriodStart)}</span></div>
              <div>Period Ending: <span className="calc-val">{shortDate(data.payPeriodEnd)}</span></div>
              <div>Pay Date: <span className="calc-val">{shortDate(data.payDate)}</span></div>
            </div>
            <div style={{ padding: "7px 10px", fontSize: 10 }}>
              <div style={gridLine("70px 1fr", { padding: 0 })}><span>Federal</span><span>DE State</span></div>
              <div>Tax Status: <span className="calc-val" style={{ marginLeft: 22 }}>{taxStatus}</span></div>
              <div>Allowances: <span className="calc-val" style={{ marginLeft: 20 }}>{data.exemptions || 0}</span></div>
              <div>Employee SSN: <span className="calc-val" style={{ marginLeft: 8 }}>{maskSSN(data.employeeSSN)}</span></div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.98fr 1fr", ...box, borderTop: 0, minHeight: 196 }}>
            <div style={{ borderRight: "2px solid #111" }}>
              <div style={tableTitle}>HOURS AND EARNINGS</div>
              <div style={gridLine("1fr 44px 44px 80px 80px 80px", { fontSize: 9, borderBottom: "1px solid #111", minHeight: 20 })}>
                <div>Description</div>
                <div>Hours</div>
                <div>Rate</div>
                <div style={right}>Current</div>
                <div style={right}>-</div>
                <div style={right}>YTD</div>
              </div>
              <div style={gridLine("1fr 44px 44px 80px 80px 80px")}>
                <div>{data.payType === "salary" ? "Salary" : "Regular"}</div>
                <div style={right}>{data.payType === "salary" ? "" : money(regularHours)}</div>
                <div style={right}>{data.payType === "salary" ? "" : money(regularRate)}</div>
                <div style={right}><Amount>{money(regularPay)}</Amount></div>
                <div />
                <div style={right}><Amount>{money(ytdGross)}</Amount></div>
              </div>
              {(data.bonusAmount || 0) > 0 && (
                <div style={gridLine("1fr 44px 44px 80px 80px 80px")}>
                  <div>Bonus</div><div /><div /><div style={right}><Amount>{money(data.bonusAmount)}</Amount></div><div /><div style={right}><Amount>{money(data.bonusAmount * payPeriodNumber)}</Amount></div>
                </div>
              )}
            </div>
            <div>
              <div style={tableTitle}>TAXES</div>
              <div style={gridLine("1fr 76px 76px", { fontSize: 9, borderBottom: "1px solid #111", minHeight: 20 })}>
                <div>Description</div>
                <div style={right}>Current</div>
                <div style={right}>YTD</div>
              </div>
              {[
                ["Fed Withholding", data.federalTax, ytdFederal],
                ["Fed MED/EE", data.medicare, ytdMedicare],
                ["Fed OASDI/EE", data.socialSecurity, ytdSocialSecurity],
                ["AZ State Tax", data.stateTax, ytdState],
              ].map(([label, current, ytd]) => (
                <div key={String(label)} style={gridLine("1fr 76px 76px")}>
                  <div>{label}</div>
                  <div style={right}><Amount>{money(Number(current))}</Amount></div>
                  <div style={right}><Amount>{money(Number(ytd))}</Amount></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.98fr 1fr", ...box, borderTop: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 104px", alignItems: "center", minHeight: 24, borderRight: "2px solid #111", padding: "6px 4px 4px", fontWeight: 700, boxSizing: "border-box" }}>
              <div>Total:</div>
              <div style={right}><Amount>{money(data.grossPay)}</Amount></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 86px 86px", alignItems: "center", minHeight: 24, padding: "6px 4px 4px", fontWeight: 700, boxSizing: "border-box" }}>
              <div>Total:</div>
              <div style={right}><Amount>{money(currentTaxes)}</Amount></div>
              <div style={right}><Amount>{money(ytdTaxes)}</Amount></div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", ...box, borderTop: 0, minHeight: 166 }}>
            {[
              "BEFORE-TAX DEDUCTIONS",
              "AFTER-TAX DEDUCTIONS",
              "EMPLOYER PAID BENEFITS",
            ].map((heading, index) => (
              <div key={heading} style={{ borderRight: index < 2 ? "2px solid #111" : undefined }}>
                <div style={tableTitle}>{heading}</div>
                <div style={gridLine("1fr 68px 68px", { fontSize: 9, borderBottom: "1px solid #111", minHeight: 20 })}>
                  <div>Description</div>
                  <div style={right}>Current</div>
                  <div style={right}>YTD</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", ...box, borderTop: 0, fontWeight: 700 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", alignItems: "center", minHeight: 22, padding: "6px 4px 4px", borderRight: "2px solid #111", boxSizing: "border-box" }}>
              <div>Total:</div><div style={right}>0.00</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", alignItems: "center", minHeight: 22, padding: "6px 4px 4px", borderRight: "2px solid #111", boxSizing: "border-box" }}>
              <div>Total:</div><div style={right}>0.00</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", alignItems: "center", minHeight: 22, padding: "6px 4px 4px", boxSizing: "border-box" }}>
              <div>Taxable</div><div style={right}>0.00</div>
            </div>
          </div>

          <div style={{ ...box, borderTop: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", alignItems: "center", minHeight: 22, lineHeight: 1, fontWeight: 700, textAlign: "center", borderBottom: "1px solid #111", fontSize: 9, padding: "6px 4px 4px", boxSizing: "border-box" }}>
              <div>TOTAL GROSS</div>
              <div>FED TAXABLE GROSS</div>
              <div>TOTAL TAXES</div>
              <div>TOTAL DEDUCTIONS</div>
              <div>NET PAY</div>
              <div />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "58px repeat(5, 1fr)", alignItems: "center", minHeight: 20, padding: "5px 4px 4px", boxSizing: "border-box" }}>
              <div>Current</div>
              <div style={right}><Amount>{money(data.grossPay)}</Amount></div>
              <div style={right}><Amount>{money(data.grossPay)}</Amount></div>
              <div style={right}><Amount>{money(currentTaxes)}</Amount></div>
              <div style={right}><Amount>{money(data.totalDeductions)}</Amount></div>
              <div style={right}><Amount>{money(data.netPay)}</Amount></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "58px repeat(5, 1fr)", alignItems: "center", minHeight: 20, padding: "5px 4px 4px", boxSizing: "border-box" }}>
              <div>YTD</div>
              <div style={right}><Amount>{money(ytdGross)}</Amount></div>
              <div style={right}><Amount>{money(ytdGross)}</Amount></div>
              <div style={right}><Amount>{money(ytdTaxes)}</Amount></div>
              <div style={right}><Amount>{money(ytdTotalDeductions)}</Amount></div>
              <div style={right}><Amount>{money(ytdNet)}</Amount></div>
            </div>
          </div>

          <div style={{ width: 216, marginLeft: "auto", ...box, borderTop: 0 }}>
            <div style={{ ...tableTitle, borderTop: "1px solid #111" }}>NET PAY DISTRIBUTION</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 78px", alignItems: "center", minHeight: 22, padding: "5px 6px 4px", boxSizing: "border-box" }}>
              <div>Advice # <span className="calc-val">{adviceNumber}</span></div>
              <div style={right}><Amount>{money(data.netPay)}</Amount></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function CharlesTemplatePreview({ data, templateKey }: { data: GeneratorPaystubData; templateKey: string }) {
  const payPeriodNumber = data.payPeriodNumber || 1
  const priorPeriods = Math.max(0, payPeriodNumber - 1)
  const regularHours = data.regularHours || data.hoursWorked || 0
  const regularRate = data.payType === "hourly" ? data.hourlyRate || data.regularRate || 0 : 0
  const regularPay = data.grossPay || (data.payType === "hourly" ? regularRate * regularHours : data.salary || 0)
  const ytdGross = data.ytdGrossPay || data.grossPay * payPeriodNumber
  const ytdFederal = data.ytdFederalTax || data.federalTax * payPeriodNumber
  const ytdState = data.ytdStateTax || data.stateTax * payPeriodNumber
  const ytdSocialSecurity = data.ytdSocialSecurity || data.socialSecurity * payPeriodNumber
  const ytdMedicare = data.ytdMedicare || data.medicare * payPeriodNumber
  const ytdTotalDeductions = data.ytdTotalDeductions || data.totalDeductions * payPeriodNumber
  const ytdNet = data.ytdNetPay || data.netPay * payPeriodNumber
  const companyCityLine = [data.companyCity, data.companyState, data.companyZip].filter(Boolean).join(" ")
  const employeeCityLine = [data.employeeCity, data.employeeState, data.employeeZip].filter(Boolean).join(" ")
  const taxStatus = data.maritalStatus === "married" ? "Married" : data.maritalStatus === "head_of_household" ? "Head of Household" : "Single"

  const companyName = data.companyName || "ALCHEMY EXECUTIVE PROTECTION, LLC"
  const companyAddress = data.companyAddress || "435 HEATHCLIFF CT"
  const companyCity = companyCityLine || "MCDONOUGH, GA 30253"
  const employeeName = data.employeeName || "CHARLES PURYEAR"
  const employeeAddress = data.employeeAddress || "1120 PIEDMONT AVE NE"
  const employeeCity = employeeCityLine || "ATLANTA, GA 30309"

  const charlesPage: CSSProperties = {
    width: 860,
    minHeight: 1114,
    margin: "0 auto",
    background: "#fff",
    color: "#000",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 10,
    lineHeight: 1.1,
    position: "relative",
    overflow: "hidden",
    padding: "44px 32px 34px",
  }
  const right: CSSProperties = { textAlign: "right" }
  const mutedWatermark: CSSProperties = {
    color: "rgba(0,0,0,0.08)",
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 1,
  }
  const sectionHeader: CSSProperties = {
    fontWeight: 900,
    textTransform: "uppercase",
    padding: "5px 6px 4px",
    borderBottom: "1px solid #111",
    boxSizing: "border-box",
  }
  const gridRow = (columns: string, extra: CSSProperties = {}): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: columns,
    columnGap: 8,
    alignItems: "center",
    minHeight: 18,
    padding: "3px 6px",
    boxSizing: "border-box",
    ...extra,
  })

  return (
    <div id="paystub-capture-target" data-template={templateKey} className="bg-white overflow-x-auto p-4">
      <div data-pdf-page="true" style={charlesPage}>
        <header style={{ height: 258, position: "relative" }}>
          <div style={{ position: "absolute", left: 22, top: 0 }}>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyCity}</div>
          </div>
          <div style={{ position: "absolute", left: -22, top: 148, width: 145, transform: "rotate(-90deg)", transformOrigin: "left top", color: "#9a9a9a", whiteSpace: "nowrap", fontSize: 9 }}>
            Payrolls by Paychex, Inc.
          </div>
          <div style={{ position: "absolute", right: 142, top: 42 }}>
            <div>{employeeName}</div>
            <div>{employeeAddress}</div>
            <div>{employeeCity}</div>
          </div>
          <div style={{ position: "absolute", right: -38, top: 138, width: 145, transform: "rotate(90deg)", transformOrigin: "right top", color: "#9a9a9a", whiteSpace: "nowrap", fontSize: 9 }}>
            Payrolls by Paychex, Inc.
          </div>
          <div style={{ position: "absolute", left: 38, top: 170, ...mutedWatermark }}>NON-NEGOTIABLE</div>
          <div style={{ position: "absolute", right: 118, top: 84, ...mutedWatermark }}>NON-NEGOTIABLE</div>
        </header>

        <main style={{ display: "grid", gridTemplateColumns: "276px 1fr", border: "1px solid #777", minHeight: 586 }}>
          <aside style={{ borderRight: "1px solid #777" }}>
            <section style={{ minHeight: 164, borderBottom: "1px solid #777" }}>
              <div style={sectionHeader}>Personal and Check Information:</div>
              <div style={{ padding: "6px 8px" }}>
                <div>{employeeName}</div>
                <div>{employeeAddress}</div>
                <div>{employeeCity}</div>
                <div style={{ marginTop: 12 }}>
                  <strong>Pay Period:</strong> <span className="calc-val">{shortDate(data.payPeriodStart)} to {shortDate(data.payPeriodEnd)}</span>
                </div>
                <div><strong>Check Date:</strong> <span className="calc-val">{shortDate(data.payDate)}</span></div>
                <div><strong>Check #:</strong> <span className="calc-val">{data.adviceNumber || data.vchrNumber || "285034"}</span></div>
              </div>
            </section>

            <section>
              <div style={sectionHeader}>Net Pay Allocations</div>
              <div style={gridRow("1fr 72px 72px", { fontWeight: 700, fontSize: 9 })}>
                <div>Description</div>
                <div style={right}>This Period ($)</div>
                <div style={right}>YTD ($)</div>
              </div>
              <div style={gridRow("1fr 72px 72px")}>
                <div>Check Amount</div>
                <div style={right}><Amount>{money(0)}</Amount></div>
                <div style={right}><Amount>{money(0)}</Amount></div>
              </div>
              <div style={gridRow("1fr 72px 72px")}>
                <div>Chkg xxxx</div>
                <div style={right}><Amount>{money(data.netPay)}</Amount></div>
                <div style={right}><Amount>{money(data.netPay * priorPeriods)}</Amount></div>
              </div>
              <div style={gridRow("1fr 72px 72px", { fontWeight: 900 })}>
                <div>NET PAY</div>
                <div style={right}><Amount bold>{money(data.netPay)}</Amount></div>
                <div style={right}><Amount bold>{money(ytdNet)}</Amount></div>
              </div>
            </section>
          </aside>

          <section style={{ position: "relative" }}>
            <div style={{ minHeight: 164, borderBottom: "1px solid #777" }}>
              <div style={gridRow("1fr 108px 66px 58px 88px 88px", { fontSize: 9, fontWeight: 900, textTransform: "uppercase", borderBottom: "1px solid #111" })}>
                <div>Earnings</div>
                <div>Description</div>
                <div>Hrs/Units</div>
                <div>Rate</div>
                <div style={right}>This Period ($)</div>
                <div style={right}>YTD ($)</div>
              </div>
              <div style={gridRow("1fr 108px 66px 58px 88px 88px")}>
                <div />
                <div>Regular</div>
                <div style={right}>{data.payType === "salary" ? "" : money(regularHours)}</div>
                <div style={right}>{data.payType === "salary" ? "" : money(regularRate)}</div>
                <div style={right}><Amount>{money(regularPay)}</Amount></div>
                <div style={right}><Amount>{money(ytdGross)}</Amount></div>
              </div>
              <div style={{ ...gridRow("1fr 108px 66px 58px 88px 88px", { marginTop: 34, fontWeight: 900 }) }}>
                <div />
                <div>Total Hours</div>
                <div />
                <div />
                <div />
                <div />
              </div>
              <div style={gridRow("1fr 108px 66px 58px 88px 88px", { fontWeight: 900 })}>
                <div />
                <div>Gross Earnings</div>
                <div />
                <div />
                <div style={right}><Amount bold>{money(data.grossPay)}</Amount></div>
                <div style={right}><Amount bold>{money(ytdGross)}</Amount></div>
              </div>
              <div style={gridRow("1fr 108px 66px 58px 88px 88px", { fontWeight: 900 })}>
                <div />
                <div>Total Hrs</div>
                <div />
                <div />
                <div />
                <div />
              </div>
              <div style={gridRow("1fr 108px 66px 58px 88px 88px", { fontWeight: 900 })}>
                <div />
                <div>Worked</div>
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>

            <div style={{ minHeight: 364 }}>
              <div style={gridRow("1fr 108px 92px 88px 88px", { fontSize: 9, fontWeight: 900, textTransform: "uppercase", borderBottom: "1px solid #111" })}>
                <div>Withholdings</div>
                <div>Description</div>
                <div>Filing Status</div>
                <div style={right}>This Period ($)</div>
                <div style={right}>YTD ($)</div>
              </div>
              {[
                ["Fed Income Tax", taxStatus, data.federalTax, ytdFederal],
                ["Social Security", "", data.socialSecurity, ytdSocialSecurity],
                ["Medicare", "", data.medicare, ytdMedicare],
                ["GA State Tax", "", data.stateTax, ytdState],
              ].map(([label, status, current, ytd]) => (
                <div key={String(label)} style={gridRow("1fr 108px 92px 88px 88px")}>
                  <div />
                  <div>{label}</div>
                  <div>{status}</div>
                  <div style={right}><Amount>{money(Number(current))}</Amount></div>
                  <div style={right}><Amount>{money(Number(ytd))}</Amount></div>
                </div>
              ))}
              <div style={gridRow("1fr 108px 92px 88px 88px", { fontWeight: 900 })}>
                <div />
                <div>TOTAL</div>
                <div />
                <div style={right}><Amount bold>{money(data.totalDeductions)}</Amount></div>
                <div style={right}><Amount bold>{money(ytdTotalDeductions)}</Amount></div>
              </div>
            </div>

            <footer style={{ position: "absolute", left: 8, right: 8, bottom: 0, display: "grid", gridTemplateColumns: "1fr 150px 150px", borderTop: "1px solid #111", minHeight: 42 }}>
              <div style={{ fontWeight: 900, alignSelf: "start", paddingTop: 7 }}>NET PAY</div>
              <div style={{ borderLeft: "1px solid #777" }}>
                <div style={{ textAlign: "center", fontSize: 9, paddingTop: 4 }}>THIS PERIOD ($)</div>
                <div style={{ textAlign: "right", fontWeight: 900, padding: "8px 10px 0 0" }}><Amount bold>{money(data.netPay)}</Amount></div>
              </div>
              <div style={{ borderLeft: "1px solid #777" }}>
                <div style={{ textAlign: "center", fontSize: 9, paddingTop: 4 }}>YTD ($)</div>
                <div style={{ textAlign: "right", fontWeight: 900, padding: "8px 10px 0 0" }}><Amount bold>{money(ytdNet)}</Amount></div>
              </div>
            </footer>
          </section>
        </main>

        <footer style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, color: "#8a8a8a", fontSize: 9, padding: "8px 12px 0" }}>
          <div>Payrolls by Paychex, Inc.</div>
          <div style={{ color: "#111" }}>{companyName} {companyAddress} {companyCity}</div>
        </footer>
      </div>
    </div>
  )
}

function KTownesTemplatePreview({ data, templateKey }: { data: GeneratorPaystubData; templateKey: string }) {
  const payPeriodNumber = data.payPeriodNumber || 1
  const regularHours = data.regularHours || data.hoursWorked || 0
  const regularRate = data.payType === "hourly" ? data.hourlyRate || data.regularRate || 0 : 0
  const regularPay = data.grossPay || (data.payType === "hourly" ? regularRate * regularHours : data.salary || 0)
  const ytdGross = data.ytdGrossPay || data.grossPay * payPeriodNumber
  const ytdFederal = data.ytdFederalTax || data.federalTax * payPeriodNumber
  const ytdState = data.ytdStateTax || data.stateTax * payPeriodNumber
  const ytdSocialSecurity = data.ytdSocialSecurity || data.socialSecurity * payPeriodNumber
  const ytdMedicare = data.ytdMedicare || data.medicare * payPeriodNumber
  const ytdTotalDeductions = data.ytdTotalDeductions || data.totalDeductions * payPeriodNumber
  const ytdNet = data.ytdNetPay || data.netPay * payPeriodNumber
  const companyCityLine = [data.companyCity, data.companyState, data.companyZip].filter(Boolean).join(" ")
  const employeeCityLine = [data.employeeCity, data.employeeState, data.employeeZip].filter(Boolean).join(" ")
  const companyName = data.companyName || "Jenkingtown Window Cleaning Co"
  const companyAddress = data.companyAddress || "1445 North 32nd Street,"
  const companyCity = companyCityLine || "Philadelphia, PA 19121"
  const employeeName = data.employeeName || "Kareem J Townes"
  const employeeAddress = data.employeeAddress || "2225 Gerritt Street,"
  const employeeCity = employeeCityLine || "Philadelphia, PA 19146"
  const checkNumber = data.adviceNumber || data.vchrNumber || "1236"
  const blue = "#2f4f9f"
  const light = "#eef1f6"
  const mid = "#d7dde8"
  const right: CSSProperties = { textAlign: "right" }

  const pageStyle: CSSProperties = {
    width: 860,
    minHeight: 1114,
    margin: "0 auto",
    background: "#fff",
    color: "#333",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 12,
    lineHeight: 1.22,
    position: "relative",
    overflow: "hidden",
    padding: "44px 48px 52px",
  }
  const blueHeader = (columns: string): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: columns,
    alignItems: "center",
    minHeight: 30,
    background: blue,
    color: "#fff",
    fontWeight: 700,
    fontSize: 11,
    lineHeight: 1.05,
    padding: "0 10px",
    columnGap: 8,
    boxSizing: "border-box",
    overflow: "hidden",
  })
  const row = (columns: string, extra: CSSProperties = {}): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: columns,
    columnGap: 8,
    padding: "7px 8px",
    boxSizing: "border-box",
    ...extra,
  })

  return (
    <div id="paystub-capture-target" data-template={templateKey} className="bg-white overflow-x-auto p-4">
      <div data-pdf-page="true" style={pageStyle}>
        <header>
          <div style={{ fontSize: 22, marginBottom: 16 }}>{companyName}</div>
          <div style={{ fontSize: 10 }}>{companyAddress}</div>
          <div style={{ fontSize: 10 }}>{companyCity}</div>
          <div style={{ position: "absolute", right: 64, top: 98 }} className="calc-val">{shortDate(data.payDate)}</div>
        </header>

        <section style={{ marginTop: 34, background: light, display: "grid", gridTemplateColumns: "1fr 150px", minHeight: 76, alignItems: "center", padding: "0 16px", boxSizing: "border-box" }}>
          <div>
            Pay Two Thousand Five Hundred Seven Dollars And Fifty-two Cents
          </div>
          <div style={{ textAlign: "right" }}>
            <div>$ <Amount>{money(data.netPay)}</Amount></div>
            <div style={{ fontSize: 10, fontWeight: 700, marginTop: 8 }}>This is not a check</div>
          </div>
        </section>

        <section style={{ marginTop: 24, display: "grid", gridTemplateColumns: "150px 1fr" }}>
          <div style={{ color: "#999" }}>Pay to the order of</div>
          <div style={{ fontSize: 14 }}>
            <div>{employeeName}</div>
            <div>{employeeAddress}</div>
            <div>{employeeCity}</div>
          </div>
        </section>

        <section style={{ marginTop: 34, display: "grid", gridTemplateColumns: "1fr 220px", alignItems: "end" }}>
          <div style={{ fontSize: 10 }}>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyCity}</div>
            <div>{formatPhone(data.companyPhone) || "(215) 887-6777"}</div>
          </div>
          <div style={{ color: blue, fontSize: 15, fontWeight: 700, textAlign: "right" }}>Earnings Statement</div>
        </section>

        <section style={{ marginTop: 16 }}>
          <div style={blueHeader("1.55fr 1fr 1fr 1fr 1fr 1fr")}>
            <div>Employee Information</div>
            <div>Social Sec. ID</div>
            <div>Employee ID</div>
            <div>Start Date</div>
            <div>End Date</div>
            <div>Check Date</div>
          </div>
          <div style={row("1.55fr 1fr 1fr 1fr 1fr 1fr", { minHeight: 62, fontSize: 11, lineHeight: 1.15 })}>
            <div>
              <div>{employeeName}</div>
              <div>{employeeAddress}</div>
              <div>{employeeCity}</div>
            </div>
            <div>{maskSSN(data.employeeSSN)}</div>
            <div>{data.employeeId || ""}</div>
            <div className="calc-val">{shortDate(data.payPeriodStart)}</div>
            <div className="calc-val">{shortDate(data.payPeriodEnd)}</div>
            <div className="calc-val">{shortDate(data.payDate)}</div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.16fr 1fr", marginTop: 12 }}>
          <div>
            <div style={blueHeader("1.18fr 76px 76px 96px 112px")}>
              <div>Earnings</div>
              <div>Rate</div>
              <div>Hours</div>
              <div>Current</div>
              <div>Year to Date</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.18fr 76px 76px 96px 112px", minHeight: 250 }}>
              <div style={{ background: light, padding: "12px 8px", lineHeight: 1.15 }}>Regular Earnings</div>
              <div style={{ padding: "10px 8px" }}><Amount>{money(regularRate)}</Amount></div>
              <div style={{ padding: "10px 8px" }}><Amount>{money(regularHours)}</Amount></div>
              <div style={{ padding: "10px 8px" }}><Amount>{money(regularPay)}</Amount></div>
              <div style={{ padding: "10px 8px" }}><Amount>{money(ytdGross)}</Amount></div>
            </div>
          </div>

          <div>
            <div style={blueHeader("1.42fr 84px 104px")}>
              <div>Deductions</div>
              <div>Current</div>
              <div>Year to Date</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.42fr 84px 104px", minHeight: 250 }}>
              <div style={{ background: light, padding: "12px 8px", lineHeight: 1.15 }}>
                <div>Federal Tax</div>
                <div>Pennsylvania State Tax</div>
                <div>SUI</div>
                <div>Social Security</div>
                <div>Medicare</div>
              </div>
              <div style={{ padding: "10px 8px", textAlign: "right" }}>
                <div><Amount>{money(data.federalTax)}</Amount></div>
                <div><Amount>{money(data.stateTax)}</Amount></div>
                <div><Amount>{money(data.stateDisability || 0)}</Amount></div>
                <div><Amount>{money(data.socialSecurity)}</Amount></div>
                <div><Amount>{money(data.medicare)}</Amount></div>
              </div>
              <div style={{ padding: "10px 8px", textAlign: "right" }}>
                <div><Amount>{money(ytdFederal)}</Amount></div>
                <div><Amount>{money(ytdState)}</Amount></div>
                <div><Amount>{money((data.stateDisability || 0) * payPeriodNumber)}</Amount></div>
                <div><Amount>{money(ytdSocialSecurity)}</Amount></div>
                <div><Amount>{money(ytdMedicare)}</Amount></div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.16fr 1fr" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.18fr 76px 76px 96px 112px", background: mid, minHeight: 36, alignItems: "center", fontWeight: 700 }}>
            <div style={{ background: blue, color: "#fff", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1.05, fontSize: 11, padding: "0 6px", boxSizing: "border-box" }}>Gross Earnings</div>
            <div />
            <div />
            <div style={right}><Amount>{money(data.grossPay)}</Amount></div>
            <div style={{ ...right, paddingRight: 8 }}><Amount>{money(ytdGross)}</Amount></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.42fr 84px 104px", background: mid, minHeight: 36, alignItems: "center", fontWeight: 700 }}>
            <div style={{ background: blue, color: "#fff", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1.05, fontSize: 11, padding: "0 6px", boxSizing: "border-box" }}>Gross Deductions</div>
            <div style={right}><Amount>{money(data.totalDeductions)}</Amount></div>
            <div style={{ ...right, paddingRight: 8 }}><Amount>{money(ytdTotalDeductions)}</Amount></div>
          </div>
        </section>

        <section style={{ width: 230, marginLeft: "auto", marginTop: 28, fontSize: 14 }}>
          {[
            ["Check No.", `# ${checkNumber}`],
            ["Net Pay", `$${money(data.netPay)}`],
            ["YTD Net Pay", `$${money(ytdNet)}`],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "118px 1fr", minHeight: 31, marginTop: 3 }}>
              <div style={{ background: blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{label}</div>
              <div style={{ background: mid, display: "flex", alignItems: "center", justifyContent: "center" }} className="calc-val">{value}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

function HectorTemplatePreview({ data, templateKey }: { data: GeneratorPaystubData; templateKey: string }) {
  const payPeriodNumber = data.payPeriodNumber || 1
  const regularHours = data.regularHours || data.hoursWorked || 0
  const regularRate = data.payType === "hourly" ? data.hourlyRate || data.regularRate || 0 : 0
  const regularPay = data.grossPay || (data.payType === "hourly" ? regularRate * regularHours : data.salary || 0)
  const ytdGross = data.ytdGrossPay || data.grossPay * payPeriodNumber
  const ytdFederal = data.ytdFederalTax || data.federalTax * payPeriodNumber
  const ytdSocialSecurity = data.ytdSocialSecurity || data.socialSecurity * payPeriodNumber
  const ytdMedicare = data.ytdMedicare || data.medicare * payPeriodNumber
  const ytdDeductions = data.ytdTotalDeductions || data.totalDeductions * payPeriodNumber
  const ytdNet = data.ytdNetPay || data.netPay * payPeriodNumber
  const companyCityLine = [data.companyCity, data.companyState, data.companyZip].filter(Boolean).join(" ")
  const employeeCityLine = [data.employeeCity, data.employeeState, data.employeeZip].filter(Boolean).join(" ")
  const companyName = data.companyName || "LASER SHIP"
  const companyAddress = data.companyAddress || "9201 King Palm Dr"
  const companyCity = companyCityLine || "Tampa, FL 33619"
  const employeeName = data.employeeName || "HECTOR CINTRON"
  const employeeSsn = maskSSN(data.employeeSSN || "000001850")
  const checkNumber = data.adviceNumber || data.vchrNumber || "2831"
  const payRecord = `${shortDate(data.payPeriodStart)} - ${shortDate(data.payPeriodEnd)}`
  const blue = "#2d56ad"
  const light = "#ececec"
  const right: CSSProperties = { textAlign: "right" }

  const pageStyle: CSSProperties = {
    width: 1120,
    minHeight: 760,
    margin: "0 auto",
    background: "#fff",
    color: "#333",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 16,
    lineHeight: 1.18,
    position: "relative",
    overflow: "hidden",
    padding: "36px 20px 34px",
  }
  const blueHeader = (columns: string): CSSProperties => ({
    display: "grid",
    gridTemplateColumns: columns,
    alignItems: "center",
    minHeight: 50,
    background: blue,
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    columnGap: 16,
    padding: "0 16px",
    boxSizing: "border-box",
  })

  return (
    <div id="paystub-capture-target" data-template={templateKey} className="bg-white overflow-x-auto p-4">
      <div data-pdf-page="true" style={pageStyle}>
        <header style={{ display: "grid", gridTemplateColumns: "1fr 430px", alignItems: "start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20 }}>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyCity}</div>
          </div>
          <div style={{ color: blue, fontSize: 23, fontWeight: 800, textAlign: "right", paddingTop: 4 }}>
            Earnings Statement
          </div>
        </header>

        <section>
          <div style={blueHeader("1.42fr 1fr 1fr 0.8fr 1.48fr 0.9fr")}>
            <div>Employee Name</div>
            <div>Social Sec. ID</div>
            <div>Employee ID</div>
            <div>Check No.</div>
            <div>Pay Record</div>
            <div>Pay Date</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.42fr 1fr 1fr 0.8fr 1.48fr 0.9fr", minHeight: 54, alignItems: "center", columnGap: 16, padding: "0 16px", boxSizing: "border-box" }}>
            <div>{employeeName}</div>
            <div className="calc-val">{employeeSsn}</div>
            <div>{data.employeeId || ""}</div>
            <div className="calc-val">{checkNumber}</div>
            <div className="calc-val">{payRecord}</div>
            <div className="calc-val">{shortDate(data.payDate)}</div>
          </div>
        </section>

        <section>
          <div style={blueHeader("1.3fr 0.72fr 0.72fr 0.95fr 1.58fr 0.95fr 1.05fr")}>
            <div>Earnings</div>
            <div>Rate</div>
            <div>Hours</div>
            <div>Current</div>
            <div>Deductions</div>
            <div>Current</div>
            <div>Year to Date</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.72fr 0.72fr 0.95fr 1.58fr 0.95fr 1.05fr", minHeight: 214 }}>
            <div style={{ background: light, padding: "28px 12px", fontSize: 18 }}>Regular Earnings</div>
            <div style={{ padding: "28px 12px", ...right }}><Amount>{regularRate ? money(regularRate) : ""}</Amount></div>
            <div style={{ padding: "28px 12px", ...right }}><Amount>{regularHours ? money(regularHours) : ""}</Amount></div>
            <div style={{ padding: "28px 12px", ...right }}><Amount>{money(regularPay)}</Amount></div>
            <div style={{ background: light, padding: "28px 28px", fontSize: 18 }}>
              <div>Federal Tax</div>
              <div>Social Security</div>
              <div>Medicare</div>
            </div>
            <div style={{ padding: "28px 12px", ...right }}>
              <div><Amount>{money(data.federalTax)}</Amount></div>
              <div><Amount>{money(data.socialSecurity)}</Amount></div>
              <div><Amount>{money(data.medicare)}</Amount></div>
            </div>
            <div style={{ padding: "28px 36px 28px 12px", ...right }}>
              <div><Amount>{money(ytdFederal)}</Amount></div>
              <div><Amount>{money(ytdSocialSecurity)}</Amount></div>
              <div><Amount>{money(ytdMedicare)}</Amount></div>
            </div>
          </div>
        </section>

        <section>
          <div style={blueHeader("1fr 1fr 1fr 1fr 1.38fr 1fr")}>
            <div>YTD Gross</div>
            <div>YTD Deductions</div>
            <div>YTD Net Pay</div>
            <div>Current Total</div>
            <div>Current Deductions</div>
            <div>Net Pay</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1.38fr 1fr", minHeight: 70, alignItems: "center", columnGap: 18, padding: "0 18px", boxSizing: "border-box", fontSize: 17 }}>
            <div><Amount>{money(ytdGross)}</Amount></div>
            <div><Amount>{money(ytdDeductions)}</Amount></div>
            <div>$ <Amount>{money(ytdNet)}</Amount></div>
            <div><Amount>{money(data.grossPay)}</Amount></div>
            <div><Amount>{money(data.totalDeductions)}</Amount></div>
            <div>$ <Amount>{money(data.netPay)}</Amount></div>
          </div>
        </section>
      </div>
    </div>
  )
}

export function PdfTemplatePreview({ data, templateName, templateKey }: PdfTemplatePreviewProps) {
  if (templateKey === "hector-cintron") {
    return <HectorTemplatePreview data={data} templateKey={templateKey} />
  }

  if (templateKey === "ktownes-stubs") {
    return <KTownesTemplatePreview data={data} templateKey={templateKey} />
  }

  if (templateKey === "charles-04-01") {
    return <CharlesTemplatePreview data={data} templateKey={templateKey} />
  }

  if (templateKey === "alyssa-03-27") {
    return <AlyssaTemplatePreview data={data} templateKey={templateKey} />
  }

  if (templateKey === "spencer-05-15") {
    return <SpencerTemplatePreview data={data} templateKey={templateKey} />
  }

  if (templateKey === "stefanie-05-22") {
    return <StefanieTemplatePreview data={data} templateKey={templateKey} />
  }

  const payPeriodNumber = data.payPeriodNumber || 1
  const priorPeriods = Math.max(0, payPeriodNumber - 1)
  const regularHours = data.regularHours || data.hoursWorked || 0
  const regularRate = data.payType === "hourly" ? data.hourlyRate || data.regularRate || 0 : data.salary || data.regularRate || 0
  const regularPay = data.grossPay || (data.payType === "hourly" ? regularRate * regularHours : 0)
  const ytdGross = data.grossPay * payPeriodNumber
  const ytdFederal = data.federalTax * payPeriodNumber
  const ytdState = data.stateTax * payPeriodNumber
  const ytdSocialSecurity = data.socialSecurity * payPeriodNumber
  const ytdMedicare = data.medicare * payPeriodNumber
  const ytdTotalDeductions = data.totalDeductions * payPeriodNumber
  const ytdNet = data.netPay * payPeriodNumber
  const priorYtdNet = data.netPay * priorPeriods
  const netCheck = data.netPay || 0
  const taxStatus = data.maritalStatus === "married" ? "Married" : "Single"
  const companyCityLine = [data.companyCity, data.companyState, data.companyZip].filter(Boolean).join(" ")
  const employeeCityLine = [data.employeeCity, data.employeeState, data.employeeZip].filter(Boolean).join(" ")
  const accountSuffix = (data.employeeSSN || "8373").slice(-4)
  const isJose = templateKey === "jose-06-05"
  const joseUsesSampleDefaults = isJose && !data.employeeName && !data.companyName
  const josePage: CSSProperties = {
    ...page,
    width: 860,
    height: 1114,
    minHeight: 1114,
    border: "2px solid #111",
    padding: "18px 30px 24px",
    fontSize: 10,
    lineHeight: 1.08,
  }
  const joseCompany = data.companyName || "J PRICE ENERGY SERVICES LLC"
  const joseCompanyAddress = data.companyAddress || "PO BOX 485"
  const joseCompanyCity = companyCityLine || "MADILL, OK 73446"
  const joseEmployee = data.employeeName || "JOSE VALDEZ"
  const joseEmployeeAddress = data.employeeAddress || "4111 NORTH ALAMO STREET"
  const joseEmployeeCity = employeeCityLine || "FORT STOCKTON TX 79735"
  const josePayStart = shortDate(data.payPeriodStart) || "05/18/2026"
  const josePayEnd = shortDate(data.payPeriodEnd) || "05/31/2026"
  const josePayDate = shortDate(data.payDate) || "06/05/2026"
  const joseAdviceNumber = data.adviceNumber || data.vchrNumber || "00000351903"
  const joseRegularRate = joseUsesSampleDefaults ? 34 : regularRate || 34
  const joseRegularHours = joseUsesSampleDefaults ? 80 : regularHours || 80
  const joseRegularPay = joseUsesSampleDefaults ? 2720 : regularPay || 2720
  const joseYtdGross = joseUsesSampleDefaults ? 29920 : ytdGross || 29920
  const joseFederal = joseUsesSampleDefaults ? 294.38 : data.federalTax || 294.38
  const joseSocialSecurity = joseUsesSampleDefaults ? 168.64 : data.socialSecurity || 168.64
  const joseMedicare = joseUsesSampleDefaults ? 39.44 : data.medicare || 39.44
  const joseYtdFederal = joseUsesSampleDefaults ? 3238.18 : ytdFederal || 3238.18
  const joseYtdSocialSecurity = joseUsesSampleDefaults ? 1855.04 : ytdSocialSecurity || 1855.04
  const joseYtdMedicare = joseUsesSampleDefaults ? 433.84 : ytdMedicare || 433.84
  const joseDeductions = joseUsesSampleDefaults ? 502.46 : data.totalDeductions || 502.46
  const joseNetPay = joseUsesSampleDefaults ? 2217.54 : data.netPay || 2217.54
  const joseHeader: CSSProperties = {
    display: "grid",
    alignItems: "end",
    borderBottom: "0.5px solid #111",
    fontWeight: 700,
    paddingBottom: 6,
    lineHeight: 1,
  }
  const joseSmallLabel: CSSProperties = {
    alignSelf: "end",
    justifySelf: "center",
    background: "#fff",
    padding: "0 2px 1px",
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    lineHeight: 1,
    whiteSpace: "nowrap",
  }
  const joseSummaryLabel: CSSProperties = {
    border: "0.5px solid #d2d2d2",
    background:
      "repeating-linear-gradient(-18deg, #f3f3f3 0, #f3f3f3 1px, #ffffff 1px, #ffffff 3px)",
    padding: "3px 6px",
    fontWeight: 800,
  }

  return (
    <div id="paystub-capture-target" data-template={templateKey} className="bg-white overflow-x-auto p-4">
      <div data-pdf-page="true" style={isJose ? josePage : page}>
        <div
          data-template-watermark
          style={{
            position: "absolute",
            left: isJose ? 92 : 110,
            top: isJose ? 610 : 610,
            transform: "rotate(-19deg)",
            color: "rgba(78,78,78,0.36)",
            fontSize: isJose ? 46 : 92,
            fontWeight: 800,
            letterSpacing: isJose ? 2 : 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {isJose ? "SAMPLE - NOT A CHECK" : "PREVIEW ONLY"}
        </div>

        <header style={{ display: "grid", gridTemplateColumns: "1fr 1fr 88px", gap: 22, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: 8, width: 270, marginLeft: 88, marginBottom: 15 }}>
              <HashBox label="CO." value={data.coNumber || "AE7"} />
              <HashBox label="FILE" value={data.fileNumber || "000000"} />
              <HashBox label="DEPT." value={data.deptNumber || "000130"} />
              <HashBox label="CLOCK" value={data.clockNumber || "0000"} />
              <HashBox label="VCHR. NO." value={data.vchrNumber || "030"} />
            </div>

            <div style={{ fontStyle: "italic", fontWeight: 700, marginLeft: 90, marginTop: 8 }}>
              {joseCompany}
            </div>
            <div style={{ fontStyle: "italic", marginLeft: 90 }}>{joseCompanyAddress}</div>
            <div style={{ fontStyle: "italic", marginLeft: 90 }}>{joseCompanyCity}</div>
          </div>

          <div style={{ paddingTop: 12 }}>
            <h1 style={{ fontSize: 22, lineHeight: 1, margin: "0 0 20px", fontWeight: 800 }}>Earnings Statement</h1>
            <InfoLine label="Period Start:" value={josePayStart} />
            <InfoLine label="Period Ending:" value={josePayEnd} />
            <InfoLine label="Pay Date:" value={josePayDate} />
          </div>

          <div style={{ paddingTop: 14, textAlign: "right" }}>
            {data.companyLogo ? (
              <img
                src={data.companyLogo}
                alt="Company logo"
                style={{ maxWidth: 92, maxHeight: 54, marginLeft: "auto", objectFit: "contain", display: "block" }}
              />
            ) : (
              <div style={{ fontSize: 30, lineHeight: 0.9, fontWeight: 900, letterSpacing: -2 }}>SRS</div>
            )}
          </div>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 76, marginTop: 38 }}>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "122px 1fr", columnGap: 8, fontSize: 9, marginLeft: 90 }}>
              <span>Taxable Marital Status:</span>
              <span className="calc-val">{taxStatus}</span>
              <span>Exemptions/Allowances:</span>
              <span />
              <span style={{ paddingLeft: 28 }}>Federal:</span>
              <span className="calc-val">{data.exemptions || 0}</span>
              <span style={{ paddingLeft: 28 }}>GA:</span>
              <span className="calc-val">{data.exemptions || 0}</span>
            </div>
            <div style={{ marginTop: 22, marginLeft: 90, fontSize: 9 }}>
              Social Security Number: <span className="calc-val" style={{ marginLeft: 26 }}>{maskSSN(data.employeeSSN)}</span>
            </div>
          </div>

          <div style={{ paddingTop: 22, paddingLeft: 12, fontSize: 15, lineHeight: 1.02, fontWeight: 800, textTransform: "uppercase" }}>
            <div className="calc-val">{joseEmployee}</div>
            <div className="calc-val">{joseEmployeeAddress}</div>
            <div className="calc-val">{joseEmployeeCity}</div>
          </div>
        </section>

        <main style={{ display: "grid", gridTemplateColumns: "1.08fr 0.92fr", gap: 36, marginTop: 35 }}>
          <section>
            <div style={{ ...(isJose ? joseHeader : sectionHeader), gridTemplateColumns: "1fr 68px 68px 88px 102px" }}>
              <div style={{ fontSize: 13, textDecoration: "underline" }}>Earnings</div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "rate" : <SmallLabel>rate</SmallLabel>}</div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "hours" : <SmallLabel>hours</SmallLabel>}</div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "this period" : <SmallLabel>this period</SmallLabel>}</div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "year to date" : <SmallLabel>year to date</SmallLabel>}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 68px 68px 88px 102px", paddingTop: 4, fontSize: 9 }}>
              <div>Regular</div>
              <div style={{ textAlign: "right" }}><Amount>{money(joseRegularRate)}</Amount></div>
              <div style={{ textAlign: "right" }}><Amount>{money(joseRegularHours)}</Amount></div>
              <div style={{ textAlign: "right" }}><Amount>{money(joseRegularPay)}</Amount></div>
              <div style={{ textAlign: "right" }}><Amount>{money(joseYtdGross)}</Amount></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 102px", marginTop: 24, alignItems: "center", fontSize: 9 }}>
              <div style={isJose ? joseSummaryLabel : summaryLabel}>Gross Pay</div>
              <div style={{ textAlign: "right", paddingRight: 6 }}><Amount bold>{money(joseRegularPay)}</Amount></div>
              <div style={{ textAlign: "right" }}><Amount>{money(joseYtdGross)}</Amount></div>
            </div>

            <div style={{ ...(isJose ? joseHeader : sectionHeader), gridTemplateColumns: "1fr 88px 102px", marginTop: 28 }}>
              <div style={{ fontSize: 13, textDecoration: "underline" }}>Deductions <span style={{ marginLeft: 38, fontSize: 11, textDecoration: "none" }}>Statutory</span></div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "this period" : <SmallLabel>this period</SmallLabel>}</div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "year to date" : <SmallLabel>year to date</SmallLabel>}</div>
            </div>

            {[
              ["Federal Tax", joseFederal, joseYtdFederal],
              ["Social Security Tax", joseSocialSecurity, joseYtdSocialSecurity],
              ["Medicare Tax", joseMedicare, joseYtdMedicare],
            ].map(([label, current, ytd]) => (
              <div key={String(label)} style={{ display: "grid", gridTemplateColumns: "1fr 88px 102px", paddingTop: 4, fontSize: 9 }}>
                <div style={{ paddingLeft: 98 }}>{label}</div>
                <div style={{ textAlign: "right" }}><Amount>{money(Number(current))}</Amount></div>
                <div style={{ textAlign: "right" }}><Amount>{money(Number(ytd))}</Amount></div>
              </div>
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 102px", marginTop: 8, alignItems: "center", fontSize: 9 }}>
              <div style={isJose ? joseSummaryLabel : summaryLabel}>Deduction Total</div>
              <div style={{ textAlign: "right" }}><Amount bold>{money(joseDeductions)}</Amount></div>
              <div style={{ textAlign: "right" }}><Amount>{money(joseFederal + joseSocialSecurity + joseMedicare)}</Amount></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 102px", marginTop: 8, alignItems: "center", fontSize: 9 }}>
              <div style={isJose ? joseSummaryLabel : summaryLabel}>Net Pay</div>
              <div style={{ textAlign: "right" }}><Amount bold>{money(joseNetPay)}</Amount></div>
              <div style={{ textAlign: "right" }}><Amount>{money(joseYtdGross - (joseYtdFederal + joseYtdSocialSecurity + joseYtdMedicare))}</Amount></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 102px", paddingTop: 5, fontSize: 9 }}>
              <div style={{ paddingLeft: 98 }}>Checking</div>
              <div style={{ textAlign: "right" }}><Amount>{money(-joseNetPay)}</Amount></div>
              <div style={{ textAlign: "right" }}><Amount>{money(0)}</Amount></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 102px", marginTop: 5, alignItems: "center", fontSize: 9 }}>
              <div style={isJose ? joseSummaryLabel : summaryLabel}>Net Check</div>
              <div style={{ textAlign: "right" }}><Amount bold>{money(0)}</Amount></div>
              <div />
            </div>

            <div style={{ marginTop: 22, paddingLeft: 16, fontWeight: 800, fontSize: 9 }}>* Excluded from federal taxable wages</div>
            <div style={{ marginTop: 10, paddingLeft: 16, fontSize: 9 }}>
              Your federal taxable wages this period are <Amount>{money(joseRegularPay)}</Amount>
            </div>
          </section>

          <section>
            <div style={{ ...(isJose ? joseHeader : sectionHeader), gridTemplateColumns: "1fr 92px 102px" }}>
              <div style={{ fontSize: 13, textDecoration: "underline", lineHeight: 1 }}>Other Benefits and<br />Information</div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "this period" : <SmallLabel>this period</SmallLabel>}</div>
              <div style={isJose ? joseSmallLabel : undefined}>{isJose ? "total to date" : <SmallLabel>total to date</SmallLabel>}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 92px 102px", rowGap: 4, padding: "6px 0 24px", fontSize: 9 }}>
              <div>BASIS OF PAY: {data.payType === "salary" ? "SALARY" : "HOURLY"}</div>
              <div />
              <div />
            </div>

            <div style={{ borderBottom: "0.5px solid #111", fontWeight: 700, fontSize: 13, marginTop: 8, paddingBottom: 6, textDecoration: "underline" }}>Information</div>
            <div style={{ paddingTop: 8, fontSize: 9 }}>COMPANY PH# {formatPhone(data.companyPhone) || "(580) 786-0575"}</div>
          </section>
        </main>

        <footer style={{ position: "absolute", left: 142, right: 30, bottom: 118 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, marginBottom: 22, fontSize: 9 }}>
            <div style={{ fontStyle: "italic", fontWeight: 700 }}>
              <div>{joseCompany}</div>
              <div>{joseCompanyAddress}</div>
              <div>{joseCompanyCity}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", rowGap: 6 }}>
              <strong>Advice number:</strong>
              <strong className="calc-val">{joseAdviceNumber}</strong>
              <span>Pay date:</span>
              <span className="calc-val">{josePayDate}</span>
            </div>
          </div>

          <div style={{ borderTop: "0.5px solid #111", paddingTop: 8, display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr 0.7fr 0.9fr", gap: 12, fontSize: 9, fontWeight: 700 }}>
            <div>Deposited to the account of</div>
            <div>Account number</div>
            <div>Transit</div>
            <div>ABA</div>
            <div style={{ textAlign: "right" }}>Amount</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr 0.7fr 0.9fr", gap: 12, fontSize: 9, paddingTop: 6 }}>
            <strong className="calc-val">{joseEmployee}</strong>
            <span className="calc-val">{data.accountNumber || `xxxxx${accountSuffix}`}</span>
            <span className="calc-val">{data.transitNumber || "xxxx"}</span>
            <span className="calc-val">{data.abaNumber || "xxxx"}</span>
            <strong className="calc-val" style={{ textAlign: "right" }}>${money(joseNetPay)}</strong>
          </div>
          <div style={{ position: "absolute", right: 52, bottom: -54, fontSize: 18, fontWeight: 900 }}>NON-NEGOTIABLE</div>
        </footer>
      </div>
    </div>
  )
}
