import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import EmptyState from '../components/ui/EmptyState.jsx'
import useBookmarks from '../hooks/useBookmarks'
import { getRememberedArticle, rememberArticle } from '../services/articleStorage'
import { formatPublishedDate } from '../services/dateFormat'
import { decodeArticleId } from '../services/articleIdentity'

const NewsDetailsPage = () => {
  const { articleId } = useParams()
  const location = useLocation()
  const { bookmarkedIds, getBookmarkedArticle, toggleBookmark } = useBookmarks()

  // Data resolution order:
  // 1) Route state (fast path from card click),
  // 2) bookmarks storage,
  // 3) recent-articles cache.
  const articleFromState = location.state?.article
  const article =
    articleFromState || getBookmarkedArticle(articleId) || getRememberedArticle(articleId)

  useEffect(() => {
    if (article) {
      rememberArticle(article)
    }
  }, [article])

  if (!article) {
    return (
      <section className='space-y-5'>
        <EmptyState
          title='Article data unavailable'
          description='Open the article from a news card so details can be resolved and cached for this route.'
        />
        <div className='flex justify-center'>
          <Link
            to='/'
            className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500'
          >
            Back to homepage
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='mx-auto max-w-4xl space-y-5'>
      <p className='text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300'>
        {article.sourceName} • {formatPublishedDate(article.publishedAt)}
      </p>

      <h1 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100'>
        {article.title}
      </h1>

      <img
        src={article.image || 'https://placehold.co/960x540?text=No+Image'}
        alt={article.title}
        className='w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-slate-800'
      />

      <p className='text-sm leading-7 text-slate-700 dark:text-slate-300'>
        {article.content || article.description || 'No detailed content available for this article.'}
      </p>

      <div className='flex flex-wrap items-center gap-3 text-sm'>
        <span className='font-medium text-slate-700 dark:text-slate-300'>
          Author: {article.author || 'Unknown'}
        </span>

        <button
          type='button'
          onClick={() => toggleBookmark(article)}
          className='rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300'
        >
          {bookmarkedIds.has(article.id) ? 'Remove Bookmark' : 'Bookmark'}
        </button>

        <a
          href={article.url || decodeArticleId(articleId)}
          target='_blank'
          rel='noreferrer'
          className='rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500'
        >
          Read from Source
        </a>
      </div>
    </section>
  )
}

export default NewsDetailsPage
