import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import dynamic from "next/dynamic";
import ScrollToTop from "@/components/scrollToTop/scrollToTop";

const DynamicCartProvider = dynamic(
  () => import("@/app/contexts/cartContext").then((mod) => mod.CartProvider),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alexquisite Patisserie",
  description: "Personal project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <DynamicCartProvider>
          <ScrollToTop />
          <Navbar />
          {children}
          <Footer />
        </DynamicCartProvider>
      </body>
    </html>
  );
}
