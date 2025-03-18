import Footer from "@/components/footer";
import Link from "next/link";
import PiggyBank from "../components/PiggyBank";
import { Button } from "@/components/ui/button";
import { PhoneCall, Github, Coins } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 relative">
      <BackgroundBeams />
      
      {/* Hero section */}
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto py-8 md:py-12">
          {/* Top section with piggy bank card and intro */}
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr,1fr] items-center mb-10">
            {/* Left side: Info */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
                  Save Your ETH<br />With Confidence
                </h1>
                <p className="text-slate-600 text-lg">
                  A secure and simple way to store your Sepolia testnet ETH in a decentralized smart contract.
                </p>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="font-bold text-purple-700">1</span>
                  </div>
                  <p className="text-slate-700">Connect your wallet</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="font-bold text-purple-700">2</span>
                  </div>
                  <p className="text-slate-700">Deposit your Sepolia ETH</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="font-bold text-purple-700">3</span>
                  </div>
                  <p className="text-slate-700">Withdraw anytime</p>
                </div>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/dashboard" passHref>
                  <Button className="flex gap-2 bg-purple-600 hover:bg-purple-700">
                    <Coins size={18} />
                    View Dashboard
                  </Button>
                </Link>
                <Link href="/contact" passHref>
                  <Button className="flex gap-2 border border-purple-200 bg-white text-purple-700 hover:bg-purple-50">
                    <PhoneCall size={18} />
                    Contact Us
                  </Button>
                </Link>
                <Link href="https://github.com/nodje1z/Next-PiggyBank-Sepolia" target="_blank" passHref>
                  <Button className="flex gap-2 border border-purple-200 bg-white text-purple-700 hover:bg-purple-50">
                    <Github size={18} />
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side: PiggyBank */}
            <div className="order-1 md:order-2">
              <PiggyBank />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

