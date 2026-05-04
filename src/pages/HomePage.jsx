import { useCallback } from 'react'
import NewsFeed from '../components/news/NewsFeed.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import usePaginatedNews from '../hooks/usePaginatedNews'
import { fetchTopHeadlines } from '../services/gnewsApi'

const HomePage = () => {
  const requestPage = useCallback(({ page, pageSize }) => {
    return fetchTopHeadlines({ page, max: pageSize })
  }, [])

  const { articles, error, hasMore, isLoading, isLoadingMore, loadMore, retry } = usePaginatedNews({
    requestKey: 'home-headlines',
    requestPage,
  })

  return (
    <section className='space-y-5'>
      <PageHeader
        title='Top Headlines'
        description='Live top headlines fetched from GNews, rendered as reusable cards with bookmark support and pagination.'
      />

      <NewsFeed
        articles={articles}
        error={error}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onRetry={retry}
        emptyTitle='No headlines available'
        emptyDescription='Please try again in a few moments.'
      />
    </section>
  )
}

export default HomePage
