import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kahorymedia.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Main page gets top priority
    },
    {
      url: 'https://kahorymedia.in/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // Contact page is slightly lower priority
    },
  ]
}