import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const INITIAL_PAGE = 1

const usePaginatedNews = ({ enabled = true, pageSize = 10, requestKey, requestPage }) => {
  const [articles, setArticles] = useState([])
  const [totalArticles, setTotalArticles] = useState(0)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const requestSequenceRef = useRef(0)

  const hasMore = useMemo(() => articles.length < totalArticles, [articles.length, totalArticles])

  const loadPage = useCallback(
    async (nextPage, mode = 'replace') => {
      if (!enabled) {
        return
      }

      const isLoadMore = mode === 'append'
      const requestId = requestSequenceRef.current + 1
      requestSequenceRef.current = requestId

      if (isLoadMore) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }

      try {
        setError('')
        const response = await requestPage({
          page: nextPage,
          pageSize,
        })

        // Ignore stale responses from older requests (fast typing / quick route switches).
        if (requestId !== requestSequenceRef.current) {
          return
        }

        setTotalArticles(response.totalArticles)
        setPage(nextPage)
        setArticles((currentArticles) =>
          mode === 'append' ? [...currentArticles, ...response.articles] : response.articles,
        )
      } catch (requestError) {
        if (requestId !== requestSequenceRef.current) {
          return
        }
        setError(requestError.message || 'Unable to fetch news right now.')
      } finally {
        if (requestId === requestSequenceRef.current) {
          setIsLoading(false)
          setIsLoadingMore(false)
        }
      }
    },
    [enabled, pageSize, requestPage],
  )

  useEffect(() => {
    if (!enabled) {
      return
    }

    // requestKey is the cache-busting trigger: category or debounced search term.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPage(INITIAL_PAGE, 'replace')
  }, [enabled, loadPage, requestKey])

  const loadMore = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore) {
      void loadPage(page + 1, 'append')
    }
  }, [hasMore, isLoading, isLoadingMore, loadPage, page])

  const retry = useCallback(() => {
    if (!enabled) {
      return
    }
    void loadPage(INITIAL_PAGE, 'replace')
  }, [enabled, loadPage])

  return {
    articles,
    error,
    hasMore,
    isLoading,
    isLoadingMore,
    loadMore,
    retry,
  }
}

export default usePaginatedNews
