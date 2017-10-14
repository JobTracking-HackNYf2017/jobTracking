//posible job schema if necesary
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//user  schema
var jobSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: false
  },
  id: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Jobs', jobSchema);
