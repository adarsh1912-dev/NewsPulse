import NewsCard from './NewsCard.jsx'

const NewsGrid = ({ articles, onBookmarkToggle, bookmarkedIds = new Set() }) => {
  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onBookmarkToggle={onBookmarkToggle}
          isBookmarked={bookmarkedIds.has(article.id)}
        />
      ))}
    </section>
  )
}

export default NewsGrid
