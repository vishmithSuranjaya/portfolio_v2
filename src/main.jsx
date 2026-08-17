import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-loading-skeleton/dist/skeleton.css';
import { HelmetProvider } from 'react-helmet-async'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
        <App />
      </GoogleReCaptchaProvider>
    </HelmetProvider>
  </StrictMode>,
)
