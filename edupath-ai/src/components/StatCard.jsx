import React from 'react'

export default function StatCard({ icon: Icon, label, value, sub, accent = 'text-pine' }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/40 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink/45">{label}</span>
        {Icon && <Icon size={16} className={accent} />}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink/45">{sub}</p>}
    </div>
  )
}
