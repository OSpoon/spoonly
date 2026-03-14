import { handleKeystatic } from '@keystatic/astro/api';
import type { APIRoute } from 'astro';
import config from '../../../../keystatic.config';

export const ALL: APIRoute = (context) => {
  // 强制注入环境变量，确保在 Netlify Function 中能读到
  if (!process.env.KEYSTATIC_GITHUB_CLIENT_ID) {
    process.env.KEYSTATIC_GITHUB_CLIENT_ID = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
  }
  if (!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET) {
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  }
  if (!process.env.KEYSTATIC_SECRET) {
    process.env.KEYSTATIC_SECRET = import.meta.env.KEYSTATIC_SECRET;
  }

  return handleKeystatic(config)(context);
};

export const prerender = false;
