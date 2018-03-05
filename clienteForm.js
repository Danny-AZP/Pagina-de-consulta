var express = require('express');
var router = express.Router();
var mongoose = require('./../config/conexionmongo');
var Persona = require('./../models/cliente');

router.post('/cliente/operar', (req, res, next) => {
  console.log(req.body);

  if (req.body._id === "") {
    var per = new Cliente({
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      edad: req.body.edad
    });

    per.save();
  } else {
    //console.log(req.body._id);
    Cliente.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
      if (err) throw err;
    });
  }
  res.redirect('/');
});

module.exports = router;
