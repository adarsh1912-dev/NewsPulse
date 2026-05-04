import useDarkMode from '../../hooks/useDarkMode'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useDarkMode()

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
      aria-label='Toggle color theme'
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}

export default ThemeToggle
