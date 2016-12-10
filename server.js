require('babel-register')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const _template = require('lodash.template')
const express = require('express')
const ServerRouter = ReactRouter.ServerRouter
const fs = require('fs')

const App = require('./js/App').default

const port = 5050
const baseTemplate = fs.readFileSync('./index.html')
const server = express()

server.use('/public', express.static('./public'))

server.use((req, res) => {
  const context = ReactRouter.createServerRenderContext()
  const body = ReactDOMServer.renderToString(
    React.createElement(
      ServerRouter,
      { location: req.url, context: context },
      React.createElement(
        App
      )
    )
  )
  res.write(_template(baseTemplate)({body}))
  res.end()
})

server.listen(
  port,
  () => {
    console.log()
    console.log(`  🚀   Listening on ${port}  🚀  `)
    console.log()
  }
)
