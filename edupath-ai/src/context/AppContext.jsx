import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { getDomain } from '../data/domains.js'
import { buildInitialPath, applyQuizResult, completeRemedialReview } from '../engine/pathEngine.js'
import { loadState, saveState, clearState } from '../utils/storage.js'

const AppStateContext = createContext(null)
const AppDispatchContext = createContext(null)

const initialState = {
  view: 'landing', // landing -> onboarding -> diagnostic -> dashboard
  profile: { name: '', domainId: null, weeklyHours: 5 },
  pathState: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload || state

    case 'GO_TO':
      return { ...state, view: action.view }

    case 'START_ONBOARDING':
      return { ...state, view: 'onboarding' }

    case 'SET_PROFILE': {
      return {
        ...state,
        profile: { ...state.profile, ...action.profile },
        view: 'diagnostic'
      }
    }

    case 'SUBMIT_DIAGNOSTIC': {
      const domain = getDomain(state.profile.domainId)
      const pathState = buildInitialPath({
        domain,
        diagnosticPercent: action.percent,
        weeklyHours: state.profile.weeklyHours
      })
      return { ...state, pathState, view: 'dashboard' }
    }

    case 'SUBMIT_MODULE_QUIZ': {
      const updated = applyQuizResult(state.pathState, action.moduleId, action.percent)
      return { ...state, pathState: updated }
    }

    case 'COMPLETE_REMEDIAL': {
      const updated = completeRemedialReview(state.pathState, action.remedialId)
      return { ...state, pathState: updated }
    }

    case 'RESET':
      clearState()
      return initialState

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const saved = loadState()
    if (saved) dispatch({ type: 'HYDRATE', payload: saved })
  }, [])

  useEffect(() => {
    saveState(state)
  }, [state])

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppProvider')
  return ctx
}

export function useAppDispatch() {
  const ctx = useContext(AppDispatchContext)
  if (!ctx) throw new Error('useAppDispatch must be used within AppProvider')
  return ctx
}
