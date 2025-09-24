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
  color: #39FF14;
  box-shadow: 0 0 0 2px #39FF14;
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
    box-shadow: 0 0 0 4px #39FF14;
  }
`;

// Screenshot Carousel Component
const ScreenshotCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenshots = [
    "/Screenshot1.png",
    "/Screenshot2.png",
    "/Screenshot3.png",
    "/Screenshot4.png",
    "/Screenshot5.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [screenshots.length]);

  return (
    <div className="relative w-full h-52 sm:h-60 md:h-68 lg:h-76 xl:h-88 overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
            <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={screenshots[currentIndex]} 
            alt={`SideSwitch Interface Preview ${currentIndex + 1}`}
            className="w-full h-full object-contain sm:object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
        </motion.div>
      </AnimatePresence>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#39FF14] scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
              </div>
  );
};

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
              className="text-4xl font-bold text-black/90 select-none" 
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.2)',
                transform: 'rotate(-90deg) translateX(-2px)',
                fontSize: '2.5rem'
              }}
            >S</span>
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
            // Use fixed positions based on index instead of random
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-[100dvh] bg-[#0f0f0f] flex justify-center items-center relative overflow-hidden px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-[var(--space-3)]"
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#39FF14]/10 rounded-full blur-3xl animate-pulse"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-[#2ECC71]/10 rounded-full blur-3xl animate-pulse delay-700"
          />
        </div>

        {/* Main floating card */}
              <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-7xl h-[98vh] md:h-[95vh] lg:h-[90vh] relative bg-[#1a1a1a]/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-y-auto"
        >
          {/* Glassmorphism highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          {/* Content container */}
          <div className="relative h-full p-4 sm:p-6 lg:p-12 xl:p-16 pt-8 sm:pt-12 lg:pt-16 flex flex-col">
            {/* Header */}
            <motion.header 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-[#39FF14] to-[#2ECC71] relative overflow-hidden flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer"
                >
                  <motion.span 
                    className="text-2xl font-bold text-black/90 select-none" 
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
                  <div className="absolute inset-0 bg-[#39FF14] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                </div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#39FF14] to-[#2ECC71]">
                  SideSwitch
                </h1>
              </div>
              <motion.div 
                className="bg-gradient-to-r from-[#39FF14] to-[#2ECC71] px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-black text-xs sm:text-sm font-medium shadow-lg shadow-green-500/20"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Pro Version
              </motion.div>
            </motion.header>

            {/* Header Content */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 lg:gap-12 mb-6">
              <h2 className="font-bold leading-tight text-[clamp(2.5rem,4vw,5rem)]">
                <span className="text-white">Click. Swap. Stream.</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#39FF14] to-[#2ECC71]">
                  No Awkward Pauses.
                </span>
              </h2>
              <motion.div 
                className="bg-gradient-to-r from-[#39FF14] to-[#2ECC71] px-3 py-1 rounded-lg text-black text-xs font-medium shadow-lg shadow-green-500/20 flex items-center gap-1 h-fit whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="animate-pulse relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                Beta Access
              </motion.div>
            </div>

            {/* Screenshot Carousel */}
            <motion.div 
              className="relative flex flex-col items-center justify-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="relative w-full bg-gradient-to-tr from-[#39FF14]/10 to-[#2ECC71]/10 rounded-2xl p-2 border border-white/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#39FF14]/20 to-[#2ECC71]/20 blur-3xl" />
                <ScreenshotCarousel />
              </motion.div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 flex items-center min-h-0">
              <div className="w-full flex flex-col gap-[var(--space-3)] h-full">
                {/* Content */}
                <motion.div
                  className="text-left space-y-3 sm:space-y-4 lg:space-y-6 flex flex-col justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div>
                    <p className="text-[var(--step-0)] text-white/60 leading-relaxed">
                      Tired of dead air while you hunt for links, flip tabs, or dodge trolls? SideSwitch makes it <em className="text-[#39FF14]">stupid-easy</em> to keep your stream flowing, your audience locked in, and your rep safe.
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-white/50">
                      Already trusted by Kick streamers pulling 1,000+ viewers.
                    </p>
                  </div>

                  {/* CTA Section */}
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    <AnimatedButton 
                      href={`${process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL}?checkout[email]=${encodeURIComponent('')}&checkout[custom][success_url]=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/success')}&checkout[custom][cancel_url]=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + '/cancel')}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="circle" />
                      <ArrowIcon className="arr-1" />
                      <ArrowIcon className="arr-2" />
                      <span className="text">👉 Join Beta Today — Just $9.99/month</span>
                    </AnimatedButton>
                    <p className="text-xs sm:text-sm text-white/50 mt-2">
                      Less than a Twitch sub. One tool = no awkward fails, no dead air, less bans.
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      Cancel anytime. Zero risk. Instant upgrade.
                    </p>
                  </motion.div>

                  <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    {[
                      { 
                        title: 'NEVER Lose Your Audience', 
                        description: 'Jump between Ome, Monkey, Uhmegle, YouTube, sponsors, news — in one click. No "hold on chat" moments. No scene breaks. Just smooth.',
                        icon: '⚡'
                      },
                      { 
                        title: 'BLUR in One Click', 
                        description: 'Someone flashes? Troll jumps in? Press B to blur instantly. They\'re gone, you\'re safe. Looks pro. Feels pro. Protects you live.',
                        icon: '🛡️'
                      },
                      { 
                        title: 'Built for OBS', 
                        description: 'Works with OBS Virtual Cam. No fighting your setup. No crashes. Just stream like normal.',
                        icon: '🎥'
                      },
                      { 
                        title: 'Streamer Tool + Life Tool', 
                        description: 'Not just for rizz kings. Keep your frequently used sites (chat, music, news, sponsors) one tap away. The fastest way to manage your stream, your resources, your vibe.',
                        icon: '💡'
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-white/80 bg-white/5 p-3 sm:p-4 rounded-xl border border-white/10 relative group cursor-pointer mb-3 sm:mb-4"
                      >
                        <motion.span 
                          className="text-[#39FF14] text-2xl relative z-10"
                          whileHover={{ 
                            scale: 1.2,
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {feature.icon}
                        </motion.span>
                        <div className="relative z-10 flex-1">
                          <h3 className="font-semibold text-[var(--step-0)]">{feature.title}</h3>
                          <p className="text-white/60 text-[var(--step--1)] leading-relaxed">
                    {feature.description}
                  </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/0 via-[#39FF14]/5 to-[#39FF14]/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 transform group-hover:translate-x-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/10 to-[#2ECC71]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
            
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    className="flex justify-center items-center mt-4 sm:mt-6"
                  >
          <motion.div
                      className="text-2xl font-medium text-white text-center relative"
                whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-[var(--step-1)]">
                        Stop losing viewers. Stop fumbling tabs.
                        <br />
                        SideSwitch makes your stream smoother, safer, and 10x more pro — instantly.
                        <br />
                        <span className="text-[#39FF14]">If you want to grow on Kick or Twitch, this isn't optional.</span>
                      </span>
                      </motion.div>
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