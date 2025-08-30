// For Vercel deployment, we'll use dynamic OG image generation
// instead of pre-generating with Puppeteer
export async function generateOgImage(props) {
  // Return a dynamic URL that will generate the image on-demand
  const params = new URLSearchParams(props);
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || '';
  return `${baseUrl}/api/og?${params}`;
}
