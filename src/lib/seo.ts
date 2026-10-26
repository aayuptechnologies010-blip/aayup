import { Metadata } from 'next';

export const siteConfig = {
  name: 'Aayup Technologies Pvt. Ltd.',
  shortName: 'Aayup Technologies',
  description: 'Leading IT company providing Web Development, Mobile Apps, UI/UX Design, Cloud Solutions, Enterprise Software & AI Services.',
  url: 'https://www.aayuptechnologies.com',
  ogImage: 'https://www.aayuptechnologies.com/og_image.png',
  phone: '+91-7030839883',
  email: 'aayup.technologies.010@gmail.com',
  address: {
    street: 'Room No. A/302, Gajanan Apartment, Near Pathak School, Sahakar Nagar, Virar East',
    city: 'Virar, Palghar',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '401305',
  },
  geo: {
    latitude: 19.4674,
    longitude: 72.8093,
    region: 'IN-MH',
    placename: 'Virar, Palghar, Maharashtra, India',
  },
  links: {
    twitter: 'https://twitter.com/aayuptech',
    github: 'https://github.com/aayuptechnologies',
    linkedin: 'https://linkedin.com/company/aayuptechnologies',
  },
};

export function constructMetadata({
  title = `${siteConfig.name} - Digital Solutions & IT Services`,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonical = siteConfig.url,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description,
    keywords: [
      'web development',
      'mobile app development',
      'UI/UX design',
      'digital marketing',
      'cloud solutions',
      'IT services',
      'software development',
      'enterprise IT solutions',
      'CRM & ERP solutions',
      'AI solutions',
      'Next.js development',
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@aayuptech',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': siteConfig.geo.region,
      'geo.placename': siteConfig.geo.placename,
      'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      'ICBM': `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    },
    icons: {
      icon: '/favicon-32x32.png',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}
