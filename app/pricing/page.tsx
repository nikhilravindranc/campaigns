'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Users, CheckCircle, Globe, Minus, Check } from 'phosphor-react'

// ─── Animation ───────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// ─── Region / currency ─────────────────────────────────────────────────────────
type Region = 'IN' | 'US'
type Billing = 'monthly' | 'annual'

const PLAN_PRICING = {
  pro: {
    IN: { monthly: 1200, annual: 800 },
    US: { monthly: 18, annual: 14 },
  },
  max: {
    IN: { monthly: 1900, annual: 1400 },
    US: { monthly: 30, annual: 23 },
  },
} as const

function formatPrice(amount: number, region: Region) {
  return region === 'IN' ? `₹${amount.toLocaleString('en-IN')}` : `$${amount}`
}

function savingsPct(plan: keyof typeof PLAN_PRICING, region: Region) {
  const { monthly, annual } = PLAN_PRICING[plan][region]
  return Math.round((1 - annual / monthly) * 100)
}

// ─── Plan data ────────────────────────────────────────────────────────────────
const PRO_FEATURES = [
  'Contact & Account Management',
  'Lead & Deal Management',
  'Task & Appointment Scheduling',
  'Email & Calendar Integration',
  'Basic Dashboards & Reports',
  'Role-based Access Control',
  'File & Document Management',
  'AI Assistant (300 AI Credits/month)',
  '100,000 CRM Records / org',
  '2 GB Attachment Storage / org',
]

const MAX_FEATURES = [
  'AI Assistant (3,000 AI Credits/month)',
  'Workflow Automation',
  'Approval Workflows',
  'Sales Pipeline Management',
  'Inventory Management',
  'Quotes & Invoices',
  'Custom Reports & Dashboards',
  'Additional AI Credit Packs',
  '500,000 CRM Records / org',
  '10 GB Attachment Storage / org',
]

const ENTERPRISE_FEATURES = [
  'Advanced Sales Forecasting',
  'Lead Scoring & Auto Assignment',
  'Customer Segmentation',
  'AI-powered Insights & Win Probability',
  'Advanced CRM Customization',
  'Territory Management',
  'API Access',
  'Custom Integrations',
  'Priority Support',
  'Dedicated Customer Success Manager',
  '1,000,000+ CRM Records / org',
  '50 GB Attachment Storage (Expandable)',
  'Custom AI Credit Allocation',
]

// ─── Compare Plans data ─────────────────────────────────────────────────────────
type Cell = boolean | string

const COMPARE_SECTIONS: { title: string; rows: { feature: string; pro: Cell; max: Cell; enterprise: Cell }[] }[] = [
  {
    title: 'Sales',
    rows: [
      { feature: 'Contacts & Accounts', pro: true, max: true, enterprise: true },
      { feature: 'Leads', pro: true, max: true, enterprise: true },
      { feature: 'Deals', pro: true, max: true, enterprise: true },
      { feature: 'Activities', pro: true, max: true, enterprise: true },
      { feature: 'Tasks', pro: true, max: true, enterprise: true },
      { feature: 'Calendar', pro: true, max: true, enterprise: true },
      { feature: 'Products', pro: true, max: true, enterprise: true },
      { feature: 'Price Books', pro: true, max: true, enterprise: true },
      { feature: 'Quotes', pro: false, max: true, enterprise: true },
      { feature: 'Sales Orders', pro: false, max: true, enterprise: true },
      { feature: 'Invoices', pro: false, max: true, enterprise: true },
      { feature: 'Inventory', pro: false, max: true, enterprise: true },
      { feature: 'Territory Management', pro: false, max: false, enterprise: true },
      { feature: 'Lead Scoring', pro: false, max: false, enterprise: true },
      { feature: 'Sales Forecasting', pro: false, max: false, enterprise: true },
    ],
  },
  {
    title: 'Automation & AI',
    rows: [
      { feature: 'Workflow Automation', pro: 'Basic', max: 'Advanced', enterprise: 'Advanced' },
      { feature: 'Approval Workflows', pro: false, max: true, enterprise: true },
      { feature: 'Assignment Rules', pro: true, max: true, enterprise: true },
      { feature: 'AI Assistant', pro: '300 Credits', max: '3,000 Credits', enterprise: 'Custom' },
      { feature: 'AI Credit Packs', pro: 'Optional', max: true, enterprise: true },
      { feature: 'AI Insights', pro: false, max: false, enterprise: true },
      { feature: 'Win Probability', pro: false, max: false, enterprise: true },
    ],
  },
  {
    title: 'Analytics',
    rows: [
      { feature: 'Standard Reports', pro: true, max: true, enterprise: true },
      { feature: 'Custom Reports', pro: false, max: true, enterprise: true },
      { feature: 'Dashboards', pro: 'Basic', max: 'Advanced', enterprise: 'Executive' },
      { feature: 'Customer Segmentation', pro: false, max: false, enterprise: true },
    ],
  },
  {
    title: 'Customization',
    rows: [
      { feature: 'Custom Fields', pro: true, max: true, enterprise: true },
      { feature: 'Custom Layouts', pro: true, max: true, enterprise: true },
      { feature: 'Custom Modules', pro: true, max: true, enterprise: true },
      { feature: 'Validation Rules', pro: true, max: true, enterprise: true },
      { feature: 'API Access', pro: false, max: false, enterprise: true },
      { feature: 'Custom Integrations', pro: false, max: false, enterprise: true },
    ],
  },
  {
    title: 'Security & Support',
    rows: [
      { feature: 'Role-based Permissions', pro: true, max: true, enterprise: true },
      { feature: 'Email Support', pro: true, max: true, enterprise: true },
      { feature: 'Chat Support', pro: true, max: true, enterprise: true },
      { feature: 'Priority Support', pro: false, max: false, enterprise: true },
      { feature: 'Dedicated Customer Success Manager', pro: false, max: false, enterprise: true },
    ],
  },
]

