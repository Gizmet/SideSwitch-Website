// PREMIUM CREATOR LANDING - 2025-01-23 - Phone-first, cinematic, minimalist
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// CSS Variables - Premium creator palette
const GlobalStyles = styled.div`
  :root {
    --green: #39FF14;
    --green-2: #2ECC71;
    --ink: #F2F6F3;
    --muted: #AAB5AE;
    --bg: #0B0F0F;
    --card: #0F1412;
    --stroke: rgba(255, 255, 255, 0.10);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg);
    color: var(--ink);
    font-weight: 500;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  /* Glow effects */
  .glow-green {
    box-shadow: 0 20px 60px rgba(57, 255, 20, 0.28);
  }

  .glow-button {
    box-shadow: 0 0 0 1px var(--green), 0 20px 60px rgba(57, 255, 20, 0.28);
  }

  .glow-button:hover {
    box-shadow: 0 0 0 1px var(--green), 0 20px 60px rgba(57, 255, 20, 0.56);
  }

  /* Focus ring for accessibility */
  .focus-ring:focus {
    outline: 2px solid var(--green);
    outline-offset: 3px;
  }

  /* Mobile-first responsive breakpoints */
  @media (min-width: 768px) {
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:text-\\[44px\\] {
      font-size: 44px;
    }
    .md\\:text-\\[56px\\] {
      font-size: 56px;
    }
    .md\\:py-24 {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
    .md\\:py-12 {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
    .md\\:px-6 {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    .md\\:text-xl {
      font-size: 1.25rem;
    }
    .md\\:text-3xl {
      font-size: 1.875rem;
    }
    .md\\:flex-row {
      flex-direction: row;
    }
    .md\\:justify-between {
      justify-content: space-between;
    }
    .md\\:items-center {
      align-items: center;
    }
    .md\\:gap-12 {
      gap: 3rem;
    }
    .md\\:gap-6 {
      gap: 1.5rem;
    }
    .md\\:p-6 {
      padding: 1.5rem;
    }
    .md\\:p-8 {
      padding: 2rem;
    }
  }

  @media (min-width: 1024px) {
    .lg\\:text-\\[56px\\] {
      font-size: 56px;
    }
  }
`;

const PremiumButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, var(--green) 0%, var(--green-2) 100%);
  color: #0a0a0a;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover { 
    transform: translateY(-2px); 
  }

  .arrow {
    transition: transform 0.3s ease;
  }

  &:hover .arrow {
    transform: translateX(8px);
  }
`;

const FeatureCard = styled(motion.div)`
  background: var(--card);
  border: 1px solid var(--stroke);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;

  &:hover { 
    border-color: var(--green);
    box-shadow: 0 0 0 1px var(--green), 0 20px 60px rgba(57, 255, 20, 0.14);
  }
`;

const FAQItem = styled(motion.div)`
  border-bottom: 1px solid var(--stroke);
  
  &:last-child {
    border-bottom: none;
  }
`;

const FAQButton = styled.button`
  width: 100%;
  padding: 24px 0;
  background: none;
  border: none;
  color: var(--ink);
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: var(--green);
  }

  .chevron {
    transition: transform 0.2s ease;
  }

  &[aria-expanded="true"] .chevron {
    transform: rotate(180deg);
  }
`;

const FAQContent = styled(motion.div)`
  overflow: hidden;
  color: var(--muted);
  line-height: 1.6;
  padding-bottom: 24px;
