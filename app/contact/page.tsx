import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 md:p-12 lg:p-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-3xl w-full mx-auto">
          <div className="mb-8">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-purple-600 inline-flex items-center gap-1 transition-colors"
            >
              <ArrowUp size={16} className="rotate-90" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions about ETH Piggy Bank or want to provide feedback? Fill out the form below and we&apos;ll get back to you soon.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
