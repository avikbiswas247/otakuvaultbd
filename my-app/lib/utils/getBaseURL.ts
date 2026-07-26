export function getBaseUrl() {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Browser should use relative URLs - always works
    return '';
  }

  // Server-side rendering
  // For Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For Render
  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL;
  }

  // For other deployments or local development
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Default to localhost for development
  return `http://localhost:${process.env.PORT || 3000}`;
}