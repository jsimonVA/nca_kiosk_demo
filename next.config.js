import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true, // Standard Next.js config
};

export default withPWA({
  dest: 'public', // Directory for the service worker
  register: true, // Automatically registers the service worker
  skipWaiting: true, // Activates updated service workers immediately
  disable: process.env.NODE_ENV === 'development', // Disable PWA during development
})(nextConfig);
