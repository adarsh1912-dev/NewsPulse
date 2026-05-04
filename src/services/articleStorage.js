const RECENT_ARTICLES_STORAGE_KEY = 'news-app-recent-articles'
const MAX_RECENT_ARTICLES = 50

const readRecentArticles = () => {
  const raw = localStorage.getItem(RECENT_ARTICLES_STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to parse recent articles from localStorage:', error)
    return []
  }
}

export const rememberArticle = (article) => {
  const current = readRecentArticles()
  const withoutCurrent = current.filter((item) => item.id !== article.id)
  const next = [article, ...withoutCurrent].slice(0, MAX_RECENT_ARTICLES)

  localStorage.setItem(RECENT_ARTICLES_STORAGE_KEY, JSON.stringify(next))
}

export const rememberArticles = (articles) => {
  if (!articles.length) {
    return
  }

  const current = readRecentArticles()
  const merged = [...articles, ...current]
  const deduped = []
  const seen = new Set()

  for (const article of merged) {
    if (!seen.has(article.id)) {
      seen.add(article.id)
      deduped.push(article)
    }
  }

  localStorage.setItem(
    RECENT_ARTICLES_STORAGE_KEY,
    JSON.stringify(deduped.slice(0, MAX_RECENT_ARTICLES)),
  )
}

export const getRememberedArticle = (articleId) => {
  return readRecentArticles().find((article) => article.id === articleId)
}
