import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight : ['300', '400', '500'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Insulin Supply Calculator',
  description: 'A web app that facilitate calculation of insulin supply for a patient',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
