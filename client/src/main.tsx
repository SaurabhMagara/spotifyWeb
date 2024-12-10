import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { TokenContextProvider } from './context/tokenContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
