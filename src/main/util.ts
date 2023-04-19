import { URL } from 'url';
import Store from 'electron-store';

export default function resolveHtmlPath() {
  const port = process.env.PORT || 8081;
  const store = new Store();

  const serverAddress = store.get('serverAddress') as string;
  const url = serverAddress
    ? new URL(serverAddress)
    : new URL(`http://localhost:${port}`);
  url.pathname = '';
  return url.href;
}
