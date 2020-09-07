const express = require('express')
const producers = require('./controllers/producers')
const artists = require('./controllers/artists')

const routes = express.Router()

routes.get('/', (req,res) => {
  return res.redirect('/producers')
})

routes.get('/producers', producers.index)
routes.get('/producers/create', producers.create)
routes.post('/producers', producers.post)
routes.get('/producers/:id', producers.show)
routes.get('/producers/:id/edit', producers.edit)
routes.put('/producers', producers.put)
routes.delete('/producers', producers.delete)


routes.get('/artists', artists.index)
routes.get('/artists/create', artists.create)
routes.post('/artists', artists.post)
routes.get('/artists/:id', artists.show)
routes.get('/artists/:id/edit', artists.edit)
routes.put('/artists', artists.put)
routes.delete('/artists', artists.delete)

module.exports = routes