import withPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isDev = process.env.NODE_ENV === 'development';

export default withPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: isDev, // Deshabilitar PWA en modo desarrollo
})(nextConfig);