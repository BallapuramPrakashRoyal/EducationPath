import React, { useState } from 'react'
import { ArrowRight, MapPinned } from 'lucide-react'
import { getDomain } from '../data/domains.js'
import { scoreQuiz } from '../engine/pathEngine.js'
import { useAppState, useAppDispatch } from '../context/AppContext.jsx'

export default function DiagnosticQuiz() {
  const { profile } = useAppState()
  const dispatch = useAppDispatch()
  const domain = getDomain(profile.domainId)
  const [answers, setAnswers] = useState(Array(domain.diagnostic.length).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)

  const allAnswered = answers.every((a) => a !== null)

  function selectAnswer(qIdx, optIdx) {
    if (submitted) return
    const next = [...answers]
    next[qIdx] = optIdx
    setAnswers(next)
  }

  function handleSubmit() {
    const res = scoreQuiz(domain.diagnostic, answers)
    setResult(res)
    setSubmitted(true)
  }

  function handleContinue() {
    dispatch({ type: 'SUBMIT_DIAGNOSTIC', percent: result.percent })
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-wider text-pine">Step 2 of 2</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
        Quick placement check
      </h1>
      <p className="mt-3 text-ink/60">
        {domain.diagnostic.length} questions on {domain.title}. Answer honestly &mdash; this only
        decides your starting point, and every wrong answer here just means we cover it properly.
      </p>

      <div className="mt-8 space-y-6">
        {domain.diagnostic.map((q, qIdx) => (
          <div key={qIdx} className="rounded-2xl border border-ink/10 bg-white/40 p-5">
            <p className="font-medium text-ink">
              <span className="mr-2 font-mono text-xs text-ink/40">{String(qIdx + 1).padStart(2, '0')}</span>
              {q.q}
            </p>
            <div className="mt-4 grid gap-2">
              {q.options.map((opt, optIdx) => {
                const selected = answers[qIdx] === optIdx
                const showCorrectness = submitted
                const isCorrect = optIdx === q.answer
                let style = 'border-ink/15 hover:border-pine/50'
                if (showCorrectness && isCorrect) style = 'border-pine bg-pine/10'
                else if (showCorrectness && selected && !isCorrect) style = 'border-rust bg-rust/10'
                else if (!showCorrectness && selected) style = 'border-pine bg-pine/5 ring-1 ring-pine'

                return (
                  <button
                    key={optIdx}
                    onClick={() => selectAnswer(qIdx, optIdx)}
                    disabled={submitted}
                    className={`rounded-lg border px-4 py-2.5 text-left text-sm text-ink transition ${style} ${
                      submitted ? 'cursor-default' : ''
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          disabled={!allAnswered}
          onClick={handleSubmit}
          className="mt-8 flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition enabled:hover:bg-pine disabled:cursor-not-allowed disabled:opacity-30"
        >
          See my placement
          <ArrowRight size={18} />
        </button>
      ) : (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-amber/40 bg-amber/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber text-ink">
              <MapPinned size={20} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                {result.correct}/{result.total} correct &mdash; {result.percent}%
              </p>
              <p className="text-sm text-ink/60">We&rsquo;ll place you on the trail accordingly.</p>
            </div>
          </div>
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-paper transition hover:bg-pine"
          >
            Build my trail
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
