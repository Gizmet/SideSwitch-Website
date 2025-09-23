'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

/* ================= BRAND ================= */
const GREEN = '#39FF14';
const GREEN2 = '#2ECC71';
const BG = '#0B0F0F';

const GlowButton = styled(motion.a)`
  position: relative;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 10px; padding: 18px 32px; border-radius: 999px;
  font-weight: 900; letter-spacing: .3px;
  color: #0a0a0a; text-decoration: none;
  background: linear-gradient(160deg, ${GREEN}, ${GREEN2});
  box-shadow:
    0 20px 48px rgba(57,255,20,.32),
    0 0 0 2px ${GREEN} inset,
    0 1px 0 0 rgba(255,255,255,.15) inset;
  transition: transform .18s ease, box-shadow .28s ease;
  width: 100%;
  max-width: 420px;
  font-size: 16px;
  &:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 28px 68px rgba(57,255,20,.4), 0 0 0 2px ${GREEN} inset; 
  }
  &:active { transform: translateY(0); }
`;

const SecondaryButton = styled(motion.button)`
  position: relative;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 8px; padding: 16px 24px; border-radius: 999px;
  font-weight: 700; letter-spacing: .2px;
  color: ${GREEN}; text-decoration: none;
  background: transparent;
  border: 2px solid ${GREEN}40;
  transition: all .25s ease;
  width: 100%;
  max-width: 420px;
  &:hover { 
    border-color: ${GREEN};
    background: ${GREEN}08;
    color: ${GREEN};
  }
`;

const Chip = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 py-2 rounded-full text-[13px] font-semibold bg-white/8 border border-white/15 text-white/90 backdrop-blur-sm">
    {children}
  </div>
);

