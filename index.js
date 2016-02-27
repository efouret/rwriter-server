import makeStore from './src/store';
import {startServer} from './src/server';
import Project from './src/schemas/Project';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongoose connected!');
});

export const store = makeStore();
startServer(store);

Project.find()
    .then(projects => {
        console.log(`Got projects: ${projects}`);
        store.dispatch({
            type: 'SET_PROJECTS',
            projects
        }, err => {
            console.log(err);
        });
    });
