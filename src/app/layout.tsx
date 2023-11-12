import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from './providers/themeProvider'
import ThemeButton from '@/components/ThemeButton'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { NextAuthProvider } from './providers/nextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ceiling Challenge Voting',
  description: 'Ceiling Challenge',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <NextAuthProvider>
            <Suspense fallback={<h2>Toggle Theme</h2>}>
              <ThemeButton />
            </Suspense>
            {children}
            <Toaster richColors position='top-right' closeButton />
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
