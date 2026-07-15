'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Users, CheckCircle } from 'phosphor-react'

// ─── CMS image base ───────────────────────────────────────────────────────────
const CMS = 'https://devcmsapp.evoq.one/api/media/file'

// ─── Animation presets ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
}

// ─── Feature data ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    num: '01',
    tag: 'Contact & Account Management',
    heading: 'Keep every relationship organized and contextual',
    desc: 'Keep a full picture of every contact and account. Sync emails, track conversations, and give your team the context they need before every interaction.',
    bg: '#DBEAFE',
    img: `${CMS}/Contact-Account-Management-new.png`,
  },
  {
    num: '02',
    tag: 'Sales Pipeline, Quotes & Revenue Management',
    heading: 'Turn opportunities into predictable revenue',
    desc: 'Manage every deal from first touch to close. Customize pipeline stages, automate transitions, and generate professional quotes without leaving the CRM.',
    bg: '#D1FAE5',
    img: `${CMS}/Sales-Pipeline-Quotes-Revenue-Management-new.png`,
  },
  {
    num: '03',
    tag: 'Customer Segmentation & Analytics',
    heading: 'Make smarter decisions with real insights',
    desc: 'Segment your customers by behavior, deal stage, or engagement. Track conversion rates, pipeline health, and team performance in real time.',
    bg: '#EDE9FE',
    img: `${CMS}/Customer-Segmentation-Analytics-new.png`,
  },
  {
    num: '04',
    tag: 'Task & Appointment Scheduling',
    heading: 'Stay on schedule and never miss a follow-up',
    desc: 'Schedule meetings, set reminders, and log every activity automatically. Your team stays organized without the overhead of manual entry.',
    bg: '#FEF3C7',
    img: `${CMS}/Task-Appointment-Scheduling-new.png`,
  },
  {
    num: '05',
    tag: 'Campaign Management & Outreach',
    heading: 'Engage leads across every channel',
    desc: 'Run targeted email and SMS campaigns, automate drip sequences, and track opens, clicks, and conversions — all without switching tools.',
    bg: '#FCE7F3',
    img: `${CMS}/Campaign-Management-Outreach-new.png`,
  },
  {
    num: '06',
    tag: 'Customization & Workflow Automation',
    heading: 'Adapt your CRM to how you sell',
    desc: "Build the CRM around your team's process — not the other way around. Custom fields, approval workflows, and smart lead routing included.",
    bg: '#CFFAFE',
    img: `${CMS}/customization-workflow-automation-new.png`,
  },
  {
    num: '07',
    tag: 'Mobile Accessibility',
    heading: 'Stay productive from anywhere',
    desc: 'Access your pipeline, contacts, and tasks from any device. The full CRM experience in your pocket, optimized for speed and ease of use.',
    bg: '#F3E8FF',
    img: `${CMS}/Mobile-Accessibility-new.png`,
  },
]

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [productsOpen, setProductsOpen] = useState(false)

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ══ TOP BAR — EVOQ global nav ══ */}
      <header className="fixed top-0 left-0 right-0 z-[210] h-[80px] bg-[#f0f6ff] shadow-[0_1px_0_#BFDBFE,0_4px_12px_rgba(29,78,216,0.07)]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">

          {/* Left: EVOQ logo */}
          <a href="https://dev.evoq.one" className="flex items-center gap-3 group flex-shrink-0">
            <div className="hidden sm:flex flex-col gap-[5px]">
              <div className="w-[18px] h-[2px] rounded-full bg-depth group-hover:opacity-60 transition-opacity"/>
              <div className="w-[13px] h-[2px] rounded-full bg-depth group-hover:opacity-60 transition-opacity"/>
              <div className="w-[18px] h-[2px] rounded-full bg-depth group-hover:opacity-60 transition-opacity"/>
            </div>
            <span className="text-depth font-heading font-black text-[22px] sm:text-[24px] tracking-[-0.04em] leading-none">EVOQ</span>
          </a>

          {/* Nav pill — right next to logo */}
          <div className="hidden md:flex items-center bg-white border border-[#BFDBFE] rounded-full px-1.5 py-1 shadow-[0_2px_8px_rgba(29,78,216,0.10)] ml-5">
            <div className="relative">
              <button
                onClick={() => setProductsOpen(p => !p)}
                onBlur={() => setTimeout(() => setProductsOpen(false), 150)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-gray-600 hover:bg-[#EFF6FF] hover:text-primary transition-all duration-150"
              >
                Products
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={cn('transition-transform duration-200', productsOpen && 'rotate-180')}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {productsOpen && (
                <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl border border-[#DBEAFE] shadow-[0_16px_48px_rgba(29,78,216,0.14)] py-2 z-50">
                  {[
                    { label: 'CRM',        desc: 'Sales & pipeline management', href: '/',    active: true },
                    { label: 'Sync',       desc: 'Data integration platform',   href: '/sync',  active: false },
                    { label: 'Skillberry', desc: 'Learning management suite',   href: '#' },
                  ].map(p => (
                    <a key={p.label} href={p.href}
                      className={cn('flex flex-col px-4 py-2.5 hover:bg-[#EFF6FF] transition-colors rounded-xl mx-1.5', p.active && 'bg-[#EFF6FF]')}>
                      <span className={cn('text-[13px] font-semibold', p.active ? 'text-primary' : 'text-gray-800')}>{p.label}</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">{p.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="https://dev.evoq.one/why-evoq"
              className="px-4 py-2 rounded-full text-[13px] font-semibold text-gray-600 hover:bg-[#EFF6FF] hover:text-primary transition-all duration-150">
              Why EVOQ?
            </a>
          </div>

          <div className="flex-1"/>

          {/* Right: Contact Us */}
          <a href="https://dev.evoq.one/contact"
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full bg-primary text-white text-[12px] sm:text-[13px] font-bold hover:bg-hover transition-colors shadow-[0_2px_10px_rgba(29,78,216,0.28)] flex-shrink-0">
            <span className="hidden sm:inline">Contact Us</span>
            <ArrowUpRight size={13} weight="bold" color="white"/>
          </a>
        </div>
      </header>

      {/* ══ SUB-HEADER — CRM nav ══ */}
      <div className="fixed top-[80px] left-0 right-0 z-[200] h-[56px] bg-[#f0f6ff] border-b border-[#DBEAFE]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">

          {/* Left: EVOQ CRM — slightly indented from container edge */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-4 sm:ml-8">
            <div className="w-[28px] h-[28px] rounded-[8px] bg-primary flex items-center justify-center shadow-[0_2px_6px_rgba(29,78,216,0.25)]">
              <Users size={14} weight="duotone" color="white"/>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="hidden sm:inline text-[11px] font-semibold text-[#93C5FD] tracking-[0.06em] uppercase leading-none">EVOQ</span>
              <span className="text-[15px] font-black text-depth tracking-[-0.03em] leading-none">CRM</span>
            </div>
          </div>

          {/* Nav — placed right next to EVOQ CRM, not pushed to far right */}
          <nav className="ml-6 sm:ml-8 flex items-center gap-0.5">
            <Link href="/features"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium text-gray-500 hover:text-depth hover:bg-white/70 transition-all duration-150">
              Features
            </Link>
            <Link href="/pricing"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium text-gray-500 hover:text-depth hover:bg-white/70 transition-all duration-150">
              Pricing
            </Link>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-[156px] pb-0 px-8 text-center bg-surface overflow-hidden">

        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[700px] mx-auto mb-16"
        >
          {/* Sub-label — Depth, not Primary */}
          <p className="text-[14px] font-semibold text-depth tracking-wide mb-5">
            The CRM built for modern sales teams.
          </p>

          {/* Headline — Depth #0C2472 */}
          <h1 className="text-[48px] font-heading font-black tracking-[-0.04em] leading-[1.05] mb-6 text-depth">
            Sell Smarter. Close Faster. Grow Better.
          </h1>

          {/* Description — gray-500 */}
          <p className="text-gray-500 text-[18px] leading-relaxed max-w-[540px] mx-auto mb-10">
            Stay on top of your sales pipeline, manage leads effortlessly, and build lasting customer relationships with one seamless CRM designed for your success.
          </p>

          {/* CTA — Outline button: white bg, Primary border + text */}
          <a href="#"
            className="inline-flex items-center justify-center px-9 py-3.5 rounded-xl border-2 border-primary text-primary text-[14px] font-bold bg-white hover:bg-primary hover:text-white transition-all duration-200 shadow-[0_2px_12px_rgba(29,78,216,0.12)]"
          >
            Book a Demo
          </a>
        </motion.div>

        {/* ── Stats cards strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[1200px] mx-auto"
        >
          {/* Overflow container — cards scroll horizontally if needed */}
          <div className="flex items-end justify-center gap-4 px-4" style={{ minHeight: 340 }}>

            {/* Card 1 — Soft blue, tall, icon + caption */}
            <div className="flex-shrink-0 w-[220px] h-[300px] rounded-[20px] bg-soft p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(29,78,216,0.10)]"
              style={{ alignSelf: 'flex-end', marginBottom: 0 }}>
              <div>
                <Users size={28} weight="duotone" color="#1D4ED8"/>
              </div>
              <p className="text-depth text-[14px] font-medium leading-snug">
                Manage leads and contacts in one centralized hub.
              </p>
            </div>

            {/* Card 2 — White, shorter, stat: 3x */}
            <div className="flex-shrink-0 w-[220px] h-[240px] rounded-[20px] bg-white p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
              <div>
                <ArrowUpRight size={28} weight="duotone" color="#1D4ED8"/>
              </div>
              <div>
                <div className="text-[48px] font-heading font-black text-depth leading-none tracking-tight">3x</div>
                <div className="text-[14px] text-gray-500 mt-1">Faster Deal Closure</div>
              </div>
            </div>

            {/* Card 3 — Photo, tallest */}
            <div className="flex-shrink-0 w-[280px] h-[320px] rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
              style={{ alignSelf: 'flex-end', marginBottom: 0 }}>
              <Image
                src={`${CMS}/crm-banner--2.jpg`}
                alt="Sales team"
                width={280}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Card 4 — Soft blue, medium, stat: 99.9% */}
            <div className="flex-shrink-0 w-[220px] h-[240px] rounded-[20px] bg-soft p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(29,78,216,0.10)]"
              style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
              <div>
                <CheckCircle size={28} weight="duotone" color="#1D4ED8"/>
              </div>
              <div>
                <div className="text-[48px] font-heading font-black text-depth leading-none tracking-tight">99.9%</div>
                <div className="text-[14px] text-gray-600 mt-1">Uptime Guaranteed</div>
              </div>
            </div>

            {/* Card 5 — Photo, tall, partially cropped on right */}
            <div className="flex-shrink-0 w-[220px] h-[300px] rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
              style={{ alignSelf: 'flex-end', marginBottom: 0 }}>
              <Image
                src={`${CMS}/Campaign-Management-Outreach-new.png`}
                alt="Customer engagement"
                width={220}
                height={300}
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </motion.div>
      </section>

      {/* ── DARK GOALS SECTION ── */}
      <section className="bg-depth py-28 px-8 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% -10%, #1D4ED8 0%, transparent 70%)' }}/>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="relative max-w-[900px] mx-auto text-center"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] leading-[1.06] mb-5">
              Think Big Goals and Win Big Success
            </h2>
            <p className="text-white/55 text-[18px] leading-relaxed max-w-[500px] mx-auto mb-20">
              Unlock your sales potential with our robust CRM toolkit, providing you endless opportunities to bring your revenue goals to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { val: '+27', label: 'Better Customer Retention', sub: 'Keep more customers, longer.' },
              { val: '+35', label: 'Faster Follow-Ups',         sub: 'Never lose a lead to slow response.' },
              { val: '+45', label: 'Higher Sales Engagement',   sub: 'More touchpoints, more conversions.' },
            ].map(m => (
              <motion.div key={m.val} variants={fadeUp} className="text-center">
                <div className="text-[72px] font-heading font-black text-white tracking-tight leading-none mb-3">{m.val}</div>
                <div className="text-[15px] font-semibold text-white/90 mb-1">{m.label}</div>
                <div className="text-[13px] text-white/45">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="bg-white py-28 px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mx-auto text-center mb-24"
        >
          <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.06]">
            Intelligent CRM Capabilities.{' '}
            <span className="text-gray-400">Simplifying sales, support, and customer engagement.</span>
          </h2>
        </motion.div>

        {/* Feature rows */}
        <div className="max-w-[1100px] mx-auto space-y-24">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.tag}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8%' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Text */}
              <motion.div variants={fadeUp}>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-primary mb-4">{f.tag}</p>
                <h3 className="text-[28px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.2] mb-5">
                  {f.heading}
                </h3>
                <p className="text-gray-500 text-[16px] leading-relaxed mb-7 max-w-[420px]">
                  {f.desc}
                </p>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary hover:text-action transition-colors"
                >
                  Learn more <ArrowUpRight size={15} weight="bold"/>
                </Link>
              </motion.div>

              {/* Image panel */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl overflow-hidden p-6 lg:p-10"
                style={{ background: f.bg }}
              >
                <Image
                  src={f.img}
                  alt={f.tag}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl object-cover shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Learn more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-24"
        >
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 border-primary text-primary text-[14px] font-bold hover:bg-primary hover:text-white transition-all duration-200"
          >
            Learn more about our features
            <ArrowUpRight size={16} weight="bold"/>
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-surface py-24 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[580px] mx-auto"
        >
          <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.06] mb-5">
            Ready to make customer relationships easier to manage?
          </h2>
          <p className="text-gray-500 text-[16px] leading-relaxed mb-10">
            Bring your sales, service, and follow-ups into one connected CRM workflow so your team can move faster with less guesswork.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="bg-primary text-white text-[14px] font-bold px-8 py-3.5 rounded-lg hover:bg-hover transition-colors shadow-[0_2px_12px_rgba(29,78,216,0.3)]">
              Book a Demo
            </a>
            <Link href="/features" className="bg-white text-primary text-[14px] font-semibold px-8 py-3.5 rounded-lg border border-gray-200 hover:border-primary/40 hover:bg-surface transition-colors">
              Explore Features
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-100 py-16 px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-3">
                <Image
                  src={`${CMS}/evoq-logo-new-1.png`}
                  alt="EVOQ ONE"
                  width={100}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed max-w-[200px]">
                One Suite. Endless Potential.
              </p>
            </div>

            {/* Products */}
            <div>
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-4">Products</div>
              <div className="space-y-3">
                {[{ l: 'CRM', h: '/' }, { l: 'Sync', h: '#' }, { l: 'Skillberry', h: '#' }].map(p => (
                  <a key={p.l} href={p.h} className="block text-[13px] text-gray-600 hover:text-primary transition-colors">{p.l}</a>
                ))}
              </div>
            </div>

            {/* Learn */}
            <div>
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-4">Learn</div>
              <div className="space-y-3">
                <Link href="/features" className="block text-[13px] text-gray-600 hover:text-primary transition-colors">Why EVOQ?</Link>
                <a href="#" className="block text-[13px] text-gray-600 hover:text-primary transition-colors">Pricing</a>
              </div>
            </div>

            {/* Company + Legal */}
            <div>
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-4">Company</div>
              <div className="space-y-3 mb-7">
                {['About Us', 'Contact Us'].map(l => (
                  <a key={l} href="#" className="block text-[13px] text-gray-600 hover:text-primary transition-colors">{l}</a>
                ))}
              </div>
              <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-4">Legal</div>
              <div className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map(l => (
                  <a key={l} href="#" className="block text-[13px] text-gray-400 hover:text-gray-600 transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-4">
            <p className="text-[12px] text-gray-400">© 2026 Social DNA Labs. All rights reserved.</p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { name: 'LinkedIn',  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { name: 'Facebook',  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { name: 'YouTube',   path: 'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
              ].map(s => (
                <a key={s.name} href="#" aria-label={s.name}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
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
