var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicoes');


router.get('/edicoes', function(req, res, next) {
  if (req.query.org) {
    Edicao.findByOrganizador(req.query.org)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
    return;
  }
  Edicao.list()
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro));
});

router.get('/edicoes/:id', function(req, res, next) {
  Edicao.findById(req.params.id)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro));
});

router.get('/paises', function(req, res) {
  if (req.query.papel === 'org'){
    Edicao.getPaisesOrganizadores()
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
  }else if (req.query.papel === 'venc') {
    Edicao.getPaisesVencedores()
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(500).jsonp(erro));
  } else {
    res.status(400).jsonp({ error: 'Parâmetro inválido' });
  }
});

router.get("/interpretes", function(req, res) {
  Edicao.getInterpretes()
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro));
});

router.get("/paticipacao/:pais", function(req, res) {
  Edicao.listParticipacoesPorPais(req.params.pais)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro));
})

router.post('/edicoes', function(req, res, next) {
  Edicao.insert(req.body)
      .then(data => res.status(201).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro));
});

router.put('/edicoes/:id', function(req, res, next) {
  Edicao.update(req.params.id, req.body)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro));
}
);

router.delete('/edicoes/:id', function(req, res, next) {
  Edicao.delete(req.params.id)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro));
}
);



module.exports = router;
