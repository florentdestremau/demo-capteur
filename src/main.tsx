import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Register Service Worker for cache management
// Disabled temporarily - using cache control meta tags instead
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/demo-capteur/sw.js')
//       .then((registration) => {
//         console.log('Service Worker registered:', registration);
//       })
//       .catch((error) => {
//         console.log('Service Worker registration failed:', error);
//       });
//   });
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
