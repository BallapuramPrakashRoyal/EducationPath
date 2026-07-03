# EduPath AI

**Solo-built AI-driven personalized learning-path tool — TenzorX 2026 National AI Hackathon (Poonawalla Fincorp / Unstop)**

EduPath AI turns any skill goal into a personalized learning trail. A short diagnostic quiz places you at the right starting point, and every checkpoint quiz you take reshapes what comes next — skipping what you already know, and branching off a short reinforcement module whenever you're not quite ready to move on.

The "AI" here is a transparent, explainable **rules engine** rather than a black-box model call — which means it works completely offline, needs no API key, and every decision it makes can be explained live in a demo (see "How the adaptive engine works" below).

## Features

- **Diagnostic placement** — a domain-specific quiz places the learner on the trail instead of always starting at module 1.
- **Adaptive checkpoints** — every module ends in a short quiz that:
  - **≥80%** → marks the module mastered, unlocks the next one, awards bonus XP.
  - **50–79%** → passes the learner but flags the module for review.
  - **<50%** → inserts a short remedial "reinforcement" module that branches visibly off the main trail before the learner can retry.
- **Trail visualization** — the roadmap renders as an actual winding path with waypoint nodes (the signature visual), not a generic vertical list.
- **Dashboard** — progress %, mastery count, modules flagged for review, and an estimated time-to-finish based on the learner's weekly study hours.
- **Persistence** — progress is saved to `localStorage`, so refreshing the browser doesn't lose your trail.
- **4 ready-made domains** — Web Development, Data Science & AI, Cybersecurity, and Cloud & DevOps — each with 7 modules, curated resource pointers, and full diagnostic + checkpoint quiz banks.

## Tech stack

- React 18 + Vite
- Tailwind CSS (custom "trail map" design tokens — see `tailwind.config.js`)
- lucide-react icons
- No backend, no external API calls — 100% client-side

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/domains.js        Domain content: modules, topics, resources, quizzes, diagnostics
  engine/pathEngine.js    The adaptive rules engine (placement, scoring, unlocking, remediation)
  context/AppContext.jsx  Global state (React Context + useReducer), persisted to localStorage
  utils/storage.js        localStorage read/write/clear helpers
  components/
    Landing.jsx           Hero + trail teaser visual
    Onboarding.jsx         Domain + weekly-hours intake
    DiagnosticQuiz.jsx     Placement quiz
    Dashboard.jsx           Stats, trail visualization, "recommended next" panel
    RoadmapPath.jsx        The winding-trail SVG visualization (signature element)
    ModuleDrawer.jsx       Slide-over panel with module detail + actions
    QuizModal.jsx           Checkpoint quiz UI with instant adaptive feedback
    Header.jsx / StatCard.jsx
```

## How the adaptive engine works

All logic lives in `src/engine/pathEngine.js` and is fully documented inline:

1. `scoreQuiz()` grades a set of answers against a question bank.
2. `placementIndex()` maps a diagnostic score to a starting module index — higher scores start further along the trail.
3. `buildInitialPath()` builds the learner's module list: earlier modules are marked `skipped-mastered`, the placement module is `available`, everything else is `locked`.
4. `applyQuizResult()` is the core adaptive rule: it updates module status, awards XP, and either unlocks the next module or inserts a remedial module that branches off the trail.
5. `computeStats()` and `nextAction()` power the dashboard's progress numbers and "what should I do next" suggestion.

Because every rule is a plain, readable function (no external model call), the whole adaptive flow can be stepped through and explained live to hackathon judges.

## Extending it

- **Add a new domain**: append an object to `DOMAINS` in `src/data/domains.js` following the existing shape (`diagnostic`, `modules[].topics/resources/quiz`).
- **Swap in a live LLM**: the engine is intentionally decoupled from the UI — a `generatePathWithAI()` function could replace/augment `buildInitialPath()` and call the Anthropic API (or any LLM) to generate modules dynamically, while keeping the same adaptive quiz-scoring rules.
- **Add real accounts**: `utils/storage.js` is the only place that touches persistence — swapping `localStorage` for a backend call is a small, isolated change.

## Design notes

The visual identity leans into the "trail map" metaphor literally: the roadmap is a winding path with waypoint nodes, remedial modules branch off it visibly (dashed amber connector), and the palette (deep pine green, warm amber, muted paper) avoids typical AI-generated defaults in favor of something that reads like a hiking/wayfinding map — fitting for a *learning path* product.
