/**
 * Created by rprat on 22-06-2017.
 */
const express = require('express')
const next = require('next')
const path = require('path')
const favicon = require('serve-favicon')
const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

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

  // Use the `renderAndCache` utility defined below to serve pages
  server.get('/', (req, res) => {
    renderAndCache(req, res, '/')
  })

  // Don't  refactor redirects into .env.config.* files as we can have multiple redirect routes. Thus, producing iteration issues.
  redirects.forEach(({from, to, type = 301, method = 'get'}) => {
    server[method](from, (req, res) => {
      res.redirect(type, to)
    })
  })

  server.use(favicon(path.join(__dirname, 'static', 'favicon.png')))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`)
    res.send(ssrCache.get(key))
    return
  }

  // If not let's render the page into HTML
  app.renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      // Let's cache this page
      console.log(`CACHE MISS: ${key}`)
      ssrCache.set(key, html)

      res.send(html)
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}
