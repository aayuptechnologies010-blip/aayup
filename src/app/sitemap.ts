import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aayuptechnologies.com';

  const routes = [
    '',
    '/about',
    '/team',
    '/services',
    '/projects',
    '/clients',
    '/contact',
    '/careers',
    '/pricing',
    '/blog',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
