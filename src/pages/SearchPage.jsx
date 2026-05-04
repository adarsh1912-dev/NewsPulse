import { useCallback, useState } from 'react'
import NewsFeed from '../components/news/NewsFeed.jsx'
import SearchInput from '../components/news/SearchInput.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import useDebouncedValue from '../hooks/useDebouncedValue'
import usePaginatedNews from '../hooks/usePaginatedNews'
import { searchNews } from '../services/gnewsApi'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query.trim(), 500)
  const canSearch = debouncedQuery.length >= 2

  const requestPage = useCallback(
    ({ page, pageSize }) => {
      return searchNews({ query: debouncedQuery, page, max: pageSize })
    },
    [debouncedQuery],
  )

  const { articles, error, hasMore, isLoading, isLoadingMore, loadMore, retry } = usePaginatedNews({
    enabled: canSearch,
    requestKey: debouncedQuery,
    requestPage,
  })

  return (
    <section className='space-y-5'>
      <PageHeader
        title='Search News'
        description='Search is debounced before API requests to reduce unnecessary network calls while typing.'
      />

      <SearchInput value={query} onChange={setQuery} />

      {!canSearch ? (
        <EmptyState
          title='Start searching'
          description='Type at least 2 characters to fetch matching news articles.'
        />
      ) : (
        <NewsFeed
          articles={articles}
          error={error}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          onLoadMore={loadMore}
          onRetry={retry}
          emptyTitle='No search results'
          emptyDescription='Try a different keyword or phrase.'
        />
      )}
    </section>
  )
}

export default SearchPage
