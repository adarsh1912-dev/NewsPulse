export const formatPublishedDate = (publishedAt) => {
  if (!publishedAt) {
    return 'Unknown date'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(publishedAt))
}
