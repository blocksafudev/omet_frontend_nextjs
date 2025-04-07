// scripts/generate-sitemap-[slug].js

const fs = require("fs");
const path = require("path");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const MY_DOMAIN = "https://metti.com";

// check if the directory exists and create it if not
const checkDir = async (dir) => {
  if (!fs.existsSync(dir)) {
    await fs.mkdirSync(dir);
  }
};

checkDir(`public${path.sep}sitemap`);

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  const pages = await globby(["public/sitemap/*.xml"]);
  const sitemapIndex = `
    ${pages
      .map((page) => {
        const path = page.replace("public/", "");
        return `
          <sitemap>
            <loc>${`${MY_DOMAIN}/${path}`}</loc>
            <lastmod>${getDate}</lastmod>
          </sitemap>`;
      })
      .join("")}
  `;

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapIndex}
        </sitemapindex>
    `;

  const formattedSitemap = formatted(sitemap);
  const sitemapIndexPath = `public${path.sep}sitemap.xml`;
  fs.writeFileSync(sitemapIndexPath, formattedSitemap, "utf8");
})();
