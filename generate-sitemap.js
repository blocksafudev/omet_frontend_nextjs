const axios = require("axios");
const fs = require("fs");
const path = require("path");
const globby = require("globby");
const prettier = require("prettier");

const MY_DOMAIN = "https://metti.com";
const getDate = new Date().toISOString();

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

const checkDir = async (dir) => {
  if (!fs.existsSync(dir)) {
    await fs.mkdirSync(dir);
  }
};

checkDir("public/sitemap");

const generateSitemap = (sitemap) => {
  return `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        >
        ${sitemap}
        </urlset>
    `;
};

(async () => {
  const pages = await globby([
    // include
    "src/pages/**/**/*.js",
    "src/pages/**/*.js",
    "src/pages/*.js",
    // exclude
    "!src/pages/_*.js",
    "!src/pages/**/[page].js",
    "!src/pages/**/[slug].js",
    "!src/pages/**/[address].js",
    "!src/pages/404.js",
    "!src/pages/api/**/*.js",
  ]);

  const pagesSitemap = `${pages
    .map((page) => {
      const path = page
        .replace("src/pages/", "")
        .replace(".js", "")
        .replace(/\/index/g, "");
      const routePath = path === "index" ? "" : path;
      return `
                <url>
                <loc>${MY_DOMAIN}/${encodeURIComponent(routePath)}</loc>
                <lastmod>${getDate}</lastmod>
                <priority>1</priority>
                <changefreq>weekly</changefreq>
                </url>
            `;
    })
    .join("")}`;

  const generatePagesSitemap = generateSitemap(pagesSitemap);
  const formattedPagesSitemap = formatted(generatePagesSitemap);
  const pagesSitemapURLPath = path.join(
    "public",
    "sitemap",
    "sitemap-pages.xml"
  );

  fs.writeFileSync(pagesSitemapURLPath, formattedPagesSitemap, "utf8");
})().catch((err) => {
  console.error(err);
});
