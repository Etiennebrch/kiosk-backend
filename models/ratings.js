var mongoose = require("mongoose");

var ratingSchema = mongoose.Schema({
    title: String,
    feedback: String,
    rating: Number,
    dateRating: Date,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "companies" },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "companies" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});
var ratingModel = mongoose.model("ratings", ratingSchema);

module.exports = ratingModel;