const FeatureCard = ({ emoji, title, desc, delay = 0 }: { emoji: string; title: string; desc: string; delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: .4, delay }}
    className="group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]"
  >
    <div className="flex items-start gap-4">
      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{emoji}</div>
      <div className="flex-1">
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-green-400 transition-colors">{title}</h3>
        <p className="text-white/75 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showExtended, setShowExtended] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // SSR-safe checkout URL
  const checkoutUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL || '#';
    if (typeof window === 'undefined') return base;
    const success = encodeURIComponent(`${window.location.origin}/success`);
    const cancel  = encodeURIComponent(`${window.location.origin}/cancel`);
    return `${base}?checkout[custom][success_url]=${success}&checkout[custom][cancel_url]=${cancel}`;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  /* ====== LOADER ====== */
  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center" style={{ background: BG }}>
        <motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .4 }} className="relative text-center">
          <div className="w-20 h-20 rounded-3xl grid place-items-center mb-6"
               style={{ background: `linear-gradient(160deg, ${GREEN}, ${GREEN2})`, filter:'drop-shadow(0 20px 80px rgba(57,255,20,.35))' }}>
            <span className="text-black font-black select-none" style={{ transform:'rotate(-90deg)', fontSize:'2.2rem' }}>s</span>
          </div>
          <div className="w-48 h-1 rounded-full overflow-hidden bg-white/10 mx-auto">
            <motion.div className="h-full" style={{ background:`linear-gradient(90deg, rgba(57,255,20,.3), ${GREEN})` }}
                        initial={{ x:'-100%' }} animate={{ x:'100%' }} transition={{ repeat: Infinity, duration: 1.2, ease:'easeInOut' }}/>
          </div>
          <p className="text-white/60 text-sm mt-4 font-medium">Loading SideSwitch</p>
        </motion.div>
      </div>
    );
  }

  /* ====== FEATURES DATA ====== */
  const coreFeatures = [
    { emoji: '⚡', title: 'Instant Site Switching', desc: 'Jump between YouTube, Twitch, Kick, Discord, news, or sponsors in one click. No alt-tab chaos, no broken flow.' },
    { emoji: '🛡️', title: 'Blur on Tap (B)', desc: 'Hide what you don\'t want seen. A draggable, resizable privacy mask that runs smooth at 1080p.' },
    { emoji: '🎙️', title: 'Stream-Optimized', desc: 'Built for OBS. Respects your Virtual Camera. Never steals focus while you\'re live.' }
  ];

  const extendedFeatures = [
    { emoji: '📌', title: 'QuickDecks', desc: 'Save sponsors, notes, news, or talking points. Launch instantly or rotate on a timer.' },
    { emoji: '⌨️', title: 'Pro Hotkeys', desc: 'Blur, swap, or fire QuickDecks faster than alt-tab. Stay in flow, even mid-stream.' },
    { emoji: '🧪', title: 'Live Mode', desc: 'Suppresses pop-ups and system prompts while you\'re live. Tiny status dot keeps you covered.' },
    { emoji: '🔒', title: 'Safe Mode', desc: 'Google/Twitch logins route safely through your default browser. Auth without crashes or hacks.' },
    { emoji: '🎛️', title: 'Per-Site Presets', desc: 'Remember zoom, mute, or cam settings per site. Every page opens just how you left it.' },
    { emoji: '📦', title: 'Import & Export', desc: 'Backup or share QuickDecks as JSON. Move setups between rigs in seconds.' },
    { emoji: '🛡', title: 'Creator-Safe Defaults', desc: 'No telemetry. No recording. Local-only. Trust built in.' }
  ];

  const targetAudience = [
    { emoji: '🎥', title: 'Streamers', desc: 'Keep transitions clean, protect privacy, look pro.' },
    { emoji: '🏫', title: 'Educators & Presenters', desc: 'Jump between slides, clips, and references without fumbling tabs.' },
    { emoji: '📊', title: 'Creators', desc: 'Manage sponsors, live notes, and media with one-click QuickDecks.' },
    { emoji: '🔒', title: 'Anyone Sharing Live', desc: 'Control what\'s seen, hide what isn\'t.' }
  ];

  const faqs = [
    {
      q: 'Can I log into YouTube/Google inside the app?',
      a: 'For security, Google blocks embedded logins. SideSwitch routes logins to your default browser — safer and supported. You can still play videos without logging in.'
    },
    {
      q: 'Is the blur safe for streaming?',
      a: 'Yes. It\'s GPU-accelerated and hardware-smooth. Designed not to stutter, even on low-end rigs.'
    },
    {
      q: 'Do you collect any data?',
      a: 'No. No telemetry. No recording. We only verify your license.'
    },
    {
      q: 'Is it Windows only?',
      a: 'Optimized for Windows + OBS. Mac is on our roadmap.'
    }
  ];

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }}
        className="min-h-screen relative overflow-hidden"
        style={{ background: BG }}
      >
        {/* Enhanced ambient lighting */}
        <div className="pointer-events-none absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full blur-[140px]" style={{ background:`${GREEN}18` }}/>
        <div className="pointer-events-none absolute -bottom-48 -right-24 w-[720px] h-[720px] rounded-full blur-[160px]" style={{ background:`${GREEN2}18` }}/>
        <div className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background:`${GREEN}08` }}/>

        {/* Main content */}
        <div className="mx-auto w-full max-w-[520px] px-6 py-10 space-y-12">
          
          {/* Enhanced Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: .5 }}
            className="flex items-center justify-center gap-4 pt-6"
          >
            <div className="w-12 h-12 rounded-2xl grid place-items-center shadow-2xl"
                 style={{ background:`linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
              <span className="text-black font-black text-xl" style={{ transform:'rotate(-90deg)' }}>s</span>
            </div>
            <span className="text-white font-black text-2xl tracking-tight">SideSwitch</span>
            <div className="px-4 py-2 rounded-xl text-xs font-black text-black shadow-xl backdrop-blur-sm"
                 style={{ background:`linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
              Pro Beta
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: .6, delay: .2 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tight">
              <span className="block text-white">Switch Smarter.</span>
              <span className="block bg-clip-text text-transparent mt-2"
                    style={{ backgroundImage:`linear-gradient(135deg, ${GREEN}, ${GREEN2})` }}>
                Stream Stronger.
              </span>
            </h1>
            <p className="text-white/85 text-xl max-w-[95%] mx-auto leading-relaxed font-medium">
              The creator-first browser built for speed, privacy, and peace of mind. 
              <span className="block mt-2 text-lg text-white/70">One click swaps. Blur on tap. Stream-safe by design.</span>
            </p>
            
            <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
              <Chip>✅ Works with OBS</Chip>
              <Chip>✅ No telemetry</Chip>
              <Chip>✅ Creator-safe</Chip>
            </div>

            <div className="pt-4 space-y-3">
              <GlowButton href={checkoutUrl} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span>Start free — 7 days on us</span>
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h18m0 0-8-8m8 8-8 8" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </GlowButton>
              <p className="text-white/60 text-sm font-medium">$9.99/mo after trial</p>
            </div>
          </motion.div>

          {/* Preview Image */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: .7, delay: .4 }}
          >
            <div className="rounded-3xl border border-white/15 p-4 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-sm">
              <img src="/Screenshot_20250211_015714.png" alt="SideSwitch interface preview"
                   className="rounded-2xl border border-white/20 shadow-2xl w-full h-auto" />
            </div>
            <p className="text-center text-sm text-white/70 mt-4 font-medium">
              Professional creator workflow in action
            </p>
          </motion.div>

          {/* Core Features */}
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: .6 }}
              className="text-white font-black text-2xl text-center"
            >
              Core Features
            </motion.h2>
            <div className="space-y-4">
              {coreFeatures.map((feature, i) => (
                <FeatureCard key={feature.title} {...feature} delay={.7 + i * .1} />
              ))}
            </div>
          </div>

          {/* Extended Features */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-black text-2xl">Extended Features</h2>
              <button 
                onClick={() => setShowExtended(!showExtended)}
                className="text-sm font-semibold px-4 py-2 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
              >
                {showExtended ? 'Show less' : 'Show all'}
              </button>
            </div>
            
            <AnimatePresence>
              {showExtended && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: .4 }}
                  className="space-y-4"
                >
                  {extendedFeatures.map((feature, i) => (
                    <FeatureCard key={feature.title} {...feature} delay={i * .05} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Who It's For */}
          <div className="space-y-6">
            <h2 className="text-white font-black text-2xl text-center">Who It's For</h2>
            <div className="grid grid-cols-1 gap-4">
              {targetAudience.map((audience, i) => (
                <FeatureCard key={audience.title} {...audience} delay={i * .1} />
              ))}
            </div>
          </div>

          {/* Enhanced Pricing */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 1.2 }}
            className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-8 text-center space-y-6 backdrop-blur-sm shadow-2xl"
          >
            <div>
              <h3 className="text-white font-black text-2xl mb-2">Simple. Transparent.</h3>
              <p className="text-white/80 text-base leading-relaxed">
                7-day free trial → then <span className="font-bold text-green-400">$9.99/month</span>
              </p>
              <p className="text-white/60 text-sm mt-2">Founders Lifetime license coming soon</p>
            </div>
            
            <div className="space-y-4">
              <GlowButton href={checkoutUrl} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span>Start free trial</span>
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h18m0 0-8-8m8 8-8 8" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </GlowButton>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <div className="text-center space-y-4">
            <p className="text-white/85 text-lg font-semibold">Premium. Transparent. Creator-safe by design.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Chip>🔒 No telemetry</Chip>
              <Chip>🛡️ No recording</Chip>
              <Chip>💾 Local only</Chip>
            </div>
          </div>

          {/* Enhanced FAQ */}
          <div className="space-y-6">
            <h2 className="text-white font-black text-2xl text-center">FAQs</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: .4, delay: .1 + i * .05 }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h4 className="text-white font-bold text-base pr-4">{faq.q}</h4>
                    <motion.svg 
                      animate={{ rotate: activeFAQ === i ? 45 : 0 }}
                      transition={{ duration: .2 }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none"
                    >
                      <path d="M12 5v14M5 12h14" stroke="#39FF14" strokeWidth="2" strokeLinecap="round"/>
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {activeFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: .3 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-white/80 text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </motion.main>
    </AnimatePresence>
  );
}