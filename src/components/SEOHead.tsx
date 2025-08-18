import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schemaData?: object;
}

export const SEOHead = ({
  title = "AgriTech Advisor - AI-Powered Farming Solutions for Rwanda",
  description = "Transform your farming with AI-powered crop analysis, weather insights, and expert agricultural advice. Designed specifically for Rwandan farmers to increase yields and improve crop health.",
  keywords = "farming, agriculture, Rwanda, AI crop analysis, weather, market prices, farming tips, agricultural technology, crop health, yield optimization",
  ogImage = "/og-image.jpg",
  canonicalUrl,
  schemaData
}: SEOHeadProps) => {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AgriTech Advisor",
    "description": description,
    "applicationCategory": "Agriculture",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "AgriTech Advisor"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#22c55e" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AgriTech Advisor" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
      
      {/* PWA Meta Tags */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="AgriTech" />
    </Helmet>
  );
};