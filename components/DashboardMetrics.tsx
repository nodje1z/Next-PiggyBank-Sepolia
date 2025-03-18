'use client';

import React, { useMemo } from 'react';
import { useTransactionStore } from '@/lib/transactionStore';
import { format } from 'date-fns';
import { Coins, TrendingUp, ArrowUpDown, Clock } from 'lucide-react';

const DashboardMetrics = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  
  const metrics = useMemo(() => {
    // Filter successful transactions
    const successfulTransactions = transactions.filter(
      (tx) => tx.status === 'success'
    );
    
    // Calculate total deposits
    const totalDeposits = successfulTransactions
      .filter((tx) => tx.type === 'deposit')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
    
    // Calculate total withdrawals
    const totalWithdrawals = successfulTransactions
      .filter((tx) => tx.type === 'withdrawal')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
    
    // Get the most recent transaction
    const sortedByDate = [...successfulTransactions].sort(
      (a, b) => b.timestamp - a.timestamp
    );
    const mostRecent = sortedByDate[0];
    
    // Calculate 8% mock interest per year
    const mockInterest = totalDeposits * 0.08;
    
    return {
      totalDeposits: totalDeposits.toFixed(4),
      totalWithdrawals: totalWithdrawals.toFixed(4),
      transactionCount: successfulTransactions.length,
      mostRecentDate: mostRecent 
        ? format(mostRecent.timestamp, 'dd/MM/yyyy')
        : 'N/A',
      mostRecentType: mostRecent ? mostRecent.type : 'N/A',
      mockInterest: mockInterest.toFixed(4),
    };
  }, [transactions]);
  
  return (
    <div className="w-full max-w-md bg-white/95 border border-white/10 rounded-xl p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Account Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Coins size={16} className="text-purple-500" />
            <span className="text-sm font-medium text-slate-500">Total Deposits</span>
          </div>
          <div className="font-bold text-lg">{metrics.totalDeposits} ETH</div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpDown size={16} className="text-purple-500" />
            <span className="text-sm font-medium text-slate-500">Transaction Count</span>
          </div>
          <div className="font-bold text-lg">{metrics.transactionCount}</div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-purple-500" />
            <span className="text-sm font-medium text-slate-500">Interest (8%)</span>
          </div>
          <div className="font-bold text-lg">{metrics.mockInterest} ETH</div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} className="text-purple-500" />
            <span className="text-sm font-medium text-slate-500">Last Activity</span>
          </div>
          <div className="font-bold text-lg">{metrics.mostRecentDate}</div>
          <div className="text-xs text-slate-500 capitalize">{metrics.mostRecentType}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics; 