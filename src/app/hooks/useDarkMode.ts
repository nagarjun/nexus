'use client'

import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check initial dark mode preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(darkModeMediaQuery.matches)
    document.body.classList.toggle('dark', darkModeMediaQuery.matches)

    // Listen for changes in system dark mode preference
    const listener = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
      document.body.classList.toggle('dark', e.matches)
    }
    darkModeMediaQuery.addEventListener('change', listener)

    return () => {
      darkModeMediaQuery.removeEventListener('change', listener)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark')
  }

  return { isDarkMode, toggleDarkMode }
}
