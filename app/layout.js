import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tiger E-Bikes - Unleash the Electric Thrill",
  description: "Experience the ultimate electric performance with Tiger E-Bikes. Sustainable, high-speed, and engineered for the modern rider.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-white selection:text-black`}>
        <Navbar />
        <main className="w-full relative pt-[70px] overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
