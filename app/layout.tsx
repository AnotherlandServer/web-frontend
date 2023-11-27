import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anotherland registration'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="fixed left-0 top-0 flex w-full drop-shadow-[0_50px_50px_#00000070]" id="anotherland-logo">
          </div>
          <div className="flex flex-col items-center p-10 bg-[#540d45] border border-[#a62a82] rounded-xl shadow-xl shadow-[#7c1b6a]">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
