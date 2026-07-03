import React, { useState } from 'react'
import { TrendingUp, Clock3, Target, Award, ArrowRight } from 'lucide-react'
import { useAppState, useAppDispatch } from '../context/AppContext.jsx'
import { computeStats, nextAction } from '../engine/pathEngine.js'
import RoadmapPath from './RoadmapPath.jsx'
import ModuleDrawer from './ModuleDrawer.jsx'
import QuizModal from './QuizModal.jsx'
import StatCard from './StatCard.jsx'

export default function Dashboard() {
  const { pathState, profile } = useAppState()
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState(null)
  const [quizModule, setQuizModule] = useState(null)

  if (!pathState) return null
  const stats = computeStats(pathState)
  const suggestion = nextAction(pathState)

  function handleQuizComplete(percent) {
    dispatch({ type: 'SUBMIT_MODULE_QUIZ', moduleId: quizModule.id, percent })
    setQuizModule(null)
    setSelected(null)
  }

  function handleCompleteRemedial(remedialId) {
    dispatch({ type: 'COMPLETE_REMEDIAL', remedialId })
    setSelected(null)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-pine">
            {profile.name ? `${profile.name}\u2019s trail` : 'Your trail'}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            {pathState.domainTitle}
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Placed at <strong className="text-ink">{pathState.level}</strong> from your diagnostic ({pathState.diagnosticPercent}%)
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={TrendingUp} label="Progress" value={`${stats.percentComplete}%`} sub={`${stats.completed}/${stats.total} modules`} />
        <StatCard icon={Award} label="Mastered" value={stats.mastered} sub="checkpoints \u226580%" accent="text-pine" />
        <StatCard icon={Target} label="Needs review" value={stats.needsReview} sub="flagged checkpoints" accent="text-amber-dark" />
        <StatCard icon={Clock3} label="Time left" value={`${stats.weeksRemaining}w`} sub={`at ${pathState.weeklyHours}h/week`} accent="text-ink/70" />
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-amber/40 bg-amber/10 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-amber-dark">Recommended next</p>
          <p className="mt-1 font-display text-lg font-semibold text-ink">
            {suggestion.module ? suggestion.module.title : 'Trail complete'}
          </p>
          <p className="text-sm text-ink/60">{suggestion.note}</p>
        </div>
        {suggestion.module && (
          <button
            onClick={() => setSelected(suggestion.module)}
            className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-pine"
          >
            View module
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr]">
        <RoadmapPath modules={pathState.modules} onSelect={setSelected} selectedId={selected?.id} />

        <div className="rounded-2xl border border-ink/10 bg-white/40 p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink/45">How the trail adapts</h3>
          <ul className="mt-3 space-y-3 text-sm text-ink/70">
            <li className="flex gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-pine" />
              Score <strong className="text-ink">80%+</strong> on a checkpoint &rarr; module is marked mastered and the next one unlocks immediately.
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
              Score <strong className="text-ink">50&ndash;79%</strong> &rarr; you pass and move on, but it&apos;s flagged for a later review.
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rust" />
              Score <strong className="text-ink">under 50%</strong> &rarr; a short reinforcement module branches off the trail before you retry.
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-ink/30" />
              Your diagnostic already skipped you past module{pathState.startIdx === 1 ? '' : 's'} you clearly know.
            </li>
          </ul>
        </div>
      </div>

      {selected && (
        <ModuleDrawer
          module={selected}
          onClose={() => setSelected(null)}
          onStartQuiz={(m) => setQuizModule(m)}
          onCompleteRemedial={handleCompleteRemedial}
        />
      )}

      {quizModule && (
        <QuizModal module={quizModule} onClose={() => setQuizModule(null)} onComplete={handleQuizComplete} />
      )}
    </div>
  )
}
