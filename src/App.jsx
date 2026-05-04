import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import BookmarksPage from './pages/BookmarksPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NewsDetailsPage from './pages/NewsDetailsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SearchPage from './pages/SearchPage.jsx'

const App = () => {
  return (
    <Routes>
      {/*
        Layout is mounted once and keeps shared UI (navbar/frame) stable
        while only page content changes through nested routes.
      */}
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/categories' element={<Navigate to='/categories/business' replace />} />
        <Route path='/categories/:category' element={<CategoriesPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/article/:articleId' element={<NewsDetailsPage />} />
        <Route path='/bookmarks' element={<BookmarksPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
