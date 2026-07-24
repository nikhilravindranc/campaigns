'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  Envelope,
  Phone,
  Gear,
  CheckCircle,
  ArrowUpRight,
  Calendar,
  Users,
  Briefcase,
  ChartBar,
  Bell,
  ArrowsClockwise,
  Activity,
} from 'phosphor-react'

// ─── Section registry ────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'lead',      label: 'Lead Management' },
  { id: 'contacts',  label: 'Contacts & Accounts' },
  { id: 'pipeline',  label: 'Sales Pipeline' },
  { id: 'team',      label: 'Sales Team' },
  { id: 'tasks',     label: 'Tasks & Scheduling' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'custom',    label: 'Customization' },
]

// ─── Animation presets ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

// ─── Shared atoms ────────────────────────────────────────────────────────────
function SectionLabel({ num, title, light = false, center = false }: { num: string; title: string; light?: boolean; center?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5 mb-5', center && 'justify-center')}>
      <span className={cn(
        'inline-flex items-center justify-center w-[26px] h-[26px] rounded-[6px] text-[10px] font-black font-heading',
        light ? 'bg-white/20 text-white' : 'bg-primary text-white'
      )}>
        {num}
      </span>
      <span className={cn(
        'text-[11px] font-bold tracking-[0.12em] uppercase font-heading',
        light ? 'text-soft' : 'text-primary'
      )}>
        {title}
      </span>
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-tint text-depth text-[12.5px] font-medium leading-none">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
        <path d="M2 5.5L4 7.5L8 3" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {children}
    </span>
  )
}

function Section({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={cn('py-24 px-8 relative', className)}
    >
      {children}
    </motion.section>
  )
}

// ─── SVG Illustrations ────────────────────────────────────────────────────────
// Style: light gray container · white cards · small status dots · no dark fills

function LeadIllo() {
  return (
    <svg width="100%" viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="320" rx="16" fill="white"/>
      <defs>
        <pattern id="ld-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#94A3B8" opacity="0.4"/>
        </pattern>
        <filter id="ld-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#0C2472" floodOpacity="0.06"/>
        </filter>
      </defs>
      <rect width="480" height="320" rx="16" fill="url(#ld-dots)"/>
      {/* Floating card */}
      <rect x="20" y="16" width="440" height="288" rx="14" fill="white" filter="url(#ld-sh)"/>
      {/* Header */}
      <text x="36" y="44" fontFamily="system-ui" fontSize="13" fontWeight="600" fill="#18181B">Lead Pipeline</text>
      <rect x="326" y="26" width="118" height="24" rx="12" fill="#F1F5F9"/>
      <circle cx="341" cy="38" r="4" fill="#22C55E"/>
      <text x="351" y="42" fontFamily="system-ui" fontSize="10" fill="#6B7280">247 active leads</text>
      <line x1="36" y1="56" x2="444" y2="56" stroke="#F0F2F5" strokeWidth="1"/>
      {/* Row 1 */}
      <rect x="28" y="64" width="424" height="52" rx="10" fill="#F8FAFC"/>
      <rect x="40" y="74" width="30" height="30" rx="8" fill="#D6E4F9"/>
      <text x="55" y="93" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="#0C2472">SC</text>
      <text x="82" y="85" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Sarah Chen</text>
      <text x="82" y="101" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">Acme Corp · Enterprise</text>
      <rect x="312" y="76" width="72" height="18" rx="9" fill="#DCFCE7"/>
      <text x="348" y="88" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="600" fill="#16A34A">Qualified</text>
      <text x="438" y="88" textAnchor="end" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#1D4ED8">94</text>
      {/* Row 2 */}
      <rect x="28" y="124" width="424" height="52" rx="10" fill="#F8FAFC"/>
      <rect x="40" y="134" width="30" height="30" rx="8" fill="#FAE3D0"/>
      <text x="55" y="153" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="#0C2472">MR</text>
      <text x="82" y="145" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Marcus Rivera</text>
      <text x="82" y="161" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">TechBridge · Mid-Market</text>
      <rect x="308" y="136" width="78" height="18" rx="9" fill="#FEF3C7"/>
      <text x="347" y="148" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="600" fill="#D97706">Nurturing</text>
      <text x="438" y="148" textAnchor="end" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#1D4ED8">72</text>
      {/* Row 3 */}
      <rect x="28" y="184" width="424" height="52" rx="10" fill="#F8FAFC"/>
      <rect x="40" y="194" width="30" height="30" rx="8" fill="#D0E5E0"/>
      <text x="55" y="213" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="#0C2472">PK</text>
      <text x="82" y="205" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Priya Kapoor</text>
      <text x="82" y="221" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">Nova Systems · SMB</text>
      <rect x="314" y="196" width="70" height="18" rx="9" fill="#DBEAFE"/>
      <text x="349" y="208" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="600" fill="#1D4ED8">New Lead</text>
      <text x="438" y="208" textAnchor="end" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#1D4ED8">61</text>
      {/* Row 4 */}
      <rect x="28" y="244" width="424" height="48" rx="10" fill="#F8FAFC"/>
      <rect x="40" y="253" width="30" height="30" rx="8" fill="#F5D9E1"/>
      <text x="55" y="272" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="#0C2472">DW</text>
      <text x="82" y="263" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">David Walsh</text>
      <text x="82" y="279" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">SkyNet Labs · Enterprise</text>
      <rect x="312" y="254" width="72" height="18" rx="9" fill="#DCFCE7"/>
      <text x="348" y="266" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="600" fill="#16A34A">Qualified</text>
      <text x="438" y="265" textAnchor="end" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#1D4ED8">88</text>
    </svg>
  )
}

