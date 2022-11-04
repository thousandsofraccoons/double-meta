<svelte:head>
  <title>data?.seo?.title</title>
	<link rel="canonical" href="http://localhost:3000" />
	<meta name="robots" content="max-image-preview:large" />
	<meta property="og:title" content="data?.seo?.og_title" />
	<meta property="og:locale" content="$locale" />
	<meta property="og:site_name" content="PROJECT_NAME ?? 'Herbiware'" />
	<meta property="og:type" content="website" />

	<meta property="og:image" content="data?.seo?.og_image ?? DEFAULT_META_IMAGE" />
	<meta property="og:description" content="data?.seo?.og_description" />

	<meta property="twitter:domain" content="TWITTER_DOMAIN" />
	<meta property="twitter:site" content="TWITTER_SITE" />
	<meta property="twitter:creator" content="TWITTER_CREATOR" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:description" content="data?.seo?.meta_description" />
	<meta name="twitter:title" content="data?.seo?.title" />
	<meta property="twitter:image" content="data?.seo?.og_image ?? DEFAULT_META_IMAGE" />

	<meta itemProp="name" content="data?.seo?.og_title" />
	<meta name="description" content="data?.seo?.meta_description" />
	<meta itemProp="image" content="data?.seo?.og_image ?? DEFAULT_META_IMAGE" />
</svelte:head>