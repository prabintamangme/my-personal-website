/** Node/Vercel fallback. Cloudflare deployments use the real D1 and R2 bindings. */
export const env = {
  DB: undefined,
  BUCKET: undefined,
};
