import NewsGrid from '../components/news/NewsGrid.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import useBookmarks from '../hooks/useBookmarks'

const BookmarksPage = () => {
  const { bookmarkedIds, bookmarks, toggleBookmark } = useBookmarks()

  return (
    <section className='space-y-5'>
      <PageHeader
        title='Bookmarked Articles'
        description='Bookmarks are persisted in localStorage so users keep saved articles across page refreshes.'
      />

      {!bookmarks.length ? (
        <EmptyState
          title='No bookmarks yet'
          description='Save an article from the homepage, categories, or search results to see it here.'
        />
      ) : (
        <NewsGrid
          articles={bookmarks}
          onBookmarkToggle={toggleBookmark}
          bookmarkedIds={bookmarkedIds}
        />
      )}
    </section>
  )
}

export default BookmarksPage
