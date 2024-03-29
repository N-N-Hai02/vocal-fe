/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BA_EN_URL: process.env.BE_URL,
        V_S_URL: process.env.BE_VERSION,
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
