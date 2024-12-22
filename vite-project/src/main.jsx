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
          
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3485571472560082"
            crossorigin="anonymous"></script>
          <meta name="google-adsense-account" content="ca-pub-3485571472560082"></meta>
        </Helmet>
      </App>
    </HelmetProvider>
    
  </StrictMode>,
)
