// Copyright (C) 2023 Anotherland-Web-Frontend
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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
