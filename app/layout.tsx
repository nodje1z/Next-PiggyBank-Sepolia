import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "ETH Piggy Bank | Sepolia Testnet Savings",
  description: "A secure way to save and manage your Sepolia testnet ETH",
  keywords: ["ethereum", "smart contract", "piggy bank", "sepolia", "testnet", "blockchain"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen font-sans bg-white antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
