import type { MetadataRoute } from 'next'
import { DOCS_ROUTES, ENTERPRISE_ROUTES } from '@/lib/navigation'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/examples', ...ENTERPRISE_ROUTES.map((item) => item.href), ...DOCS_ROUTES.map((item) => item.href)]

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/enterprise') ? 0.9 : route === '/examples' ? 0.8 : 0.7,
  }))
}
