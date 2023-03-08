import { URL } from 'url';

export function resolveHtmlPath() {
  const port = process.env.PORT || 8081;
  const url = new URL(`http://localhost:${port}`);
  url.pathname = '';
  return url.href;
}