const RESOURCE_ROWS: { resource: string; pro: string; max: string; enterprise: string }[] = [
  { resource: 'CRM Records', pro: '100,000', max: '500,000', enterprise: '1,000,000+' },
  { resource: 'Attachment Storage', pro: '2 GB', max: '10 GB', enterprise: '50 GB (Expandable)' },
  { resource: 'AI Credits / Month', pro: '300', max: '3,000', enterprise: 'Custom' },
  { resource: 'Additional AI Credits', pro: 'Optional', max: 'Available', enterprise: 'Available' },
]

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Can I try EVOQ CRM before purchasing?',
    a: 'Yes. Start a 14-day free trial with no credit card required and explore EVOQ CRM with your own data before choosing a plan.',
  },
  {
    q: 'Do I need to sign a long-term contract?',
    a: 'No. Choose monthly or annual billing and upgrade, downgrade, or cancel whenever your business needs change.',
  },
  {
    q: 'Do you offer discounts for annual billing?',
    a: 'Yes. Annual billing saves up to 33% compared to monthly pricing.',
  },
  {
    q: 'What happens if my team grows?',
    a: 'Simply add more users whenever you need them. Your subscription updates based on the number of active users.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Your data is protected using encrypted connections, secure cloud infrastructure, role-based permissions, and regular backups.',
  },
  {
    q: 'Can I migrate data from another CRM?',
    a: 'Yes. Import your data using CSV or Excel files. Our onboarding team can also assist with migrating from your existing CRM.',
  },
  {
    q: 'What support is included?',
    a: 'All plans include email and chat support. Enterprise customers also receive priority support and a dedicated Customer Success Manager.',
  },
  {
    q: 'Does EVOQ CRM integrate with other applications?',
    a: 'Yes. EVOQ CRM integrates with the EVOQ ecosystem, including EVOQ FSM and EVOQ Commerce, along with popular third-party business applications.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Absolutely. Upgrade your subscription at any time without losing your data or configuration.',
  },
  {
    q: 'What if I need more storage or AI credits?',
    a: 'Additional attachment storage and AI credit packs can be purchased without changing your subscription plan.',
  },
]

// ─── FAQ Accordion item ───────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn(
      'rounded-xl border transition-all duration-200',
      open ? 'border-primary/30 bg-[#EFF6FF]' : 'border-gray-100 bg-white hover:border-gray-200'
    )}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className={cn(
          'font-heading font-semibold text-[15px] leading-snug transition-colors',
          open ? 'text-primary' : 'text-gray-800'
        )}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke={open ? '#1D4ED8' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="px-6 pb-5"
        >
          <p className="text-gray-500 text-[15px] leading-relaxed border-t border-[#DBEAFE] pt-4">
            {a}
          </p>
        </motion.div>
      )}
    </div>
  )
}

