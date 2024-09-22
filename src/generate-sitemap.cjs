const path = require('path');
const SitemapGenerator = require('sitemap-generator');

// Create generator
const generator = SitemapGenerator('https://genocide2024.info', {
  stripQuerystring: false,
  filepath: path.join(__dirname, 'sitemap.xml'),
  maxEntriesPerFile: 50000,
});

// Register event listeners
generator.on('done', () => {
  console.log('Sitemap generated!');
});

// Start the crawler
generator.start();