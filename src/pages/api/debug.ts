export const prerender = false;

export async function GET() {
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID || import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const secret = process.env.KEYSTATIC_SECRET || import.meta.env.KEYSTATIC_SECRET;

  return new Response(JSON.stringify({
    hasClientId: !!clientId,
    clientIdValue: clientId ? `${clientId.substring(0, 4)}***` : 'MISSING',
    hasClientSecret: !!clientSecret,
    clientSecretValue: clientSecret ? `${clientSecret.substring(0, 4)}***` : 'MISSING',
    hasKeystaticSecret: !!secret,
    nodeEnv: process.env.NODE_ENV,
    isProd: import.meta.env.PROD
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
