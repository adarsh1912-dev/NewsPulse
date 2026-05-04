# NewsPulse - React + Tailwind News Web App

A production-ready, responsive news web app built with React (hooks + functional components), Tailwind CSS, React Router, and the GNews API.

## 1. Project setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your env file:
   ```bash
   cp .env.example .env
   ```
3. Add your News API key in `.env`:
   ```env
   VITE_GNEWS_API_KEY=your_real_key
   VITE_GNEWS_RATE_LIMIT_COOLDOWN_MS=60000
   VITE_GNEWS_CACHE_TTL_MS=120000
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

## 2. Components built

- **Layout**
  - `components/layout/Layout.jsx`: shared page frame
  - `components/layout/Navbar.jsx`: sticky navbar + route navigation + category chips
- **News UI**
  - `components/news/NewsCard.jsx`: image/title/meta/description + bookmark action
  - `components/news/NewsGrid.jsx`: responsive card grid
  - `components/news/NewsFeed.jsx`: loading/error/empty/data orchestration for list pages
  - `components/news/SearchInput.jsx`: keyword input for search page
- **Reusable UI states**
  - `components/ui/LoadingNewsGrid.jsx`
  - `components/ui/ErrorState.jsx`
  - `components/ui/EmptyState.jsx`
  - `components/ui/LoadMoreButton.jsx`
  - `components/ui/PageHeader.jsx`
  - `components/ui/ThemeToggle.jsx`

## 3. Pages built

- `HomePage`: top headlines feed
- `CategoriesPage`: route-driven category feed (`/categories/:category`)
- `SearchPage`: debounced keyword search
- `NewsDetailsPage`: full article view with source link + bookmark toggle
- `BookmarksPage`: localStorage-backed bookmarked article list
- `NotFoundPage`: fallback route

## 4. Data flow (how it works)

1. Route renders a page (`App.jsx` route map + `Layout`).
2. Page uses `usePaginatedNews` with a page-specific API request function.
3. API requests run through `services/gnewsApi.js`, normalize article shape, use short response caching, and enforce cooldown handling after HTTP 429.
4. Page passes request state (`loading/error/articles/hasMore`) to `NewsFeed`.
5. `NewsFeed` renders skeletons/errors/empty state or `NewsGrid`.
6. `NewsCard` links to details route using encoded article URL as `articleId`.
7. Article/bookmark persistence:
   - `hooks/useBookmarks.js` stores bookmarks in localStorage.
   - `services/articleStorage.js` caches recent articles for details-page recovery.
8. Theme persistence:
   - `hooks/useDarkMode.js` toggles and stores theme in localStorage.

## 5. Project structure

```text
src/
  components/
    layout/
    news/
    ui/
  constants/
  hooks/
  pages/
  services/
  App.jsx
  main.jsx
```

## 6. Scripts

- `npm run dev` - start development server
- `npm run lint` - lint checks
- `npm run build` - production build
