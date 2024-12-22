import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 
  <StrictMode>
    <HelmetProvider>
      <App >
        <Helmet>
        </Helmet>
      </App>
    </HelmetProvider>
    
  </StrictMode>,
)
