"use client";

import React, { useState, useEffect } from "react";
import { deposit, withdraw, getBalance } from "../lib/ethereum";
import styles from "../styles/PiggyBank.module.scss";
import Image from "next/image";



const PiggyBank = () => {
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");

  
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
  }, []);

  const handleDeposit = async () => {
    try {
      await deposit(amount);
      alert("Deposit successful!");
      setAmount("");
      await loadBalance();
    } catch (error) {
      alert("Deposit failed!");
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw(amount);
      alert("Withdrawal successful!");
      setAmount("");
      await loadBalance();
    } catch (error) {
      alert("Withdrawal failed!");
      console.error(error);
    }
  };

  return (
    <div className={styles.piggybank}>
      <Image
        src="/piggybank.png" 
        alt="Piggy Bank"
        width={300}
        height={175}
        className={styles.piggybankImage}
      />
      <p>Balance: {parseFloat(balance).toFixed(4)} ETH</p>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

export default PiggyBank;
