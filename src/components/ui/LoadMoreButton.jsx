const LoadMoreButton = ({ isLoading, onClick }) => {
  return (
    <div className='flex justify-center'>
      <button
        type='button'
        onClick={onClick}
        disabled={isLoading}
        className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70'
      >
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  )
}

export default LoadMoreButton
