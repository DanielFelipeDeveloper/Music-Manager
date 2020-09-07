const data = require('../data.json')
const fs = require('fs')
const { age, experience, date } = require('../utils')

exports.index = (req,res) => {
  return res.render('artists/index', { artists : data.artists })
}

exports.create = (req,res) => {
  return res.render('artists/create')
}

exports.post = (req,res) => {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if(req.body[key] == '') {
      return res.send("Please, fill all fields")
    }
  }

  let {avatar_url, name, birth, musicalGenre, experience, email, gender } = req.body

  birth = Date.parse(req.body.birth)
  id = Number(data.artists.length + 1)

  data.artists.push({
    id,
    avatar_url,
    name,
    birth, 
    musicalGenre,
    experience, 
    email, 
    gender,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if(err) return res.send("Write file error")

    return res.redirect('artists')
  })

}

exports.show = (req,res) => {
  const { id } = req.params

  const foundArtist = data.artists.find(function(artist) {
    return artist.id == id
  })

  if(!foundArtist) return res.send("Artist not found!")

  const artist = {
    ...foundArtist,
    musicalGenre: foundArtist.musicalGenre.split(','),
    age: age(foundArtist.birth),
    experience: experience(foundArtist.experience)
  }

  return res.render('artists/show', { artist })
}

exports.edit = (req,res) => {
  const { id } = req.params

  const foundArtist = data.artists.find(function(artist){
    return id == artist.id
  })

  if(!foundArtist) return res.send('Artist not found!')

  artist = {
    ...foundArtist,
    birth: date(foundArtist.birth)
  }

  return res.render('artists/edit', { artist })
}

exports.put = (req,res) => {
  const { id } = req.body
  let index = 0

  const foundArtist = data.artists.find(function(artist, foundIndex) {
    if (id == artist.id) {
      index = foundIndex
      return true
    }
  })

  if(!foundArtist) return res.send("Artist not found!")

  const artist = {
    ...foundArtist,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.artists[index] = artist

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if(err) return res.send("Write file error")

    return res.redirect(`/artists/${id}`)
  })
}

exports.delete = (req,res) => {
  const { id } = req.body

  const filteredArtists = data.artists.filter(function(artist){
    return artist.id != id
  })

  data.artists = filteredArtists

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if(err) return res.send("Write file error")

    return res.redirect('/artists')
  })
}