import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const Layout = () => {
  return (
    <div className='min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100'>
      <Navbar />
      <main className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        {/*
          Outlet renders the active page route.
          Data-fetching logic will live in page components/hooks, while Layout keeps chrome reusable.
        */}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
