"use strict";
const router    = require('koa-router')();
const koaBody   = require('koa-body')();
const Location = require('../schemas/Location');

router
    .get('/locations', koaBody,
        function *(next) {
            let projectId = /^project=(.*)$/.exec(this.querystring)[1];
            let locations = yield Location.find({"project.id": projectId}).exec();
            this.body = JSON.stringify(locations);
        }
    )
    .get('/locations/:id', koaBody,
        function *(next) {
            let location = yield Location.findById(this.params.id).exec();
            this.body = JSON.stringify(location);
        }
    )
    .post('/locations', koaBody,
        function *(next) {
            let location = yield new Location(this.request.body).save();
            this.set('Location', `/locations/${location.id}`);
            this.status = 201;
        }
    );

module.exports = router;
