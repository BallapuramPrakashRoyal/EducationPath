import React from 'react'
import { X, Clock, Gauge, BookOpen, Lock, CheckCircle2, PlayCircle } from 'lucide-react'

const STATUS_LABEL = {
  locked: 'Locked',
  available: 'Ready to start',
  mastered: 'Mastered',
  'skipped-mastered': 'Skipped \u2014 diagnostic showed mastery',
  completed: 'Completed \u2014 review recommended',
  'retry-recommended': 'Retry recommended'
}

export default function ModuleDrawer({ module, onClose, onStartQuiz, onCompleteRemedial }) {
  if (!module) return null
  const locked = module.status === 'locked'

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="h-full w-full max-w-md overflow-y-auto bg-paper p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            {module.isRemedial && (
              <span className="mb-1.5 inline-block rounded-full bg-amber/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-dark">
                Reinforcement module
              </span>
            )}
            <h2 className="font-display text-2xl font-semibold leading-tight text-ink">{module.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-ink/50 hover:bg-ink/5 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <span
          className={`mt-3 inline-block rounded-full px-3 py-1 font-mono text-[11px] ${
            module.status === 'locked'
              ? 'bg-ink/10 text-ink/50'
              : module.status.includes('mastered')
              ? 'bg-pine/15 text-pine-dark'
              : module.status === 'retry-recommended'
              ? 'bg-rust/15 text-rust'
              : 'bg-amber/20 text-amber-dark'
          }`}
        >
          {STATUS_LABEL[module.status]}
        </span>

        <div className="mt-5 flex gap-4 font-mono text-xs text-ink/55">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {module.hours}h est.
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge size={14} /> Difficulty {module.difficulty}/5
          </span>
          {typeof module.quizScore === 'number' && (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Last score {module.quizScore}%
            </span>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink/45">Topics covered</h3>
          <ul className="mt-2 space-y-1.5">
            {module.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pine" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink/45">
            <BookOpen size={13} /> Curated resources
          </h3>
          <ul className="mt-2 space-y-2">
            {module.resources.map((r, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border border-ink/10 bg-white/50 px-3 py-2 text-sm">
                <span className="text-ink/85">{r.title}</span>
                <span className="font-mono text-[10px] uppercase text-ink/40">{r.type}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          {locked && (
            <div className="flex items-center gap-2 rounded-xl bg-ink/5 px-4 py-3 text-sm text-ink/50">
              <Lock size={16} /> Complete the module before this to unlock.
            </div>
          )}

          {!locked && module.isRemedial && module.status === 'available' && (
            <button
              onClick={() => onCompleteRemedial(module.id)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper transition hover:bg-pine"
            >
              <CheckCircle2 size={18} /> Mark reviewed &amp; unlock retry
            </button>
          )}

          {!locked && !module.isRemedial && module.status === 'available' && (
            <button
              onClick={() => onStartQuiz(module)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper transition hover:bg-pine"
            >
              <PlayCircle size={18} /> Start checkpoint quiz
            </button>
          )}

          {!locked && module.status === 'retry-recommended' && (
            <p className="rounded-xl bg-rust/10 px-4 py-3 text-sm text-rust">
              Clear the reinforcement module on the trail to retry this quiz.
            </p>
          )}

          {['mastered', 'completed', 'skipped-mastered'].includes(module.status) && (
            <button
              onClick={() => onStartQuiz(module)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-semibold text-ink transition hover:border-pine hover:text-pine"
            >
              Retake quiz
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
