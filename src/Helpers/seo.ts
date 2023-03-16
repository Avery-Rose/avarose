interface SeoData {
  title?: string;
  metaDescription?: string;
}

function setDescriptionTags(description: string) {
  // HTML
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', description);
  // Open Graph
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute('content', description);
  // Twitter
  document
    .querySelector('meta[name="twitter:description"]')
    ?.setAttribute('content', description);
  // Google
  document
    .querySelector('meta[itemprop="description"]')
    ?.setAttribute('content', description);
}

function seo(data: SeoData) {
  data.title = data.title || 'AvaRose';
  data.metaDescription =
    data.metaDescription || `Avery Rose's Personal Website`;

  document.title = data.title;
  setDescriptionTags(data.metaDescription);
}

export { SeoData, seo };
