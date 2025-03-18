import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            ETH Piggy Bank
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Secure smart contract savings on Sepolia testnet
          </p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link 
            href="https://github.com/nodje1z/Next-PiggyBank-Sepolia" 
            target="_blank"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-700 transition-colors"
          >
            <Github size={18} />
          </Link>
          <Link 
            href="https://twitter.com/yourhandle" 
            target="_blank"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-700 transition-colors"
          >
            <Twitter size={18} />
          </Link>
          <Link 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-700 transition-colors"
          >
            <Linkedin size={18} />
          </Link>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} ETH Piggy Bank. All rights reserved.
        </div>
        <div className="flex gap-4 mt-3 md:mt-0">
          <Link href="/contact" className="text-xs text-slate-500 hover:text-purple-600">
            Contact
          </Link>
          <Link href="#" className="text-xs text-slate-500 hover:text-purple-600">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-slate-500 hover:text-purple-600">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}