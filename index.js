import mongoose from 'mongoose';

import makeStore from './src/store';
import {startServer} from './src/server';
import Project from './src/schemas/Project';
import {fetchProjects} from './src/actions';

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongoose connected!');
    const store = makeStore();
    store.dispatch(fetchProjects());
    startServer(store);
});

