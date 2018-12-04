/**
 * Created by rprat on 22-06-2017.
 */
const express = require('express')
const next = require('next')
const path = require('path')
const favicon = require('serve-favicon')
const LRUCache = require('lru-cache')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const handler = routes.getRequestHandler(app)

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

let redirects
try {
  switch (process.env.NODE_ENV) {
    case 'production' :
      redirects = require('./redirects.' + process.env.NODE_ENV)
      break
    default:
      redirects = require('./redirects')
  }
} catch (err) {
  console.trace(err)
  process.exit(1) // fatal
}

app.prepare().then(() => {
  const server = express()

  if (process.env.NODE_ENV === 'production') {
    /* Use the `renderAndCache` utility defined below to serve pages
      Use multiple such function calls to add multiple routes for LRU Catching
    */
    server.get('/', (req, res) => {
      renderAndCache(req, res, '/')
    })

    // Registering ServiceWorker for PWA
    server.use('/service-worker.js', express.static(path.join(__dirname, '.next', 'service-worker.js')))
  }

  // Don't  refactor redirects into .env.config.* files as we can have multiple redirect routes. Thus, producing iteration issues.
  redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
    server[method](from, (req, res) => {
      res.redirect(type, to)
    })
  })

  server.use(favicon(path.join(__dirname, 'assets', 'favicon.png')))

  // configuring express to use next-routes
  server.use(handler)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3333, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3333')
  })
})

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
