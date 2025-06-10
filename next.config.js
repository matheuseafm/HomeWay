/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "www.google.com",
      "i.pravatar.cc",
      'share-site-prod.s3.amazonaws.com', // <- adicionado
    ],
  },
  
  
};

module.exports = nextConfig;
