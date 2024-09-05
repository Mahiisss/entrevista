const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,  
  // Adding policies:
  async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Permissions-Policy',
              value: "camera=(); battery=(self); geolocation=(); ",
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
          ],
        },
      ];
  },   
}

module.exports = nextConfig