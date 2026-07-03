// EduPath AI — Adaptive Path Engine
//
// This is a deterministic, explainable "rules engine" that mimics what an
// AI tutor would do: place the learner on the trail using a diagnostic
// quiz, then adapt (skip / reinforce / insert remedial content) based on
// how each module quiz goes. Every decision below is documented so it can
// be explained live in a hackathon demo.

/** Score a diagnostic (or module) quiz given selected answer indices. */
export function scoreQuiz(questions, selectedAnswers) {
  const total = questions.length
  let correct = 0
  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.answer) correct += 1
  })
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)
  return { correct, total, percent }
}

/** Map a diagnostic score to a friendly level label. */
export function levelFromScore(percent) {
  if (percent < 35) return 'Beginner'
  if (percent < 70) return 'Intermediate'
  return 'Advanced'
}

/**
 * Decide which module index a learner should start on, based on their
 * diagnostic score. Higher scores place learners further along the trail
 * so they don't repeat what they already know.
 */
export function placementIndex(moduleCount, diagnosticPercent) {
  const thresholds = [30, 48, 65, 82] // score cutoffs -> start index bumps
  let idx = 0
  thresholds.forEach((t) => {
    if (diagnosticPercent >= t) idx += 1
  })
  return Math.min(idx, Math.max(moduleCount - 2, 0))
}

/**
 * Estimate pacing: how many weeks a module will take given the learner's
 * committed weekly study hours.
 */
export function weeksForModule(hours, weeklyHours) {
  const safeWeekly = Math.max(weeklyHours, 1)
  return Math.max(1, Math.round((hours / safeWeekly) * 10) / 10)
}

/** Build the initial adaptive path state after onboarding + diagnostic. */
export function buildInitialPath({ domain, diagnosticPercent, weeklyHours }) {
  const startIdx = placementIndex(domain.modules.length, diagnosticPercent)
  const modules = domain.modules.map((m, i) => {
    let status = 'locked'
    if (i < startIdx) status = 'skipped-mastered'
    else if (i === startIdx) status = 'available'
    return {
      ...m,
      status,
      quizScore: null,
      attempts: 0,
      needsReview: false,
      isRemedial: false
    }
  })

  return {
    domainId: domain.id,
    domainTitle: domain.title,
    weeklyHours,
    diagnosticPercent,
    level: levelFromScore(diagnosticPercent),
    startIdx,
    xp: startIdx * 40, // credit for diagnostic-verified mastery
    streak: 0,
    lastActivity: null,
    modules
  }
}

/** Build a lightweight remedial module inserted after a failed quiz. */
function buildRemedialModule(sourceModule) {
  return {
    id: `${sourceModule.id}-remedial-${Date.now()}`,
    title: `Reinforce: ${sourceModule.title}`,
    hours: Math.max(2, Math.round(sourceModule.hours * 0.3)),
    difficulty: Math.max(1, sourceModule.difficulty - 1),
    topics: sourceModule.topics,
    resources: sourceModule.resources,
    quiz: sourceModule.quiz,
    status: 'available',
    quizScore: null,
    attempts: 0,
    needsReview: false,
    isRemedial: true,
    remedialOf: sourceModule.id
  }
}

/**
 * Core adaptive rule: apply a module quiz result to the path.
 *
 *  score >= 80  -> mastered. Unlock next module. Big XP.
 *  50-79        -> passed but flagged for review. Unlock next, attach
 *                  extra resources, smaller XP.
 *  < 50         -> not yet. Insert a short remedial module immediately
 *                  after this one and keep the next module locked until
 *                  the learner clears the remedial + retakes the quiz.
 */
