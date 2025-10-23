module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{html,json,js,css,png,svg}"],
  swDest: "public/sw.js",
  skipWaiting: true,
  clientsClaim: true,
};
