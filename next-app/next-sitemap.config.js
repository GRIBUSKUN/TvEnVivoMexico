// import pages from './src/app/components/TvChanels2.json'
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.tvenvivomexico.com",
  generateRobotsTxt: true, // (optional)
  // ...other options,
  additionalPaths: async (config) => {
    const pages = require("./src/app/components/TvChanels2.json");
    const result = [];
    // all possible values
    pages.map((val, key) => {
      const link = val.chanel.toLocaleLowerCase();
      result.push({
        loc: link.replaceAll(" ", "-"),
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    // using transformation from the current configuration
    result.push(await config.transform(config, "/additional-page-3"));

    return result;
  },
};
