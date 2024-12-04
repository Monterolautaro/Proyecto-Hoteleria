import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { DateProvider } from "@/helpers/hotelDetail/dateContext";
import { RoomsProvider } from "@/helpers/hotelDetail/roomsContext";
import { PriceProvider } from "@/helpers/hotelDetail/priceContext";
import { Providers } from "@/helpers/Providers";

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
        <Providers>
          <DateProvider>
            <RoomsProvider>
              <PriceProvider>
                <Header />

                {children}

                <Footer />
              </PriceProvider>
            </RoomsProvider>
          </DateProvider>
        </Providers>
      </body>
    </html>
  );
}
