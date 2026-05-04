const ErrorState = ({ message, onRetry }) => {
  return (
    <div className='rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200'>
      <p className='text-sm font-medium'>{message}</p>
      {onRetry ? (
        <button
          type='button'
          onClick={onRetry}
          className='mt-3 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500'
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}

export default ErrorState
