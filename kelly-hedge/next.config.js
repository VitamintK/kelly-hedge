/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',
    assetPrefix: isProd ? '/kelly-hedge/' : undefined,
    // experimental: {
    //     basePath: '/kelly-hedge',
    // },
}

module.exports = nextConfig
