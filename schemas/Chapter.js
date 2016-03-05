const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({ 
    number: Number,
    title: String,
    comments: String,
    project: {
        id: String
    }    
});

module.exports = mongoose.model('Chapter', chapterSchema);
