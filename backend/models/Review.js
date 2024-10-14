const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    projectId: { type: String, required: true },
    posted: { type: Date, default: Date.now },
}, {
    collection: "Reviews",
  });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
