/**
 * Created by rprat on 22-06-2017.
 */
const express = require('express')
const next = require('next')
const {join} = require('path')
var proxy = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
console.log(process.env.NODE_ENV)
let redirects
try {
  switch (process.env.NODE_ENV) {
    case 'production' :
      redirects = require('./redirects.' + process.env.NODE_ENV)
      console.log(redirects)
      break
    default:
      redirects = require('./redirects')
      console.log(redirects)
  }
} catch (err) {
  console.trace(err)
  process.exit(1) // fatal
}

const rootStaticFiles = [
  '/favicon.png'
]

app.prepare().then(() => {
  const server = express()

  redirects.forEach(({from, to}) => {
    app.use(from, proxy({target: to, changeOrigin: true}))
  })

  const options = {root: join(__dirname, 'static')}
  rootStaticFiles.forEach(file => {
    server.get(file, (req, res) => {
      res.sendFile(file.slice(1), options)
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
