// We use the article URL as the stable unique identity because external APIs
// do not always provide a guaranteed immutable article id.

export const encodeArticleId = (articleUrl) => encodeURIComponent(articleUrl)

export const decodeArticleId = (articleId) => decodeURIComponent(articleId)
