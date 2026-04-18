import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Tiger E-Bikes | Electric Performance, Refined",
  description:
    "Precision-built electric two-wheelers with long-range batteries, fast charging, and a connected ownership experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full antialiased bg-black text-white font-sans selection:bg-white selection:text-black">
        <Navbar />
        <main className="w-full relative pt-[70px] overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
