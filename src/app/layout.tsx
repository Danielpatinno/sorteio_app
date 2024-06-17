import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Pizza",
  description: "Best Pizza é um app de delivery de pizza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <Toaster />          
        </CartProvider>

      </body>
     
    </html>
  );
}
