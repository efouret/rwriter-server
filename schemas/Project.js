const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    author: String,
    type: String
});

module.exports = mongoose.model('Project', projectSchema);

