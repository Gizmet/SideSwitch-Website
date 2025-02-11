'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const AnimatedButton = styled(motion.a)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 36px;
  border: 4px solid transparent;
  font-size: 16px;
  background-color: transparent;
  border-radius: 100px;
  font-weight: 600;
  color: #84cc16;
  box-shadow: 0 0 0 2px #84cc16;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  text-decoration: none;
  min-width: 280px;
  justify-content: center;

  .arr-1, .arr-2 {
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);

    path {
      stroke: #84cc16;
    }
  }

  .arr-1 {
    right: 16px;
  }

  .arr-2 {
    left: -25%;
  }

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: #84cc16;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    white-space: nowrap;
  }

  &:hover {
    box-shadow: 0 0 0 12px transparent;
    color: #212121;
    border-radius: 12px;
    padding-left: 28px;
    padding-right: 44px;

    .arr-1 {
      right: -25%;
    }

    .arr-2 {
      left: 16px;
    }

    .text {
      transform: translateX(12px);
    }

    path {
      stroke: #212121;
    }

    .circle {
      width: 110%;
      height: 300px;
      opacity: 1;
    }
  }

  &:active {
    scale: 0.95;
    box-shadow: 0 0 0 4px #84cc16;
  }
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for animation
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const ArrowIcon = ({ className }: { className?: string }) => (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M3 12h18m0 0-8-8m8 8-8 8" 
        strokeWidth={2} 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0f0f0f] flex justify-center items-center">
        <div className="relative">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] relative overflow-hidden flex items-center justify-center"
          >
            <span 
              className="text-4xl font-bold text-white/90 select-none" 
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.2)',
                transform: 'rotate(-90deg) translateX(-2px)',
                fontSize: '2.5rem'
              }}
            >S</span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          </motion.div>
          
          {/* Loading bars */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8]"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                repeat: Infinity,
                duration: 1,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#2563eb]"
              style={{
                top: Math.random() * 100 - 50,
                left: Math.random() * 100 - 50,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                y: [-20, 20, -20]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen bg-[#0f0f0f] flex justify-center items-center relative overflow-hidden p-6"
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#2563eb]/10 rounded-full blur-3xl animate-pulse"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-[#1d4ed8]/10 rounded-full blur-3xl animate-pulse delay-700"
          />
        </div>

        {/* Main floating card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-[75%] h-[75vh] relative bg-[#1a1a1a]/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Glassmorphism highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          {/* Content container */}
          <div className="relative h-full p-8 flex flex-col">
            {/* Header */}
            <motion.header 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] relative overflow-hidden flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer"
                >
                  <motion.span 
                    className="text-2xl font-bold text-white/90 select-none" 
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.2)',
                      transform: 'rotate(-90deg) translateX(-1px)',
                      fontSize: '1.75rem'
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: -90,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >S</motion.span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-[#2563eb] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2563eb] to-[#1d4ed8]">
                  SideSwitch
                </h1>
              </div>
              <motion.div 
                className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg shadow-blue-500/20"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Pro Version
              </motion.div>
            </motion.header>

            {/* Main content */}
            <div className="flex-1 flex items-center">
              <div className="w-full grid grid-cols-2 gap-12">
                {/* Left column */}
                <motion.div 
                  className="text-left space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div>
                    <div className="flex items-center gap-12 mb-2">
                      <h2 className="text-5xl font-bold leading-tight">
                        <span className="text-white">Random Chats,</span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563eb] to-[#1d4ed8]">
                          Zero Regrets.
                        </span>
                      </h2>
                      <motion.div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 rounded-lg text-white text-xs font-medium shadow-lg shadow-emerald-500/20 flex items-center gap-1 h-fit whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <span className="animate-pulse relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Beta Access
                      </motion.div>
                    </div>
                    <p className="mt-4 text-xl text-white/60">
                      One-click site switching, built-in blur for surprises, and pro-level streams—all for $9.99/month.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {['Instant Swaps', 'Blur & Protect', 'Sleek & Pro'].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                        className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-xl border border-white/10 relative group cursor-pointer"
                      >
                        <motion.span 
                          className="text-[#2563eb] text-2xl relative z-10"
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {index === 0 ? '⚡' : index === 1 ? '🛡️' : '✨'}
                        </motion.span>
                        <div className="relative z-10">
                          <h3 className="font-semibold">{feature}</h3>
                          <p className="text-white/60 text-sm">
                            {index === 0 ? 'Hop between chat sites in a single click—no more endless browser tabs.' :
                             index === 1 ? 'Hide unwanted visuals and protect your privacy. No more accidental browser exposure or self-doxxing risks.' :
                             'Keep your transitions clean and your branding consistent, every single time.'}
                          </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/0 via-[#2563eb]/5 to-[#2563eb]/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 transform group-hover:translate-x-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb]/10 to-[#1d4ed8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    className="flex justify-center items-center mt-12"
                  >
                    <motion.p 
                      className="text-2xl font-medium text-white text-center relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Ready to step up your <span className="relative inline-block">
                        &ldquo;Just Chatting&rdquo;
                        <motion.div 
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 2 }}
                        />
                      </span> game?
                    </motion.p>
                  </motion.div>
                </motion.div>

                {/* Right column */}
                <motion.div 
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2563eb]/20 to-[#1d4ed8]/20 blur-3xl" />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="relative w-full bg-gradient-to-tr from-[#2563eb]/10 to-[#1d4ed8]/10 rounded-2xl p-6 border border-white/10"
                  >
                    <img 
                      src="/Screenshot_20250211_015714.png" 
                      alt="SideSwitch Interface Preview"
                      className="rounded-xl shadow-2xl border border-white/10 w-full h-auto"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    <AnimatedButton 
                      href={`${process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${encodeURIComponent('')}&checkout[custom][success_url]=${encodeURIComponent(window.location.origin + '/success')}&checkout[custom][cancel_url]=${encodeURIComponent(window.location.origin + '/cancel')}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="circle" />
                      <ArrowIcon className="arr-1" />
                      <ArrowIcon className="arr-2" />
                      <span className="text">Join Beta - $9.99/month</span>
                    </AnimatedButton>
                    <p className="text-sm text-white/40 mt-2">Limited beta spots available - Join the early adopters!</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
