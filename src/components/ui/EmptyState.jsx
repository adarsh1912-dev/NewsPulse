const EmptyState = ({ title, description }) => {
  return (
    <div className='rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900'>
      <h2 className='text-lg font-semibold text-slate-900 dark:text-slate-100'>{title}</h2>
      <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>{description}</p>
    </div>
  )
}

export default EmptyState
