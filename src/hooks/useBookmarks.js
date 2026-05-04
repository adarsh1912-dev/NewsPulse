import { useMemo, useState } from 'react'

const BOOKMARKS_STORAGE_KEY = 'news-app-bookmarks'

const readBookmarks = () => {
  const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to parse bookmarks from localStorage:', error)
    return []
  }
}

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(readBookmarks)

  const bookmarkedIds = useMemo(
    () => new Set(bookmarks.map((article) => article.id)),
    [bookmarks],
  )

  const toggleBookmark = (article) => {
    setBookmarks((currentBookmarks) => {
      const exists = currentBookmarks.some((item) => item.id === article.id)
      const nextBookmarks = exists
        ? currentBookmarks.filter((item) => item.id !== article.id)
        : [article, ...currentBookmarks]

      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(nextBookmarks))
      return nextBookmarks
    })
  }

  const getBookmarkedArticle = (articleId) => {
    return bookmarks.find((article) => article.id === articleId)
  }

  return {
    bookmarkedIds,
    bookmarks,
    getBookmarkedArticle,
    toggleBookmark,
  }
}

export default useBookmarks
