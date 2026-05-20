import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Aprende IPA',
  description: 'Aprende el Alfabeto Fonético Internacional con repetición espaciada',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} dark h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
