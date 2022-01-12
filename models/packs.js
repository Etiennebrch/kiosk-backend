var mongoose = require('mongoose');

var packSchema = mongoose.Schema({
    packName: String,
    packImage: String,
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: "offers" }]
});

var packModel = mongoose.model('packs', packSchema);

module.exports = packModel;