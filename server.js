/**
 * Created by rprat on 22-06-2017.
 */
const express = require('express')
const next = require('next')
const path = require('path')
const favicon = require('serve-favicon')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

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
