const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: String,
    biography: String,
    comments: String,
    project: {
        id: String
    }
});

module.exports = mongoose.model('Character', characterSchema);
