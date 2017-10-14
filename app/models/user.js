var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//messages  schema
var user = new Schema({
    id: {
        type: String
        , required: true
    }
    , toke: {
        type: String
        , required: true
    }
    , name: {
        type: String
        , required: true
    }
    , email: {
        type: String
        , required: true
    }
});
signupSchema.pre('save', function (next) {
    var user = this;
    return next();
});
module.exports = mongoose.model('User', signupSchema);
