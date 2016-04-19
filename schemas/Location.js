const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: String,
    comments: String,
    project: {
        id: String
    }
});

module.exports = mongoose.model('Location', locationSchema);
