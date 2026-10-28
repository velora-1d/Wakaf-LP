/**
 * Generator JSON-LD Structured Data Standar Schema.org
 * Untuk Global Village Fund (Wakaf-LP)
 * Mengoptimalkan Google Rich Snippets & AI Knowledge Graph (GEO/AEO)
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleSeoData {
  title: string;
  summary?: string | null;
  slug: string;
  coverImage?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  author?: string;
}

export interface ProgramSeoData {
  title: string;
  slug: string;
  heroSubtitle: string;
  heroBgImage?: string;
}

export function getOrganizationSchema(siteUrl = 'https://globalvillagefund.org') {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${siteUrl}/#organization`,
    name: 'Global Village Fund',
    alternateName: ['GVF', 'Yayasan Global Village Fund', 'Wakaf LP'],
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo-gvf-3d.png`,
      caption: 'Global Village Fund Logo',
    },
    image: `${siteUrl}/logo-gvf-3d.png`,
    description:
      'Wadah filantropi dan wakaf produktif untuk pembangunan Masjid Khairu Ummah Sugro dan Pesantren Integratif Holistik SMK Skill Village Islamic School di Jonggol, Jawa Barat.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogor',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62-812-2683-2326',
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
    ],
    sameAs: [
      'https://www.instagram.com/globalvillagefund',
      'https://globalvillagefund.org',
    ],
  };
}

export function getWebSiteSchema(siteUrl = 'https://globalvillagefund.org') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Global Village Fund',
    description:
      'Platform Wakaf Produktif & Pendidikan Berkelanjutan Global Village Fund',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'id-ID',
  };
}

export function getBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl = 'https://globalvillagefund.org'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http')
        ? item.url
        : `${siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}

export function getFaqSchema(faqs: FaqItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(
  article: ArticleSeoData,
  siteUrl = 'https://globalvillagefund.org'
) {
  const published = article.createdAt
    ? new Date(article.createdAt).toISOString()
    : new Date().toISOString();
  const modified = article.updatedAt
    ? new Date(article.updatedAt).toISOString()
    : published;
  const image = article.coverImage
    ? article.coverImage.startsWith('http')
      ? article.coverImage
      : `${siteUrl}${article.coverImage.startsWith('/') ? '' : '/'}${article.coverImage}`
    : `${siteUrl}/logo-gvf-3d.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/kabar/${article.slug}`,
    },
    headline: article.title,
    description: article.summary || article.title,
    image: [image],
    datePublished: published,
    dateModified: modified,
    author: {
      '@type': 'Organization',
      name: article.author || 'Global Village Fund',
      url: siteUrl,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}

export function getProgramSchema(
  program: ProgramSeoData,
  siteUrl = 'https://globalvillagefund.org'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    name: `Donasi & Wakaf ${program.title}`,
    description: program.heroSubtitle,
    recipient: {
      '@id': `${siteUrl}/#organization`,
    },
    actionStatus: 'https://schema.org/PotentialActionStatus',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/program/${program.slug}`,
      inLanguage: 'id-ID',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
  };
}
