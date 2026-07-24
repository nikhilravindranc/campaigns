'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MagnifyingGlass, ArrowRight } from 'phosphor-react'

// ─── Animation presets ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// ─── Applications data ───────────────────────────────────────────────────────
const APPS_BY_CATEGORY = {
  CRM: [
    { name: 'Zoho CRM', icon: '🎨' },
    { name: 'Salesforce', icon: '☁️' },
    { name: 'HubSpot CRM', icon: '🔴' },
    { name: 'SugarCRM', icon: '📚' },
    { name: 'Pipeline CRM', icon: '📊' },
    { name: 'Microsoft Dynamics 365', icon: '🟢' },
  ],
  ERP: [
    { name: 'NetSuite', icon: '⚙️' },
    { name: 'Exact Online', icon: '🔴' },
    { name: 'SAP', icon: '🔵' },
  ],
  ECOMMERCE: [
    { name: 'Shopify', icon: '🛍️' },
    { name: 'WooCommerce', icon: '🟠' },
    { name: 'Magento', icon: '⬛' },
  ],
  'BUSINESS APPS': [
    { name: 'Stripe', icon: '💳' },
    { name: 'Zendesk', icon: '📞' },
    { name: 'Monday.com', icon: '📅' },
  ],
}

const categories = Object.keys(APPS_BY_CATEGORY) as Array<keyof typeof APPS_BY_CATEGORY>

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SyncPricingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApps, setSelectedApps] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<keyof typeof APPS_BY_CATEGORY>('CRM')

  // Filter apps based on search
  const filteredApps = useMemo(() => {
    return Object.fromEntries(
      Object.entries(APPS_BY_CATEGORY).map(([category, apps]) => [
        category,
        apps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
      ])
    )
  }, [searchQuery])

  // Get all filtered apps for display
  const allFilteredApps = useMemo(() => {
    return Object.values(filteredApps).flat()
  }, [filteredApps])

  const handleAppSelect = (appName: string) => {
    if (selectedApps.includes(appName)) {
      setSelectedApps(selectedApps.filter(app => app !== appName))
    } else if (selectedApps.length < 2) {
      setSelectedApps([...selectedApps, appName])
    }
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* ══ TOP BAR — EVOQ global nav ══ */}
      <header className="fixed top-0 left-0 right-0 z-[210] h-[80px] bg-[#ECFDF5]">
        <div className="h-full w-full pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-8 md:pr-8 flex items-center justify-between">
          <a href="https://dev.evoq.one" className="flex items-center group flex-shrink-0 opacity-100 group-hover:opacity-80 transition-opacity">
            <Image src="/images/black-logo.png" alt="EVOQ" width={105} height={24} className="h-6 w-auto" priority/>
          </a>
          <a href="https://dev.evoq.one/contact"
            className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full bg-[#059669] text-white text-[12px] sm:text-[13px] font-bold hover:bg-[#047857] transition-colors shadow-[0_2px_8px_rgba(5,150,105,0.25)] flex-shrink-0">
            <span className="hidden sm:inline">Contact Us</span>
          </a>
        </div>
      </header>

      {/* ══ SUB-HEADER — EVOQ SYNC ══ */}
      <div className="fixed top-[80px] left-0 right-0 z-[200] h-[56px] bg-[#ECFDF5]">
        <div className="h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">
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
          <nav className="ml-6 sm:ml-8 flex items-center gap-0.5">
            <a href="/sync"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-150">
              Features
            </a>
            <a href="/sync/pricing"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-semibold text-white bg-[#059669] border border-[#059669] shadow-[0_1px_3px_rgba(5,150,105,0.15)] transition-all duration-150">
              Pricing
            </a>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#ECFDF5] text-gray-900 mt-[136px] pt-16 pb-16 px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div {...fadeUp(0)}>
            <h1 className="text-[42px] font-heading font-black tracking-[-0.04em] leading-[1.1] mb-6 text-gray-900">
              Build Your Integration
            </h1>
            <p className="text-[18px] text-gray-700 leading-relaxed mb-3">
              Select any two apps and choose your sync direction to see instant pricing.
            </p>
            <p className="text-gray-600 text-[16px] leading-relaxed max-w-[600px] mx-auto">
              Zync connects CRM, ERP, Ecommerce, and Business Apps with flexible one-way and two-way sync options.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING CONFIGURATOR ── */}
      <section className="relative overflow-hidden bg-[#ECFDF5] pb-20 px-8">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {/* Top-left corner shapes */}
          <svg className="absolute top-0 left-0 w-72 h-72 opacity-40" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="80" stroke="#A7F3D0" strokeWidth="1.5"/>
            <circle cx="50" cy="50" r="50" stroke="#6EE7B7" strokeWidth="1"/>
            <rect x="120" y="20" width="30" height="30" fill="#6EE7B7" opacity="0.3" rx="4"/>
          </svg>

          {/* Bottom-right corner shapes */}
          <svg className="absolute bottom-0 right-0 w-80 h-80 opacity-35" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="280" cy="280" r="100" stroke="#A7F3D0" strokeWidth="1.5"/>
            <circle cx="280" cy="280" r="60" stroke="#6EE7B7" strokeWidth="1"/>
            <rect x="200" y="240" width="25" height="25" fill="#A7F3D0" opacity="0.4" rx="3" transform="rotate(30 212 252)"/>
          </svg>

          {/* Center-left accent */}
          <div style={{position:'absolute', top:'30%', left:'5%', width:6, height:6, borderRadius:'50%', background:'rgba(167, 243, 208, 0.5)'}}/>
          <div style={{position:'absolute', top:'65%', right:'8%', width:5, height:5, borderRadius:'50%', background:'rgba(110, 231, 183, 0.4)'}}/>
          <div style={{position:'absolute', bottom:'15%', left:'15%', width:7, height:7, borderRadius:'50%', background:'rgba(167, 243, 208, 0.3)'}}/>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: SELECT APPLICATIONS */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 h-full shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-[22px] font-heading font-bold text-gray-900">Select Applications</h2>
                  <div className="flex gap-1">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[11px] font-semibold text-gray-600">1</span>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[11px] font-semibold text-gray-600">2</span>
                  </div>
                </div>
                <p className="text-gray-500 text-[14px] mb-6">Choose two apps from different categories</p>

                {/* Search */}
                <div className="relative mb-6">
                  <MagnifyingGlass size={18} className="absolute left-3 top-3 text-gray-400"/>
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-gray-50 text-[14px] placeholder-gray-400 focus:outline-none focus:border-[#059669] focus:bg-white transition-colors"
                  />
                </div>

                {/* Category Tabs */}
                <div className="mb-6">
                  <p className="text-gray-600 text-[12px] font-semibold mb-3">Jump to:</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                          activeCategory === cat
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apps Grid */}
                <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2">
                  {categories.map(category => {
                    const categoryApps = filteredApps[category] || []
                    if (categoryApps.length === 0) return null

                    return (
                      <div key={category}>
                        <h3 className="text-[13px] font-semibold text-gray-600 uppercase tracking-[0.05em] mb-3">{category}</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {categoryApps.map(app => (
                            <button
                              key={app.name}
                              onClick={() => handleAppSelect(app.name)}
                              className={`p-4 rounded-2xl border-2 transition-all text-center ${
                                selectedApps.includes(app.name)
                                  ? 'bg-[#F0F9FF] border-[#059669] shadow-[0_4px_12px_rgba(5,150,105,0.15)]'
                                  : 'bg-white border-[#E5E7EB] hover:border-[#059669] hover:bg-[#F9FAFB]'
                              }`}
                            >
                              <div className="text-[28px] mb-2">{app.icon}</div>
                              <p className="text-[12px] font-semibold text-gray-900 leading-tight">{app.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* CENTER: SYNC DIRECTION */}
            <motion.div {...fadeUp(0.2)} className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 h-full shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#F0FDFB] border-2 border-[#D1FAE5] flex items-center justify-center shadow-[0_2px_8px_rgba(5,150,105,0.1)] mb-6">
                  <ArrowRight size={28} className="text-[#059669]" weight="bold"/>
                </div>
                <p className="text-[14px] text-gray-600">Select apps to configure</p>
              </div>
            </motion.div>

            {/* RIGHT: CUSTOM PRICING */}
            <motion.div {...fadeUp(0.3)} className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 h-full shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <h2 className="text-[22px] font-heading font-bold text-gray-900 mb-2">Custom Pricing</h2>
                <p className="text-gray-500 text-[14px] mb-12">Instant quote based on your selection</p>

                <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                  {selectedApps.length === 2 ? (
                    <>
                      <div className="text-[64px] font-bold text-[#059669] mb-4">$</div>
                      <p className="text-gray-700 text-[16px] font-semibold mb-2">
                        {selectedApps[0]} ↔ {selectedApps[1]}
                      </p>
                      <p className="text-gray-500 text-[14px]">Pricing updates automatically</p>
                    </>
                  ) : (
                    <>
                      <div className="text-[48px] font-light text-gray-400 mb-4">$</div>
                      <p className="text-gray-600 text-[16px] font-semibold mb-1">Select two apps to see pricing</p>
                      <p className="text-gray-400 text-[13px]">Pricing updates automatically</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#064E3B] px-4 sm:px-6 md:px-8 pt-16 pb-10">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
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

            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Products</div>
              <div className="space-y-3">
                {[{l:'CRM',h:'/'},{l:'Sync',h:'/sync'},{l:'Skillberry',h:'#'}].map(p => (
                  <a key={p.l} href={p.h} className="block text-[14px] text-white/70 hover:text-white transition-colors">{p.l}</a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Learn</div>
              <div className="space-y-3">
                <a href="https://dev.evoq.one/why-evoq" className="block text-[14px] text-white/70 hover:text-white transition-colors">Why EVOQ?</a>
              </div>
            </div>

            <div>
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Company</div>
              <div className="space-y-3">
                <a href="https://dev.evoq.one/contact" className="block text-[14px] text-white/70 hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/60 mb-4 font-heading">Legal</div>
              <div className="space-y-3">
                {['Privacy Policy','Terms of Service','Cookie Preferences'].map(l => (
                  <a key={l} href="#" className="block text-[14px] text-white/70 hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
            <p className="text-[12.5px] text-white/60">© 2026 Social DNA Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
