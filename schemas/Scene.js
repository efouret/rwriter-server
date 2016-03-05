const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema({
    number: Number,
    title: String,
    contents: String,
    chapter: {
        id: String
    },
    characters: [{
        id: String
    }],
    locations: [{
        id: String
    }],
    comments: String
});

module.exports = mongoose.model('Scene', sceneSchema);
