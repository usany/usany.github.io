const { createServer } = require('http');
const fs = require('node:fs/promises');
// const { createViteServer } = require('vite');
// const path = require('path');
// const url = require('url');

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const host = 'localhost';
const base = process.env.BASE || '/'
// Cached production assets
// const templateHtml = isProduction
//   ? await fs.readFile('./dist/client/index.html', 'utf-8')
//   : ''
const templateHtml = isProduction
  ? fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
async function createRequestListener() {
  const { createServer } = await import('vite')
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })

  return async function (req, res) {
    try {
      if (vite.middlewares) {
        await new Promise((resolve) =>
          vite.middlewares(req, res, resolve)
        );
      }
      const url = req.url.replace(base, '')
      /** @type {string} */
      let template
      /** @type {import('./src/entry-server.js').render} */
      let render
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = templateHtml
        render = (await import('./dist/server/entry-server.js')).render
      }
      const rendered = await render(url)
      const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(html);
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(err.message);
    }
  };
}

createRequestListener().then((requestListener) => {
  const server = createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
});
