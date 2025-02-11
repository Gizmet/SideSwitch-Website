'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#1a1a1a]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center"
      >
        <h1 className="text-3xl font-bold text-white">Changed your mind?</h1>
        <p className="text-white/60 mt-4">
          No worries! If you have any questions or concerns, we&apos;re here to help.
        </p>
        
        <div className="mt-8 space-y-4">
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity w-full"
          >
            Return Home
          </Link>
          
          <a 
            href="mailto:support@sideswitch.app"
            className="inline-block border border-white/20 px-6 py-3 rounded-xl text-white/80 hover:bg-white/5 transition-colors w-full"
          >
            Contact Support
          </a>
        </div>
      </motion.div>
    </div>
  );
} 