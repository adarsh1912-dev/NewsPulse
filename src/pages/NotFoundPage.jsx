import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900'>
      <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Page not found</h1>
      <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
        The page you are looking for does not exist.
      </p>
      <Link
        to='/'
        className='mt-4 inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500'
      >
        Back to homepage
      </Link>
    </section>
  )
}

export default NotFoundPage
