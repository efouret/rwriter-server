"use strict";
const router    = require('koa-router')();
const koaBody   = require('koa-body')();
const Character = require('../schemas/Character');

router
    .get('/characters', koaBody,
        function *(next) {
            let projectId = /^project=(.*)$/.exec(this.querystring)[1];
            let characters = yield Character.find({"project.id": projectId}).exec();
            this.body = JSON.stringify(characters);
        }
    )
    .get('/characters/:id', koaBody,
        function *(next) {
            let character = yield Character.findById(this.params.id).exec();
            this.body = JSON.stringify(character);
        }
    )
    .post('/characters', koaBody,
        function *(next) {
            let character = yield new Character(this.request.body).save();
            this.set('Location', `/characters/${character.id}`);
            this.set('Access-Control-Expose-Headers', 'Location');
            this.status = 201;
        }
    )
    .put('/characters/:id', koaBody,
        function *(next) {
            let character = yield Character.findByIdAndUpdate(this.params.id, this.request.body);
            this.body = JSON.stringify(character);
        }
    );

module.exports = router;
