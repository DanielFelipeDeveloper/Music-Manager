const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.static(__dirname + '/views'));
server.use(express.static(__dirname + '/public'));
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
})

server.listen(5000, () => {
  console.log('Server is Running')
})