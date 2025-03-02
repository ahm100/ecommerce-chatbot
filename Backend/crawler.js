const { chromium } = require('playwright'); // Import Playwright

async function crawlDigikala(productName) {
  const browser = await chromium.launch(); // Launch Chromium browser
  const page = await browser.newPage(); // Open a new page
  await page.goto(`https://www.digikala.com/search/?q=${productName}`); // Navigate to the search page

  // Wait for the product list to load
  await page.waitForSelector('.c-product-box');
  
  page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.dismiss();
  });

  // Extract product data
  const products = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('.c-product-box').forEach((item) => {
      const name = item.querySelector('.c-product-box__title')?.innerText;
      const price = item.querySelector('.c-price__value')?.innerText;
      const link = item.querySelector('a')?.href;
      if (name && price && link) {
        items.push({ name, price, link });
      }
    });
    return items;
  });

  await browser.close(); // Close the browser
  return products;
}

// Example usage in Express
app.get('/crawl', async (req, res) => {
  const productName = req.query.product;
  const products = await crawlDigikala(productName);
  res.json(products);
});