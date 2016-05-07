"use strict";
const router = require('koa-router')();
const koaBody = require('koa-body')();
const Scene = require('../schemas/Scene');

router
    .get('/scenes', koaBody,
        function *(next) {
            let chapterId = /^chapter=(.*)$/.exec(this.querystring)[1];
            let scenes = yield Scene.find({"chapter.id": chapterId}).exec();
            this.body = JSON.stringify(scenes);
        }
    )
    .get('/scenes/:id', koaBody,
        function *(next) {
            this.scene = yield Scene.findById(this.params.id).exec();
            this.body = JSON.stringify(this.scene);
        }
    )
    .post('/scenes', koaBody,
        function *(next) {
            let scene = yield new Scene(this.request.body).save();
            this.set('Location', `/scenes/${scene.id}`);
            this.set('Access-Control-Expose-Headers', 'Location');
            this.status = 201;
        }
    )
    .put('/scenes/:id', koaBody,
        function *(next) {
            let scene = yield Scene.findByIdAndUpdate(this.params.id, this.request.body);
            this.body = JSON.stringify(scene);
        }
    );

module.exports = router;
