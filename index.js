var store = require('app-store-scraper');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

// store.app({ id: 284882215 }).then(console.log).catch(console.log);

async function fetchAndAppendReviews(page) {
  try {
    const appId = 'com.facebook.Facebook'
    const res = await store.reviews({
      appId: appId,
      sort: store.sort.HELPFUL,
      page: page
    });

    const jsonContent = JSON.stringify(res);
    await writeFileAsync(`./out/output_page_${appId}_${page}.json`, jsonContent, 'utf8');
    console.log(`JSON file for page ${page} has been saved.`);
} catch (error) {
    console.error(`Error fetching or writing reviews for page ${page}:`, error);
}
}

async function processPages() {
  // Loop through pages 1 to 10
  for (let page = 1; page <= 10; page++) {
      await fetchAndAppendReviews(page);
  }
}

// Call the async function
processPages();
