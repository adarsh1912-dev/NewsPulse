# Migration from GNews to NewsAPI

## Changes Made

✅ **API Service Updated** (`src/services/gnewsApi.js`)
- Changed base URL from `https://gnews.io/api/v4` to `https://newsapi.org/v2`
- Updated endpoints:
  - `/top-headlines` for headlines and categories
  - `/everything` for search
- Updated API key parameter from `apikey` to `apiKey` (NewsAPI standard)
- Updated parameter names:
  - `max` → `pageSize`
  - `topic` → `category`
  - `q` → `q` (same for search)
- Updated response parsing: `payload.articles` ✓, `payload.totalResults` (not totalArticles)
- Updated article field: `article.urlToImage` (instead of `article.image`)

✅ **Environment Variables Updated**
- Renamed all `VITE_CURRENTS_*` variables to `VITE_NEWSAPI_*`
- Updated `.env` and `.env.example` files
- Ensured `.env` is in `.gitignore`

## Setup Instructions

### 1. Get API Key
1. Go to https://newsapi.org/
2. Sign up for a free account
3. Copy your API key from the dashboard
4. Update `.env` file:
   ```
   VITE_NEWSAPI_KEY=your_actual_api_key_here
   ```

### 2. Test the Migration
```bash
npm run dev
```

### 3. Verify API Calls
- Go to homepage and check if news loads
- Test category filtering
- Test search functionality

## API Limits

**NewsAPI Free Tier:**
- 100 requests/day
- 100 articles per request
- Reliable and well-documented

## Security ✅

- ✅ API key is now in `.env` (ignored by git)
- ✅ `.env.example` has placeholder instead of real key
- ✅ Old exposed keys (GNews & Currents) should be rotated on their dashboards

## Troubleshooting

If articles don't load:
1. Check browser console for errors
2. Verify API key is correct in `.env`
3. Check NewsAPI status page
4. Ensure you're using valid parameters:
   - Country: 2-letter code (e.g., `in` for India)
   - Category: `general`, `business`, `entertainment`, `health`, `science`, `sports`, `technology`
