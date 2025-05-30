const edicao = require('../models/edicao')
var Edicao = require('../models/edicao')

// Lista todos os contratos
module.exports.list = () => {
    return Edicao.find()
                .exec()   
}

// Procura um Edicao pelo seu ID
module.exports.findById = id => {
    return Edicao.findOne({'_id' : id})
            .exec()   
}

module.exports.findByOrganizador = organizador => {
    return Edicao.find({ organizacao: organizador }, {anoEdição:1, organizacao:1, vencedor:1, _id: 0})
                 .exec()
}

// Países organizadores com anos que organizaram
module.exports.getPaisesOrganizadores = () => {
  return Edicao.aggregate([
    {
      $group: {
        _id: "$organizacao",
        anos: { $push: "$anoEdição" }
      }
    },
    {
      $project: {
        _id: 0,
        pais: "$_id",
        anos: 1
      }
    },
    { $sort: { pais: 1 } }
  ]).exec()
}

// Países vencedores com anos que venceram
module.exports.getPaisesVencedores = () => {
  return Edicao.aggregate([
    {
      $group: {
        _id: "$vencedor",
        anos: { $push: "$anoEdição" }
      }
    },
    {
      $project: {
        _id: 0,
        pais: "$_id",
        anos: 1
      }
    },
    { $sort: { pais: 1 } }
  ]).exec()
}


module.exports.getInterpretes = () => {
  return Edicao.aggregate([
    { $unwind: "$musicas" },
    {
      $group: {
        _id: { nome: "$musicas.intérprete", pais: "$musicas.país" }
      }
    },
    {
      $project: {
        _id: 0,
        nome: "$_id.nome",
        pais: "$_id.pais"
      }
    },
    { $sort: { nome: 1 } }
  ]).exec()
}

// Remove um Edicao pelo ID
module.exports.delete=id=>{
    return Edicao.findByIdAndDelete(id).exec()
}

// Atualiza um Edicao pelo ID
module.exports.update=(id,Edicao)=>{
    return Edicao.findByIdAndUpdate(id, contrato).exec()
}

module.exports.insert = edicao => {
    if(Edicao.find({_id:edicao.id}).exec().length !=1){
        var newEdicao = new Contrato(edicao)
        newEdicao._id=edicao.id 
        return newEdicao.save()
    }
}

module.exports.listParticipacoesPorPais = (pais) => {
  return Edicao.aggregate([
    { $unwind: "$musicas" },                    // "explode" o array de músicas
    { $match: { "musicas.país": pais } },      // filtra só músicas do país
    {
      $project: {
        _id: 1,                                // id da edição
        anoEdição: 1,
        tituloMusica: "$musicas.título",
        interprete: "$musicas.intérprete",
        venceu: { $eq: ["$vencedor", pais] }  // true se o país venceu a edição
      }
    },
    { $sort: { anoEdição: 1 } }
  ]).exec()
}
