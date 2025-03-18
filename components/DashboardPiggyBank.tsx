"use client";

import React, { useState, useEffect } from "react";
import { deposit, withdraw, getBalance } from "../lib/ethereum";
import { 
  Card,
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Coins, Info } from "lucide-react";
import { useTransactionStore } from "@/lib/transactionStore";

const DashboardPiggyBank = () => {
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState({ message: "", isError: false });
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const loadBalance = async () => {
    try {
      const balance = await getBalance();
      setBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch and display the balance when the component mounts
  useEffect(() => {
    loadBalance();
    // Refresh balance every 30 seconds
    const intervalId = setInterval(() => loadBalance(), 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDeposit = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setTransactionStatus({
        message: "Please enter a valid amount",
        isError: true
      });
      return;
    }

    setLoading(true);
    setTransactionStatus({ message: "Processing deposit...", isError: false });
    
    try {
      await deposit(amount);
      
      // Record the transaction
      addTransaction({
        type: 'deposit',
        amount,
        timestamp: Date.now(),
        status: 'success'
      });
      
      setTransactionStatus({
        message: `Successfully deposited ${amount} ETH!`,
        isError: false
      });
      setAmount("");
      await loadBalance();
    } catch (error) {
      console.error(error);
      setTransactionStatus({
        message: "Deposit failed. Please try again.",
        isError: true
      });
      
      // Record failed transaction
      addTransaction({
        type: 'deposit',
        amount,
        timestamp: Date.now(),
        status: 'failed'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setTransactionStatus({
        message: "Please enter a valid amount",
        isError: true
      });
      return;
    }

    if (parseFloat(amount) > parseFloat(balance)) {
      setTransactionStatus({
        message: "Insufficient balance",
        isError: true
      });
      return;
    }

    setLoading(true);
    setTransactionStatus({ message: "Processing withdrawal...", isError: false });
    
    try {
      await withdraw(amount);
      
      // Record the transaction
      addTransaction({
        type: 'withdrawal',
        amount,
        timestamp: Date.now(),
        status: 'success'
      });
      
      setTransactionStatus({
        message: `Successfully withdrawn ${amount} ETH!`,
        isError: false
      });
      setAmount("");
      await loadBalance();
    } catch (error) {
      console.error(error);
      setTransactionStatus({
        message: "Withdrawal failed. Please try again.",
        isError: true
      });
      
      // Record failed transaction
      addTransaction({
        type: 'withdrawal',
        amount,
        timestamp: Date.now(),
        status: 'failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/95 border border-white/10 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between">
          <div className="text-sm text-slate-500 font-medium">Current Balance</div>
          <div className="flex items-center gap-2">
            <Coins size={18} className="text-purple-500" />
            <span className="font-bold text-lg text-slate-800">
              {parseFloat(balance).toFixed(4)} ETH
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="pl-8 pr-12"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
              ETH
            </div>
            <Coins className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          
          {transactionStatus.message && (
            <div className={`text-xs p-2 rounded flex items-center gap-2 ${
              transactionStatus.isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            }`}>
              <Info size={14} />
              {transactionStatus.message}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-3 pt-0">
        <Button 
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 transition-all text-sm"
          onClick={handleDeposit}
          disabled={loading}
          size="sm"
        >
          <ArrowUp size={16} className="mr-1" />
          Deposit
        </Button>
        <Button 
          className="flex-1 border border-purple-200 bg-white text-purple-700 hover:bg-purple-50 transition-all text-sm"
          onClick={handleWithdraw}
          disabled={loading}
          size="sm"
        >
          <ArrowDown size={16} className="mr-1" />
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardPiggyBank; 