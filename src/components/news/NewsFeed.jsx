import { useEffect } from "react";
import useBookmarks from "../../hooks/useBookmarks";
import {
  rememberArticle,
  rememberArticles,
} from "../../services/articleStorage";
import EmptyState from "../ui/EmptyState.jsx";
import ErrorState from "../ui/ErrorState.jsx";
import LoadMoreButton from "../ui/LoadMoreButton.jsx";
import LoadingNewsGrid from "../ui/LoadingNewsGrid.jsx";
import NewsGrid from "./NewsGrid.jsx";

const NewsFeed = ({
  articles,
  error,
  isLoading,
  isLoadingMore,
  hasMore,
  onLoadMore,
  onRetry,
  emptyTitle,
  emptyDescription,
}) => {
  const { bookmarkedIds, toggleBookmark } = useBookmarks();

  const handleBookmarkToggle = (article) => {
    // Keep recent list updated so details page can recover article context on refresh.
    rememberArticle(article);
    toggleBookmark(article);
  };

  useEffect(() => {
    // Persist list passively for details-page fallback retrieval.
    rememberArticles(articles);
  }, [articles]);

  if (isLoading) {
    return <LoadingNewsGrid />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!articles.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-5">
      <NewsGrid
        articles={articles}
        onBookmarkToggle={handleBookmarkToggle}
        bookmarkedIds={bookmarkedIds}
      />
      {hasMore ? (
        <LoadMoreButton onClick={onLoadMore} isLoading={isLoadingMore} />
      ) : null}
    </div>
  );
};

export default NewsFeed;
