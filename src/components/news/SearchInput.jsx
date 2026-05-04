const SearchInput = ({ value, onChange }) => {
  return (
    <label className='block'>
      <span className='mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300'>Keyword</span>
      <input
        type='search'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Search by keyword...'
        className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-900'
      />
    </label>
  )
}

export default SearchInput
