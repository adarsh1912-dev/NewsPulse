import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
      BrowserRouter provides routing context to the entire app.
      Every page/component that reads location params or navigates relies on this provider.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
