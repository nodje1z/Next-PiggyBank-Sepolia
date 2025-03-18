'use client';

import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';
import { useTransactionStore, Transaction } from '@/lib/transactionStore';

interface ChartData {
  date: string;
  deposit: number;
  withdrawal: number;
  balance: number;
}

const TransactionHistory: React.FC = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  
  const chartData = useMemo(() => {
    // Sort transactions by timestamp (oldest first)
    const sortedTransactions = [...transactions].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    
    // Create a map of date -> transactions for that date
    const transactionsByDate = new Map<string, Transaction[]>();
    sortedTransactions.forEach((transaction) => {
      const date = format(transaction.timestamp, 'yyyy-MM-dd');
      if (!transactionsByDate.has(date)) {
        transactionsByDate.set(date, []);
      }
      transactionsByDate.get(date)?.push(transaction);
    });
    
    // Generate data for the last 30 days
    const today = startOfDay(new Date());
    let runningBalance = 0;
    
    return Array.from({ length: 30 }, (_, i) => {
      const date = subDays(today, 29 - i);
      const dateString = format(date, 'yyyy-MM-dd');
      const dailyTransactions = transactionsByDate.get(dateString) || [];
      
      let dailyDeposit = 0;
      let dailyWithdrawal = 0;
      
      dailyTransactions.forEach((transaction) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === 'deposit') {
          dailyDeposit += amount;
          runningBalance += amount;
        } else {
          dailyWithdrawal += amount;
          runningBalance -= amount;
        }
      });
      
      return {
        date: format(date, 'MMM dd'),
        deposit: dailyDeposit,
        withdrawal: dailyWithdrawal,
        balance: parseFloat(runningBalance.toFixed(4))
      };
    });
  }, [transactions]);
  
  return (
    <div className="w-full rounded-xl bg-white/95 border border-white/10 p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDeposit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9147ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9147ff" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorWithdrawal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff47b1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff47b1" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4790ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4790ff" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
              tickFormatter={(value) => `${value} ETH`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(4)} ETH`, '']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none',
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="deposit" 
              stackId="1"
              stroke="#9147ff" 
              fillOpacity={1}
              fill="url(#colorDeposit)" 
              name="Deposits"
            />
            <Area 
              type="monotone" 
              dataKey="withdrawal" 
              stackId="2"
              stroke="#ff47b1" 
              fillOpacity={1}
              fill="url(#colorWithdrawal)" 
              name="Withdrawals"
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#4790ff" 
              fillOpacity={1}
              fill="url(#colorBalance)" 
              name="Balance"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionHistory; 