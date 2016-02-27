import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: String,
    author: String,
    type: String
});

export default mongoose.model('Project', projectSchema);