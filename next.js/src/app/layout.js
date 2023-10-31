import '@/global/global.scss'
import localFont from 'next/font/local'
import Nav from '@/components/organisms/Nav'
import Footer from '@/components/organisms/Footer'
import SmoothScroll from '@/utils/SmoothScroll'
import SchemaOrganization from '@/global/Schema/Organization'
import { locale } from '@/global/Seo'

const Oranienbaum = localFont({
  src: [
    {
      path: '../assets/fonts/Oranienbaum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  fallback: ['serif']
})

export default function RootLayout({ children }) {
  return (
    <html lang={locale}>
      <head>
        <SchemaOrganization />
      </head>
      <body className={`${Oranienbaum.className}`}>
        <Nav />
        <SmoothScroll>
          <main id="main">
            {children}
          </main>
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  )
}