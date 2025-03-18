import Footer from "@/components/footer";
import Link from "next/link";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { PhoneCall, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Hero section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent mb-4">
            Sepolia ETH Piggy Bank
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl">
            A secure and simple way to store your Sepolia testnet ETH in a decentralized smart contract.
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        <Dashboard />
      </main>
      
      {/* Footer */}
      <div className="container mx-auto px-4 py-6 border-t border-slate-100">
        <div className="flex flex-wrap justify-between items-center">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Getting Started</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="font-bold text-purple-700 text-xs">1</span>
                </div>
                <span>Connect wallet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="font-bold text-purple-700 text-xs">2</span>
                </div>
                <span>Deposit ETH</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="font-bold text-purple-700 text-xs">3</span>
                </div>
                <span>Withdraw anytime</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link href="/contact" passHref>
              <Button className="flex gap-2 bg-purple-600 hover:bg-purple-700">
                <PhoneCall size={16} />
                Contact
              </Button>
            </Link>
            <Link href="https://github.com/nodje1z/Next-PiggyBank-Sepolia" target="_blank" passHref>
              <Button className="flex gap-2 border border-purple-200 bg-white text-purple-700 hover:bg-purple-50">
                <Github size={16} />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

