var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//user  schema

var jobSchema = new Schema({
  Subject: {
    type: String,
    required: true
  },
  introEmail: {
    type: String,
      required: true
  },
  company: {
    type: String,
      required: true
  }
});
var userSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  job: [jobSchema]
});
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
