const express = require('express')

const routes = express.Router()

routes.get('/', (req,res) => {
  return res.redirect('/producers')
})

routes.get('/producers', (req,res) => {
  return res.render('producers/index')
})

routes.get('/producers/create', (req, res) => {
  return res.render('producers/create')
})


module.exports = routes