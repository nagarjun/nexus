import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

const noto = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nexus',
  description: "Nag's very own super app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${noto.className} antialiased transition-all`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="bg-slate-100 dark:bg-slate-800 dark:text-slate-200 w-screen min-h-screen">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
