'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ArrowRight, Users, ChatCircleDots, Target, Sparkle, Envelope, CheckCircle, ChatText, FunnelSimple, GitBranch, Lightning, ChartLineUp, Database, PlugsConnected } from 'phosphor-react'

// ─── Animation presets ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay },
})

// ─── FAQ accordion ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'Can Campaigns be used without EVOQ CRM?',
    a: 'Yes. Campaigns can operate as a standalone platform for managing customer engagement, campaigns, audiences, and reporting.',
  },
  {
    q: 'Can Campaigns work with our existing CRM?',
    a: 'Yes. Businesses can continue using their current CRM while extending engagement capabilities through Campaigns.',
  },
  {
    q: 'Which communication channels are supported?',
    a: 'Campaigns support email and SMS communication.',
  },
  {
    q: 'Can customer information be imported?',
    a: 'Yes. Customer and contact information can be imported to help teams get started quickly.',
  },
  {
    q: 'Can campaigns be automated?',
    a: 'Yes. Automated workflows help businesses respond to customer activity and engagement patterns.',
  },
  {
    q: 'Can engagement be measured?',
    a: 'Yes. Campaigns provides reporting and analytics to help teams understand engagement performance and communication effectiveness.',
  },
  {
    q: 'How do campaigns fit within the EVOQ platform?',
    a: 'Campaigns can operate independently or connect with other EVOQ applications to provide broader visibility across business operations.',
  },
]

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.q}
            className={cn(
              'rounded-2xl border overflow-hidden transition-all duration-200',
              isOpen
                ? 'bg-[#FAF5FF] border-[#DDD6FE] shadow-[0_10px_30px_rgba(76,29,149,0.10)]'
                : 'bg-white border-[#F3E8FF] shadow-[0_2px_10px_rgba(76,29,149,0.04)] hover:border-[#DDD6FE]'
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 sm:px-7 py-5 text-left gap-3"
            >
              <span className={cn(
                'font-heading font-semibold text-[15px] sm:text-[16px] leading-snug transition-colors duration-200',
                isOpen ? 'text-[#7C3AED]' : 'text-[#1A1523]'
              )}>
                {item.q}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200',
                  isOpen ? 'bg-[#7C3AED]' : 'bg-[#F3E8FF]'
                )}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke={isOpen ? '#FFFFFF' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 sm:px-7 pb-5"
              >
                <p className="text-gray-500 text-[14px] sm:text-[15px] leading-relaxed border-t border-[#DDD6FE] pt-3">
                  {item.a}
                </p>
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CampaignsPage() {
  const [productsOpen, setProductsOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const FEATURE_COUNT = 6

  const getCardStep = () => {
    const el = scrollRef.current
    const card = el?.querySelector<HTMLDivElement>('[data-card]')
    return card ? card.offsetWidth + 24 : 340
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: getCardStep() * dir, behavior: 'smooth' })
  }

  const scrollToCard = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    const maxScrollLeft = el.scrollWidth - el.clientWidth
    const target = FEATURE_COUNT > 1 ? (maxScrollLeft * i) / (FEATURE_COUNT - 1) : 0
    el.scrollTo({ left: target, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth
      if (maxScrollLeft <= 0) { setActiveSlide(0); return }
      const ratio = Math.min(1, Math.max(0, el.scrollLeft / maxScrollLeft))
      setActiveSlide(Math.round(ratio * (FEATURE_COUNT - 1)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ══ TOP BAR — EVOQ global nav ══ */}
      <header className="fixed top-0 left-0 right-0 z-[210] h-[80px] bg-[#FAF5FF] shadow-[0_1px_0_#F3E8FF]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">

          {/* Left: EVOQ logo */}
          <a href="https://dev.evoq.one" className="flex items-center group flex-shrink-0 opacity-100 group-hover:opacity-80 transition-opacity">
            <Image src="/images/black-logo.png" alt="EVOQ" width={140} height={32} className="h-8 w-auto" priority/>
          </a>

          {/* Nav pill — right next to logo */}
          <div className="hidden md:flex items-center bg-[#F3E8FF] border border-[#DDD6FE] rounded-full px-1.5 py-1 shadow-[0_2px_8px_rgba(124,58,237,0.10)] ml-5">
            <div className="relative">
              <button
                onClick={() => setProductsOpen(p => !p)}
                onBlur={() => setTimeout(() => setProductsOpen(false), 150)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-black hover:bg-[#FAF5FF] transition-all duration-150"
              >
                Products
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={cn('transition-transform duration-200', productsOpen && 'rotate-180')}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {productsOpen && (
                <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl border border-[#DDD6FE] shadow-[0_16px_48px_rgba(124,58,237,0.14)] py-2 z-50">
                  {[
                    { label: 'CRM',        desc: 'Sales & pipeline management', href: '/',          active: false },
                    { label: 'Sync',       desc: 'Data integration platform',   href: '/sync',       active: false },
                    { label: 'Campaigns',  desc: 'Customer engagement suite',   href: '/campaigns',  active: true },
                    { label: 'Skillberry', desc: 'Learning management suite',   href: '#' },
                  ].map(p => (
                    <a key={p.label} href={p.href}
                      className={cn('flex flex-col px-4 py-2.5 hover:bg-[#F3E8FF] transition-colors rounded-xl mx-1.5', p.active && 'bg-[#F3E8FF]')}>
                      <span className={cn('text-[13px] font-semibold', p.active ? 'text-[#7C3AED]' : 'text-gray-800')}>{p.label}</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">{p.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="https://dev.evoq.one/why-evoq"
              className="px-4 py-2 rounded-full text-[13px] font-semibold text-black hover:bg-[#FAF5FF] transition-all duration-150">
              Why EVOQ?
            </a>
          </div>

          <div className="flex-1"/>

          {/* Right: Request Demo */}
          <a href="https://dev.evoq.one/contact"
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full bg-[#7C3AED] text-white text-[12px] sm:text-[13px] font-bold hover:bg-[#6D28D9] transition-colors shadow-[0_2px_10px_rgba(124,58,237,0.28)] flex-shrink-0">
            <span className="hidden sm:inline">Request Demo</span>
            <ArrowUpRight size={13} weight="bold" color="white"/>
          </a>
        </div>
      </header>

      {/* ══ SUB-HEADER — EVOQ Campaigns nav ══ */}
      <div className="fixed top-[80px] left-0 right-0 z-[200] h-[56px] bg-[#FAF5FF] border-b border-[#F3E8FF]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">

          {/* Left: EVOQ Campaigns */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-4 sm:ml-8">
            <div className="w-[28px] h-[28px] rounded-[8px] bg-[#7C3AED] flex items-center justify-center shadow-[0_2px_6px_rgba(124,58,237,0.25)]">
              <ChatCircleDots size={14} weight="duotone" color="white"/>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="hidden sm:inline text-[11px] font-semibold text-[#7C3AED] tracking-[0.06em] uppercase leading-none">EVOQ</span>
              <span className="text-[15px] font-black text-[#3D1E5C] tracking-[-0.03em] leading-none">Campaigns</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#FAF5FF] mt-[136px] pt-[72px] pb-0 px-8">

        {/* gradient ribbon — locked to its native aspect ratio so it never stretches/distorts across breakpoints */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
          style={{
            aspectRatio: '1920 / 1080',
            backgroundImage: 'url(/images/hero-gradient-ribbon.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
          aria-hidden
        />

        <div className="relative max-w-[1200px] mx-auto text-center pb-16">
          <motion.div {...fadeUp(0)}>
            <h1 className="text-[38px] sm:text-[46px] font-heading font-black tracking-[-0.03em] leading-[1.15] max-w-[720px] mx-auto mb-6">
              Turn Customer Engagement Into Business Opportunities
            </h1>

            <p className="text-gray-500 text-[16px] leading-relaxed max-w-[600px] mx-auto mb-10">
              Plan, execute, and measure customer engagement across email and SMS. Coordinate outreach, automate communication, and understand how engagement contributes to customer growth and business outcomes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="https://dev.evoq.one/contact"
                className="inline-flex items-center gap-1.5 bg-[#7C3AED] text-white text-[14px] font-bold px-6 py-3 rounded-lg hover:bg-[#6D28D9] transition-colors shadow-[0_6px_24px_rgba(124,58,237,0.28)]">
                Request Demo
                <ArrowRight size={15} weight="bold"/>
              </a>
              <a href="https://dev.evoq.one/contact"
                className="inline-flex items-center gap-1.5 bg-white text-[#7C3AED] text-[14px] font-bold px-6 py-3 rounded-lg border border-[#DDD6FE] hover:bg-[#F3E8FF] transition-colors">
                Contact Sales
              </a>
            </div>
          </motion.div>

          {/* Browser-chrome mockup — visual concept flow */}
          <motion.div {...fadeUp(0.15)} className="relative mt-16 max-w-[960px] mx-auto text-left">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-[0_30px_80px_rgba(61,30,92,0.18)] overflow-hidden">

              {/* window chrome */}
              <div className="flex items-center gap-4 px-5 py-3 border-b border-gray-100">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200"/>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-gray-50 border border-gray-100 text-[12px] text-gray-400">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 016 0v3H9z"/></svg>
                    Connect data to drive growth
                  </div>
                </div>
                <div className="w-14 flex-shrink-0"/>
              </div>

              {/* content: visual concept flow — cards connected by an animated data flow */}
              <div className="px-8 py-12 bg-gradient-to-b from-white to-[#FAF5FF]">
                {(() => {
                  const steps = [
                    { icon: <Users size={19} weight="duotone" color="#7C3AED"/>,          label: 'Customer Data',  desc: 'Unified profiles across every channel', tag: '01' },
                    { icon: <ChatCircleDots size={19} weight="duotone" color="#7C3AED"/>, label: 'Campaigns',      desc: 'Email & SMS outreach, planned and sent', tag: '02' },
                    { icon: <Sparkle size={19} weight="duotone" color="#7C3AED"/>,        label: 'Engagement',     desc: 'Opens, replies, and clicks tracked live', tag: '03' },
                    { icon: <Target size={19} weight="duotone" color="#7C3AED"/>,         label: 'Opportunities',  desc: 'Engaged contacts turned into pipeline',  tag: '04' },
                  ]
                  const Card = ({ step }: { step: typeof steps[number] }) => (
                    <div className="flex flex-col gap-3 bg-white rounded-2xl border border-[#F3E8FF] shadow-[0_4px_16px_rgba(124,58,237,0.07)] px-4 py-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                          {step.icon}
                        </div>
                        <span className="text-[11px] font-semibold text-[#7C3AED] bg-[#F3E8FF] rounded-full px-2.5 py-1 flex-shrink-0">{step.tag}</span>
                      </div>
                      <div>
                        <p className="text-[13.5px] font-heading font-bold text-[#3D1E5C] leading-tight">{step.label}</p>
                        <p className="text-[11.5px] text-gray-400 leading-snug mt-1">{step.desc}</p>
                      </div>
                    </div>
                  )
                  const HConnector = ({ i }: { i: number }) => (
                    <div className="hidden sm:flex items-center justify-center w-6 h-10 relative flex-shrink-0">
                      <div className="w-full h-px bg-[#DDD6FE]"/>
                      <motion.div
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#7C3AED] top-1/2 -translate-y-1/2"
                        animate={{ left: ['0%', '92%'], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: i * 0.35 }}
                      />
                    </div>
                  )
                  const VConnector = ({ i }: { i: number }) => (
                    <div className="sm:hidden flex justify-center w-10 h-6 relative flex-shrink-0 self-center">
                      <div className="h-full w-px bg-[#DDD6FE]"/>
                      <motion.div
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#7C3AED] left-1/2 -translate-x-1/2"
                        animate={{ top: ['0%', '85%'], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: i * 0.35 }}
                      />
                    </div>
                  )
                  return (
                    <div className="flex flex-col sm:flex-row sm:items-stretch max-w-[960px] mx-auto">
                      {steps.map((step, i) => (
                        <React.Fragment key={step.label}>
                          <Card step={step}/>
                          {i < steps.length - 1 && (<><HConnector i={i}/><VConnector i={i}/></>)}
                        </React.Fragment>
                      ))}
                    </div>
                  )
                })()}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OPPORTUNITY / ENGAGEMENT ── */}
      <section className="bg-white px-8 py-24 sm:py-28">
        <div className="max-w-[1000px] mx-auto">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-6">
            <div className="w-[18px] h-[14px] rounded-[3px] bg-[#7C3AED]"/>
            <span className="text-[13px] font-semibold text-[#7C3AED] tracking-[0.01em]">Beyond the CRM</span>
          </motion.div>

          <motion.h2 {...fadeUp(0.05)} className="text-[30px] sm:text-[36px] font-heading font-black tracking-[-0.03em] leading-[1.2] text-[#1A1523] max-w-[820px] mb-10">
            Customer Engagement Doesn&apos;t End Inside Your CRM
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5">
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Customer records help businesses understand who their customers are. Engagement helps businesses build stronger relationships with them. Campaigns help teams create meaningful customer interactions across every stage of the customer journey, from initial outreach and nurturing to ongoing engagement and retention.
              </p>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Instead of relying on disconnected tools, manual follow-ups, and fragmented communication, teams can coordinate customer engagement through a single platform designed to keep communication relevant, timely, and connected to business goals.
              </p>
            </motion.div>

            {/* Visual — customer record enriched with a live engagement timeline */}
            <motion.div {...fadeUp(0.18)} className="relative">
              <div className="rounded-2xl bg-white border border-[#F3E8FF] shadow-[0_20px_60px_rgba(124,58,237,0.10)] p-5">
                {/* customer record header */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#F3E8FF]">
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">SC</div>
                  <div>
                    <p className="text-[13.5px] font-heading font-bold text-[#1A1523] leading-tight">Sarah Chen</p>
                    <p className="text-[11.5px] text-gray-400 leading-tight mt-0.5">Acme Co · CRM record</p>
                  </div>
                  <span className="ml-auto text-[10.5px] font-semibold text-[#7C3AED] bg-[#F3E8FF] rounded-full px-2.5 py-1">Active</span>
                </div>

                {/* engagement timeline — animates in step by step, like it's happening live */}
                <div className="flex flex-col gap-4">
                  {[
                    { icon: <Envelope size={14} weight="bold" color="#7C3AED"/>, title: 'Email opened', desc: '"Q3 product update"', time: '2h ago' },
                    { icon: <ChatText size={14} weight="bold" color="#7C3AED"/>, title: 'SMS reply received', desc: '"Interested, let’s talk"', time: '5h ago' },
                    { icon: <CheckCircle size={14} weight="bold" color="#7C3AED"/>, title: 'Demo call booked', desc: 'Converted to opportunity', time: '1d ago' },
                  ].map((item, i, arr) => (
                    <motion.div
                      key={item.title}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="relative w-7 h-7 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                          {item.icon}
                          {i === arr.length - 1 && (
                            <motion.span
                              className="absolute inset-0 rounded-full border-2 border-[#7C3AED]"
                              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 1.6 }}
                            />
                          )}
                        </div>
                        {i < arr.length - 1 && (
                          <motion.div
                            className="w-px flex-1 bg-[#7C3AED] origin-top mt-1"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: 0.65 + i * 0.35, ease: 'linear' }}
                          />
                        )}
                      </div>
                      <div className="pb-1">
                        <p className="text-[12.5px] font-semibold text-[#1A1523] leading-tight">{item.title}</p>
                        <p className="text-[11.5px] text-gray-400 leading-tight mt-0.5">{item.desc}</p>
                        <p className="text-[10.5px] text-gray-300 leading-tight mt-1">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM FEATURES ── */}
      <section className="bg-white px-8 py-20 sm:py-24 border-t border-[#F3E8FF]">
        <div className="max-w-[1100px] mx-auto text-center mb-16">
          <motion.h2 {...fadeUp(0)} className="text-[30px] sm:text-[36px] font-heading font-black tracking-[-0.03em] leading-[1.2] text-[#1A1523] mb-6">
            Build Campaigns That Keep Customers Engaged
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="text-gray-500 text-[15px] leading-relaxed">
            Customer engagement is more than sending messages. It begins with understanding your audience, delivering the right message through the right channel, and keeping conversations moving with timely follow-ups. Campaigns bring audience management, multi-channel communication, automation, and performance insights together in one platform, helping teams create, manage, and measure customer engagement from start to finish.
          </motion.p>
        </div>

        {(() => { const features = [
            {
              icon: <FunnelSimple size={22} weight="bold" color="#7C3AED"/>, title: 'Audience Segmentation',
              desc: 'Create targeted audiences using customer information, engagement history, business data, and custom filters to deliver more relevant communication.',
              bgColor: '#D6E4F9', accentColor: '#7C3AED',
              mainImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80',
              smallImg: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&q=80',
              cardLabel: 'Active Customers', cardSub: '3,082 contacts',
              connectorPath: 'M2 4 C 18 4, 30 20, 34 40',
              connectorDots: [[2, 4], [34, 40]] as [number, number][],
            },
            {
              icon: <Envelope size={22} weight="bold" color="#7C3AED"/>, title: 'Email Campaigns',
              desc: 'Design, personalize, schedule, and deliver email campaigns for promotions, onboarding, announcements, newsletters, and customer engagement.',
              bgColor: '#FAE3D0', accentColor: '#FF7D3D',
              mainImg: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&q=80',
              smallImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&q=80',
              cardLabel: 'Q3 product update', cardSub: 'Opened · 2h ago',
              connectorPath: 'M4 2 C 4 16, 10 26, 30 34',
              connectorDots: [[4, 2], [30, 34]] as [number, number][],
            },
            {
              icon: <ChatText size={22} weight="bold" color="#7C3AED"/>, title: 'SMS Campaigns',
              desc: 'Reach customers with timely messages, reminders, confirmations, updates, and follow-ups that encourage faster engagement.',
              bgColor: '#D0E5E0', accentColor: '#2D9D78',
              mainImg: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
              smallImg: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=300&q=80',
              cardLabel: 'Reply received', cardSub: '"Interested, let’s talk"',
              connectorPath: 'M2 2 Q 30 2, 32 38',
              connectorDots: [[2, 2], [32, 38]] as [number, number][],
            },
            {
              icon: <Lightning size={22} weight="bold" color="#7C3AED"/>, title: 'Campaign Automation',
              desc: 'Build automated workflows that respond to customer actions, business events, timing, and engagement activity without manual intervention.',
              bgColor: '#F5D9E1', accentColor: '#E85D87',
              mainImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
              smallImg: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&q=80',
              cardLabel: 'Workflow triggered', cardSub: 'Just now',
              connectorPath: 'M2 6 C 20 -2, 40 10, 34 40',
              connectorDots: [[2, 6], [34, 40]] as [number, number][],
            },
            {
              icon: <GitBranch size={22} weight="bold" color="#7C3AED"/>, title: 'Journey Builder',
              desc: 'Visually design customer engagement journeys by combining audiences, communication channels, automation, and decision points into structured workflows.',
              bgColor: '#D2DFF0', accentColor: '#3B5998',
              mainImg: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
              smallImg: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&q=80',
              cardLabel: 'Journey published', cardSub: '4 steps · live',
              connectorPath: 'M2 2 L 16 20 L 34 38',
              connectorDots: [[2, 2], [34, 38]] as [number, number][],
            },
            {
              icon: <ChartLineUp size={22} weight="bold" color="#7C3AED"/>, title: 'Campaign Analytics',
              desc: 'Monitor campaign performance, audience engagement, communication trends, and customer interactions to continuously improve future campaigns.',
              bgColor: '#FAE3D0', accentColor: '#FF7D3D',
              mainImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
              smallImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80',
              cardLabel: 'Open rate up', cardSub: '+18% this month',
              connectorPath: 'M2 30 C 10 8, 26 4, 34 6',
              connectorDots: [[2, 30], [34, 6]] as [number, number][],
            },
          ]

          return (
            <div className="max-w-[1100px] mx-auto">
              {/* nav arrows */}
              <div className="hidden sm:flex items-center gap-2 mb-6" style={{ justifyContent: 'flex-end' }}>
                <button
                  onClick={() => scrollByCard(-1)}
                  className="w-10 h-10 rounded-full border border-[#DDD6FE] bg-white flex items-center justify-center hover:bg-[#F3E8FF] transition-colors"
                  aria-label="Previous"
                >
                  <ArrowRight size={15} weight="bold" color="#7C3AED" className="rotate-180"/>
                </button>
                <button
                  onClick={() => scrollByCard(1)}
                  className="w-10 h-10 rounded-full border border-[#DDD6FE] bg-white flex items-center justify-center hover:bg-[#F3E8FF] transition-colors"
                  aria-label="Next"
                >
                  <ArrowRight size={15} weight="bold" color="#7C3AED"/>
                </button>
              </div>

              {/* sliding carousel */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {features.map((f, i) => {
                  const variant = i % 3
                  return (
                  <motion.div
                    key={f.title}
                    data-card
                    {...fadeUp(i * 0.05)}
                    className="snap-start flex-shrink-0 w-[300px] sm:w-[340px] rounded-2xl border border-[#F3E8FF] overflow-hidden flex flex-col"
                  >
                    {/* visual — layout differs by variant so each card's collage feels distinct */}
                    <div
                      className="relative h-[240px] flex items-center justify-center px-6 pt-8 pb-6"
                      style={{
                        background:
                          'radial-gradient(125% 130% at 90% 6%, #60A5FA4D 0%, transparent 55%), ' +
                          'radial-gradient(130% 140% at 6% 102%, #FF7D3D4D 0%, transparent 52%), ' +
                          'radial-gradient(100% 100% at 50% 45%, #EC489926 0%, transparent 60%), ' +
                          '#FDFBFF',
                      }}
                    >

                      {variant === 0 && (
                        <>
                          {/* separate photos, linked by a dashed path */}
                          <svg className="hidden sm:block absolute z-[15] pointer-events-none" style={{ left: 190, top: 34 }} width="56" height="56" viewBox="0 0 56 56" fill="none">
                            <path d={f.connectorPath} stroke={f.accentColor} strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round"/>
                            <circle cx={f.connectorDots[0][0]} cy={f.connectorDots[0][1]} r="3" fill={f.accentColor}/>
                            <circle cx={f.connectorDots[1][0]} cy={f.connectorDots[1][1]} r="3" fill={f.accentColor}/>
                          </svg>
                          <div className="relative w-[150px] h-[190px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border-4 border-white">
                            <img src={f.mainImg} alt={f.title} className="w-full h-full object-cover"/>
                          </div>
                          <div className="absolute top-5 right-4 w-[86px] h-[64px] rounded-xl overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.16)] border-[3px] border-white rotate-3">
                            <img src={f.smallImg} alt="" className="w-full h-full object-cover"/>
                          </div>
                          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] flex items-center justify-center z-20">
                            {f.icon}
                          </div>
                          <div className="absolute bottom-4 right-4 bg-white rounded-lg border border-white shadow-[0_10px_28px_rgba(0,0,0,0.16)] px-3 py-2 w-[150px] z-20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: f.accentColor }}/>
                              <p className="text-[10px] font-semibold text-[#1A1523] leading-tight truncate">{f.cardLabel}</p>
                            </div>
                            <p className="text-[9px] text-gray-400 leading-tight">{f.cardSub}</p>
                          </div>
                        </>
                      )}

                      {variant === 1 && (
                        <>
                          {/* wide photo up top, a smaller one overlapping its corner */}
                          <div className="absolute top-[30px] left-[36px] w-[200px] h-[128px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border-4 border-white">
                            <img src={f.mainImg} alt={f.title} className="w-full h-full object-cover"/>
                          </div>
                          <div className="absolute top-[128px] left-[196px] w-[80px] h-[80px] rounded-xl overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.16)] border-[3px] border-white rotate-3 z-10">
                            <img src={f.smallImg} alt="" className="w-full h-full object-cover"/>
                          </div>
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] flex items-center justify-center z-20">
                            {f.icon}
                          </div>
                          <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-white shadow-[0_10px_28px_rgba(0,0,0,0.16)] px-3 py-2 w-[150px] z-20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: f.accentColor }}/>
                              <p className="text-[10px] font-semibold text-[#1A1523] leading-tight truncate">{f.cardLabel}</p>
                            </div>
                            <p className="text-[9px] text-gray-400 leading-tight">{f.cardSub}</p>
                          </div>
                        </>
                      )}

                      {variant === 2 && (
                        <>
                          {/* square photo, a portrait photo overlapping its left edge */}
                          <div className="absolute top-[39px] left-[85px] w-[170px] h-[170px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border-4 border-white">
                            <img src={f.mainImg} alt={f.title} className="w-full h-full object-cover"/>
                          </div>
                          <div className="absolute top-[64px] left-[32px] w-[88px] h-[112px] rounded-xl overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.16)] border-[3px] border-white -rotate-3 z-10">
                            <img src={f.smallImg} alt="" className="w-full h-full object-cover"/>
                          </div>
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] flex items-center justify-center z-20">
                            {f.icon}
                          </div>
                          <div className="absolute bottom-4 right-4 bg-white rounded-lg border border-white shadow-[0_10px_28px_rgba(0,0,0,0.16)] px-3 py-2 w-[150px] z-20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: f.accentColor }}/>
                              <p className="text-[10px] font-semibold text-[#1A1523] leading-tight truncate">{f.cardLabel}</p>
                            </div>
                            <p className="text-[9px] text-gray-400 leading-tight">{f.cardSub}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* text */}
                    <div className="bg-white px-5 pt-6 pb-7 flex flex-col gap-3 flex-1">
                      <span
                        className="inline-flex w-fit text-[11px] font-semibold rounded-full px-2.5 py-1"
                        style={{ backgroundColor: f.bgColor, color: f.accentColor }}
                      >
                        Campaigns
                      </span>
                      <h3 className="text-[18px] font-heading font-bold tracking-[-0.02em] leading-[1.3] text-[#1A1523]">{f.title}</h3>
                      <p className="text-gray-500 text-[13px] leading-[1.7]">{f.desc}</p>
                    </div>
                  </motion.div>
                  )
                })}
              </div>

              {/* dot pagination */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {features.map((f, i) => (
                  <button
                    key={f.title}
                    onClick={() => scrollToCard(i)}
                    aria-label={`Go to ${f.title}`}
                    className="p-1"
                  >
                    <span
                      className={cn('block h-1.5 rounded-full transition-all duration-300', activeSlide === i ? 'w-6 bg-[#7C3AED]' : 'w-1.5 bg-[#DDD6FE]')}
                    />
                  </button>
                ))}
              </div>
            </div>
          )
        })()}
      </section>

      {/* ══ WORKS THE WAY YOUR BUSINESS WORKS — split-screen ══ */}
      <section className="pt-24 sm:pt-28 pb-24 sm:pb-28 bg-[#FAF9FC]">
        <div className="max-w-[800px] mx-auto px-6 text-center mb-16">
          <motion.h2 {...fadeUp()} className="text-[32px] sm:text-[40px] font-heading font-bold tracking-[-0.02em] leading-[1.15] text-[#1A1523] mb-5">
            Works The Way Your Business Works
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-gray-500 text-[15px] sm:text-[16px] leading-[1.8]">
            Customer engagement should adapt to your business, not force you into a specific way of working. Whether customer information lives inside EVOQ CRM or another CRM platform, Campaigns helps teams coordinate engagement while keeping customer data connected, accessible, and actionable.
          </motion.p>
        </div>

        <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* left — Connect EVOQ CRM */}
          <motion.div {...fadeUp()} className="relative overflow-hidden px-8 sm:px-14 py-16 flex flex-col items-center text-center bg-white rounded-3xl border border-[#F3E8FF] shadow-[0_10px_40px_rgba(76,29,149,0.08)]">
            {/* radiating line pattern accent — fans out from the bottom-left corner, pink through violet to blue */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'repeating-conic-gradient(from -90deg at 0% 100%, rgba(255,255,255,0.9) 0deg 0.5deg, rgba(255,255,255,0) 0.5deg 3.4deg), ' +
                  'linear-gradient(to top right, #F9A8D4 0%, #C4B5FD 16%, #A5B4FC 28%, #FFFFFF 40%)',
                backgroundBlendMode: 'overlay',
              }}
              aria-hidden
            />
            <div className="relative z-10 flex flex-col items-center w-full">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-3 py-1.5 bg-white text-[#7C3AED] mb-6">
                <Database size={14} weight="bold"/> EVOQ CRM
              </span>
              <h3 className="text-[22px] font-heading font-bold tracking-[-0.02em] text-[#1A1523] mb-3">
                Connect EVOQ CRM
              </h3>
              <p className="text-gray-500 text-[14px] leading-[1.7] max-w-[360px] mb-10">
                Create a connected engagement experience powered by customer records, opportunities, activities, and business data.
              </p>

              {/* visual — hub and spoke, native integration (flex-based so nodes always stay centered/aligned) */}
              <div className="flex flex-col items-center w-full max-w-[280px]">
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)] px-3 py-2.5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D6E4F9' }}>
                      <Users size={14} weight="bold" color="#7C3AED"/>
                    </span>
                    <p className="text-[11px] font-semibold text-[#1A1523] leading-tight whitespace-nowrap">Customer Records</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)] px-3 py-2.5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D6E4F9' }}>
                      <Target size={14} weight="bold" color="#7C3AED"/>
                    </span>
                    <p className="text-[11px] font-semibold text-[#1A1523] leading-tight whitespace-nowrap">Opportunities</p>
                  </div>
                </div>

                <div className="w-px h-6 border-l-2 border-dashed border-[#7C3AED]"/>

                <div className="bg-white rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.16)] border-2 border-[#7C3AED] px-4 py-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#7C3AED]">
                    <Sparkle size={16} weight="bold" color="white"/>
                  </span>
                  <p className="text-[12px] font-bold text-[#1A1523] leading-tight whitespace-nowrap">Campaigns</p>
                </div>

                <div className="w-px h-6 border-l-2 border-dashed border-[#7C3AED]"/>

                <div className="bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)] px-3 py-2.5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D6E4F9' }}>
                    <ChatCircleDots size={14} weight="bold" color="#7C3AED"/>
                  </span>
                  <p className="text-[11px] font-semibold text-[#1A1523] leading-tight whitespace-nowrap">Activities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* right — Work With Your Existing CRM */}
          <motion.div {...fadeUp(0.1)} className="relative overflow-hidden px-8 sm:px-14 py-16 flex flex-col items-center text-center bg-white rounded-3xl border border-[#FBE6D4] shadow-[0_10px_40px_rgba(255,125,61,0.08)]">
            {/* radiating line pattern accent — fans out from the bottom-left corner, pink through orange to gold */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  'repeating-conic-gradient(from -90deg at 0% 100%, rgba(255,255,255,0.9) 0deg 0.5deg, rgba(255,255,255,0) 0.5deg 3.4deg), ' +
                  'linear-gradient(to top right, #F9A8D4 0%, #FDBA74 18%, #FDE68A 30%, #FFFFFF 40%)',
                backgroundBlendMode: 'overlay',
              }}
              aria-hidden
            />
            <div className="relative z-10 flex flex-col items-center w-full">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-3 py-1.5 bg-white text-[#FF7D3D] mb-6">
                <PlugsConnected size={14} weight="bold"/> Any CRM
              </span>
              <h3 className="text-[22px] font-heading font-bold tracking-[-0.02em] text-[#1A1523] mb-3">
                Work With Your Existing CRM
              </h3>
              <p className="text-gray-500 text-[14px] leading-[1.7] max-w-[360px] mb-10">
                Extend your current CRM with campaign management capabilities while keeping customer information connected.
              </p>

              {/* visual — two systems bridged together */}
              <div className="relative w-full max-w-[300px] h-[220px] flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.14)] px-4 py-5 flex flex-col items-center gap-2 w-[110px]">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FAE3D0' }}>
                    <Database size={18} weight="bold" color="#FF7D3D"/>
                  </span>
                  <p className="text-[12px] font-bold text-[#1A1523] leading-tight text-center">Your CRM</p>
                </div>

                <div className="flex flex-col items-center px-2">
                  <svg width="64" height="24" viewBox="0 0 64 24" fill="none">
                    <path d="M2 12 H62" stroke="#FF7D3D" strokeWidth="1.5" strokeDasharray="1 6" strokeLinecap="round"/>
                  </svg>
                  <span className="w-9 h-9 rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] flex items-center justify-center -mt-1">
                    <PlugsConnected size={16} weight="bold" color="#FF7D3D"/>
                  </span>
                </div>

                <div className="bg-white rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.14)] border-2 border-[#FF7D3D] px-4 py-5 flex flex-col items-center gap-2 w-[110px]">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FF7D3D]">
                    <Sparkle size={18} weight="bold" color="white"/>
                  </span>
                  <p className="text-[12px] font-bold text-[#1A1523] leading-tight text-center">Campaigns</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ ENGAGEMENT CONNECTED TO THE BIGGER PICTURE — hub diagram ══ */}
      <section className="bg-[#FAF5FF] pt-12 sm:pt-16 pb-24 sm:pb-28">
        <div className="max-w-[800px] mx-auto px-6 text-center mb-16">
          <motion.h2 {...fadeUp()} className="text-[32px] sm:text-[40px] font-heading font-bold tracking-[-0.02em] leading-[1.15] text-[#1A1523] mb-5">
            Engagement Connected To The Bigger Picture
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-gray-500 text-[15px] sm:text-[16px] leading-[1.8]">
            Customer engagement influences far more than marketing activity. When connected across the EVOQ platform, customer engagement can remain visible alongside sales activity, service delivery, operational planning, and business processes. This creates greater visibility into how customer interactions contribute to broader business outcomes.
          </motion.p>
        </div>

        {/* hub diagram — flex-based so nodes always stay centered/aligned */}
        <motion.div {...fadeUp(0.15)} className="flex flex-col items-center gap-0 max-w-[640px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D6E4F9' }}>
                <Target size={16} weight="bold" color="#3B5998"/>
              </span>
              <p className="text-[13px] font-semibold text-[#1A1523] leading-tight whitespace-nowrap">Sales Activity</p>
            </div>
            <div className="bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D0E5E0' }}>
                <CheckCircle size={16} weight="bold" color="#2D9D78"/>
              </span>
              <p className="text-[13px] font-semibold text-[#1A1523] leading-tight whitespace-nowrap">Service Delivery</p>
            </div>
          </div>

          <div className="w-px h-8 border-l-2 border-dashed border-[#7C3AED]"/>

          <div className="bg-white rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.14)] border-2 border-[#7C3AED] px-6 py-4 flex items-center gap-3 z-10">
            <span className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-[#7C3AED]">
              <Sparkle size={20} weight="bold" color="white"/>
            </span>
            <div className="text-left">
              <p className="text-[15px] font-bold text-[#1A1523] leading-tight whitespace-nowrap">Customer Engagement</p>
              <p className="text-[11px] text-gray-400 leading-tight whitespace-nowrap">Powered by Campaigns</p>
            </div>
          </div>

          <div className="w-px h-8 border-l-2 border-dashed border-[#7C3AED]"/>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FAE3D0' }}>
                <GitBranch size={16} weight="bold" color="#FF7D3D"/>
              </span>
              <p className="text-[13px] font-semibold text-[#1A1523] leading-tight whitespace-nowrap">Operational Planning</p>
            </div>
            <div className="bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F5D9E1' }}>
                <ChartLineUp size={16} weight="bold" color="#E85D87"/>
              </span>
              <p className="text-[13px] font-semibold text-[#1A1523] leading-tight whitespace-nowrap">Business Processes</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bg-white px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 border-t border-[#F3E8FF]">
        <div className="max-w-[720px] mx-auto">
          <motion.h2 {...fadeUp()} className="text-[30px] sm:text-[36px] font-heading font-black tracking-[-0.03em] leading-[1.2] text-[#1A1523] text-center mb-12">
            FAQ
          </motion.h2>
          <motion.div {...fadeUp(0.1)}>
            <FaqAccordion/>
          </motion.div>
        </div>
      </section>

      {/* ══ FINAL CTA — See Campaigns In Action ══ */}
      <section className="bg-white px-8 pt-0 pb-20 sm:pb-28">
        <motion.div {...fadeUp()} className="relative overflow-hidden max-w-[1160px] mx-auto rounded-[32px] px-8 py-16 sm:py-20 text-center bg-[#FAF5FF]">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'repeating-conic-gradient(from -90deg at 0% 100%, rgba(255,255,255,0.9) 0deg 0.5deg, rgba(255,255,255,0) 0.5deg 3.4deg), ' +
                'linear-gradient(to top right, #F9A8D4 0%, #C4B5FD 16%, #A5B4FC 28%, #FFFFFF 40%)',
              backgroundBlendMode: 'overlay',
            }}
            aria-hidden
          />
          <div className="relative max-w-[560px] mx-auto">
            <h2 className="text-[32px] sm:text-[40px] font-heading font-black tracking-[-0.03em] leading-[1.15] text-[#1A1523] mb-5">
              See Campaigns In Action
            </h2>
            <p className="text-gray-500 text-[15px] sm:text-[16px] leading-[1.8] mb-10">
              Discover how coordinated customer engagement can help your team strengthen relationships, improve communication, and create more business opportunities.
            </p>
            <a href="https://dev.evoq.one/contact"
              className="inline-flex items-center gap-1.5 bg-[#7C3AED] text-white text-[14px] font-bold px-6 py-3 rounded-lg hover:bg-[#6D28D9] transition-colors shadow-[0_6px_24px_rgba(124,58,237,0.35)]">
              Request Demo
              <ArrowRight size={15} weight="bold"/>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#7C3AED] px-4 sm:px-6 md:px-8 pt-16 pb-10">
        <div className="max-w-[1300px] mx-auto">

          {/* Main grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">

            {/* Brand */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex flex-col gap-[4.5px]">
                  <div className="w-[16px] h-[1.5px] rounded-full bg-white"/>
                  <div className="w-[11px] h-[1.5px] rounded-full bg-white"/>
                  <div className="w-[16px] h-[1.5px] rounded-full bg-white"/>
                </div>
                <span className="text-white font-heading font-black text-[20px] tracking-[-0.03em] leading-none">EVOQ</span>
              </div>
              <p className="text-white font-semibold text-[16px] mb-2 leading-snug">One Suite. Endless Potential.</p>
              <p className="text-white/70 text-[13px] leading-relaxed max-w-[220px]">
                A unified business operating system for modern organizations.
              </p>
            </div>

            {/* Growth */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Growth</div>
              <div className="space-y-3 mb-6">
                {[{l:'CRM',h:'/'},{l:'Campaigns',h:'/campaigns'}].map(p => (
                  <a key={p.l} href={p.h} className="block text-[14px] text-white/70 hover:text-white transition-colors">{p.l}</a>
                ))}
              </div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">People</div>
              <div className="space-y-3">
                {[{l:'HRMS',h:'#'},{l:'Skillberry',h:'#'}].map(p => (
                  <a key={p.l} href={p.h} className="block text-[14px] text-white/70 hover:text-white transition-colors">{p.l}</a>
                ))}
              </div>
            </div>

            {/* Operations */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Operations</div>
              <div className="space-y-3">
                {[{l:'ServiceOps',h:'#'},{l:'Desk',h:'#'},{l:'Projects',h:'#'},{l:'Sync',h:'/sync'}].map(p => (
                  <a key={p.l} href={p.h} className="block text-[14px] text-white/70 hover:text-white transition-colors">{p.l}</a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Company</div>
              <div className="space-y-3">
                <a href="https://dev.evoq.one/contact" className="block text-[14px] text-white/70 hover:text-white transition-colors">Contact Us</a>
                <a href="https://dev.evoq.one/why-evoq" className="block text-[14px] text-white/70 hover:text-white transition-colors">Why EVOQ?</a>
              </div>
            </div>

            {/* Legal */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Legal</div>
              <div className="space-y-3">
                {['Privacy Policy','Terms of Service','Cookie Preferences'].map(l => (
                  <a key={l} href="#" className="block text-[14px] text-white/70 hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/20 gap-4">
            <p className="text-[12.5px] text-white/60">© 2026 All rights reserved.</p>
            <div className="flex items-center gap-2">
              {[
                { name:'LinkedIn',  path:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { name:'Facebook',  path:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name:'Instagram', path:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { name:'YouTube',   path:'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
              ].map(s => (
                <a key={s.name} href="#" aria-label={s.name}
                  className="w-9 h-9 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/25 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>

    </div>
  )
}
