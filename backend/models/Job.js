const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "Jobs",
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;