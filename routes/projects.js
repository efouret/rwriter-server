"use strict";
const router  = require('koa-router')();
const koaBody = require('koa-body')();
const Project = require('../schemas/Project');

router
    .get('/projects', koaBody,
        function *(next) {
            console.log('GET /projects');
            let projects = yield Project.find().exec();
            this.body = JSON.stringify(projects);
        }
    )    
    .get('/projects/:id', koaBody,
        function *(next) {
            let project = yield Project.findById(this.params.id).exec();
            this.body = JSON.stringify(project);
        }
    )
    .post('/projects', koaBody,
        function *(next) {
            let project = yield new Project(this.request.body).save();
            this.set('Location', `/projects/${project.id}`);
            this.status = 201;
        }
    );

module.exports = router;
