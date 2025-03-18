'use client';

import React from "react";
import DashboardMetrics from "@/components/DashboardMetrics";
import TransactionHistory from "@/components/TransactionHistory";
import DashboardPiggyBank from "@/components/DashboardPiggyBank";
import Footer from "@/components/footer";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 relative">
      <BackgroundBeams />
      
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto py-8 md:py-12">
          <div className="max-w-6xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">
              Manage your ETH savings and view your transaction history
            </p>
          </div>
          
          {/* Wallet and metrics section */}
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[1fr,1fr] mb-8">
            {/* Left side: Quick Actions */}
            <div className="order-1">
              <DashboardPiggyBank />
            </div>
            
            {/* Right side: Metrics */}
            <div className="order-2">
              <DashboardMetrics />
            </div>
          </div>
          
          {/* Transaction history section */}
          <div className="max-w-6xl mx-auto">
            <TransactionHistory />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 