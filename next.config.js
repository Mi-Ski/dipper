/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	images: {
    domains: ["random.imagecdn.app", "s.gravatar.com", "lh3.googleusercontent.com", "i.pravatar.cc"],
  },
}

module.exports = nextConfig
