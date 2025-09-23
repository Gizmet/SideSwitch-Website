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
  gap: 10px; padding: 14px 22px; border-radius: 999px;
  font-weight: 900; letter-spacing: .2px;
  color: #0a0a0a; text-decoration: none;
  background: linear-gradient(160deg, ${GREEN}, ${GREEN2});
  box-shadow:
    0 18px 42px rgba(57,255,20,.28),
    0 0 0 2px ${GREEN} inset,
    0 1px 0 0 rgba(255,255,255,.12) inset;
  transition: transform .18s ease, box-shadow .28s ease;
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

  /* ====== LOADER (kept your green look) ====== */
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

  /* ====== COPY DATA ====== */
  const marquee = [
    'Instant site swaps', 'Blur on tap (B)', 'QuickDecks', 'OBS-friendly',
    'Per-site presets', 'Live Mode', 'Safe Mode', 'Hotkeys', 'Import/Export', 'No telemetry'
  ];

  const features = [
    {
      title: 'Instant Site Switching',
      emoji: '⚡',
      desc: 'Ome, Monkey, Uhmeg|e, YouTube, news, sponsors—jump in one click. No tab chaos. No scene breaks.'
    },
    {
      title: 'Blur on Tap (B)',
      emoji: '🛡️',
      desc: 'Draggable, resizable privacy mask for "not for stream" moments. Hardware-accelerated. Smooth at 1080p.'
    },
    {
      title: 'QuickDecks',
      emoji: '📌',
      desc: 'Save go-to links by category (Clips, News, Sponsors). Launch with hotkeys or auto-rotate talking points.'
    },
    {
      title: 'OBS-Friendly',
      emoji: '🎙️',
      desc: 'Prefers OBS Virtual Camera when present and never steals focus. Built for streamers.'
    },
    {
      title: 'Per-Site Presets',
      emoji: '🧰',
      desc: 'Remember audio mute and zoom per site. Every page opens exactly the way you left it.'
    },
    {
      title: 'Live Mode',
      emoji: '🧪',
      desc: 'Suppresses popups and update prompts while you\'re live. Tiny status dot for peace of mind.'
    },
    {
      title: 'Safe Mode',
      emoji: '🔒',
      desc: 'Domain allowlist + external auth routing—Google/Twitch logins open in your default browser.'
    },
    {
      title: 'Pro Hotkeys',
      emoji: '⌨️',
      desc: 'B = Blur • Ctrl+1–9 = QuickDeck slots • Esc = focus. Faster than alt-tabbing.'
    },
    {
      title: 'Import / Export',
      emoji: '📦',
      desc: 'Share and back up QuickDecks as JSON. Move your setup in seconds.'
    },
    {
      title: 'Creator-Safe Defaults',
      emoji: '🛡',
      desc: 'No telemetry. No recording. Local-only settings. Streamer-first by design.'
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

        {/* Shell card */}
        <div className="mx-auto w-full max-w-[1120px] px-5 md:px-8 py-10 md:py-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,.55)] overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl grid place-items-center"
                     style={{ background:`linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
                  <span className="text-black font-extrabold" style={{ transform:'rotate(-90deg)' }}>s</span>
                </div>
                <span className="text-white font-extrabold text-lg tracking-tight">SideSwitch</span>
              </div>
              <div className="px-3 py-1 rounded-lg text-xs font-extrabold text-black shadow-lg"
                   style={{ background:`linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
                Pro Beta
              </div>
            </div>

            {/* Hero */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-5 md:p-8">
              {/* Left: pitch */}
              <div>
                <h1 className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
                  <span className="block text-white">Random Chats</span>
                  <span className="block bg-clip-text text-transparent"
                        style={{ backgroundImage:`linear-gradient(90deg, ${GREEN}, ${GREEN2})` }}>
                    Zero Regrets.
                  </span>
                </h1>
                <p className="mt-4 text-white/80 text-lg md:text-xl max-w-[46ch]">
                  The fast, creator-safe way to hop between chat sites, hide surprises on cue,
                  and keep your stream looking pro.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <Chip>Beta access</Chip>
                  <Chip>Windows • Electron</Chip>
                  <Chip>No telemetry</Chip>
                </div>

                <div className="mt-6">
                  <GlowButton href={checkoutUrl} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
                    <span>Start 7-day free trial — $9.99/mo after</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 12h18m0 0-8-8m8 8-8 8" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                    </GlowButton>
                  <p className="mt-2 text-xs text-white/70">
                    ✅ Works with OBS • ✅ Creator-safe by design
                  </p>
                </div>
              </div>

              {/* Right: preview */}
              <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5, delay: .1 }}>
                <div className="rounded-2xl border border-white/10 p-3 bg-gradient-to-tr from-white/5 to-transparent shadow-2xl">
                  <img src="/Screenshot_20250211_015714.png" alt="SideSwitch interface preview"
                       className="rounded-xl border border-white/10 shadow-2xl w-full h-auto" />
                </div>
              </motion.div>
            </div>

            {/* Marquee */}
            <div className="relative overflow-hidden border-y border-white/10 bg-black/20">
              <div className="flex gap-3 py-3 animate-[marquee_28s_linear_infinite] will-change-transform"
                   style={{ whiteSpace:'nowrap' }}>
                {marquee.concat(marquee).map((t, i) => (
                  <div key={i} className="px-3 py-1 rounded-full text-[12px] font-semibold text-black"
                       style={{ background:`linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
                    {t}
                  </div>
                ))}
              </div>
              <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 md:p-8">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_24px_rgba(0,0,0,.28)]">
                  <div className="flex items-start gap-3">
                    <div className="text-[22px]" style={{ color: GREEN }}>{f.emoji}</div>
                    <div>
                      <h3 className="text-white font-semibold text-[15px]">{f.title}</h3>
                      <p className="text-white/75 text-[13px] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing strip */}
            <div className="px-5 md:px-8 pb-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="text-white font-extrabold text-lg">Simple pricing</h4>
                  <p className="text-white/70 text-sm">7-day free trial, then $9.99/month. <span className="text-white">Founders</span> lifetime coming soon.</p>
                </div>
                <div className="flex items-center gap-3">
                  <GlowButton href={checkoutUrl}>Start free trial</GlowButton>
                  <a href="#faq" className="text-white/75 text-sm hover:text-white">See FAQs</a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div id="faq" className="grid md:grid-cols-2 gap-4 p-5 md:p-8 border-t border-white/10">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h5 className="text-white font-semibold mb-2">Can I log into Google/YouTube inside the app?</h5>
                <p className="text-white/75 text-sm">
                  Google blocks sign-in inside embedded views. SideSwitch opens Google/Twitch logins in your default
                  browser (safer + supported). You can still show YouTube videos without logging in.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h5 className="text-white font-semibold mb-2">Is the blur safe for stream?</h5>
                <p className="text-white/75 text-sm">
                  Yes. It's a hardware-accelerated overlay you control with the **B** key. Drag to size. Designed not to stutter.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h5 className="text-white font-semibold mb-2">What data do you collect?</h5>
                <p className="text-white/75 text-sm">
                  None about your content. No telemetry, no recording. We only verify your license.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h5 className="text-white font-semibold mb-2">Windows only?</h5>
                <p className="text-white/75 text-sm">
                  Optimized for Windows + OBS. Mac build is on our roadmap once we ship v1.
                </p>
              </div>
            </div>

          </div>
        </div>

      </motion.main>
    </AnimatePresence>
  );
}