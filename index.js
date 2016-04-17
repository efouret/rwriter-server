const app = require('koa')();
const cors = require('kcors');
const mongoose = require('mongoose');

const projects = require('./routes/projects');
const characters = require('./routes/characters');
const chapters = require('./routes/chapters');
const scenes = require('./routes/scenes');

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose connected!');
});

app
    .use(cors())
    .use(function* (next) {
        let start = new Date;
        yield next;
        let ms = new Date - start;
        console.log('%s %s - %s', this.method, this.url, ms);
    })
    .use(projects.routes())
    .use(characters.routes())
    .use(chapters.routes())
    .use(scenes.routes())
    .use(projects.allowedMethods())
    .use(characters.allowedMethods())
    .use(chapters.allowedMethods())
    .use(scenes.allowedMethods());

app.listen(8090);
