import "@/global/global.scss";
import localFont from "next/font/local";
import Nav from "@/components/organisms/Nav";
import Footer from "@/components/organisms/Footer";
import SmoothScroll from "@/utils/SmoothScroll";
import SchemaOrganization from "@/global/Schema/Organization";
import { locale } from "@/global/Seo";
import Provider from "./cart-provider";

const Oranienbaum = localFont({
  src: [
    {
      path: "../assets/fonts/Oranienbaum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["serif"],
});

const Kapakana = localFont({
  src: [
    {
      path: "../assets/fonts/Kapakana.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["serif"],
  variable: "--kapakana-font",
});

export const viewport = {
  themeColor: "#FBF7F6",
};

export const links = [
  {
    name: "СОТРУДНИЧЕСТВО",
    href: "/cooperation",
  },
  {
    name: "О БРЕНДЕ",
    href: "/about-us",
  },
  {
    name: "КОНТАКТ",
    href: "/contact",
  },
  {
    name: "АКАДЕМИЯ",
    href: "/academy",
  },
  {
    name: "БЛОГ",
    href: "/blog",
  },
  {
    name: "КУРСЫ",
    href: "/courses",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang={locale}>
      <head>
        <SchemaOrganization />
      </head>
      <Provider>
        <body className={`${Oranienbaum.className} ${Kapakana.variable}`}>
          <Nav />
          <SmoothScroll>
            <main id="main">{children}</main>
          </SmoothScroll>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
