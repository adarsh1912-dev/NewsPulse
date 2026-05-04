import { useEffect, useState } from 'react'

const STORAGE_KEY = 'news-app-theme'

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEY)

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const useDarkMode = () => {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    // Tailwind's dark mode styles are toggled via the root html class.
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [isDark, theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return { isDark, theme, toggleTheme }
}

export default useDarkMode
