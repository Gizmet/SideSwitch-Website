'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#1a1a1a]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto flex items-center justify-center"
        >
          <span className="text-2xl">✓</span>
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mt-6">Welcome to SideSwitch!</h1>
        <p className="text-white/60 mt-4">
          Thank you for joining our beta program. You'll receive an email shortly with your download link and setup instructions.
        </p>
        
        <div className="mt-8">
          <Link 
            href="/download"
            className="inline-block bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
          >
            Download Now
          </Link>
        </div>
        
        <p className="text-white/40 text-sm mt-6">
          Need help? Contact us at support@sideswitch.app
        </p>
      </motion.div>
    </div>
  );
} 