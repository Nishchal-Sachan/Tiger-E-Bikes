import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: "Tiger E-Bikes | Electric Performance, Refined",
  description:
    "Precision-built electric two-wheelers with long-range batteries, fast charging, and a connected ownership experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}>
        <Navbar />
        <main className="w-full relative pt-[70px] overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
