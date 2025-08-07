import { useEffect } from 'react';

/**
 * Component to set security headers via meta tags and configure CSP
 * Should be included once in the app root
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Set meta tags for security headers
    const setMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const setHttpEquivTag = (httpEquiv: string, content: string) => {
      let meta = document.querySelector(`meta[http-equiv="${httpEquiv}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.httpEquiv = httpEquiv;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Content Security Policy
    setHttpEquivTag('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' data: https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "connect-src 'self' https: wss: https://*.supabase.co https://*.supabase.io"
    ].join('; '));

    // X-Content-Type-Options
    setHttpEquivTag('X-Content-Type-Options', 'nosniff');

    // X-Frame-Options
    setHttpEquivTag('X-Frame-Options', 'DENY');

    // X-XSS-Protection
    setHttpEquivTag('X-XSS-Protection', '1; mode=block');

    // Referrer Policy
    setMetaTag('referrer', 'strict-origin-when-cross-origin');

    // Permissions Policy
    setHttpEquivTag('Permissions-Policy', [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'accelerometer=()',
      'gyroscope=()'
    ].join(', '));

    // HSTS (if served over HTTPS)
    if (window.location.protocol === 'https:') {
      setHttpEquivTag('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
  }, []);

  return null; // This component doesn't render anything
};

export default SecurityHeaders;