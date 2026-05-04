import { encodeArticleId } from './articleIdentity'

const DEFAULT_BASE_URL = 'https://newsapi.org/v2'
const DEFAULT_MAX_RESULTS = 10
const DEFAULT_RATE_LIMIT_COOLDOWN_MS = 60_000
const DEFAULT_RESPONSE_CACHE_TTL_MS = 120_000

const API_BASE_URL = import.meta.env.VITE_NEWSAPI_BASE_URL || DEFAULT_BASE_URL
const API_KEY = import.meta.env.VITE_NEWSAPI_KEY
const DEFAULT_LANGUAGE = import.meta.env.VITE_NEWSAPI_LANGUAGE || 'en'
const DEFAULT_COUNTRY = import.meta.env.VITE_NEWSAPI_COUNTRY || 'in'
const RATE_LIMIT_COOLDOWN_MS = Number(import.meta.env.VITE_NEWSAPI_RATE_LIMIT_COOLDOWN_MS)
  || DEFAULT_RATE_LIMIT_COOLDOWN_MS
const RESPONSE_CACHE_TTL_MS = Number(import.meta.env.VITE_NEWSAPI_CACHE_TTL_MS)
  || DEFAULT_RESPONSE_CACHE_TTL_MS

let rateLimitBlockedUntil = 0
const responseCache = new Map()

const requireApiKey = () => {
  if (!API_KEY) {
    throw new Error('Missing VITE_NEWSAPI_KEY in environment variables.')
  }
}

const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  searchParams.set('apiKey', API_KEY)
  url.search = searchParams.toString()
  return url.toString()
}

const getApiErrorDetails = (responseText) => {
  if (!responseText) {
    return 'Unknown error'
  }

  try {
    const parsed = JSON.parse(responseText)
    if (Array.isArray(parsed?.errors) && parsed.errors.length > 0) {
      return parsed.errors.join(' ')
    }
    if (typeof parsed?.message === 'string') {
      return parsed.message
    }
  } catch {
    // Ignore parse failures and use the raw text as fallback.
  }

  return responseText
}

const getRateLimitErrorMessage = (cooldownMs, details) => {
  const waitSeconds = Math.max(1, Math.ceil(cooldownMs / 1000))
  return `NewsAPI rate limit reached${details ? `: ${details}` : ''} Please wait ${waitSeconds}s before retrying.`
}

const normalizeArticle = (article) => {
  const sourceName = article?.source?.name || 'Unknown source'
  const sourceUrl = article?.url || '#'

  return {
    id: encodeArticleId(article.url),
    title: article.title || 'Untitled',
    description: article.description || '',
    content: article.content || '',
    image: article.urlToImage || '',
    author: article.author || 'Unknown author',
    sourceName,
    sourceUrl,
    publishedAt: article.publishedAt || '',
    url: article.url,
  }
}

const requestNews = async (endpoint, params, signal) => {
  requireApiKey()
  const now = Date.now()
  const requestUrl = buildUrl(endpoint, params)

  if (now < rateLimitBlockedUntil) {
    const remainingCooldownMs = rateLimitBlockedUntil - now
    throw new Error(getRateLimitErrorMessage(remainingCooldownMs, 'Too many requests'))
  }

  const cachedEntry = responseCache.get(requestUrl)
  if (cachedEntry && cachedEntry.expiresAt > now) {
    return {
      totalArticles: cachedEntry.totalArticles,
      articles: cachedEntry.articles,
    }
  }

  const response = await fetch(requestUrl, { signal })

  if (!response.ok) {
    const text = await response.text()
    const details = getApiErrorDetails(text)

    if (response.status === 429) {
      const retryAfterHeader = Number(response.headers.get('retry-after'))
      const cooldownMs = Number.isFinite(retryAfterHeader) && retryAfterHeader > 0
        ? retryAfterHeader * 1000
        : RATE_LIMIT_COOLDOWN_MS

      rateLimitBlockedUntil = Date.now() + cooldownMs
      throw new Error(getRateLimitErrorMessage(cooldownMs, details))
    }

    throw new Error(`NewsAPI request failed (${response.status}): ${details}`)
  }

  const payload = await response.json()
  const normalizedResponse = {
    totalArticles: payload.totalResults || 0,
    articles: (payload.articles || []).map(normalizeArticle),
  }

  responseCache.set(requestUrl, {
    ...normalizedResponse,
    expiresAt: Date.now() + RESPONSE_CACHE_TTL_MS,
  })

  return normalizedResponse
}

export const fetchTopHeadlines = async ({
  page = 1,
  max = DEFAULT_MAX_RESULTS,
  language = DEFAULT_LANGUAGE,
  country = DEFAULT_COUNTRY,
  signal,
} = {}) => {
  return requestNews('/everything', { q: '*', page, pageSize: max, language, sortBy: 'publishedAt' }, signal)
}

export const fetchNewsByCategory = async ({
  category,
  page = 1,
  max = DEFAULT_MAX_RESULTS,
  language = DEFAULT_LANGUAGE,
  country = DEFAULT_COUNTRY,
  signal,
} = {}) => {
  return requestNews('/top-headlines', { category, page, pageSize: max }, signal)
}

export const searchNews = async ({
  query,
  page = 1,
  max = DEFAULT_MAX_RESULTS,
  language = DEFAULT_LANGUAGE,
  signal,
} = {}) => {
  return requestNews('/everything', { q: query, page, pageSize: max, language }, signal)
}
