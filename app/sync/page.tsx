'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Users } from 'phosphor-react'

// ─── Animation presets ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// ─── Integration cards data ──────────────────────────────────────────────────
const INTEGRATION_CARDS = [
  {
    title: 'CRM Systems',
    subtitle: 'Customer data hub',
    icons: [
      '🎨', // HubSpot
      '☁️', // Salesforce
      '🔄', // Pipedrive
    ],
    moreCount: 6,
  },
  {
    title: 'Ecommerce Platforms',
    subtitle: 'Sales channels',
    icons: [
      '🛍️', // WooCommerce
      '🏪', // Shopify
      '📦', // Magento
    ],
    moreCount: 4,
  },
  {
    title: 'ERP Systems',
    subtitle: 'Business backbone',
    icons: [
      '📊', // Odoo
      '⚙️', // Sage
      '💼', // SAP
    ],
    moreCount: 5,
  },
  {
    title: 'Business Applications',
    subtitle: 'Operational tools',
    icons: [
      '📅', // Monday.com
      '💳', // Stripe
      '📞', // Zendesk
    ],
    moreCount: 8,
  },
]

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SyncPage() {
  const [productsOpen, setProductsOpen] = useState(false)

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ══ TOP BAR — EVOQ global nav ══ */}
      <header className="fixed top-0 left-0 right-0 z-[210] h-[80px] bg-[#ECFDF5] shadow-[0_1px_0_#D1FAE5]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">

          {/* Left: EVOQ logo */}
          <a href="https://dev.evoq.one" className="flex items-center gap-3 group flex-shrink-0">
            <div className="hidden sm:flex flex-col gap-[5px]">
              <div className="w-[18px] h-[2px] rounded-full bg-gray-900 group-hover:opacity-60 transition-opacity"/>
              <div className="w-[13px] h-[2px] rounded-full bg-gray-900 group-hover:opacity-60 transition-opacity"/>
              <div className="w-[18px] h-[2px] rounded-full bg-gray-900 group-hover:opacity-60 transition-opacity"/>
            </div>
            <span className="text-gray-900 font-heading font-black text-[22px] sm:text-[24px] tracking-[-0.04em] leading-none">EVOQ</span>
          </a>

          {/* Nav pill — right next to logo */}
          <div className="hidden md:flex items-center bg-[#A7F3D0] border border-[#6EE7B7] rounded-full px-1.5 py-1 shadow-[0_2px_8px_rgba(16,185,129,0.1)] ml-5">
            <div className="relative">
              <button
                onClick={() => setProductsOpen(p => !p)}
                onBlur={() => setTimeout(() => setProductsOpen(false), 150)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-[#059669] hover:bg-[#6EE7B7] transition-all duration-150"
              >
                Products
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={cn('transition-transform duration-200', productsOpen && 'rotate-180')}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {productsOpen && (
                <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl border border-[#D1FAE5] shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2 z-50">
                  {[
                    { label: 'CRM',        desc: 'Sales & pipeline management', href: '/',      active: false },
                    { label: 'Sync',       desc: 'Data integration platform',   href: '/sync',  active: true },
                    { label: 'Skillberry', desc: 'Learning management suite',   href: '#' },
                  ].map(p => (
                    <a key={p.label} href={p.href}
                      className={cn('flex flex-col px-4 py-2.5 hover:bg-gray-50 transition-colors rounded-xl mx-1.5', p.active && 'bg-[#ECFDF5]')}>
                      <span className={cn('text-[13px] font-semibold', p.active ? 'text-[#059669]' : 'text-gray-800')}>{p.label}</span>
                      <span className="text-[11px] text-gray-500 mt-0.5">{p.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="https://dev.evoq.one/why-evoq"
              className="px-4 py-2 rounded-full text-[13px] font-semibold text-[#059669] hover:bg-[#6EE7B7] transition-all duration-150">
              Why EVOQ?
            </a>
          </div>

          <div className="flex-1"/>

          {/* Right: Contact Us */}
          <a href="https://dev.evoq.one/contact"
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full bg-[#059669] text-white text-[12px] sm:text-[13px] font-bold hover:bg-[#047857] transition-colors shadow-[0_2px_8px_rgba(5,150,105,0.25)] flex-shrink-0">
            <span className="hidden sm:inline">Contact Us</span>
            <ArrowUpRight size={13} weight="bold" color="white"/>
          </a>
        </div>
      </header>

      {/* ══ SUB-HEADER — EVOQ SYNC ══ */}
      <div className="fixed top-[80px] left-0 right-0 z-[200] h-[56px] bg-[#ECFDF5] border-b border-[#D1FAE5]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">

          {/* Left: EVOQ Sync */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-4 sm:ml-8">
            <div className="w-[28px] h-[28px] rounded-[8px] bg-[#059669] flex items-center justify-center shadow-[0_2px_6px_rgba(5,150,105,0.25)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2v6m0 8v6M6 12h6m6 0h-6M4.5 4.5a4.5 4.5 0 0 1 6.36 6.36m6.36 0a4.5 4.5 0 0 1-6.36 6.36M19.5 4.5a4.5 4.5 0 0 0-6.36 6.36m0 6.36a4.5 4.5 0 0 0 6.36-6.36"/>
              </svg>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="hidden sm:inline text-[11px] font-semibold text-[#059669] tracking-[0.06em] uppercase leading-none">EVOQ</span>
              <span className="text-[15px] font-black text-gray-900 tracking-[-0.03em] leading-none">Sync</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="ml-6 sm:ml-8 flex items-center gap-0.5">
            <a href="#"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-semibold text-white bg-[#059669] border border-[#059669] shadow-[0_1px_3px_rgba(5,150,105,0.15)] transition-all duration-150">
              Features
            </a>
            <a href="/sync/pricing"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium text-[#059669] hover:text-white hover:bg-[#059669] transition-all duration-150">
              Pricing
            </a>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#ECFDF5] text-gray-900 mt-[136px] pt-20 pb-24 px-8">

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <svg className="absolute top-12 left-8 w-40 h-40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="#DBEAFE" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="100" cy="100" r="50" stroke="#BEF3F9" strokeWidth="1" opacity="0.3"/>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Text */}
          <motion.div {...fadeUp(0)}>
            <h1 className="text-[48px] font-heading font-black tracking-[-0.04em] leading-[1.1] mb-6 text-gray-900">
              Connect. Integrate.<br/>Automate.
            </h1>
            <p className="text-[18px] text-gray-700 leading-relaxed mb-10">
              <strong>Sync data. Streamline your workflows.</strong>
            </p>
            <p className="text-gray-600 text-[16px] leading-relaxed mb-10 max-w-[480px]">
              EVOQ Sync turns scattered, manual data movement into a single, reliable flow between your CRM, ERP, eCommerce, and other systems. Sync transforms complex integrations into seamless, dependable workflows that your teams never have to integrate and implement manually.
            </p>
            <a href="https://dev.evoq.one/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#059669] text-white text-[13.5px] font-bold hover:bg-[#34D399] transition-colors shadow-[0_4px_12px_rgba(5,150,105,0.3)]">
              Book a demo
              <ArrowUpRight size={14} weight="bold"/>
            </a>
          </motion.div>

          {/* Right: Integration Cards Grid */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="grid grid-cols-2 gap-6">
              {INTEGRATION_CARDS.map((card, idx) => (
                <motion.div
                  key={card.title}
                  {...fadeUp(0.1 + idx * 0.05)}
                  className="bg-white rounded-3xl border-2 border-[#34D399] p-6 shadow-[0_2px_12px_rgba(5,150,105,0.08)]"
                >
                  <h3 className="text-[15px] font-heading font-bold text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-[12px] text-gray-500 font-medium mb-6">{card.subtitle}</p>

                  {/* Icons Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {card.icons.map((icon, i) => (
                      <div key={i} className="flex items-center justify-center h-10 bg-gray-50 rounded-lg text-lg">
                        {icon}
                      </div>
                    ))}
                  </div>

                  {/* More supported */}
                  <p className="text-[12px] text-gray-500">+ {card.moreCount} more supported</p>
                </motion.div>
              ))}
            </div>

            {/* Center logo/icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#059669] flex items-center justify-center shadow-[0_8px_24px_rgba(5,150,105,0.3)] pointer-events-none z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2v6m0 8v6M6 12h6m6 0h-6M4.5 4.5a4.5 4.5 0 0 1 6.36 6.36m6.36 0a4.5 4.5 0 0 1-6.36 6.36M19.5 4.5a4.5 4.5 0 0 0-6.36 6.36m0 6.36a4.5 4.5 0 0 0 6.36-6.36"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#064E3B] px-4 sm:px-6 md:px-8 pt-16 pb-10">
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
              <p className="text-white/70 text-[13px] leading-relaxed max-w-[220px]">
                A unified business operating system for modern organizations.
              </p>
            </div>

            {/* Products */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Products</div>
              <div className="space-y-3">
                {[{l:'CRM',h:'/'},{l:'Sync',h:'/sync'},{l:'Skillberry',h:'#'}].map(p => (
                  <a key={p.l} href={p.h} className="block text-[14px] text-white/70 hover:text-white transition-colors">{p.l}</a>
                ))}
              </div>
            </div>

            {/* Learn */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Learn</div>
              <div className="space-y-3">
                <a href="https://dev.evoq.one/why-evoq" className="block text-[14px] text-white/70 hover:text-white transition-colors">Why EVOQ?</a>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Company</div>
              <div className="space-y-3">
                <a href="https://dev.evoq.one/contact" className="block text-[14px] text-white/70 hover:text-white transition-colors">Contact Us</a>
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
            <p className="text-[12.5px] text-white/60">© 2026 Social DNA Labs. All rights reserved.</p>
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
