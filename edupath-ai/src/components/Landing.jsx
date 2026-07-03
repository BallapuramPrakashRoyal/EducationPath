import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { useAppDispatch } from '../context/AppContext.jsx'

export default function Landing() {
  const dispatch = useAppDispatch()

  return (
    <div className="relative overflow-hidden bg-ink text-paper">
      <div className="contour-bg absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-amber-light">
            TenzorX 2026 National AI Hackathon
          </span>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-paper sm:text-6xl">
            Your learning,
            <br />
            <span className="italic text-amber-light">charted</span> like a trail.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">
            EduPath AI turns any skill goal into a personalized route: a diagnostic
            places you on the trail, and every quiz along the way reshapes what
            comes next &mdash; skip what you know, reinforce what you don&apos;t.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => dispatch({ type: 'START_ONBOARDING' })}
              className="group flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 font-semibold text-ink transition hover:bg-amber-light"
            >
              Chart my path
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
            <span className="font-mono text-xs text-paper/50">No signup &middot; No API key &middot; Runs fully offline</span>
          </div>
        </div>

        <TrailTeaser />
      </div>
    </div>
  )
}

function TrailTeaser() {
  const nodes = [
    { x: 40, y: 40, label: 'Foundations', state: 'done' },
    { x: 150, y: 110, label: 'Core skills', state: 'done' },
    { x: 90, y: 195, label: 'Applied practice', state: 'now' },
    { x: 210, y: 265, label: 'Specialization', state: 'locked' },
    { x: 130, y: 345, label: 'Capstone', state: 'locked' }
  ]
  const path = `M ${nodes.map((n) => `${n.x},${n.y}`).join(' L ')}`

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 260 400" className="h-[420px] w-full max-w-[300px]">
        <path d={path} fill="none" stroke="#3E8F7A" strokeWidth="3" strokeLinecap="round" className="trail-dash" opacity="0.6" />
        {nodes.map((n, i) => (
          <g key={i}>
            {n.state === 'now' && (
              <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="#E0A339" strokeWidth="2">
                <animate attributeName="r" values="14;20;14" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r="10"
              fill={n.state === 'done' ? '#3E8F7A' : n.state === 'now' ? '#E0A339' : '#2A2D3A'}
              stroke={n.state === 'locked' ? '#464A5C' : 'none'}
              strokeWidth="1.5"
            />
            <text x={n.x + 18} y={n.y + 4} fontSize="11" fontFamily="'IBM Plex Mono', monospace" fill="#D9DACE">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink-soft px-3 py-1.5 font-mono text-[10px] text-amber-light">
        <MapPin size={12} />
        adapts after every checkpoint
      </div>
    </div>
  )
}
