"use client";

import React, { useState, useEffect } from "react";
import { deposit, withdraw, getBalance } from "../lib/ethereum";
import Image from "next/image";
import { 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Coins, Info } from "lucide-react";

const PiggyBank = () => {
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState({ message: "", isError: false });

  const loadBalance = async () => {
    try {
      const balance = await getBalance();
      console.log("Raw balance:", balance);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardSpotlight 
      className="w-full max-w-md bg-white/95 border border-white/10"
      spotlightColor="rgba(145, 71, 255, 0.15)"
    >
      <CardHeader className="pb-4">
        <div className="flex justify-center mb-2">
          <div className="relative w-64 h-64">
            <Image
              src="/pig.png"
              alt="ETH Piggy Bank"
              fill
              className="object-contain animate-float"
              priority
            />
          </div>
        </div>
        <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Sepolia ETH Piggy Bank
        </CardTitle>
        <CardDescription className="text-center text-slate-500">
          Safely store and withdraw your Sepolia testnet ETH
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-slate-50 p-5 rounded-lg text-center">
          <div className="text-sm text-slate-500 font-medium mb-1">Current Balance</div>
          <div className="flex items-center justify-center gap-2">
            <Coins size={20} className="text-purple-500" />
            <span className="font-bold text-2xl text-slate-800">
              {parseFloat(balance).toFixed(4)} ETH
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="pl-8 pr-12 py-5 text-lg font-medium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
              ETH
            </div>
            <Coins className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          
          {transactionStatus.message && (
            <div className={`text-sm p-2 rounded flex items-center gap-2 ${
              transactionStatus.isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            }`}>
              <Info size={16} />
              {transactionStatus.message}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-4">
        <Button 
          className="w-1/2 py-5 bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 transition-all"
          onClick={handleDeposit}
          disabled={loading}
        >
          <ArrowUp size={18} className="mr-2" />
          Deposit
        </Button>
        <Button 
          className="w-1/2 py-5 border border-purple-200 bg-white text-purple-700 hover:bg-purple-50 transition-all"
          onClick={handleWithdraw}
          disabled={loading}
        >
          <ArrowDown size={18} className="mr-2" />
          Withdraw
        </Button>
      </CardFooter>
    </CardSpotlight>
  );
};

export default PiggyBank;