function PipelineIllo() {
  return (
    <svg width="100%" viewBox="0 0 480 304" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="304" rx="16" fill="white"/>
      <defs>
        <pattern id="pl-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#94A3B8" opacity="0.4"/>
        </pattern>
        <filter id="pl-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#0C2472" floodOpacity="0.06"/>
        </filter>
      </defs>
      <rect width="480" height="304" rx="16" fill="url(#pl-dots)"/>
      {/* Floating card */}
      <rect x="20" y="16" width="440" height="272" rx="14" fill="white" filter="url(#pl-sh)"/>
      {/* Company header */}
      <rect x="34" y="28" width="34" height="34" rx="9" fill="#D6E4F9"/>
      <text x="51" y="49" textAnchor="middle" fontFamily="system-ui" fontSize="10" fontWeight="800" fill="#0C2472">BG</text>
      <text x="78" y="41" fontFamily="system-ui" fontSize="13" fontWeight="600" fill="#18181B">Basepoint // Greenleaf</text>
      <text x="78" y="56" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">Enterprise · Pipeline $84,000</text>
      <rect x="362" y="32" width="82" height="22" rx="11" fill="#FEF3C7"/>
      <text x="403" y="46" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="600" fill="#D97706">Negotiation</text>
      <line x1="34" y1="72" x2="446" y2="72" stroke="#F0F2F5" strokeWidth="1"/>
      {/* Field card 1 */}
      <rect x="28" y="80" width="424" height="62" rx="10" fill="#F8FAFC"/>
      <text x="44" y="99" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">Update Deal Stage</text>
      <text x="444" y="99" textAnchor="end" fontFamily="system-ui" fontSize="10" fill="#22C55E">✓ Accept</text>
      <circle cx="46" cy="123" r="5" fill="#F59E0B"/>
      <text x="58" y="127" fontFamily="system-ui" fontSize="13" fontWeight="600" fill="#18181B">Negotiation</text>
      <path d="M172 123 L188 123" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="3 2"/>
      <circle cx="196" cy="123" r="5" fill="#22C55E"/>
      <text x="208" y="127" fontFamily="system-ui" fontSize="11" fill="#6B7280">Closing</text>
      {/* Field card 2 */}
      <rect x="28" y="150" width="424" height="62" rx="10" fill="#F8FAFC"/>
      <text x="44" y="169" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">Update Next Step</text>
      <text x="444" y="169" textAnchor="end" fontFamily="system-ui" fontSize="10" fill="#22C55E">✓ Accept</text>
      <text x="44" y="194" fontFamily="system-ui" fontSize="12" fontWeight="500" fill="#18181B">Joshua to send documentation on pricing...</text>
      {/* Person row */}
      <circle cx="46" cy="237" r="14" fill="#D0E5E0"/>
      <text x="46" y="241" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="#0C2472">DH</text>
      <text x="68" y="231" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Drew Houston</text>
      <text x="68" y="245" fontFamily="system-ui" fontSize="10" fill="#9CA3AF">Head of IT · Greenleaf</text>
      {/* Field card 3 */}
      <rect x="28" y="257" width="424" height="24" rx="8" fill="#EFF6FF"/>
      <text x="44" y="272" fontFamily="system-ui" fontSize="10" fontWeight="500" fill="#1D4ED8">Head of IT — role updated</text>
      <text x="444" y="272" textAnchor="end" fontFamily="system-ui" fontSize="10" fill="#22C55E">✓ Accept</text>
    </svg>
  )
}

function CalendarIllo() {
  return (
    <svg width="100%" viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cal-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="8" floodColor="#0C2472" floodOpacity="0.08"/>
        </filter>
      </defs>
      <rect width="380" height="280" rx="16" fill="#F8FAFC"/>

      {/* Card */}
      <rect x="28" y="24" width="324" height="232" rx="14" fill="white" filter="url(#cal-sh)"/>

      {/* "Next step" label */}
      <text x="48" y="52" fontFamily="system-ui" fontSize="11" fill="#9CA3AF" fontWeight="500">Next step</text>

      {/* Condition block */}
      <rect x="48" y="62" width="284" height="44" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5"/>
      <rect x="60" y="74" width="20" height="20" rx="6" fill="#EFF6FF"/>
      <text x="70" y="88" textAnchor="middle" fontFamily="system-ui" fontSize="11" fill="#1D4ED8" fontWeight="700">✦</text>
      <text x="90" y="88" fontFamily="system-ui" fontSize="12" fontWeight="500" fill="#18181B">Is Follow-Up overdue?</text>

      {/* Is true label */}
      <rect x="76" y="120" width="48" height="20" rx="10" fill="#F1F5F9"/>
      <text x="100" y="133" textAnchor="middle" fontFamily="system-ui" fontSize="10" fill="#6B7280">Is true</text>

      {/* True branch — active blue block */}
      <rect x="76" y="148" width="256" height="44" rx="10" fill="white" stroke="#1D4ED8" strokeWidth="1.5"/>
      <rect x="88" y="160" width="20" height="20" rx="6" fill="#EFF6FF"/>
      <text x="98" y="174" textAnchor="middle" fontFamily="system-ui" fontSize="13" fill="#1D4ED8" fontWeight="700">⊕</text>
      <text x="118" y="174" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#1D4ED8">Assign to Rep</text>
      {/* Cursor */}
      <path d="M268 162l8 10-4-1-2 5-2-1 2-5-4 0z" fill="#374151"/>
      {/* Avatar badge */}
      <rect x="290" y="158" width="34" height="22" rx="11" fill="#1D4ED8"/>
      <text x="307" y="172" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="white">Alex</text>

      {/* Is false label */}
      <rect x="76" y="206" width="52" height="20" rx="10" fill="#F1F5F9"/>
      <text x="102" y="219" textAnchor="middle" fontFamily="system-ui" fontSize="10" fill="#6B7280">Is false</text>

      {/* False branch — dashed empty block */}
      <rect x="76" y="228" width="256" height="20" rx="8" fill="#FAFAFA" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="5 3"/>
      <text x="100" y="241" fontFamily="system-ui" fontSize="11" fill="#CBD5E1">+ Select block</text>
    </svg>
  )
}

