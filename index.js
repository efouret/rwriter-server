const app       = require('koa')();
const cors      = require('kcors');
const mongoose  = require('mongoose');

const projects  = require('./routes/projects');
const chapters  = require('./routes/chapters');
const scenes    = require('./routes/scenes');

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongoose connected!');
});

app
    .use(cors())
    .use(projects.routes())
    .use(chapters.routes())
    .use(scenes.routes())
    .use(projects.allowedMethods())
    .use(chapters.allowedMethods())
    .use(scenes.allowedMethods());

app.listen(8090);
