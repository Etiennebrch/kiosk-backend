var mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
    message : String,
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    dateMessageSent: Date
})

var conversationSchema = mongoose.Schema({
    messages:[messagesSchema],
    senderID:{type: mongoose.Schema.Types.ObjectId, ref: 'companies'},
    receiverID:{type: mongoose.Schema.Types.ObjectId, ref: 'companies'}

});

var conversationModel = mongoose.model('conversations', conversationSchema);

module.exports = conversationModel;