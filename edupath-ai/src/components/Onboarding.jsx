import React, { useState } from 'react'
import { Globe, BrainCircuit, ShieldCheck, CloudCog, ArrowRight } from 'lucide-react'
import { DOMAINS } from '../data/domains.js'
import { useAppDispatch } from '../context/AppContext.jsx'

const ICONS = { Globe, BrainCircuit, ShieldCheck, CloudCog }

export default function Onboarding() {
  const dispatch = useAppDispatch()
  const [domainId, setDomainId] = useState(null)
  const [weeklyHours, setWeeklyHours] = useState(6)
  const [name, setName] = useState('')

  const canContinue = Boolean(domainId)

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-wider text-pine">Step 1 of 2</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
        What are you trying to learn?
      </h1>
      <p className="mt-3 max-w-xl text-ink/60">
        Pick a domain. Next you&apos;ll take a two-minute diagnostic so the trail starts
        exactly where your knowledge does &mdash; not at square one if you don&apos;t need it.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {DOMAINS.map((d) => {
          const Icon = ICONS[d.icon] || Globe
          const active = domainId === d.id
          return (
            <button
              key={d.id}
              onClick={() => setDomainId(d.id)}
              className={`flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition ${
                active
                  ? 'border-pine bg-pine/5 ring-2 ring-pine'
                  : 'border-ink/10 bg-white/40 hover:border-pine/50'
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  active ? 'bg-pine text-paper' : 'bg-ink/5 text-ink/70'
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="font-display text-lg font-semibold text-ink">{d.title}</span>
              <span className="text-sm text-ink/60">{d.tagline}</span>
              <span className="font-mono text-[11px] text-ink/40">{d.modules.length} modules on this trail</span>
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 rounded-2xl border border-ink/10 bg-white/40 p-6 sm:grid-cols-2">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-ink/50">
            Weekly study hours
          </label>
          <div className="mt-3 flex items-center gap-4">
            <input
              type="range"
              min="2"
              max="20"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-pine"
            />
            <span className="w-16 shrink-0 rounded-full bg-ink/5 px-2 py-1 text-center font-mono text-sm text-ink">
              {weeklyHours}h
            </span>
          </div>
          <p className="mt-2 text-xs text-ink/50">Used to pace your trail and estimate finish dates.</p>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-ink/50">
            Name <span className="normal-case text-ink/30">(optional)</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className="mt-3 w-full rounded-lg border border-ink/15 bg-paper px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-pine"
          />
        </div>
      </div>

      <button
        disabled={!canContinue}
        onClick={() => dispatch({ type: 'SET_PROFILE', profile: { domainId, weeklyHours, name } })}
        className="mt-8 flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition enabled:hover:bg-pine disabled:cursor-not-allowed disabled:opacity-30"
      >
        Take the diagnostic
        <ArrowRight size={18} />
      </button>
    </div>
  )
}
