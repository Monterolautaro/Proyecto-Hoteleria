import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Hotelify",
  description: "Find the best hotels with Hotelify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f3fffc]">
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
