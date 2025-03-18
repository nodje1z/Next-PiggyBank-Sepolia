'use client';

import React from 'react';
import PiggyBank from './PiggyBank';
import DashboardMetrics from './DashboardMetrics';
import TransactionHistory from './TransactionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, LineChart, Info } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-6">
        {/* Left Column - PiggyBank */}
        <div>
          <PiggyBank />
        </div>
        
        {/* Right Column - Dashboard & Analytics */}
        <div className="space-y-6">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutGrid size={16} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <LineChart size={16} />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <DashboardMetrics />
              <div className="bg-white/95 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Info className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">Getting Started</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      This dashboard displays your account metrics and transaction history. 
                      Use the tabs to toggle between views.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <TransactionHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 