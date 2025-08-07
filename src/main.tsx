// Import polyfills for Safari compatibility
import 'core-js/stable';

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'

// Safari compatibility check and warning
if (typeof window !== 'undefined') {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    console.log('Safari detected - using compatibility mode');
  }
}

createRoot(document.getElementById("root")!).render(<App />);
