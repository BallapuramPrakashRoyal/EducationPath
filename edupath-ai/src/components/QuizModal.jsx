import React, { useState } from 'react'
import { X, ArrowRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { scoreQuiz } from '../engine/pathEngine.js'

export default function QuizModal({ module, onClose, onComplete }) {
  const [answers, setAnswers] = useState(Array(module.quiz.length).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const allAnswered = answers.every((a) => a !== null)

  function select(qIdx, optIdx) {
    if (submitted) return
    const next = [...answers]
    next[qIdx] = optIdx
    setAnswers(next)
  }

  function handleSubmit() {
    setResult(scoreQuiz(module.quiz, answers))
    setSubmitted(true)
  }

  const tier = result ? (result.percent >= 80 ? 'mastered' : result.percent >= 50 ? 'review' : 'retry') : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-pine">Checkpoint quiz</p>
            <h2 className="font-display text-2xl font-semibold text-ink">{module.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-ink/50 hover:bg-ink/5 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {module.quiz.map((q, qIdx) => (
            <div key={qIdx} className="rounded-xl border border-ink/10 bg-white/50 p-4">
              <p className="text-sm font-medium text-ink">
                <span className="mr-2 font-mono text-xs text-ink/40">{qIdx + 1}.</span>
                {q.q}
              </p>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, optIdx) => {
                  const selected = answers[qIdx] === optIdx
                  const isCorrect = optIdx === q.answer
                  let style = 'border-ink/15 hover:border-pine/50'
                  if (submitted && isCorrect) style = 'border-pine bg-pine/10'
                  else if (submitted && selected && !isCorrect) style = 'border-rust bg-rust/10'
                  else if (!submitted && selected) style = 'border-pine bg-pine/5 ring-1 ring-pine'
                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => select(qIdx, optIdx)}
                      className={`rounded-lg border px-3.5 py-2 text-left text-sm text-ink transition ${style}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <p className="mt-3 flex items-start gap-1.5 text-xs text-ink/55">
                  <span className="font-mono text-pine">note:</span> {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper transition enabled:hover:bg-pine disabled:cursor-not-allowed disabled:opacity-30"
          >
            Submit answers
          </button>
        ) : (
          <div
            className={`mt-6 rounded-2xl border p-5 ${
              tier === 'mastered'
                ? 'border-pine/40 bg-pine/10'
                : tier === 'review'
                ? 'border-amber/40 bg-amber/10'
                : 'border-rust/40 bg-rust/10'
            }`}
          >
            <div className="flex items-center gap-3">
              {tier === 'mastered' && <CheckCircle2 className="text-pine" size={26} />}
              {tier === 'review' && <AlertTriangle className="text-amber-dark" size={26} />}
              {tier === 'retry' && <XCircle className="text-rust" size={26} />}
              <div>
                <p className="font-display text-lg font-semibold text-ink">
                  {result.correct}/{result.total} correct &mdash; {result.percent}%
                </p>
                <p className="text-sm text-ink/65">
                  {tier === 'mastered' && 'Mastered. Next module on your trail is now unlocked.'}
                  {tier === 'review' && 'Solid pass, marked for a quick review later. Next module unlocked.'}
                  {tier === 'retry' &&
                    (module.isRemedial
                      ? 'Still tricky \u2014 review the resources and continue at your own pace.'
                      : 'Not quite yet. We\u2019ve added a short reinforcement module before you retry.')}
                </p>
              </div>
            </div>
            <button
              onClick={() => onComplete(result.percent)}
              className="mt-4 flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-pine"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
