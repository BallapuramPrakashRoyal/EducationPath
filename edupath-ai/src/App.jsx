import React from 'react'
import Header from './components/Header.jsx'
import Landing from './components/Landing.jsx'
import Onboarding from './components/Onboarding.jsx'
import DiagnosticQuiz from './components/DiagnosticQuiz.jsx'
import Dashboard from './components/Dashboard.jsx'
import { useAppState } from './context/AppContext.jsx'

export default function App() {
  const { view } = useAppState()

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      {view === 'landing' && <Landing />}
      {view === 'onboarding' && <Onboarding />}
      {view === 'diagnostic' && <DiagnosticQuiz />}
      {view === 'dashboard' && <Dashboard />}
    </div>
  )
}