function AnalyticsIllo() {
  const bars = [42, 58, 75, 52, 88, 94, 71]
  const months = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr']
  const maxH = 88
  return (
    <svg width="100%" viewBox="0 0 420 296" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="296" rx="16" fill="white"/>
      <defs>
        <pattern id="an-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#94A3B8" opacity="0.4"/>
        </pattern>
        <filter id="an-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#0C2472" floodOpacity="0.06"/>
        </filter>
      </defs>
      <rect width="420" height="296" rx="16" fill="url(#an-dots)"/>
      {/* Floating card */}
      <rect x="16" y="14" width="388" height="268" rx="14" fill="white" filter="url(#an-sh)"/>
      {/* Header */}
      <text x="30" y="42" fontFamily="system-ui" fontSize="13" fontWeight="600" fill="#18181B">Revenue Pipeline</text>
      <rect x="288" y="26" width="102" height="24" rx="12" fill="#F1F5F9"/>
      <text x="339" y="42" textAnchor="middle" fontFamily="system-ui" fontSize="10" fill="#6B7280">Last 7 months</text>
      <line x1="30" y1="56" x2="390" y2="56" stroke="#F0F2F5" strokeWidth="1"/>
      {/* KPI boxes */}
      {[
        { val:'$2.4M', lbl:'Total pipeline', x:22 },
        { val:'68%',   lbl:'Win rate',       x:158 },
        { val:'34d',   lbl:'Avg. cycle',     x:294 },
      ].map(k => (
        <g key={k.lbl}>
          <rect x={k.x} y="62" width="120" height="50" rx="10" fill="#F8FAFC"/>
          <text x={k.x + 12} y="86" fontFamily="system-ui" fontSize="20" fontWeight="800" fill="#18181B">{k.val}</text>
          <text x={k.x + 12} y="101" fontFamily="system-ui" fontSize="9" fill="#9CA3AF">{k.lbl}</text>
        </g>
      ))}
      {/* Grid lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1="24" y1={126 + i * 22} x2="396" y2={126 + i * 22} stroke="#F0F2F5" strokeWidth="1"/>
      ))}
      {/* Bars */}
      {bars.map((h, i) => {
        const bh = (h / 100) * maxH
        const bx = 28 + i * 52
        const by = 218 - bh
        const cx = bx + 16
        return (
          <g key={i}>
            <rect x={bx} y={by} width={32} height={bh} rx="5"
              fill={i >= 5 ? '#1D4ED8' : i >= 3 ? '#D6E4F9' : '#EFF6FF'}/>
            {i === 5 && (
              <>
                <rect x={bx - 4} y={by - 20} width={40} height={16} rx="5" fill="#18181B"/>
                <text x={cx} y={by - 8} textAnchor="middle" fontFamily="system-ui" fontSize="8" fontWeight="700" fill="white">+31%</text>
              </>
            )}
            <text x={cx} y="236" textAnchor="middle" fontFamily="system-ui" fontSize="8.5" fill="#9CA3AF">{months[i]}</text>
          </g>
        )
      })}
      {/* Trend line */}
      <polyline
        points={bars.map((h, i) => `${44 + i * 52},${218 - (h / 100) * maxH}`).join(' ')}
        stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {bars.map((h, i) => (
        <circle key={i} cx={44 + i * 52} cy={218 - (h / 100) * maxH} r="3" fill="white" stroke="#93C5FD" strokeWidth="1.5"/>
      ))}
      {/* Bottom stat */}
      <text x="30" y="260" fontFamily="system-ui" fontSize="9" fill="#9CA3AF">↑ 31% vs last period</text>
      <rect x="278" y="248" width="104" height="20" rx="10" fill="#DCFCE7"/>
      <text x="330" y="261" textAnchor="middle" fontFamily="system-ui" fontSize="9" fontWeight="600" fill="#16A34A">On Track ✓</text>
    </svg>
  )
}

function WorkflowIllo() {
  return (
    <svg width="100%" viewBox="0 0 420 302" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="302" rx="16" fill="white"/>
      <defs>
        <pattern id="wf-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#94A3B8" opacity="0.4"/>
        </pattern>
        <filter id="wf-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#0C2472" floodOpacity="0.06"/>
        </filter>
      </defs>
      <rect width="420" height="302" rx="16" fill="url(#wf-dots)"/>
      {/* Floating card */}
      <rect x="20" y="18" width="380" height="266" rx="14" fill="white" filter="url(#wf-sh)"/>
      {/* Header */}
      <text x="36" y="46" fontFamily="system-ui" fontSize="13" fontWeight="600" fill="#18181B">Recent Activity</text>
      <rect x="302" y="28" width="82" height="24" rx="12" fill="#DCFCE7"/>
      <circle cx="317" cy="40" r="4" fill="#22C55E"/>
      <text x="328" y="44" fontFamily="system-ui" fontSize="10" fontWeight="600" fill="#16A34A">Live</text>
      <line x1="36" y1="58" x2="384" y2="58" stroke="#F0F2F5" strokeWidth="1"/>
      {/* Item 1 — Won */}
      <rect x="28" y="66" width="364" height="62" rx="10" fill="#F0FDF4"/>
      <rect x="40" y="79" width="32" height="32" rx="8" fill="#DCFCE7"/>
      <path d="M51 95l4 4 8-8" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="84" y="81" width="28" height="28" rx="7" fill="#D6E4F9"/>
      <text x="98" y="99" textAnchor="middle" fontFamily="system-ui" fontSize="8" fontWeight="700" fill="#0C2472">AC</text>
      <text x="122" y="91" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Acme Corp</text>
      <text x="122" y="108" fontFamily="system-ui" fontSize="10" fill="#6B7280">Status changed to <tspan fontWeight="700" fill="#16A34A">Won</tspan></text>
      <text x="382" y="91" textAnchor="end" fontFamily="system-ui" fontSize="9" fill="#9CA3AF">2m ago</text>
      {/* Item 2 — Call */}
      <rect x="28" y="136" width="364" height="62" rx="10" fill="#F8FAFC"/>
      <rect x="40" y="149" width="32" height="32" rx="8" fill="#EFF6FF"/>
      <path d="M56 158c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2h-2l-3 3v-3h-3c-1.1 0-2-.9-2-2v-5z" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="98" cy="165" r="14" fill="#D0E5E0"/>
      <text x="98" y="169" textAnchor="middle" fontFamily="system-ui" fontSize="8" fontWeight="700" fill="#0C2472">SL</text>
      <text x="122" y="158" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Sarah Lee</text>
      <text x="122" y="175" fontFamily="system-ui" fontSize="10" fill="#6B7280">had a call with <tspan fontWeight="600" fill="#18181B">TechBridge</tspan></text>
      <text x="382" y="158" textAnchor="end" fontFamily="system-ui" fontSize="9" fill="#9CA3AF">15m ago</text>
      {/* Item 3 — Outreach */}
      <rect x="28" y="206" width="364" height="62" rx="10" fill="#F8FAFC"/>
      <rect x="40" y="219" width="32" height="32" rx="8" fill="#FEF3C7"/>
      <path d="M64 228l-7 7m7-7h-4m4 0v4" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="84" y="221" width="28" height="28" rx="7" fill="#FAE3D0"/>
      <text x="98" y="239" textAnchor="middle" fontFamily="system-ui" fontSize="8" fontWeight="700" fill="#7C3C1A">NS</text>
      <text x="122" y="228" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Nova Systems</text>
      <text x="122" y="245" fontFamily="system-ui" fontSize="10" fill="#6B7280">Status changed to <tspan fontWeight="700" fill="#D97706">Outreach</tspan></text>
      <text x="382" y="228" textAnchor="end" fontFamily="system-ui" fontSize="9" fill="#9CA3AF">32m ago</text>
    </svg>
  )
}

