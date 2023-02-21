/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "random.imagecdn.app",
      "s.gravatar.com",
      "lh3.googleusercontent.com",
      "i.pravatar.cc", 
			"scontent-sea1-1.xx.fbcdn.net",
      "apis.live.net",
    ],
  },
};

module.exports = nextConfig;
