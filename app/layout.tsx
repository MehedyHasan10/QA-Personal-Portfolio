import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Md. Mehedy Hasan Siam - QA Engineer Portfolio",
  description:
    "Professional portfolio of Md. Mehedy Hasan Siam, QA Automation Engineer specializing in manual testing, automated testing, and performance monitoring.",
  keywords: [
    "QA Engineer",
    "Quality Assurance",
    "Test Automation",
    "Selenium",
    "Java",
    "Manual Testing",
    "API Testing",
    "Performance Testing",
    "JIRA",
    "TestNG",
    "Cucumber",
    "BDD",
  ],
  authors: [{ name: "Md. Mehedy Hasan Siam" }],
  creator: "Md. Mehedy Hasan Siam",
  openGraph: {
    title: "Md. Mehedy Hasan Siam - QA Engineer Portfolio",
    description: "Professional QA Automation Engineer with expertise in manual and automated testing",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Mehedy Hasan Siam - QA Engineer Portfolio",
    description: "Professional QA Automation Engineer with expertise in manual and automated testing",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