function ContactIllo() {
  return (
    <svg width="100%" viewBox="0 0 420 276" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="co-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#94A3B8" opacity="0.4"/>
        </pattern>
        <filter id="co-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#0C2472" floodOpacity="0.06"/>
        </filter>
        <linearGradient id="co-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0"/>
          <stop offset="100%" stopColor="white" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <rect width="420" height="276" rx="16" fill="white"/>
      <rect width="420" height="276" rx="16" fill="url(#co-dots)"/>
      {/* Floating card */}
      <rect x="40" y="24" width="340" height="228" rx="14" fill="white" filter="url(#co-sh)"/>
      {/* Tabs */}
      <text x="58" y="52" fontFamily="system-ui" fontSize="12" fontWeight="500" fill="#9CA3AF">Profile</text>
      <text x="122" y="52" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="#18181B">Timeline</text>
      <line x1="122" y1="58" x2="162" y2="58" stroke="#18181B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="54" y1="63" x2="366" y2="63" stroke="#F0F2F5" strokeWidth="1"/>
      {/* Item 1 — Sarah Chen */}
      <circle cx="70" cy="89" r="13" fill="#D6E4F9"/>
      <text x="70" y="93" textAnchor="middle" fontFamily="system-ui" fontSize="8" fontWeight="700" fill="#0C2472">SC</text>
      <text x="92" y="86" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Sarah Chen</text>
      <text x="92" y="101" fontFamily="system-ui" fontSize="10" fill="#6B7280">This looks exactly like what we need,</text>
      <text x="92" y="115" fontFamily="system-ui" fontSize="10" fill="#6B7280">what are <tspan fill="#3B82F6">the next steps?</tspan></text>
      {/* Divider */}
      <line x1="54" y1="130" x2="366" y2="130" stroke="#F0F2F5" strokeWidth="1"/>
      {/* Item 2 — James Reed */}
      <circle cx="70" cy="154" r="13" fill="#D0E5E0"/>
      <text x="70" y="158" textAnchor="middle" fontFamily="system-ui" fontSize="8" fontWeight="700" fill="#0C2472">JR</text>
      <text x="92" y="151" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">James Reed</text>
      <rect x="92" y="160" width="184" height="8" rx="4" fill="#F0F2F5"/>
      <rect x="92" y="174" width="134" height="8" rx="4" fill="#F0F2F5"/>
      {/* Divider */}
      <line x1="54" y1="192" x2="366" y2="192" stroke="#F0F2F5" strokeWidth="1"/>
      {/* Item 3 — Mia Patel */}
      <circle cx="70" cy="214" r="13" fill="#FAE3D0"/>
      <text x="70" y="218" textAnchor="middle" fontFamily="system-ui" fontSize="8" fontWeight="700" fill="#7C3C1A">MP</text>
      <text x="92" y="211" fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#18181B">Mia Patel</text>
      <rect x="92" y="220" width="200" height="8" rx="4" fill="#F0F2F5"/>
      <rect x="92" y="234" width="150" height="8" rx="4" fill="#F0F2F5"/>
      {/* Bottom fade */}
      <rect x="40" y="228" width="340" height="24" fill="url(#co-fade)"/>
    </svg>
  )
}

