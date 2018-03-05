var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var clienteSchema = new Schema({
  idNick: { type: String },
  name: { type: String },
  surName: { type: String },
  edad: { type: Number }
  phone: { type : Number },
  email:  { type: String }
}, { versionKey: false });
var cliente = mongoose.model('clientes', clienteSchema);
module.exports= cliente;
