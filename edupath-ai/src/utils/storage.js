const KEY = 'edupath-ai:v1'

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.warn('EduPath AI: failed to load saved progress', e)
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('EduPath AI: failed to save progress', e)
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY)
  } catch (e) {
    console.warn('EduPath AI: failed to clear progress', e)
  }
}
