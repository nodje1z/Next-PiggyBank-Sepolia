"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Coins, ArrowDown, ArrowUp, Info } from "lucide-react";

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account, error, chainId } = useSDK();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Clear error after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Handle errors from SDK
  useEffect(() => {
    if (error) {
      console.error("MetaMask error:", error);
      setErrorMessage(error.message || "Error connecting to MetaMask");
    }
  }, [error]);

  const connect = async () => {
    try {
      setErrorMessage(null);
      if (!window.ethereum) {
        setErrorMessage("MetaMask is not installed. Please install MetaMask first.");
        return;
      }
      
      await sdk?.connect();
    } catch (err: any) {
      console.warn(`Connection failed:`, err);
      setErrorMessage(err?.message || "Failed to connect to MetaMask");
    }
  };

  const disconnect = () => {
    try {
      if (sdk) {
        sdk.terminate();
      }
    } catch (err: any) {
      console.error("Disconnect error:", err);
    }
  };

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-purple-100 text-purple-800 hover:bg-purple-50"
            >
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              {formatAddress(account)}
              <ArrowDown size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0 bg-white border-purple-100 shadow-lg rounded-lg overflow-hidden">
            <div className="p-3 border-b border-slate-100">
              <div className="text-sm font-medium text-slate-900">Connected Wallet</div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <div className="font-mono">{formatAddress(account)}</div>
                <a 
                  href={`https://sepolia.etherscan.io/address/${account}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                >
                  <ArrowUp size={12} />
                </a>
              </div>
              {chainId && (
                <div className="text-xs text-slate-500 mt-1">
                  Network ID: {parseInt(chainId, 16)}
                </div>
              )}
            </div>
            <button
              onClick={disconnect}
              className="flex w-full items-center gap-2 p-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <ArrowUp size={16} />
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex flex-col">
          <Button 
            disabled={connecting} 
            onClick={connect}
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Coins className="h-4 w-4" /> 
            {connecting ? "Connecting..." : "Connect Wallet"}
          </Button>
          
          {errorMessage && (
            <div className="absolute top-full mt-2 bg-red-50 text-red-600 p-2 rounded text-xs flex items-center gap-1 shadow-md whitespace-nowrap">
              <Info size={12} />
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const NavBar = () => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: true },
    checkInstallationImmediately: true,
    dappMetadata: {
      name: "ETH Piggy Bank",
      url: host,
    },
    // Add Sepolia chain Id explicitly
    defaultNetworks: [11155111],
  };

  return (
    <nav className="border-b border-slate-100 bg-white sticky top-0 z-10 backdrop-blur-lg bg-white/80">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            ETH Piggy Bank
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-600 hover:text-purple-700 text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-purple-700 text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-purple-700 text-sm font-medium">
              Contact
            </Link>
            <a 
              href="https://github.com/nodje1z/Next-PiggyBank-Sepolia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-purple-700 text-sm font-medium"
            >
              GitHub
            </a>
          </div>
          
          <MetaMaskProvider debug={true} sdkOptions={sdkOptions}>
            <ConnectWalletButton />
          </MetaMaskProvider>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
