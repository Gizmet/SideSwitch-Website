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
  gap: 10px; padding: 16px 24px; border-radius: 999px;
  font-weight: 900; letter-spacing: .2px;
  color: #0a0a0a; text-decoration: none;
  background: linear-gradient(160deg, ${GREEN}, ${GREEN2});
  box-shadow:
    0 18px 42px rgba(57,255,20,.28),
    0 0 0 2px ${GREEN} inset,
    0 1px 0 0 rgba(255,255,255,.12) inset;
  transition: transform .18s ease, box-shadow .28s ease;
  width: 100%;
  max-width: 400px;
  &:hover { transform: translateY(-1px); box-shadow: 0 26px 64px rgba(57,255,20,.35), 0 0 0 2px ${GREEN} inset; }
  &:active { transform: translateY(0); }
`;

const Chip = ({ children }: { children: React.ReactNode }) => (
  <div className="px-3 py-1 rounded-full text-[12px] font-semibold bg-white/5 border border-white/10 text-white/80">
    {children}
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  // SSR-safe checkout URL
  const checkoutUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL || '#';
    if (typeof window === 'undefined') return base;
    const success = encodeURIComponent(`${window.location.origin}/success`);
    const cancel  = encodeURIComponent(`${window.location.origin}/cancel`);
    return `${base}?checkout[custom][success_url]=${success}&checkout[custom][cancel_url]=${cancel}`;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  /* ====== LOADER ====== */
  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center" style={{ background: BG }}>
        <motion.div initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .35 }} className="relative">
          <div className="w-16 h-16 rounded-2xl grid place-items-center"
               style={{ background: `linear-gradient(160deg, ${GREEN}, ${GREEN2})`, filter:'drop-shadow(0 18px 60px rgba(57,255,20,.28))' }}>
            <span className="text-black font-extrabold select-none" style={{ transform:'rotate(-90deg)', fontSize:'1.9rem' }}>s</span>
          </div>
          <div className="mt-4 w-36 h-1 rounded-full overflow-hidden bg-white/10">
            <motion.div className="h-full" style={{ background:`linear-gradient(90deg, rgba(57,255,20,.25), ${GREEN})` }}
                        initial={{ x:'-100%' }} animate={{ x:'100%' }} transition={{ repeat: Infinity, duration: 1.05, ease:'linear' }}/>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ====== FEATURES DATA ====== */
  const primaryFeatures = [
    { emoji: '⚡', title: 'Instant Switch', desc: 'Ome, Monkey, Uhmeg|e, YouTube… one click. No tab chaos.' },
    { emoji: '🛡️', title: 'Blur on Tap (B)', desc: 'Drag to hide surprises. Smooth at 1080p.' },
    { emoji: '🎙️', title: 'OBS-Friendly', desc: 'Always respects your OBS Virtual Camera.' }
  ];

  const extendedFeatures = [
    { emoji: '📌', title: 'QuickDecks', desc: 'Save links, sponsors, news. Fire with hotkeys.' },
    { emoji: '⌨️', title: 'Pro Hotkeys', desc: 'Blur, swap, QuickDecks faster than alt-tab.' },
    { emoji: '🧪', title: 'Live Mode', desc: 'Suppresses popups while you\'re live.' },
    { emoji: '🔒', title: 'Safe Mode', desc: 'Google/Twitch logins open in your browser.' },
    { emoji: '📦', title: 'Import/Export', desc: 'Move setups instantly.' },
    { emoji: '🛡', title: 'Creator-Safe Defaults', desc: 'No telemetry. Local only.' }
  ];

  const faqs = [
    {
      q: 'Can I log into YouTube/Google?',
      a: 'Google blocks sign-in inside apps. SideSwitch opens Google/Twitch logins in your browser (safer + supported). You can still show YouTube videos without logging in.'
    },
    {
      q: 'Is the blur safe on stream?',
      a: 'Yes. It\'s a hardware-accelerated overlay you control with the B key. Drag to size. Designed not to stutter.'
    },
    {
      q: 'Windows only?',
      a: 'Optimized for Windows + OBS. Mac build is on our roadmap once we ship v1.'
    },
    {
      q: 'What data do you collect?',
      a: 'None about your content. No telemetry, no recording. We only verify your license.'
    }
  ];

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4 }}
        className="min-h-screen relative overflow-hidden"
        style={{ background: BG }}
      >
        {/* Ambient green bloom */}
        <div className="pointer-events-none absolute -top-32 -left-16 w-[520px] h-[520px] rounded-full blur-[120px]" style={{ background:`${GREEN}22` }}/>
        <div className="pointer-events-none absolute -bottom-40 -right-20 w-[640px] h-[640px] rounded-full blur-[140px]" style={{ background:`${GREEN2}22` }}/>

        {/* Main content */}
        <div className="mx-auto w-full max-w-[480px] px-5 py-8 space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="w-10 h-10 rounded-xl grid place-items-center"
                 style={{ background:`linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
              <span className="text-black font-extrabold" style={{ transform:'rotate(-90deg)' }}>s</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">SideSwitch</span>
            <div className="px-3 py-1 rounded-lg text-xs font-extrabold text-black shadow-lg"
                 style={{ background:`linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
              Pro Beta
            </div>
          </div>

          {/* Hero */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black leading-[1.05] tracking-tight">
              <span className="block text-white">Random Chats.</span>
              <span className="block bg-clip-text text-transparent"
                    style={{ backgroundImage:`linear-gradient(90deg, ${GREEN}, ${GREEN2})` }}>
                Zero Regrets.
              </span>
            </h1>
            <p className="text-white/80 text-lg max-w-[90%] mx-auto">
              The fast, pro-safe way to jump between chat sites without breaking your stream.
            </p>
            
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Chip>One-click site swaps</Chip>
              <Chip>Blur on tap</Chip>
              <Chip>Streamer-safe</Chip>
            </div>

            <div className="pt-2">
              <GlowButton href={checkoutUrl} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span>Start 7-day free trial</span>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h18m0 0-8-8m8 8-8 8" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </GlowButton>
            </div>
          </div>

          {/* Preview Image */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, delay: .2 }}>
            <div className="rounded-2xl border border-white/10 p-3 bg-gradient-to-tr from-white/5 to-transparent shadow-2xl">
              <img src="/Screenshot_20250211_015714.png" alt="SideSwitch interface preview"
                   className="rounded-xl border border-white/10 shadow-2xl w-full h-auto" />
            </div>
            <p className="text-center text-xs text-white/70 mt-3">
              ✅ Works with OBS • ✅ Creator-safe
            </p>
          </motion.div>

          {/* Primary Features */}
          <div className="space-y-3">
            <h2 className="text-white font-bold text-lg text-center">Key Features</h2>
            {primaryFeatures.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: .3, delay: .3 + i * .1 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="text-2xl">{feature.emoji}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                  <p className="text-white/75 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extended Features */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">More Features</h2>
              <button 
                onClick={() => setShowMoreFeatures(!showMoreFeatures)}
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                {showMoreFeatures ? 'Show less' : 'See more'}
              </button>
            </div>
            
            <AnimatePresence>
              {showMoreFeatures && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: .3 }}
                  className="space-y-3"
                >
                  {extendedFeatures.map((feature, i) => (
                    <motion.div 
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ duration: .2, delay: i * .05 }}
                      className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5"
                    >
                      <div className="text-xl">{feature.emoji}</div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                        <p className="text-white/75 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center space-y-4">
            <div>
              <h3 className="text-white font-bold text-lg">Simple Pricing</h3>
              <p className="text-white/70 text-sm mt-1">Start your 7-day free trial → then $9.99/mo. Cancel anytime.</p>
            </div>
            
            <div className="space-y-3">
              <GlowButton href={checkoutUrl} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span>Start free trial</span>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h18m0 0-8-8m8 8-8 8" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </GlowButton>
              
              <button className="w-full py-3 px-4 rounded-xl border border-white/20 text-white/80 text-sm font-medium hover:bg-white/5 transition-colors">
                Go annual — $77/year (save 36%)
              </button>
            </div>
          </div>

          {/* Trust / Proof */}
          <div className="text-center space-y-3">
            <p className="text-white/80 text-sm">Built for creators. Streamer-safe by design.</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Chip>No telemetry</Chip>
              <Chip>No recording</Chip>
              <Chip>Local only</Chip>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-3">
            <h2 className="text-white font-bold text-lg text-center">FAQs</h2>
            {faqs.map((faq, i) => (
              <motion.div 
                key={faq.q}
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: .3, delay: .1 + i * .05 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <h4 className="text-white font-semibold text-sm mb-2">{faq.q}</h4>
                <p className="text-white/75 text-xs leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>

        </div>

      </motion.main>
    </AnimatePresence>
  );
}