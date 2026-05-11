import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: object | object[];
}

export function SEO({
  title = "SwiftcodeDir - Search Bank SWIFT Codes, IBAN & Routing Numbers",
  description = "The world's most comprehensive directory of SWIFT / BIC codes, IBAN validation tools, sort codes, and global banking routing numbers.",
  keywords = [
    "SWIFT codes", "BIC codes", "IBAN verification", "sort codes", 
    "BLZ numbers", "SWIFT code search", "find SWIFT code", 
    "routing numbers", "international bank transfers", "valid IBAN"
  ],
  canonicalUrl = "https://swiftcodedir.com",
  ogType = "website",
  ogImage = "https://swiftcodedir.com/og-image.jpg",
  jsonLd
}: SEOProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
