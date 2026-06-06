'use client'

export default function DashboardLayout({ children }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      padding: "24px",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      {children}
    </div>
  )
}