// ─── Compare table cell ─────────────────────────────────────────────────────────
function CompareCell({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center">
          <Check size={11} weight="bold" color="#1D4ED8"/>
        </div>
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <Minus size={14} weight="bold" color="#D1D5DB"/>
      </div>
    )
  }
  return (
    <div className="text-center text-[13px] font-semibold text-gray-700">
      {value}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const [region, setRegion] = useState<Region>('IN')
  const [billing, setBilling] = useState<Billing>('monthly')
  const proPrice = PLAN_PRICING.pro[region][billing]
  const maxPrice = PLAN_PRICING.max[region][billing]

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ══ TOP BAR — EVOQ global nav ══ */}
      <header className="fixed top-0 left-0 right-0 z-[210] h-[80px] bg-[#f0f6ff] shadow-[0_1px_0_#BFDBFE,0_4px_12px_rgba(29,78,216,0.07)]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">

          {/* Left: EVOQ logo */}
          <a href="https://dev.evoq.one" className="flex items-center group flex-shrink-0 opacity-100 group-hover:opacity-80 transition-opacity">
            <Image src="/images/black-logo.png" alt="EVOQ" width={105} height={24} className="h-6 w-auto" priority/>
          </a>

          {/* Nav pill — right next to logo */}
          <div className="hidden md:flex items-center bg-[#E3ECFC] border border-[#BFDBFE] rounded-full px-1.5 py-1 shadow-[0_2px_8px_rgba(29,78,216,0.10)] ml-5">
            <div className="relative">
              <button
                onClick={() => setProductsOpen(p => !p)}
                onBlur={() => setTimeout(() => setProductsOpen(false), 150)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-primary bg-[#E3ECFC] hover:bg-[#DBEAFE] transition-all duration-150"
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
              className="px-4 py-2 rounded-full text-[13px] font-semibold text-primary bg-[#E3ECFC] hover:bg-[#DBEAFE] transition-all duration-150">
              Why EVOQ?
            </a>
          </div>

          <div className="flex-1"/>

          {/* Region / currency selector */}
          <div className="relative mr-3 sm:mr-4">
            <button
              onClick={() => setRegionOpen(o => !o)}
              onBlur={() => setTimeout(() => setRegionOpen(false), 150)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[12.5px] font-semibold text-gray-700 bg-white border border-[#DBEAFE] hover:border-[#93C5FD] transition-all duration-150 shadow-[0_1px_3px_rgba(29,78,216,0.06)]"
            >
              <Globe size={14} weight="bold" color="#1D4ED8"/>
              <span className="hidden sm:inline">{region === 'IN' ? 'India (₹)' : 'United States ($)'}</span>
              <span className="sm:hidden">{region}</span>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className={cn('transition-transform duration-200', regionOpen && 'rotate-180')}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {regionOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl border border-[#DBEAFE] shadow-[0_16px_48px_rgba(29,78,216,0.14)] py-1.5 z-50">
                {[
                  { code: 'IN' as Region, label: 'India', sub: '₹ INR' },
                  { code: 'US' as Region, label: 'United States', sub: '$ USD' },
                ].map(r => (
                  <button key={r.code} onClick={() => setRegion(r.code)}
                    className={cn('w-full flex items-center justify-between px-3.5 py-2 hover:bg-[#EFF6FF] transition-colors rounded-lg mx-1', region === r.code && 'bg-[#EFF6FF]')}>
                    <span className={cn('text-[13px] font-semibold', region === r.code ? 'text-primary' : 'text-gray-700')}>{r.label}</span>
                    <span className="text-[11px] text-gray-400">{r.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Log in / Get Started */}
          <a href="https://dev.evoq.one/login"
            className="hidden sm:inline text-[13px] font-semibold text-gray-700 hover:opacity-70 transition-opacity mr-4 flex-shrink-0">
            Log in
          </a>
          <a href="https://dev.evoq.one/contact"
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full bg-primary text-white text-[12px] sm:text-[13px] font-bold hover:bg-hover transition-colors shadow-[0_2px_10px_rgba(29,78,216,0.28)] flex-shrink-0">
            <span className="hidden sm:inline">Get Started</span>
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

          {/* Nav — placed right next to EVOQ CRM */}
          <nav className="ml-6 sm:ml-8 flex items-center gap-0.5">
            <Link href="/features"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium text-primary hover:text-white hover:bg-[#1D4ED8] transition-all duration-150">
              Features
            </Link>
            <Link href="/pricing"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-semibold text-white bg-[#1D4ED8] border border-[#1D4ED8] shadow-[0_1px_3px_rgba(29,78,216,0.15)] transition-all duration-150">
              Pricing
            </Link>
          </nav>
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section className="pt-[180px] pb-20 px-8 text-center bg-[#f0f6ff]">
        <motion.div {...fadeUp(0)} className="max-w-[680px] mx-auto">
          <h1 className="text-[48px] font-heading font-black tracking-[-0.04em] text-gray-900 leading-[1.05] mb-5">
            Powerful CRM,<br/>Simple Pricing
          </h1>
          <p className="text-gray-500 text-[18px] leading-relaxed max-w-[520px] mx-auto mb-10">
            Simple, transparent pricing with no hidden fees, no long-term contracts, and the flexibility to grow as your business grows.
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              '14-day free trial — no credit card required',
              'No hidden fees',
              'Monthly or annual billing',
              'Scales as your business grows',
            ].map(v => (
              <span key={v} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#BFDBFE] text-[12.5px] font-medium text-gray-600 shadow-[0_1px_3px_rgba(29,78,216,0.06)]">
                <CheckCircle size={13} weight="duotone" color="#1D4ED8"/>
                {v}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ BILLING TOGGLE ══ */}
      <section className="px-8 pb-6 bg-[#f0f6ff]">
        <div className="max-w-[1180px] mx-auto flex justify-center">
          <div className="inline-flex items-center bg-white border border-[#DBEAFE] rounded-full p-1 shadow-[0_1px_4px_rgba(29,78,216,0.06)]">
            <button
              onClick={() => setBilling('monthly')}
              className={cn(
                'px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-150',
                billing === 'monthly' ? 'bg-primary text-white shadow-[0_2px_6px_rgba(29,78,216,0.3)]' : 'text-gray-500 hover:text-gray-800'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-150',
                billing === 'annual' ? 'bg-primary text-white shadow-[0_2px_6px_rgba(29,78,216,0.3)]' : 'text-gray-500 hover:text-gray-800'
              )}
            >
              Annual
              <span className={cn(
                'text-[10px] font-black px-1.5 py-0.5 rounded-full',
                billing === 'annual' ? 'bg-white/20 text-white' : 'bg-[#EFF6FF] text-primary'
              )}>
                Save up to 33%
              </span>
            </button>
          </div>
        </div>
      </section>

      <p className="text-center text-gray-400 text-[12.5px] px-8 pb-10 bg-[#f0f6ff]">
        Prices shown are per user/month. Attachment storage and CRM record limits apply per organization — additional users, storage, and AI credits can be added at any time.
      </p>

      {/* ══ PLAN CARDS ══ */}
      <section className="px-8 pb-24 bg-[#f0f6ff]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* ── PRO ── */}
          <motion.div {...fadeUp(0.05)}
            className="bg-white rounded-2xl border border-[#DBEAFE] p-8 shadow-[0_4px_24px_rgba(29,78,216,0.07)] relative flex flex-col h-full">

            <div className="mb-6 min-h-[92px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-primary text-[11.5px] font-bold tracking-wide uppercase mb-4">
                Pro
              </div>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Best for startups & small teams getting started with CRM
              </p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 mb-1">
              <span className="text-[38px] font-heading font-black text-gray-900 tracking-tight leading-none">
                {formatPrice(proPrice, region)}
              </span>
              <span className="text-gray-400 text-[13px] font-medium mb-1">/ user / month</span>
            </div>
            <div className="flex items-center gap-2 mb-6 min-h-[24px]">
              <p className="text-gray-400 text-[12.5px]">
                {billing === 'annual' ? 'Billed annually' : 'Billed monthly'}
              </p>
              {billing === 'annual' && (
                <span className="text-[10.5px] font-black text-primary bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                  Save {savingsPct('pro', region)}%
                </span>
              )}
            </div>

            <a href="https://dev.evoq.one/contact"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white text-[14px] font-bold hover:bg-hover transition-colors mb-8 shadow-[0_2px_12px_rgba(29,78,216,0.3)]">
              Start Free Trial
              <ArrowUpRight size={14} weight="bold" color="white"/>
            </a>

            <p className="text-primary text-[11.5px] font-bold uppercase tracking-widest mb-4">
              Included
            </p>
            <div className="space-y-3.5 flex-grow">
              {PRO_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.5L4 7.5L8 3" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-[14px] leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── MAX — Most Popular ── */}
          <motion.div {...fadeUp(0.1)}
            className="bg-white rounded-2xl border-2 border-primary p-8 shadow-[0_12px_40px_rgba(29,78,216,0.16)] relative flex flex-col h-full">

            <div className="absolute -top-3.5 left-8">
              <div className="bg-primary text-white text-[10px] uppercase font-black px-4 py-1 rounded-full tracking-widest whitespace-nowrap shadow-[0_2px_8px_rgba(29,78,216,0.35)]">
                Most Popular
              </div>
            </div>

            <div className="mb-6 min-h-[92px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-primary text-[11.5px] font-bold tracking-wide uppercase mb-4">
                Max
              </div>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Best for growing businesses that need automation and better visibility
              </p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 mb-1">
              <span className="text-[38px] font-heading font-black text-gray-900 tracking-tight leading-none">
                {formatPrice(maxPrice, region)}
              </span>
              <span className="text-gray-400 text-[13px] font-medium mb-1">/ user / month</span>
            </div>
            <div className="flex items-center gap-2 mb-6 min-h-[24px]">
              <p className="text-gray-400 text-[12.5px]">
                {billing === 'annual' ? 'Billed annually' : 'Billed monthly'}
              </p>
              {billing === 'annual' && (
                <span className="text-[10.5px] font-black text-primary bg-[#EFF6FF] px-2 py-0.5 rounded-full">
                  Save {savingsPct('max', region)}%
                </span>
              )}
            </div>

            <a href="https://dev.evoq.one/contact"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white text-[14px] font-bold hover:bg-hover transition-colors mb-8 shadow-[0_2px_12px_rgba(29,78,216,0.3)]">
              Get Started
              <ArrowUpRight size={14} weight="bold" color="white"/>
            </a>

            <p className="text-primary text-[11.5px] font-bold uppercase tracking-widest mb-4">
              Included
            </p>
            <div className="space-y-3.5 flex-grow">
              {MAX_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.5L4 7.5L8 3" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-[14px] leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── ENTERPRISE ── */}
          <motion.div {...fadeUp(0.15)}
            className="bg-white rounded-2xl border border-[#DBEAFE] p-8 shadow-[0_4px_24px_rgba(29,78,216,0.07)] relative flex flex-col h-full">

            <div className="mb-6 min-h-[92px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-primary text-[11.5px] font-bold tracking-wide uppercase mb-4">
                Enterprise
              </div>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                Best for enterprises with complex sales processes & advanced needs
              </p>
            </div>

            {/* Price */}
            <div className="mb-1">
              <span className="text-[38px] font-heading font-black text-gray-900 tracking-tight leading-none">
                Custom Pricing
              </span>
            </div>
            <p className="text-gray-400 text-[12.5px] mb-6 min-h-[24px]">
              Tailored pricing based on users and implementation requirements.
            </p>

            <a href="https://dev.evoq.one/contact"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white text-[14px] font-bold hover:bg-hover transition-colors mb-8 shadow-[0_2px_12px_rgba(29,78,216,0.3)]">
              Contact Sales
              <ArrowUpRight size={14} weight="bold" color="white"/>
            </a>

            <p className="text-primary text-[11.5px] font-bold uppercase tracking-widest mb-4">
              Included
            </p>
            <div className="space-y-3.5 flex-grow">
              {ENTERPRISE_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.5L4 7.5L8 3" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 text-[14px] leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Fine print */}
        <div className="max-w-[1180px] mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center">
          <a href="/implementation" className="text-primary text-[13px] font-semibold underline underline-offset-2 hover:opacity-75 transition-opacity">
            View implementation & onboarding details
          </a>
          <span className="text-gray-300 text-[13px]">•</span>
          <p className="text-gray-400 text-[13px]">
            Local taxes (VAT, GST, etc.) will be charged in addition to the prices mentioned above.
          </p>
          <span className="text-gray-300 text-[13px]">•</span>
          <a href="#compare-plans" className="text-primary text-[13px] font-semibold underline underline-offset-2 hover:opacity-75 transition-opacity">
            See full plan comparison
          </a>
        </div>
      </section>

      {/* ══ COMPARE PLANS ══ */}
      <section id="compare-plans" className="py-24 px-8 bg-white scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.06] mb-4">
              Compare Plans
            </h2>
            <p className="text-gray-400 text-[17px] leading-relaxed">
              A detailed look at what's included in every plan.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.05)} className="overflow-x-auto rounded-2xl border border-[#DBEAFE] shadow-[0_4px_24px_rgba(29,78,216,0.06)]">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-[#EFF6FF]">
                  <th className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 sticky left-0 bg-[#EFF6FF]">Feature</th>
                  <th className="px-4 py-4 text-[12.5px] font-bold text-gray-700">Pro</th>
                  <th className="px-4 py-4 text-[12.5px] font-bold text-primary">Max</th>
                  <th className="px-4 py-4 text-[12.5px] font-bold text-gray-700">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_SECTIONS.map(section => (
                  <React.Fragment key={section.title}>
                    <tr>
                      <td colSpan={4} className="px-6 pt-6 pb-2 text-[11.5px] font-black uppercase tracking-widest text-primary bg-white">
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row, i) => (
                      <tr key={row.feature} className={cn(i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFF]')}>
                        <td className="px-6 py-3 text-[13.5px] text-gray-700 sticky left-0" style={{ background: 'inherit' }}>
                          {row.feature}
                        </td>
                        <td className="px-4 py-3"><CompareCell value={row.pro}/></td>
                        <td className="px-4 py-3 bg-[#F5F9FF]"><CompareCell value={row.max}/></td>
                        <td className="px-4 py-3"><CompareCell value={row.enterprise}/></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

                {/* Resources */}
                <tr>
                  <td colSpan={4} className="px-6 pt-6 pb-2 text-[11.5px] font-black uppercase tracking-widest text-primary bg-white">
                    Resources
                  </td>
                </tr>
                {RESOURCE_ROWS.map((row, i) => (
                  <tr key={row.resource} className={cn(i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFF]')}>
                    <td className="px-6 py-3 text-[13.5px] text-gray-700 sticky left-0" style={{ background: 'inherit' }}>
                      {row.resource}
                    </td>
                    <td className="px-4 py-3"><CompareCell value={row.pro}/></td>
                    <td className="px-4 py-3 bg-[#F5F9FF]"><CompareCell value={row.max}/></td>
                    <td className="px-4 py-3"><CompareCell value={row.enterprise}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-24 px-8 bg-[#f0f6ff]">
        <div className="max-w-[780px] mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.06] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-[17px] leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.05)} className="space-y-3">
            {FAQS.map(faq => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a}/>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-[#0C2472] px-4 sm:px-6 md:px-8 pt-16 pb-10">
        <div className="max-w-[1300px] mx-auto">

          {/* Main grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">

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
              <p className="text-white/40 text-[13px] leading-relaxed max-w-[220px]">
                A unified business operating system for modern organizations.
              </p>
            </div>

            {/* Products */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/35 mb-4 font-heading">Products</div>
              <div className="space-y-3">
                {[{l:'CRM',h:'/'},{l:'Sync',h:'/sync'},{l:'Skillberry',h:'#'}].map(p => (
                  <a key={p.l} href={p.h} className="block text-[14px] text-white/65 hover:text-white transition-colors">{p.l}</a>
                ))}
              </div>
            </div>

            {/* Learn */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/35 mb-4 font-heading">Learn</div>
              <div className="space-y-3">
                <a href="https://dev.evoq.one/why-evoq" className="block text-[14px] text-white/65 hover:text-white transition-colors">Why EVOQ?</a>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/35 mb-4 font-heading">Company</div>
              <div className="space-y-3">
                <a href="https://dev.evoq.one/contact" className="block text-[14px] text-white/65 hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>

            {/* Legal — hidden on 2-col mobile, shown from md */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/35 mb-4 font-heading">Legal</div>
              <div className="space-y-3">
                {['Privacy Policy','Terms of Service','Cookie Preferences'].map(l => (
                  <a key={l} href="#" className="block text-[14px] text-white/65 hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
            <p className="text-[12.5px] text-white/35">© 2026 Social DNA Labs. All rights reserved.</p>
            <div className="flex items-center gap-2">
              {[
                { name:'LinkedIn',  path:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { name:'Facebook',  path:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name:'Instagram', path:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { name:'YouTube',   path:'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
              ].map(s => (
                <a key={s.name} href="#" aria-label={s.name}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/45 hover:text-white hover:bg-white/15 transition-colors">
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
