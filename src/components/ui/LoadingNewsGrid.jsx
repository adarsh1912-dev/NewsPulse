const LoadingNewsGrid = ({ count = 6 }) => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900'
        >
          <div className='h-44 animate-pulse bg-slate-200 dark:bg-slate-800' />
          <div className='space-y-3 p-4'>
            <div className='h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800' />
            <div className='h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800' />
            <div className='h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800' />
          </div>
        </article>
      ))}
    </div>
  )
}

export default LoadingNewsGrid
