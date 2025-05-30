var mongoose = require('mongoose')

var MusicaSchema = new mongoose.Schema({
  _id: String,
  link: String,
  título: String,
  país: String,
  compositor: String,
  intérprete: String,
  letra: { type: String, required: false }
}, { _id: false })

var EdicaoSchema = new mongoose.Schema({
  _id: String,
  anoEdição: String,
  musicas: [MusicaSchema],
  organizacao: String,
  vencedor: String
}, { versionKey: false, collection: 'edicoes' })

module.exports = mongoose.model('edicao', EdicaoSchema)
