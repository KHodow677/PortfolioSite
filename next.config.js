/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

//module.exports = nextConfig
module.exports = {
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  },
};
