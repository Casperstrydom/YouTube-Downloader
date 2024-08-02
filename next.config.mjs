/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['myimages.com', 'cdn.example.com'], // Replace with your actual domains
    },
    async redirects() {
      return [
        {
          source: '/old-path', // Adjust if needed
          destination: '/new-path', // Adjust if needed
          permanent: true,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Adjust if needed
          destination: 'https://external-api.com/:path*', // Adjust if needed
        },
      ];
    },
  };
  
  export default nextConfig;
  