export function applyQuizResult(pathState, moduleId, percent) {
  const modules = [...pathState.modules]
  const idx = modules.findIndex((m) => m.id === moduleId)
  if (idx === -1) return pathState

  const current = { ...modules[idx], quizScore: percent, attempts: modules[idx].attempts + 1 }
  let xpGain = 0
  let insertRemedial = false

  if (percent >= 80) {
    current.status = 'mastered'
    current.needsReview = false
    xpGain = 100 + Math.round(percent - 80)
  } else if (percent >= 50) {
    current.status = 'completed'
    current.needsReview = true
    xpGain = 60
  } else {
    current.status = current.isRemedial ? 'completed' : 'retry-recommended'
    current.needsReview = true
    xpGain = 20
    insertRemedial = !current.isRemedial
  }

  modules[idx] = current

  if (insertRemedial) {
    const remedial = buildRemedialModule(current)
    modules.splice(idx + 1, 0, remedial)
  } else {
    // Unlock the next module in the trail — skip past any remedial
    // side-modules that may sit between this module and the next main one.
    let next = idx + 1
    while (next < modules.length && modules[next].isRemedial) next += 1
    if (next < modules.length && modules[next].status === 'locked') {
      modules[next] = { ...modules[next], status: 'available' }
    }
  }

  return {
    ...pathState,
    modules,
    xp: pathState.xp + xpGain,
    lastActivity: new Date().toISOString()
  }
}

/** Mark a remedial module as reviewed (no quiz gate) and unlock the retry. */
export function completeRemedialReview(pathState, remedialId) {
  const modules = [...pathState.modules]
  const idx = modules.findIndex((m) => m.id === remedialId)
  if (idx === -1) return pathState
  modules[idx] = { ...modules[idx], status: 'completed' }

  // Unlock the original module again for a retry.
  const sourceId = modules[idx].remedialOf
  const sourceIdx = modules.findIndex((m) => m.id === sourceId)
  if (sourceIdx !== -1) {
    modules[sourceIdx] = { ...modules[sourceIdx], status: 'available' }
  }

  return { ...pathState, modules, xp: pathState.xp + 15, lastActivity: new Date().toISOString() }
}

/** Aggregate stats for the dashboard. */
export function computeStats(pathState) {
  const modules = pathState.modules
  const total = modules.length
  const mastered = modules.filter((m) => m.status === 'mastered' || m.status === 'skipped-mastered').length
  const completed = modules.filter((m) =>
    ['mastered', 'completed', 'skipped-mastered'].includes(m.status)
  ).length
  const needsReview = modules.filter((m) => m.needsReview).length
  const scored = modules.filter((m) => typeof m.quizScore === 'number')
  const avgScore = scored.length
    ? Math.round(scored.reduce((s, m) => s + m.quizScore, 0) / scored.length)
    : null
  const totalHours = modules.reduce((s, m) => s + m.hours, 0)
  const hoursDone = modules
    .filter((m) => ['mastered', 'completed', 'skipped-mastered'].includes(m.status))
    .reduce((s, m) => s + m.hours, 0)

  return {
    total,
    mastered,
    completed,
    needsReview,
    avgScore,
    percentComplete: total ? Math.round((completed / total) * 100) : 0,
    totalHours,
    hoursDone,
    weeksRemaining: Math.max(0, Math.round(((totalHours - hoursDone) / Math.max(pathState.weeklyHours, 1)) * 10) / 10)
  }
}

/** Find the single next best action to show on the dashboard. */
export function nextAction(pathState) {
  const modules = pathState.modules
  const retry = modules.find((m) => m.status === 'retry-recommended')
  if (retry) {
    const remedial = modules.find((m) => m.remedialOf === retry.id && m.status === 'available')
    if (remedial) return { type: 'remedial', module: remedial, note: `Reinforce the basics before retrying "${retry.title}".` }
  }
  const available = modules.find((m) => m.status === 'available')
  if (available) return { type: 'module', module: available, note: available.isRemedial ? 'Quick reinforcement module.' : 'Next module on your trail.' }
  const review = modules.find((m) => m.needsReview && m.status === 'completed')
  if (review) return { type: 'review', module: review, note: 'Solid pass — a quick review would push this to mastered.' }
  return { type: 'done', module: null, note: 'You\u2019ve cleared every module on this trail. Nice work.' }
}
