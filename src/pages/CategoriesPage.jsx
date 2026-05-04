import { Navigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'
import NewsFeed from '../components/news/NewsFeed.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { NEWS_CATEGORIES } from '../constants/categories'
import usePaginatedNews from '../hooks/usePaginatedNews'
import { fetchNewsByCategory } from '../services/gnewsApi'

const CategoriesPage = () => {
  const { category } = useParams()
  const activeCategory = NEWS_CATEGORIES.find((item) => item.value === category)
  const categoryValue = activeCategory?.value ?? 'business'

  const requestPage = useCallback(
    ({ page, pageSize }) => {
      // Route param is the data source key for this page.
      return fetchNewsByCategory({ category: categoryValue, page, max: pageSize })
    },
    [categoryValue],
  )

  const { articles, error, hasMore, isLoading, isLoadingMore, loadMore, retry } = usePaginatedNews({
    enabled: Boolean(activeCategory),
    requestKey: categoryValue,
    requestPage,
  })

  // Guard route integrity so invalid URLs are redirected to a valid category page.
  if (!activeCategory) {
    return <Navigate to='/categories/business' replace />
  }

  return (
    <section className='space-y-5'>
      <PageHeader
        title={`${activeCategory.label} News`}
        description='Category feed is driven by URL state so users can share direct links to filtered content.'
      />

      <NewsFeed
        articles={articles}
        error={error}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onRetry={retry}
        emptyTitle='No category articles found'
        emptyDescription='Try another category from the navbar.'
      />
    </section>
  )
}

export default CategoriesPage
