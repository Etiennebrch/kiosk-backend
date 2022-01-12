var mongoose = require("mongoose");

var answerSchema = mongoose.Schema({
    answer: String,
    question : String
})

var quotationSchema = mongoose.Schema({
    clientId : String,
    providerId: String,
    answers:[answerSchema],
    status: String,
    offerId: String,
    quotationUrl: String,
    dateQuotationSent: Date,
    dateQuotationPaid: Date,
    dateQuotationAccepted: Date,
    dateQuotationRequested : Date,
    dateDone: Date
})

var quotationModel = mongoose.model('quotations', quotationSchema)
module.exports = quotationModel;