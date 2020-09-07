const fs = require('fs')
const Intl = require('intl')

const data = require('../data.json')

const { age, daw, date } = require('../utils')

exports.index = (req,res) => {
  return res.render('producers/index', { producers : data.producers })
}

exports.create = (req, res) => {
  return res.render('producers/create')
}

exports.post = (req,res) => {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Please, fill al fields')
    }
  } 

  let { avatar_url, name, birth, services, musicalGenre, daw, gender } = req.body

  birth = Date.parse(req.body.birth)
  const created_at = Date.now()
  const id = Number(data.producers.length + 1)

  data.producers.push({
    id,
    avatar_url,
    name,
    birth,
    services,
    musicalGenre,
    daw,
    gender,
    created_at
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return console.log('Write file error!')

    return res.redirect('/producers')
  })

  
}

exports.show = (req,res) => {
  const { id } = req.params

  const foundProducer = data.producers.find(function(producer){
    return producer.id == id
  })

  if (!foundProducer) return res.send("Instructor not found")

  const producer = {
    ...foundProducer,
    age: age(foundProducer.birth),
    daw: daw(foundProducer.daw),
    services: foundProducer.services.split(','),
    musicalGenre: foundProducer.musicalGenre.split(','),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundProducer.created_at),
    birth: date(foundProducer.birth)
  }

  return res.render('producers/show', { producer })
}

exports.edit = (req,res) => {
  const { id } = req.params

  const foundProducer = data.producers.find(function(producer){
    return id == producer.id
  })

  if(!foundProducer) return res.send("Producer not found!!")

  producer = {
    ...foundProducer,
    birth: date(foundProducer.birth)
  }

  return res.render('producers/edit', { producer })
}

exports.put = (req,res) => {
  const { id } = req.body
  let index = 0

  const foundProducer = data.producers.find(function(producer, foundIndex) {
    if (id == producer.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundProducer) return res.send('Producer not found')

  const producer = {
    ...foundProducer,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.producers[index] = producer

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write error')

    return res.redirect(`/producers/${id}`)
  })
}

exports.delete = (req,res) => {
  const { id } = req.body

  const filteredProducers = data.producers.filter(function(producer){
    return producer.id != id // true or false
  })

  data.producers = filteredProducers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) console.log("Write file error")

    return res.redirect('/producers')
  })
}