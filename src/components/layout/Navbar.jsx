import { NavLink } from 'react-router-dom'
import { NEWS_CATEGORIES } from '../../constants/categories'
import ThemeToggle from '../ui/ThemeToggle.jsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Search', to: '/search' },
  { label: 'Bookmarks', to: '/bookmarks' },
]

const getNavItemClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-600 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
  }`

const Navbar = () => {
  return (
    <header className='sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90'>
      <nav className='mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <NavLink
            to='/'
            className='text-lg font-bold tracking-tight text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
          >
            NewsPulse
          </NavLink>

          <div className='flex items-center gap-2'>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={getNavItemClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
        </div>

        {/*
          Category strip gives one-click filtering entry points.
          Links target the category route so CategoriesPage can read :category from URL and fetch data.
        */}
        <div className='flex flex-wrap items-center gap-2'>
          {NEWS_CATEGORIES.map((category) => (
            <NavLink
              key={category.value}
              to={`/categories/${category.value}`}
              className={({ isActive }) =>
                `rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/70 dark:text-indigo-300'
                    : 'border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300'
                }`
              }
            >
              {category.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
