var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:25000/edicoes")
  .then(resp=>
    res.render('paginaInicial', { edicoes: resp.data })
  )
  .catch(err=>{
    res.render('error',{error:err})
  });
});

router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:25000/edicoes/" + req.params.id)
  .then(resp=>
    res.render('edicaoDetalhe', { edicao: resp.data })
  )
  .catch(err=>{
    res.render('error',{error:err})
  });
})

router.get("/paises/:pais", async function(req, res, next) {
  try {
    const participacoesResp = await axios.get("http://localhost:25000/paticipacao/" + req.params.pais);
    const organizadoresResp = await axios.get("http://localhost:25000/paises?papel=org");

    let list_org = [];
    for (const org of organizadoresResp.data) {
      if (org.pais === req.params.pais) {
        for (const ano of org.anos) {
          list_org.push(ano);
        }
        break;
      }
    }

    res.render('paisDetalhado', { 
      participacoes: participacoesResp.data, 
      organizadores: list_org, 
      pais: req.params.pais 
    });
  } catch (err) {
    res.render('error', { error: err });
  }
});

module.exports = router;
