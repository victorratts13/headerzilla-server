var express = require('express');
var router = express.Router();
var { SetHeaderKey } = require('../controller/ServerKeyController.js');

var url = 'https://www.ifood.com.br/delivery/fortaleza-ce/mais-acai-mania-parque-dois-irmaos/7a0f1bd4-5673-460f-8269-c0bbed381547';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    'service': 'running',
    'status': true
  })
});

router.get('/serverkey', async function (req, res, next) {
  var { call, spected, q } = req.query;
  console.log(q)
  var headers = await SetHeaderKey(call ?? url, spected ?? 'secret_key');
  res.json(headers);
});

module.exports = router;
