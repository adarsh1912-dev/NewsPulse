import { Link } from 'react-router-dom'
import { formatPublishedDate } from '../../services/dateFormat'

const NewsCard = ({ article, onBookmarkToggle, isBookmarked = false }) => {
  return (
    <article className='group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900'>
      <Link to={`/article/${article.id}`} state={{ article }}>
        <img
          src={article.image || 'https://placehold.co/640x360?text=No+Image'}
          alt={article.title}
          className='h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]'
          loading='lazy'
        />
      </Link>

      <div className='space-y-3 p-4'>
        <div className='flex items-center justify-between gap-2'>
          <p className='text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300'>
            {article.sourceName}
          </p>
          <p className='text-xs text-slate-500 dark:text-slate-400'>
            {formatPublishedDate(article.publishedAt)}
          </p>
        </div>

        <Link to={`/article/${article.id}`} state={{ article }}>
          <h2 className='line-clamp-2 text-base font-semibold text-slate-900 transition group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-300'>
            {article.title}
          </h2>
        </Link>

        <p className='line-clamp-3 text-sm text-slate-600 dark:text-slate-300'>
          {article.description || 'No description available.'}
        </p>

        {onBookmarkToggle ? (
          <button
            type='button'
            onClick={() => onBookmarkToggle(article)}
            className='rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300'
          >
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default NewsCard
