import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { DateProvider } from "@/helpers/hotelDetail/dateContext";
import { RoomsProvider } from "@/helpers/hotelDetail/roomsContext";

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
        <DateProvider>
          <RoomsProvider>
            <Header />

            {children}

            <Footer />
          </RoomsProvider>
        </DateProvider>
      </body>
    </html>
  );
}
