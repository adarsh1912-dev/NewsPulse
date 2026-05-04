const PageHeader = ({ title, description }) => {
  return (
    <header className='space-y-2'>
      <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>{title}</h1>
      <p className='max-w-3xl text-sm text-slate-600 dark:text-slate-300'>{description}</p>
    </header>
  )
}

export default PageHeader
