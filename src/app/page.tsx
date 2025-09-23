// GLITZY GREEN THEME - 2025-01-23 - Premium Netflix-inspired design with glow effects
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// CSS Variables - Netflix-inspired professional palette with glow effects
const GlobalStyles = styled.div`
  :root {
    --bg: #0a0a0a;
    --panel: #141414;
    --surface: #1a1a1a;
    --surface-hover: #262626;
    --ink: #ffffff;
    --ink-secondary: #b3b3b3;
    --ink-muted: #737373;
    --accent: #39FF14;
    --accent-hover: #2ECC71;
    --accent-light: #58FF3A;
    --blue: #39FF14;
    --blue-hover: #2ECC71;
    --success: #39FF14;
    --warning: #ffa500;
    --error: #e50914;
    --border: rgba(57, 255, 20, 0.2);
    --border-hover: rgba(57, 255, 20, 0.4);
    --shadow: rgba(0, 0, 0, 0.3);
    --shadow-hover: rgba(0, 0, 0, 0.5);
    --glow: rgba(57, 255, 20, 0.4);
    --glow-strong: rgba(57, 255, 20, 0.6);
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;
    --spacing-2xl: 32px;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #0a0a0a 0%, #141414 100%);
    color: var(--ink);
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  /* Glow animation keyframes */
  @keyframes glow-pulse {
    0%, 100% { 
      box-shadow: 0 0 20px var(--glow), 0 0 40px var(--glow), 0 0 60px var(--glow);
    }
    50% { 
      box-shadow: 0 0 30px var(--glow-strong), 0 0 60px var(--glow-strong), 0 0 90px var(--glow-strong);
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const AnimatedButton = styled(motion.a)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 14px 24px;
  @media (min-width: 768px) {
    padding: 16px 36px;
  }
  border: 4px solid transparent;
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  background: linear-gradient(135deg, rgba(57, 255, 20, 0.1) 0%, rgba(46, 204, 113, 0.1) 100%);
  border-radius: 100px;
  font-weight: 600;
  color: #39FF14;
  box-shadow: 
    0 0 0 2px #39FF14,
    0 0 20px rgba(57, 255, 20, 0.3),
    0 0 40px rgba(57, 255, 20, 0.2);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  text-decoration: none;
  width: 100%;
  @media (min-width: 768px) {
    width: auto;
    min-width: 280px;
  }
  justify-content: center;
  animation: glow-pulse 3s ease-in-out infinite;

  .arr-1, .arr-2 {
    position: absolute;
    width: 20px;
    height: 20px;
    @media (min-width: 768px) {
      width: 24px;
      height: 24px;
    }
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);

    path {
      stroke: #39FF14;
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
    background-color: #39FF14;
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
    font-size: 14px;
    @media (min-width: 768px) {
      font-size: 16px;
    }
  }

  &:hover {
    box-shadow: 
      0 0 0 12px transparent,
      0 0 30px rgba(57, 255, 20, 0.6),
      0 0 60px rgba(57, 255, 20, 0.4),
      0 0 90px rgba(57, 255, 20, 0.2);
    color: #212121;
    border-radius: 12px;
    padding-left: 24px;
    padding-right: 36px;
    background: linear-gradient(135deg, #39FF14 0%, #2ECC71 100%);
    transform: translateY(-2px);
    @media (min-width: 768px) {
      padding-left: 28px;
      padding-right: 44px;
    }

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
    box-shadow: 0 0 0 4px #39FF14;
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
            className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#39FF14] to-[#2ECC71] relative overflow-hidden flex items-center justify-center"
          >
            <span 
              className="text-4xl font-bold text-black select-none" 
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
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
              className="h-full bg-gradient-to-r from-[#39FF14] to-[#2ECC71]"
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
          {[...Array(6)].map((_, i) => {
            const positions = [
              { top: -20, left: -30 },
              { top: 20, left: 30 },
              { top: -40, left: 0 },
              { top: 40, left: -20 },
              { top: 0, left: 40 },
              { top: -30, left: 20 },
            ];
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#39FF14]"
                style={positions[i]}
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
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <GlobalStyles>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-[#0f0f0f] flex justify-center items-start md:items-center relative overflow-x-hidden overflow-y-auto p-0 md:p-6"
      >
        {/* Glitzy animated background gradients */}
        <div className="fixed inset-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, delay: 0.2, repeat: Infinity }}
            className="absolute top-[20%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#39FF14]/20 rounded-full blur-3xl"
            style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 5, delay: 0.4, repeat: Infinity }}
            className="absolute bottom-[20%] right-[20%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#2ECC71]/20 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1, 0.5], opacity: [0, 0.15, 0] }}
            transition={{ duration: 6, delay: 1, repeat: Infinity }}
            className="absolute top-[60%] left-[60%] w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-[#39FF14]/15 rounded-full blur-2xl"
          />
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
              className="absolute w-2 h-2 bg-[#39FF14] rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                boxShadow: '0 0 10px #39FF14, 0 0 20px #39FF14'
              }}
            />
          ))}
        </div>

        {/* Main floating card with glitzy effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full md:w-[75%] min-h-screen md:min-h-0 md:h-[75vh] relative bg-[#1a1a1a]/40 backdrop-blur-xl rounded-none md:rounded-3xl border-y md:border border-white/10 shadow-2xl overflow-y-auto md:overflow-hidden"
          style={{
            boxShadow: `
              0 0 0 1px rgba(57, 255, 20, 0.2),
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 30px rgba(57, 255, 20, 0.1)
            `
          }}
        >
          {/* Content container */}
          <div className="relative h-full py-6 md:p-8 flex flex-col">
            {/* Header */}
            <motion.header 
              className="flex justify-between items-center mb-6 md:mb-8 px-4 md:px-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 md:w-10 h-8 md:h-10 rounded-xl bg-gradient-to-r from-[#39FF14] to-[#2ECC71] relative overflow-hidden flex items-center justify-center"
                >
                  <motion.span 
                    className="text-xl md:text-2xl font-bold text-black select-none" 
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      transform: 'rotate(-90deg) translateX(-1px)',
                      fontSize: '1.5rem'
                    }}
                  >S</motion.span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#39FF14] to-[#2ECC71]">
                  SideSwitch
                </h1>
              </div>
              <motion.div 
                className="bg-gradient-to-r from-[#39FF14] to-[#2ECC71] px-3 md:px-4 py-1 md:py-2 rounded-lg text-black text-xs md:text-sm font-medium shadow-lg shadow-green-500/20"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Pro Version
              </motion.div>
            </motion.header>

            {/* Main content */}
            <div className="flex-1 flex flex-col md:items-center overflow-visible">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Right column (moved to top on mobile) */}
                <motion.div 
                  className="relative flex flex-col items-center order-first mb-8 md:mb-0 md:order-last"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="relative w-full bg-gradient-to-tr from-[#39FF14]/10 to-[#2ECC71]/10 rounded-2xl p-4 md:p-6 border border-white/10"
                  >
                    <img 
                      src="/Screenshot_20250211_015714.png" 
                      alt="SideSwitch Interface Preview"
                      className="rounded-xl shadow-2xl border border-white/10 w-full h-auto"
                    />
                  </motion.div>
                </motion.div>

                {/* Left column */}
                <motion.div 
                  className="text-left px-4 md:px-0 space-y-6 md:space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="space-y-6">
                    {/* Title and Beta Badge */}
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-bold leading-none md:leading-tight">
                        <div className="text-white mb-2 bg-gradient-to-r from-white to-white/80">Random Chats</div>
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#39FF14] to-[#2ECC71] pb-1">
                          Zero Regrets!
                        </div>
                      </h2>
                      
                      <motion.div 
                        className="inline-flex bg-gradient-to-r from-[#39FF14] to-[#2ECC71] px-3 py-1 rounded-lg text-black text-xs font-medium shadow-lg shadow-green-500/20 items-center gap-1"
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

                    {/* Description */}
                    <p className="text-base md:text-xl text-white/60">
                      Seamless site switching, instant blur protection, and pro-level streaming—all for $9.99/month.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {['Instant Swaps', 'Blur & Protect', 'Sleek & Pro'].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                        className="flex items-start gap-3 text-white/80 bg-white/5 p-4 rounded-xl border border-white/10 relative"
                      >
                        <motion.span 
                          className="text-[#39FF14] text-xl md:text-2xl relative z-10 mt-0.5"
                        >
                          {index === 0 ? '⚡' : index === 1 ? '🛡️' : '✨'}
                        </motion.span>
                        <div className="relative z-10 flex-1">
                          <h3 className="font-semibold text-sm md:text-base mb-1">{feature}</h3>
                          <p className="text-white/60 text-xs md:text-sm">
                            {index === 0 ? 'Hop between chat sites in a single click—no more endless browser tabs.' :
                             index === 1 ? 'Hide unwanted visuals and protect your privacy. No more accidental exposure.' :
                             'Keep your transitions clean and your branding consistent, every single time.'}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Section */}
                  <motion.div 
                    className="pt-4 md:pt-6 text-center w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    <AnimatedButton 
                      href={`${process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${encodeURIComponent('')}&checkout[custom][success_url]=${encodeURIComponent(window.location.origin + '/success')}&checkout[custom][cancel_url]=${encodeURIComponent(window.location.origin + '/cancel')}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full md:w-auto"
                    >
                      <div className="circle" />
                      <ArrowIcon className="arr-1" />
                      <ArrowIcon className="arr-2" />
                      <span className="text">Join Beta - $9.99/month</span>
                    </AnimatedButton>
                    <p className="text-xs md:text-sm text-white/40 mt-3">Limited beta spots available - Join now!</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </GlobalStyles>
  );
}