`;

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const primaryFeatures = [
    {
      emoji: "⚡",
      title: "Instant Switch",
      description: "Ome, Monkey, Uhmegle, YouTube, news, sponsors—one tap. No scene breaks."
    },
    {
      emoji: "🛡️",
      title: "Blur on Tap (B)",
      description: "Drag to hide surprises. GPU-smooth at 1080p."
    },
    {
      emoji: "🎙️",
      title: "OBS-Friendly",
      description: "Prefers OBS Virtual Camera. Never steals focus."
    }
  ];

  const extendedFeatures = [
    {
      emoji: "📌",
      title: "QuickDecks",
      description: "Save links by category; launch with hotkeys or auto-rotate talking points."
    },
    {
      emoji: "⌨️",
      title: "Pro Hotkeys",
      description: "B = Blur • Ctrl+1–9 = Deck slots • Esc = focus."
    },
    {
      emoji: "🧪",
      title: "Live Mode",
      description: "Mutes popups & updates while you're live; tiny status dot."
    },
    {
      emoji: "🔒",
      title: "Safe Mode",
      description: "Allowlist + external auth; Google/Twitch logins open in your browser."
    },
    {
      emoji: "🧰",
      title: "Per-Site Presets",
      description: "Remembers zoom, mute, or cam per site."
    },
    {
      emoji: "📦",
      title: "Import/Export",
      description: "Move rigs in seconds; JSON deck backup."
    },
    {
      emoji: "🟢",
      title: "Cam/Mic Status (lite)",
      description: "Best-effort indicators from site UIs: OK • Off • Unknown."
    },
    {
      emoji: "🛡",
      title: "Creator-Safe Defaults",
      description: "No telemetry. No recording. Local-only settings."
    }
  ];

  const faqItems = [
    {
      question: "Can I log into YouTube/Google inside the app?",
      answer: "Google blocks embedded logins. SideSwitch routes sign-in to your default browser—safer and supported. You can still play videos without logging in."
    },
    {
      question: "Is the blur safe for stream?",
      answer: "Yes. It's hardware-accelerated and designed not to stutter. Drag to size; toggle with B."
    },
    {
      question: "What data do you collect?",
      answer: "None about your content. No telemetry. No recording. We only verify your license."
    },
    {
      question: "Windows only?",
      answer: "Optimized for Windows + OBS. Mac is on our roadmap after v1."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <GlobalStyles>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8">
              {/* Logo Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, var(--green) 0%, var(--green-2) 100%)',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  color: '#0a0a0a',
                  fontWeight: '700',
                  fontSize: '14px',
                  boxShadow: '0 20px 60px rgba(57, 255, 20, 0.28)'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: '#0a0a0a',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'var(--green)', fontWeight: '900', fontSize: '12px' }}>S</span>
                </div>
                SideSwitch
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontSize: '32px',
                  fontWeight: '900',
                  lineHeight: '1.05',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  margin: 0
                }}
              >
                <div style={{ color: 'var(--ink)' }}>Switch Smarter.</div>
                <div style={{ 
                  background: 'linear-gradient(135deg, var(--green) 0%, var(--green-2) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Stream Stronger.</div>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontSize: '18px',
                  color: 'var(--muted)',
                  maxWidth: '32rem',
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}
              >
                The creator-first browser for live work. One-click swaps. Blur on tap. Stream-safe by design.
              </motion.p>

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}
              >
                <PremiumButton
                  href="#pricing"
                  className="glow-button focus-ring"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, var(--green) 0%, var(--green-2) 100%)',
                    color: '#0a0a0a',
                    borderRadius: '9999px',
                    fontWeight: '700',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 0 0 1px var(--green), 0 20px 60px rgba(57, 255, 20, 0.28)'
                  }}
                >
                  Start free — 7-day trial
                  <span className="arrow" style={{ transition: 'transform 0.3s ease' }}>→</span>
                </PremiumButton>
                <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                  then $9.99/mo • cancel anytime
                </p>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '16px',
                  fontSize: '14px',
                  color: 'var(--muted)'
                }}
              >
                <span>Works with OBS</span>
                <span>•</span>
                <span>No telemetry</span>
                <span>•</span>
                <span>Creator-safe</span>
              </motion.div>
            </div>
            </div>
        </section>

        {/* Preview Section */}
        <section style={{ padding: '32px 16px' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <div style={{
                background: 'var(--card)',
                border: '1px solid var(--stroke)',
                borderRadius: '16px',
                padding: '16px',
                backdropFilter: 'blur(24px)',
                position: 'relative',
                boxShadow: '0 0 0 1px var(--green), 0 20px 60px rgba(57, 255, 20, 0.14)'
              }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src="/Screenshot_20250211_015714.png"
                    alt="SideSwitch interface preview"
                    style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(57, 255, 20, 0.1) 0%, transparent 100%)',
                    borderRadius: '12px',
                    pointerEvents: 'none'
                  }} />
                </div>
                <p style={{
                  textAlign: 'center',
                  color: 'var(--muted)',
                  marginTop: '16px',
                  fontSize: '14px',
                  margin: '16px 0 0 0'
                }}>
                  Keep your flow. No tab chaos.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Primary Features */}
        <section style={{ padding: '32px 16px' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
              gap: '24px'
            }}>
              {primaryFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--stroke)',
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '12px' }}>{feature.emoji}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--ink)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {feature.description}
                  </p>
                </FeatureCard>
              ))}
            </div>
          </div>
        </section>

          {/* Extended Features */}
        <section className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {extendedFeatures.slice(0, showAllFeatures ? extendedFeatures.length : 3).map((feature, index) => (
                  <FeatureCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-2xl mb-3">{feature.emoji}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </FeatureCard>
                ))}
              </div>
              
              {!showAllFeatures && (
                <div className="text-center">
              <button 
                    onClick={() => setShowAllFeatures(true)}
                    className="text-[var(--green)] hover:text-[var(--green-2)] font-medium transition-colors"
              >
                    Show all features →
              </button>
            </div>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Strip */}
        <section id="pricing" className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[var(--card)] border border-[var(--stroke)] rounded-2xl p-8 text-center space-y-6"
          >
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Simple pricing</h2>
                <p className="text-[var(--muted)]">7-day free trial, then $9.99/month.</p>
            </div>
            
            <div className="space-y-4">
                <PremiumButton
                  href="#"
                  className="glow-button focus-ring"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start free trial
                  <span className="arrow">→</span>
                </PremiumButton>
                
                <div>
                  <a
                    href="#"
                    className="text-[var(--green)] hover:text-[var(--green-2)] font-medium transition-colors"
                  >
                    Go annual — $77/year (save 36%)
                  </a>
                </div>
            </div>
          </motion.div>
          </div>
        </section>

        {/* Trust Row */}
        <section className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-lg text-[var(--muted)]">
                Built for creators. Streamer-safe by design.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--muted)]">
                <span>Windows + Electron</span>
                <span>•</span>
                <span>Works with OBS</span>
                <span>•</span>
                <span>No telemetry</span>
                <span>•</span>
                <span>Local-only</span>
            </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 md:py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center">FAQ</h2>
              
              <div className="space-y-0">
                {faqItems.map((item, index) => (
                  <FAQItem key={index}>
                    <FAQButton
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={expandedFAQ === index}
                      className="focus-ring"
                    >
                      {item.question}
                      <span className="chevron">▼</span>
                    </FAQButton>
                  <AnimatePresence>
                      {expandedFAQ === index && (
                        <FAQContent
                        initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                          {item.answer}
                        </FAQContent>
                    )}
                  </AnimatePresence>
                  </FAQItem>
              ))}
            </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Mini */}
        <footer className="py-8 px-4 md:px-6 border-t border-[var(--stroke)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">
              <div>© {new Date().getFullYear()} SideSwitch</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[var(--green)] transition-colors">Terms</a>
                <a href="#" className="hover:text-[var(--green)] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[var(--green)] transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
        </div>
    </GlobalStyles>
  );
}