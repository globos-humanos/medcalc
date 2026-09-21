import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)

function getStoredValue(key, fallback) {
  try {
    const stored = localStorage.getItem(key)

    return stored
      ? JSON.parse(stored)
      : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {

  const [favorites, setFavorites] = useState(() =>
    getStoredValue('medcalc-favorites', [])
  )

  const [recent, setRecent] = useState(() =>
    getStoredValue('medcalc-recent', [])
  )

  const [theme, setTheme] = useState(() =>
    localStorage.getItem('medcalc-theme') || 'light'
  )

  useEffect(() => {
    localStorage.setItem(
      'medcalc-favorites',
      JSON.stringify(favorites)
    )
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(
      'medcalc-recent',
      JSON.stringify(recent)
    )
  }, [recent])

  useEffect(() => {
    localStorage.setItem(
      'medcalc-theme',
      theme
    )

    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleFavorite(calculatorId) {

    setFavorites(previous => {

      if (previous.includes(calculatorId)) {
        return previous.filter(
          id => id !== calculatorId
        )
      }

      return [
        ...previous,
        calculatorId
      ]
    })
  }

  function isFavorite(calculatorId) {
    return favorites.includes(calculatorId)
  }

  function addToRecent(calculatorId) {

    setRecent(previous => {

      const filtered = previous.filter(
        id => id !== calculatorId
      )

      return [
        calculatorId,
        ...filtered
      ].slice(0, 10)
    })
  }

  function clearRecent() {
    setRecent([])
  }

  function toggleTheme() {
    setTheme(previous =>
      previous === 'light'
        ? 'dark'
        : 'light'
    )
  }

  return (
    <AppContext.Provider
      value={{
        favorites,
        recent,
        theme,
        toggleFavorite,
        isFavorite,
        addToRecent,
        clearRecent,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}