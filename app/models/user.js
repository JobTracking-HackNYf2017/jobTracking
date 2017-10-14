var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//user  schema
var user = new Schema({
    id: {
        type: String
        , required: true
    }
    , token: {
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
user.pre('save', function (next) {
    var user = this;
    return next();
});
module.exports = mongoose.model('User', user);
