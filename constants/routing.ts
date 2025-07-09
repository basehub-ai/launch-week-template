if (typeof process.env.NEXT_PUBLIC_SITE_URL !== 'string') {
  throw new Error(`Please set the NEXT_PUBLIC_SITE_URL environment variable to your site's URL.
 
 1. Create .env file at the root of your project.
 2. Add NEXT_PUBLIC_SITE_URL=http://localhost:3000
 3. For other environments (like production), make sure you set the correct URL.
 `)
}

export const siteURL = new URL(process.env.NEXT_PUBLIC_SITE_URL)
export const siteOrigin = siteURL.origin
