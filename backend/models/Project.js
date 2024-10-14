const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectStatus: {
        type: String,
        required: true
    },
    uploadDate: { type: Date, default: Date.now },
    userId: {
        type: String,
        required: false
    },

}, {
    collection: "Projects",
  });

const Project = mongoose.model('Project', projectSchema);


module.exports = Project;
