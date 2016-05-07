"use strict";
const router = require('koa-router')();
const koaBody = require('koa-body')();
const Chapter = require('../schemas/Chapter');

router
    .get('/chapters', koaBody,
        function *(next) {
            let projectId = /^project=(.*)$/.exec(this.querystring)[1];
            let chapters = yield Chapter.find({"project.id": projectId}).exec();
            this.body = JSON.stringify(chapters);
        }
    )
    .get('/chapters/:id', koaBody,
        function *(next) {
            let chapter = yield Chapter.findById(this.params.id).exec();
            this.body = JSON.stringify(chapter);
        }
    )
    .post('/chapters', koaBody,
        function *(next) {
            let chapter = yield new Chapter(this.request.body).save();
            this.set('Location', `/chapters/${chapter.id}`);
            this.set('Access-Control-Expose-Headers', 'Location');
            this.status = 201;
        }
    ).put('/chapters/:id', koaBody,
        function *(next) {
            let chapter = yield Chapter.findByIdAndUpdate(this.params.id, this.request.body);
            this.status = 200;
        }
    );

module.exports = router;
