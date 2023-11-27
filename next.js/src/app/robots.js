import { domain } from '../global/Seo';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/payment-successful',
        '/payment-failed'
      ],
    },
    sitemap: `${domain}/sitemap.xml`,
  }
}