function FeatureAccordion({ items }: { items: { title: string; desc: string }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.title ?? null)
  return (
    <div className="rounded-2xl border border-tint overflow-hidden shadow-[0_2px_16px_rgba(12,36,114,0.06)]">
      {items.map((item, i) => {
        const isOpen = open === item.title
        return (
          <div
            key={item.title}
            className={cn(
              'border-b border-tint last:border-b-0 transition-colors duration-200',
              isOpen ? 'bg-[#EFF6FF]' : 'bg-white hover:bg-gray-50/80'
            )}
          >
            {/* Trigger */}
            <button
              onClick={() => setOpen(isOpen ? null : item.title)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Number badge */}
                <span className={cn(
                  'flex-shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-200',
                  isOpen
                    ? 'bg-primary text-white shadow-[0_2px_6px_rgba(29,78,216,0.35)]'
                    : 'bg-gray-100 text-gray-400'
                )}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Title */}
                <span className={cn(
                  'font-heading font-semibold text-[15px] leading-snug transition-colors duration-200',
                  isOpen ? 'text-primary' : 'text-gray-700'
                )}>
                  {item.title}
                </span>
              </div>
              {/* Chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke={isOpen ? '#1D4ED8' : '#9CA3AF'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </button>

            {/* Expandable content */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="px-5 pb-5"
              >
                <p className="text-gray-500 text-[15px] leading-relaxed pl-[38px] border-t border-[#DBEAFE] pt-3">
                  {item.desc}
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
export default function FeaturesPage() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('lead')
  const tabsBarRef = useRef<HTMLDivElement>(null)
  const tabRefs    = useRef<Record<string, HTMLAnchorElement | null>>({})

  useEffect(() => {
    const NAV_H  = 60
    const TABS_H = 58
    const onScroll = () => {
      const threshold = window.scrollY + NAV_H + TABS_H + 64
      let current = SECTIONS[0].id
      SECTIONS.forEach(s => {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= threshold) current = s.id
      })
      setActiveTab(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80 - 56 - 58 - 16
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="bg-white">

      {/* ══ TOP BAR — EVOQ global nav ══ */}
      <header className="fixed top-0 left-0 right-0 z-[210] h-[80px] bg-[#f0f6ff] shadow-[0_1px_0_#BFDBFE,0_4px_12px_rgba(29,78,216,0.07)]">
        <div className="h-full w-full pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-8 md:pr-8 flex items-center">

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
        <div className="h-full w-full pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-8 md:pr-8 flex items-center">

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
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-semibold text-white bg-[#1D4ED8] border border-[#1D4ED8] shadow-[0_1px_3px_rgba(29,78,216,0.15)] transition-all duration-150">
              Features
            </Link>
            <Link href="/pricing"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium text-primary hover:text-white hover:bg-[#1D4ED8] transition-all duration-150">
              Pricing
            </Link>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-surface text-depth mt-[136px] pt-[80px] pb-[110px] px-8 text-center">

        {/* Decorative geometric shapes — confined to corners and edges, never overlapping content */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>

          {/* Top-left corner cluster */}
          <svg className="absolute top-0 left-0 w-52 h-52" viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="58" stroke="#D6E4F9" strokeWidth="1.5" opacity="0.65"/>
            <circle cx="24" cy="24" r="36" stroke="#93C5FD" strokeWidth="1" opacity="0.4"/>
            <rect x="98" y="12" width="12" height="12" rx="2" fill="#D6E4F9" opacity="0.55" transform="rotate(22 104 18)"/>
            <circle cx="140" cy="42" r="4" fill="#93C5FD" opacity="0.45"/>
            <circle cx="168" cy="18" r="2.5" fill="#D6E4F9" opacity="0.5"/>
            <circle cx="80" cy="76" r="3" fill="#93C5FD" opacity="0.3"/>
          </svg>

          {/* Top-right corner cluster */}
          <svg className="absolute top-0 right-0 w-52 h-52" viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="184" cy="24" r="62" stroke="#D6E4F9" strokeWidth="1.5" opacity="0.6"/>
            <rect x="92" y="10" width="14" height="14" rx="2" fill="#D6E4F9" opacity="0.5" transform="rotate(-18 99 17)"/>
            <circle cx="62" cy="50" r="3.5" fill="#93C5FD" opacity="0.42"/>
            <circle cx="104" cy="14" r="2.5" fill="#D6E4F9" opacity="0.5"/>
            <rect x="44" y="76" width="9" height="9" fill="#93C5FD" opacity="0.22" transform="rotate(45 48 80)"/>
            <circle cx="34" cy="38" r="3" fill="#93C5FD" opacity="0.3"/>
          </svg>

          {/* Bottom-left corner cluster */}
          <svg className="absolute bottom-0 left-0 w-44 h-44" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="158" r="52" stroke="#D6E4F9" strokeWidth="1.5" opacity="0.5"/>
            <circle cx="18" cy="158" r="30" stroke="#93C5FD" strokeWidth="1" opacity="0.32"/>
            <circle cx="88" cy="158" r="3" fill="#93C5FD" opacity="0.42"/>
            <rect x="106" y="132" width="10" height="10" rx="1.5" fill="#D6E4F9" opacity="0.45" transform="rotate(30 111 137)"/>
            <circle cx="140" cy="154" r="2.5" fill="#D6E4F9" opacity="0.4"/>
          </svg>

          {/* Bottom-right corner cluster */}
          <svg className="absolute bottom-0 right-0 w-48 h-48" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="174" cy="168" r="56" stroke="#D6E4F9" strokeWidth="1.5" opacity="0.5"/>
            <circle cx="110" cy="178" r="3.5" fill="#93C5FD" opacity="0.4"/>
            <rect x="76" y="140" width="11" height="11" rx="2" fill="#D6E4F9" opacity="0.42" transform="rotate(-22 81 145)"/>
            <circle cx="48" cy="162" r="2.5" fill="#D6E4F9" opacity="0.42"/>
            <circle cx="144" cy="134" r="4" fill="#93C5FD" opacity="0.3"/>
          </svg>

          {/* Left-edge mid dots */}
          <div style={{position:'absolute',top:'42%',left:'1.2%',width:7,height:7,borderRadius:'50%',background:'rgba(147,197,253,0.38)'}}/>
          <div style={{position:'absolute',top:'54%',left:'2%',width:4.5,height:4.5,borderRadius:'50%',background:'rgba(214,228,249,0.48)'}}/>
          <div style={{position:'absolute',top:'63%',left:'0.8%',width:5.5,height:5.5,borderRadius:'50%',background:'rgba(147,197,253,0.28)'}}/>

          {/* Right-edge mid dots */}
          <div style={{position:'absolute',top:'40%',right:'1.2%',width:7,height:7,borderRadius:'50%',background:'rgba(147,197,253,0.38)'}}/>
          <div style={{position:'absolute',top:'52%',right:'2%',width:4.5,height:4.5,borderRadius:'50%',background:'rgba(214,228,249,0.48)'}}/>
          <div style={{position:'absolute',top:'66%',right:'0.8%',width:5.5,height:5.5,borderRadius:'50%',background:'rgba(147,197,253,0.28)'}}/>

        </div>

        {/* Soft blob circles — left and right of content, matching marked positions */}
        <div className="pointer-events-none absolute hidden xl:block" aria-hidden
          style={{left:'21%', top:'28%', width:88, height:88, borderRadius:'50%', background:'rgba(203,213,225,0.55)', filter:'blur(18px)'}}/>
        <div className="pointer-events-none absolute hidden xl:block" aria-hidden
          style={{right:'20%', top:'46%', width:72, height:72, borderRadius:'50%', background:'rgba(203,213,225,0.50)', filter:'blur(16px)'}}/>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-surface/80" aria-hidden/>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          <h1 className="text-[48px] font-heading font-black tracking-[-0.04em] leading-[1.05] mb-6 text-gray-900">
            Sell <span className="text-gray-900">Smarter</span>,<br/>
            Faster, and Better
          </h1>
          <p className="text-gray-500 text-[18px] leading-relaxed max-w-[480px] mx-auto mb-10">
            From lead capture to closing deals, EVOQ CRM gives your team the tools to streamline sales, boost productivity, and strengthen customer relationships, all in one place.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="bg-primary text-white text-[13.5px] font-bold px-6 py-3 rounded-lg hover:bg-hover transition-colors shadow-[0_2px_12px_rgba(29,78,216,0.35)]">Request Free Trial</a>
            <a href="#" className="bg-white text-primary text-[13.5px] font-semibold px-6 py-3 rounded-lg border-2 border-primary hover:bg-surface transition-colors">Book a Demo</a>
          </div>
        </motion.div>

        {/* Floating icons — left */}
        <div className="pointer-events-none absolute left-[18%] top-[22%] bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(12,36,114,0.10)] border border-white hidden xl:flex" style={{width:52,height:52}}>
          <Briefcase size={22} weight="duotone" color="#1D4ED8"/>
        </div>
        <div className="pointer-events-none absolute left-[22%] top-[62%] bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(12,36,114,0.10)] border border-white hidden xl:flex" style={{width:56,height:56}}>
          <Users size={24} weight="duotone" color="#1D4ED8"/>
        </div>

        {/* Floating icons — right */}
        <div className="pointer-events-none absolute right-[18%] top-[30%] bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(12,36,114,0.10)] border border-white hidden xl:flex" style={{width:56,height:56}}>
          <ChartBar size={24} weight="duotone" color="#1D4ED8"/>
        </div>
        <div className="pointer-events-none absolute right-[20%] top-[62%] bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(12,36,114,0.10)] border border-white hidden xl:flex" style={{width:52,height:52}}>
          <Bell size={22} weight="duotone" color="#1D4ED8"/>
        </div>

      </section>

      {/* ── S1 LEAD MANAGEMENT — tint · text-left / illo-right ── */}
      <Section id="lead" className="bg-tint">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} className="pt-8">
            {/* ── SECTION TABS — Inside Lead Management, above heading ── */}
            <div ref={tabsBarRef} className="flex gap-2 mb-8 pb-2 flex-wrap sm:flex-nowrap -mt-20" style={{ scrollbarWidth: 'none' }}>
              {SECTIONS.map(s => (
                <a
                  key={s.id}
                  ref={el => { tabRefs.current[s.id] = el }}
                  href={`#${s.id}`}
                  onClick={e => { e.preventDefault(); scrollTo(s.id) }}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium whitespace-nowrap transition-all duration-200 select-none flex-shrink-0',
                    activeTab === s.id
                      ? 'bg-primary text-white border border-primary'
                      : 'bg-white border border-primary text-primary hover:bg-[#EFF6FF]'
                  )}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <SectionLabel num="01" title="Lead Management"/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.15] mb-5">
              Capture and Qualify<br/>the Right Prospects
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed mb-8 max-w-[420px]">
              Capture leads from forms, campaigns, chats, and integrations into a centralized system. Automatically organize, score, and distribute leads so your sales team can focus on prospects most likely to convert.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: 'Lead Capture', desc: 'Collect leads automatically from web forms, campaigns, chats, imports, and integrations so no opportunity is missed.', borderRadius: 'rounded-[2rem] rounded-br-[4rem]', highlight: false },
                { title: 'Lead Assignment', desc: 'Automatically distribute leads to the right sales representatives based on predefined rules, territories, or availability.', borderRadius: 'rounded-[2rem] rounded-bl-[4rem]', highlight: true },
                { title: 'Lead Scoring', desc: 'Prioritize prospects by assigning scores based on behavior, engagement, and profile data.', borderRadius: 'rounded-[2rem] rounded-tr-[4rem]', highlight: true },
                { title: 'Lead Nurturing', desc: 'Engage prospects with automated follow-ups and campaigns until they are ready to move forward.', borderRadius: 'rounded-[2rem] rounded-tl-[4rem]', highlight: false },
              ].map(item => (
                <motion.div key={item.title} variants={fadeUp} className={`${item.highlight ? 'bg-[#93C5FD] border border-[#93C5FD]' : 'bg-white border border-tint'} px-6 py-5 shadow-[0_4px_16px_rgba(12,36,114,0.08)] hover:shadow-[0_6px_24px_rgba(12,36,114,0.12)] transition-shadow ${item.borderRadius}`}>
                  <div className={`font-heading font-bold text-[16px] mb-2 ${item.highlight ? 'text-black' : 'text-gray-900'}`}>{item.title}</div>
                  <p className={`text-[15px] leading-relaxed ${item.highlight ? 'text-gray-900' : 'text-gray-500'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-tint shadow-[0_4px_24px_rgba(12,36,114,0.08),_0_1px_4px_rgba(12,36,114,0.04)]">
            <LeadIllo/>
          </motion.div>
        </div>
      </Section>

      {/* ── S2 CONTACTS — surface · centered + 2-col ── */}
      <Section id="contacts" className="bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={fadeUp} className="text-center max-w-[540px] mx-auto mb-14">
            <SectionLabel num="02" title="Contacts & Accounts" center/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.15] mb-5">
              Maintain Complete<br/>Relationship Context
            </h2>
            <p className="text-gray-700 text-[16px] leading-relaxed">
              Keep a full picture of every contact and account. Sync emails, import lists, and give your team the context they need before every conversation.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* contact illustration */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-tint shadow-[0_4px_24px_rgba(12,36,114,0.08)]">
              <ContactIllo/>
            </motion.div>
            {/* feature accordion */}
            <motion.div variants={fadeUp} className="flex flex-col justify-center">
              <FeatureAccordion items={[
                { title: 'Contacts',              desc: 'Full profile: email, phone, company, history, tags — all in one view.' },
                { title: 'Accounts',              desc: 'Group contacts by company. Track account-level deals and engagement over time.' },
                { title: 'Email Synchronization', desc: 'Two-way Gmail and Outlook sync. Every email thread lands in the right contact timeline automatically.' },
                { title: 'Contact Import',        desc: 'Bulk import from CSV or existing CRM exports with smart field mapping and deduplication.' },
              ]}/>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── S3 PIPELINE — light blue · centered header + 5-col features ── */}
      <Section id="pipeline" className="bg-[#E3ECFC]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={fadeUp} className="text-center max-w-[660px] mx-auto mb-16">
            <SectionLabel num="03" title="Sales Pipeline & Deals" center/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.15] mb-3">
              Turn Opportunities Into<br/>Predictable Revenue
            </h2>
            <p className="text-primary font-semibold text-[16px] mb-4">Sales Pipeline & Deals</p>
            <p className="text-gray-600 text-[16px] leading-relaxed">
              Manage every deal from first touch to close. Track stage progression, automate transitions, and generate quotes without leaving the CRM.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { title: 'Pipeline Management',   desc: 'Track deals through customizable pipeline stages with clear visibility into progress.',     icon: <ChartBar size={26} weight="duotone" color="#1D4ED8" /> },
              { title: 'Deal Tracking',         desc: 'Monitor deal value, owners, activities, and status from a single view.',                    icon: <ArrowUpRight size={26} weight="duotone" color="#1D4ED8" /> },
              { title: 'Deal Stage Automation', desc: 'Automatically trigger actions when deals move between stages, reducing manual work.',        icon: <Gear size={26} weight="duotone" color="#1D4ED8" /> },
              { title: 'Quote Generation',      desc: 'Create and send professional quotes directly from the CRM.',                                icon: <CheckCircle size={26} weight="duotone" color="#1D4ED8" /> },
              { title: 'Product Catalog',       desc: 'Manage products and pricing so they can be quickly added to deals and quotes.',             icon: <Briefcase size={26} weight="duotone" color="#1D4ED8" /> },
            ].map(item => (
              <motion.div key={item.title} variants={fadeUp}>
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-heading font-bold text-gray-900 text-[24px] mb-2 leading-snug">{item.title}</h3>
                <p className="text-gray-600 text-[16px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── S4 SALES TEAM — surface break ── */}
      <Section id="team" className="bg-surface relative overflow-hidden">
        {/* subtle dot grid texture */}
        <div className="pointer-events-none absolute inset-0" style={{backgroundImage:'radial-gradient(rgba(29,78,216,0.08) 1px, transparent 1px)', backgroundSize:'28px 28px'}}/>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div variants={fadeUp} className="max-w-[600px] mb-14">
            <SectionLabel num="04" title="Sales Team Management"/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-primary leading-[1.15] mb-4">
              Manage Performance and<br/>Forecast Revenue
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed">
              Track activity, set quotas, and keep your team aligned with live dashboards and accurate revenue forecasting.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title:'Activity Monitoring',    stat:'2,847', sub:'activities logged this month',   desc:'See every call, email, and meeting your reps log — in real time, without micromanaging.',
                icon:<ArrowUpRight size={24} weight="duotone" color="white" />, highlight: true },
              { title:'Goal Tracking',          stat:'94%',   sub:'avg. quota attainment',          desc:'Set quotas, track progress visually, and keep each rep on target with clear milestones.',
                icon:<CheckCircle size={24} weight="duotone" color="white" /> },
              { title:'Performance Dashboards', stat:'12+',   sub:'dashboard templates built-in',   desc:'Live dashboards surface exactly what\'s working — and what needs attention — across your team.',
                icon:<ChartBar size={24} weight="duotone" color="white" /> },
              { title:'Sales Forecasting',      stat:'±8%',   sub:'avg. forecast variance',         desc:'Predict revenue with confidence using pipeline data, probabilities, and historical trends.',
                icon:<ArrowUpRight size={24} weight="duotone" color="white" />, highlight: true },
            ].map(card => (
              <motion.div key={card.title} variants={fadeUp}
                className={card.highlight ? "bg-[#93C5FD] rounded-2xl p-6 border border-[#93C5FD] shadow-[0_2px_12px_rgba(29,78,216,0.12)] hover:shadow-[0_4px_20px_rgba(29,78,216,0.16)] transition-colors" : "bg-white rounded-2xl p-6 border border-tint shadow-[0_2px_12px_rgba(29,78,216,0.06)] hover:shadow-[0_4px_20px_rgba(29,78,216,0.10)] transition-colors"}>
                <div className="flex items-start justify-between mb-5">
                  <div>{card.icon}</div>
                  <div className="text-right">
                    <div className={card.highlight ? "text-[2rem] font-black text-white tracking-tight leading-none" : "text-[2rem] font-black text-primary tracking-tight leading-none"}>{card.stat}</div>
                    <div className={card.highlight ? "text-[10.5px] text-white/70 mt-0.5 max-w-[120px] text-right" : "text-[10.5px] text-gray-500 mt-0.5 max-w-[120px] text-right"}>{card.sub}</div>
                  </div>
                </div>
                <h3 className={card.highlight ? "font-heading font-bold text-white text-[26px] leading-snug mb-2" : "font-heading font-bold text-gray-900 text-[26px] leading-snug mb-2"}>{card.title}</h3>
                <p className={card.highlight ? "text-white/85 text-[16px] leading-relaxed" : "text-gray-500 text-[16px] leading-relaxed"}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── S5 TASKS — tint · illo-left / text-right ── */}
      <Section id="tasks" className="bg-tint">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-tint shadow-[0_4px_24px_rgba(12,36,114,0.08)]">
            <CalendarIllo/>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SectionLabel num="05" title="Tasks & Scheduling"/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.15] mb-4">
              Never Miss<br/>a Follow-Up
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed mb-8 max-w-[420px]">
              Schedule meetings, set reminders, and log every activity automatically. Your team stays organized without the overhead of manual entry.
            </p>
            <div className="space-y-5">
              {[
                { title: 'Task Management',          desc: 'Create and assign tasks to track follow-ups and responsibilities.' },
                { title: 'Meeting Scheduling',       desc: 'Book and manage meetings directly from the CRM.' },
                { title: 'Calendar Synchronization', desc: 'Sync schedules with external calendars to keep availability updated.' },
                { title: 'Reminders & Alerts',       desc: 'Receive notifications for upcoming meetings, deadlines, and follow-ups.' },
                { title: 'Activity Tracking',        desc: 'Log calls, meetings, and tasks to maintain a complete sales record.' },
              ].map(item => (
                <div key={item.title} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-[7px] flex-shrink-0"/>
                  <div>
                    <div className="font-heading font-bold text-gray-900 text-[16px] mb-0.5">{item.title}</div>
                    <p className="text-gray-400 text-[16px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── S6 CAMPAIGNS — surface · 4 feature cards ── */}
      <Section id="campaigns" className="bg-surface overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <motion.div variants={fadeUp} className="text-center max-w-[560px] mx-auto mb-14">
            <SectionLabel num="06" title="Campaign Management" center/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.15] mb-5">
              Engage Prospects Across<br/>Multiple Channels
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed">
              Run email and SMS campaigns, automate sequences, and track engagement — all without switching tools.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title:'Email Campaigns',    desc:'Design, schedule, and deliver targeted emails to the right audience at the right time.',                          icon: <Envelope size={28} weight="duotone" color="#1D4ED8" /> },
              { title:'SMS Campaigns',      desc:'Send personalized texts to reach prospects directly on their mobile devices.',                                     icon: <Phone size={28} weight="duotone" color="#1D4ED8" /> },
              { title:'Campaign Automation',desc:'Drip sequences and trigger-based campaigns that run on autopilot while you focus on closing.',                    icon: <Gear size={28} weight="duotone" color="#1D4ED8" /> },
              { title:'Engagement Tracking',desc:'Monitor opens, clicks, replies, and conversions to sharpen every future campaign.',                               icon: <ArrowUpRight size={28} weight="duotone" color="#1D4ED8" /> },
            ].map(card => (
              <motion.div key={card.title} variants={fadeUp}
                className="bg-[#E3ECFC] border border-[#E3ECFC] rounded-2xl p-6 shadow-[0_2px_16px_rgba(29,78,216,0.08)] hover:shadow-[0_6px_28px_rgba(29,78,216,0.12)] transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  {card.icon}
                  <h3 className="font-heading font-bold text-gray-900 text-[24px] leading-snug">{card.title}</h3>
                </div>
                <p className="text-gray-700 text-[16px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── S7 ANALYTICS — tint · text-left / chart-right ── */}
      <Section id="analytics" className="bg-tint">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp}>
            <SectionLabel num="07" title="Reports & Analytics"/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.15] mb-5">
              Make Smarter Decisions<br/>With Real Insights
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed mb-8 max-w-[420px]">
              From pipeline analytics to performance dashboards, every metric you need to grow your business is one click away.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Customer Segmentation','Conversion Tracking','Pipeline Analytics','Reports','Performance Dashboards'].map(f => <Chip key={f}>{f}</Chip>)}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-tint shadow-[0_4px_24px_rgba(12,36,114,0.08)]">
            <AnalyticsIllo/>
          </motion.div>
        </div>
      </Section>

      {/* ── S8 CUSTOMIZATION — surface · workflow illo-left / feature-right ── */}
      <Section id="custom" className="bg-surface">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-tint shadow-[0_4px_24px_rgba(12,36,114,0.08)]">
            <WorkflowIllo/>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SectionLabel num="08" title="Customization & Automation"/>
            <h2 className="text-[38px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.15] mb-5">
              Adapt the CRM to<br/>Your Sales Process
            </h2>
            <p className="text-gray-500 text-[16px] leading-relaxed mb-8 max-w-[420px]">
              Build the CRM around how your team works — not the other way around. Custom fields, smart routing, and approvals that move at your speed.
            </p>
            <div className="space-y-3">
              {[
                { title:'Custom Fields',       desc:'Add the fields your business actually needs — product types, deal categories, or anything unique.' },
                { title:'Workflow Automation', desc:'Trigger actions automatically on stage changes, score thresholds, or missed deadlines.' },
                { title:'Lead Routing Rules',  desc:'Auto-assign leads by geography, product interest, deal size, or rep availability.' },
                { title:'Approval Workflows',  desc:'Structured approval chains for quotes, discounts, and deals above defined thresholds.' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3 bg-white rounded-xl px-4 py-4 border border-tint shadow-[0_1px_6px_rgba(12,36,114,0.04)]">
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.5L4 7.5L8 3" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-depth text-[16px]">{item.title} </span>
                    <span className="text-gray-400 text-[16px]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-28 px-8 text-center bg-[#E3ECFC]">

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {/* Top-left corner */}
          <svg className="absolute top-0 left-0 w-40 h-40" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="45" stroke="#DBEAFE" strokeWidth="1.5" opacity="0.5"/>
            <circle cx="20" cy="20" r="25" stroke="#BFDBFE" strokeWidth="1" opacity="0.3"/>
          </svg>

          {/* Bottom-right corner */}
          <svg className="absolute bottom-0 right-0 w-44 h-44" viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="156" cy="156" r="50" stroke="#DBEAFE" strokeWidth="1.5" opacity="0.5"/>
            <rect x="120" y="100" width="20" height="20" rx="2" fill="#BFDBFE" opacity="0.4" transform="rotate(30 130 110)"/>
          </svg>

          {/* Scattered dots */}
          <div style={{position:'absolute',top:'25%',left:'10%',width:6,height:6,borderRadius:'50%',background:'rgba(191,219,254,0.4)'}}/>
          <div style={{position:'absolute',top:'65%',right:'15%',width:4,height:4,borderRadius:'50%',background:'rgba(219,230,254,0.5)'}}/>
          <div style={{position:'absolute',bottom:'20%',left:'20%',width:5,height:5,borderRadius:'50%',background:'rgba(191,219,254,0.3)'}}/>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full"
        >
          <h2 className="text-[42px] font-heading font-black tracking-[-0.03em] text-gray-900 leading-[1.06] mb-5">
            Everything Your Team Needs,<br/>All in One CRM
          </h2>
          <p className="text-gray-700 text-[18px] leading-relaxed mb-10">
            Close more deals. Build lasting customer relationships. Scale your sales operation with EVOQ CRM.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="bg-primary text-white text-[14px] font-bold px-8 py-3.5 rounded-lg hover:bg-hover transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
              Request Free Trial
            </a>
            <a href="#" className="bg-white text-primary text-[14px] font-semibold px-8 py-3.5 rounded-lg border-2 border-white hover:bg-[#F0F6FF] transition-colors">
              Book a Demo
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
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
                {[{l:'CRM',h:'/'},{l:'Sync',h:'#'},{l:'Skillberry',h:'#'}].map(p => (
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
