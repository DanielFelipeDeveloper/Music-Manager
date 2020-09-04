const express = require('express')
const producers = require('./producers')

const routes = express.Router()

routes.get('/', (req,res) => {
  return res.redirect('/producers')
})

routes.get('/producers', producers.index)

routes.get('/producers/create', (req, res) => {
  return res.render('producers/create')
})

routes.get('/producers/:id', producers.show)

routes.post('/producers', producers.post)

routes.get('/producers/:id/edit', producers.edit)

routes.put('/producers', producers.put)

routes.delete('/producers', producers.delete)

module.exports = routes