'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

/* ================= BRAND (Green theme) ================= */
const GREEN = '#39FF14';
const GREEN2 = '#2ECC71';
const BG = '#0f0f0f';

const AnimatedButton = styled(motion.a)`
  position: relative;
  display: flex; align-items: center; justify-content: center;
  gap: 6px;
  padding: 14px 24px;
  @media (min-width: 768px) { padding: 16px 36px; }
  border: 4px solid transparent;
  border-radius: 100px;
  font-weight: 800;
  font-size: 14px; @media (min-width: 768px) { font-size: 16px; }
  text-decoration: none;
  color: #0a0a0a;
  background: linear-gradient(160deg, ${GREEN}, ${GREEN2});
  box-shadow: 0 14px 36px rgba(57,255,20,.28), 0 0 0 2px ${GREEN} inset;
  overflow: hidden;
  transition: transform .2s ease, box-shadow .3s ease;

  .arr-1,.arr-2{position:absolute;width:22px;height:22px;z-index:2;transition:.35s ease all}
  .arr-1{right:16px} .arr-2{left:-25%}
  .arr-1 path,.arr-2 path{stroke:#0a0a0a}

  .circle{position:absolute;inset:0;background:radial-gradient(100% 100% at 50% 50%,rgba(255,255,255,.16),transparent 60%);opacity:0;transform:scale(.2);transition:.35s ease all}

  &:hover{transform:translateY(-1px);box-shadow:0 22px 52px rgba(57,255,20,.32),0 0 0 2px ${GREEN} inset}
  &:hover .arr-1{right:-25%}
  &:hover .arr-2{left:16px}
  &:hover .circle{opacity:1;transform:scale(1)}
`;

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
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const ArrowIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M3 12h18m0 0-8-8m8 8-8 8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: BG }}>
        <div className="relative">
          {/* Logo tile */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: .4 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(160deg, ${GREEN}, ${GREEN2})`, filter: 'drop-shadow(0 18px 60px rgba(57,255,20,.30))' }}
          >
            <span className="text-black font-extrabold select-none" style={{ transform: 'rotate(-90deg)', fontSize: '2rem' }}>s</span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent" />
          </motion.div>

          {/* Progress */}
          <motion.div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-36 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.10)' }}>
            <motion.div
              className="h-full"
              style={{ background: `linear-gradient(90deg, rgba(57,255,20,.25), ${GREEN})` }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.05, ease: 'linear' }}
            />
          </motion.div>

          {/* Particles */}
          {[...Array(6)].map((_, i) => {
            const pos = [
              { top: -20, left: -30 }, { top: 20, left: 30 },
              { top: -40, left: 0 },   { top: 40, left: -20 },
              { top: 0, left: 40 },    { top: -30, left: 20 },
            ];
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ ...pos[i], background: GREEN }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0,1,0], scale: [.6,1,.6], y: [-18, 18, -18] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * .18 }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  /* ================= COPY & FEATURES ================= */
  const primary = [
    {
      icon: '⚡',
      title: 'Instant Site Switching',
      desc: 'Ome, Monkey, Uhmeg|e, YouTube, news, sponsors—jump in one click. No tab chaos, no scene breaks.',
    },
    {
      icon: '🛡️',
      title: 'Blur on Tap (B)',
      desc: 'Draggable, resizable privacy mask for "not for stream" moments. Hardware-accelerated and smooth at 1080p.',
    },
    {
      icon: '📌',
      title: 'QuickDecks',
      desc: 'Save your go-to links across categories. Launch with hotkeys, or auto-rotate talking points on a timer.',
    },
  ];

  const secondary = [
    { icon: '🎙️', title: 'OBS-Friendly', desc: 'Prefers OBS Virtual Camera when present. Never steals focus from OBS.' },
    { icon: '🧰', title: 'Per-Site Presets', desc: 'Remember audio mute and zoom per site. Every page opens the way you left it.' },
    { icon: '🧪', title: 'Live Mode', desc: 'Suppresses popups and update prompts while you\'re live. Tiny status dot for peace of mind.' },
    { icon: '🔒', title: 'Safe Mode', desc: 'Allowlist + external auth routing—Google/Twitch logins open in your default browser.' },
    { icon: '⌨️', title: 'Pro Hotkeys', desc: 'B = Blur • Ctrl+1–9 = QuickDeck slots • Esc = focus. Faster than alt-tabbing.' },
    { icon: '📦', title: 'Import / Export', desc: 'Share and back up QuickDecks as JSON. Move your setup in seconds.' },
    { icon: '🟢', title: 'Cam/Mic Status (lite)', desc: 'Best-effort indicators inferred from site UIs: OK / Off / Unknown—never intrusive.' },
    { icon: '🛡', title: 'Creator-Safe Defaults', desc: 'No telemetry. No recording. Local-only settings. Streamer-first by design.' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="min-h-screen flex justify-center items-start md:items-center relative overflow-x-hidden overflow-y-auto p-0 md:p-6"
        style={{ background: BG }}
      >
        {/* Ambient blobs */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: .2 }}
            className="absolute top-[20%] left-[20%] w-[320px] md:w-[540px] h-[320px] md:h-[540px] rounded-full blur-3xl"
            style={{ background: `${GREEN}1a` }}
          />
          <motion.div
            initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: .4 }}
            className="absolute bottom-[18%] right-[18%] w-[240px] md:w-[460px] h-[240px] md:h-[460px] rounded-full blur-3xl"
            style={{ background: `${GREEN2}1a` }}
          />
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, scale: .96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: .7, delay: .5 }}
          className="w-full md:w-[78%] min-h-screen md:min-h-0 md:h-[78vh] relative bg-white/5 backdrop-blur-xl rounded-none md:rounded-3xl border-y md:border border-white/10 shadow-2xl overflow-y-auto md:overflow-hidden"
        >
          <div className="relative h-full py-6 md:p-8 flex flex-col">
            {/* Header */}
            <motion.header
              className="flex justify-between items-center mb-6 md:mb-8 px-4 md:px-0"
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .8 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 md:w-10 h-9 md:h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(160deg, ${GREEN}, ${GREEN2})` }}>
                  <motion.span className="text-black font-extrabold select-none" style={{ transform: 'rotate(-90deg)', fontSize: '1.35rem' }}>s</motion.span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(90deg, ${GREEN}, ${GREEN2})` }}>
                  SideSwitch
                </h1>
              </div>
              <motion.div
                className="px-3 md:px-4 py-1 md:py-2 rounded-lg text-black text-xs md:text-sm font-extrabold shadow-lg"
                style={{ background: `linear-gradient(160deg, ${GREEN}, ${GREEN2})`, boxShadow: '0 8px 26px rgba(57,255,20,.25)' }}
                animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}
              >
                Pro Beta
              </motion.div>
            </motion.header>

            {/* Content */}
            <div className="flex-1 flex flex-col md:items-center overflow-visible">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Right: preview + CTA */}
                <motion.div
                  className="relative flex flex-col items-center order-first mb-8 md:mb-0 md:order-last"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: 1.1 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7, delay: 1.3 }}
                    className="relative w-full rounded-2xl p-4 md:p-6 border border-white/10"
                    style={{ background: `linear-gradient(45deg, ${GREEN}1a, ${GREEN2}1a)` }}
                  >
                    <img
                      src="/Screenshot_20250211_015714.png"
                      alt="SideSwitch interface preview"
                      className="rounded-xl shadow-2xl border border-white/10 w-full h-auto"
                    />
                  </motion.div>

                  <motion.div
                    className="pt-4 md:pt-6 text-center w-full"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: 1.6 }}
                  >
                    <AnimatedButton href={checkoutUrl} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <div className="circle" />
                      <ArrowIcon className="arr-1" />
                      <ArrowIcon className="arr-2" />
                      <span>Start 7-day free trial — $9.99/mo after</span>
                    </AnimatedButton>
                    <p className="text-xs md:text-sm text-white/70 mt-3">
                      ✅ Works with OBS • ✅ No telemetry • ✅ Creator-safe by design
                    </p>
                  </motion.div>
                </motion.div>

                {/* Left: pitch + features */}
                <motion.div
                  className="text-left px-4 md:px-0 space-y-6 md:space-y-8"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: 1 }}
                >
                  {/* Hero pitch */}
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                      <span className="text-white block">Random Chats</span>
                      <span className="bg-clip-text text-transparent block"
                            style={{ backgroundImage: `linear-gradient(90deg, ${GREEN}, ${GREEN2})` }}>
                        Zero Regrets.
                      </span>
                    </h2>
                    <p className="text-base md:text-xl text-white/80">
                      The fast, creator-safe way to hop between chat sites, hide surprises on cue,
                      and keep your stream looking pro.
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-black text-xs font-extrabold"
                         style={{ background: `linear-gradient(160deg, ${GREEN}, ${GREEN2})`, boxShadow: '0 8px 24px rgba(57,255,20,.25)' }}>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      Beta Access
                    </div>
                  </div>

                  {/* Primary features (big cards) */}
                  <div className="space-y-3">
                    {primary.map((f, i) => (
                      <motion.div key={f.title}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .45, delay: 1.2 + i * .12 }}
                        className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10"
                      >
                        <span className="text-[22px]" style={{ color: GREEN }}>{f.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm md:text-base text-white">{f.title}</h3>
                          <p className="text-white/75 text-xs md:text-sm">{f.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Secondary grid (compact) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {secondary.map((f, i) => (
                      <motion.div key={f.title}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .45, delay: 1.45 + i * .08 }}
                        className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10"
                      >
                        <span className="text-[18px]" style={{ color: GREEN }}>{f.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[13px] text-white">{f.title}</h4>
                          <p className="text-white/70 text-xs">{f.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer note */}
                  <div className="pt-1 text-white/60 text-xs">
                    Free plan idea: 3 QuickDeck items. Pro unlocks Blur, unlimited decks, presets, import/export & hotkeys.
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}