export default {
  appId: 'U1BUM8CNO6',
  indexName: 'Phira-Document-Search',
  rateLimit: 8,
  maxDepth: 10,
  startUrls: ['https://docs.dmocken.top/'],
  sitemaps: ['https://docs.dmocken.top/sitemap.xml'],
  actions: [
    {
      indexName: 'Phira-Document-Search',
      pathsToMatch: ['https://docs.dmocken.top/en/**'],
      recordExtractor: ({ helpers }) => helpers.docsearch({
        recordProps: {
          lvl0: {
            selectors: '.vp-doc h1',
            defaultValue: 'Phira Documentation'
          },
          lvl1: '.vp-doc h2',
          lvl2: '.vp-doc h3',
          lvl3: '.vp-doc h4',
          lvl4: '.vp-doc h5',
          lvl5: '.vp-doc h6',
          content: '.vp-doc p, .vp-doc li, .vp-doc td',
          lang: {
            defaultValue: 'en'
          }
        },
        aggregateContent: true,
        indexHeadings: true,
        recordVersion: 'v3'
      })
    },
    {
      indexName: 'Phira-Document-Search',
      pathsToMatch: [
        'https://docs.dmocken.top/**',
        '!https://docs.dmocken.top/en/**'
      ],
      recordExtractor: ({ helpers }) => helpers.docsearch({
        recordProps: {
          lvl0: {
            selectors: '.vp-doc h1',
            defaultValue: 'Phira 文档'
          },
          lvl1: '.vp-doc h2',
          lvl2: '.vp-doc h3',
          lvl3: '.vp-doc h4',
          lvl4: '.vp-doc h5',
          lvl5: '.vp-doc h6',
          content: '.vp-doc p, .vp-doc li, .vp-doc td',
          lang: {
            defaultValue: 'zh-Hans'
          }
        },
        aggregateContent: true,
        indexHeadings: true,
        recordVersion: 'v3'
      })
    }
  ],
  initialIndexSettings: {
    'Phira-Document-Search': {
      attributesForFaceting: ['lang']
    }
  }
}
