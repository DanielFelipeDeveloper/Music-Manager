const fs = require('fs')
const Intl = require('intl')

const data = require('./data.json')

const { age, daw } = require('./utils')

exports.post = (req,res) => {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Please, fill al fields')
    }
  } 

  let { avatar_url, name, birth, services, musicalGenre, daw, gender } = req.body

  req.body.birth = Date.parse(req.body.birth)
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
  }

  return res.render('producers/show', { producer })
}

exports.edit = (req,res) => {
  const { id } = req.params

  const foundProducer = data.producers.find(function(producer){
    return id == producer.id
  })

  if(!foundProducer) return res.send("Producer not found!!")

  return res.render('producers/edit', { producer: foundProducer })
}