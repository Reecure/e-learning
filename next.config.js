/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 's3.ap-southeast-1.amazonaws.com', 'miro.medium.com', 'uploadthing.com', 'utfs.io']
    },
    experimental: {
        esmExternals: false, // THIS IS THE FLAG THAT MATTERS
    },
}

module.exports = nextConfig