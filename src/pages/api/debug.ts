export const prerender = false;

export async function GET() {
  // 尝试从所有可能的来源读取
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID || import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const secret = process.env.KEYSTATIC_SECRET || import.meta.env.KEYSTATIC_SECRET;

  return new Response(JSON.stringify({
    // 🚨 警告：以下将打印完整明文
    FULL_CLIENT_ID: clientId || 'MISSING',
    FULL_CLIENT_SECRET: clientSecret || 'MISSING',
    FULL_KEYSTATIC_SECRET: secret || 'MISSING',
    NODE_ENV: process.env.NODE_ENV,
    RENDERER: 'Astro SSR'
  }), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-cache" 
    }
  });
}
