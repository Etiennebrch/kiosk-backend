var mongoose = require('mongoose');

var labelSchema = mongoose.Schema({
    labelName: String,
    website: String,
    logo: String
});

var labelModel = mongoose.model('labels', labelSchema);

module.exports = labelModel;