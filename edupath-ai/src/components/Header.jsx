import React from 'react'
import { Compass, Flame, RotateCcw, Sparkles } from 'lucide-react'
import { useAppDispatch, useAppState } from '../context/AppContext.jsx'

export default function Header() {
  const state = useAppState()
  const dispatch = useAppDispatch()
  const { pathState, view } = state

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <button
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
          onClick={() => dispatch({ type: 'GO_TO', view: pathState ? 'dashboard' : 'landing' })}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pine text-paper">
            <Compass size={18} strokeWidth={2.4} />
          </span>
          EduPath <span className="text-pine">AI</span>
        </button>

        {view === 'dashboard' && pathState && (
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 font-mono text-xs text-ink sm:flex">
              <Sparkles size={14} className="text-amber-dark" />
              {pathState.xp} XP
            </div>
            <div className="hidden items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 font-mono text-xs text-ink sm:flex">
              <Flame size={14} className="text-rust" />
              {pathState.domainTitle}
            </div>
            <button
              onClick={() => {
                if (confirm('Reset all progress and start over?')) dispatch({ type: 'RESET' })
              }}
              className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:border-rust hover:text-rust"
              title="Reset progress"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
