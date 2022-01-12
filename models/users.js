var mongoose = require('mongoose');

var favoritesSchema = mongoose.Schema({
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'companies'},
    offerId: {type: mongoose.Schema.Types.ObjectId, ref: 'offers'}
});

var userSchema = mongoose.Schema({
    type: String,
    token: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    role: String,
    avatar: String,
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'companies'},
    favorites: [favoritesSchema]
});
var userModel = mongoose.model('users', userSchema);

module.exports = userModel;