const app = require('koa')();
const cors = require('kcors');
const mongoose = require('mongoose');

const projects = require('./routes/projects');
const characters = require('./routes/characters');
const locations = require('./routes/locations');
const chapters = require('./routes/chapters');
const scenes = require('./routes/scenes');

const port = 8090;

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error',  function (err) {
	console.log('connection error:' + err);
});
db.once('open', function () {
    console.log(`Server listening on port ${port}`);
});

app
    .use(cors())

    .use(function* (next) {
        let start = new Date;
        let inBody = this.request.body;
        yield next;
        let ms = new Date - start;
        console.log('%s - %s %s - IN %s - OUT %s - %s - %s', this.ip, this.method, this.url, inBody, this.body, this.status, ms);
    })

    .use(projects.routes())
    .use(characters.routes())
    .use(locations.routes())
    .use(chapters.routes())
    .use(scenes.routes())

    .use(projects.allowedMethods())
    .use(characters.allowedMethods())
    .use(locations.allowedMethods())
    .use(chapters.allowedMethods())
    .use(scenes.allowedMethods());

app.listen(port);
