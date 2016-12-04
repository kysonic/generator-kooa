const path = require('path');

const generators = require('yeoman-generator');
const mkdirp = require('mkdirp');

const MAIN_FOLDER = './';

const APP_FOLDERS = ['app','bin','public','app/controllers','app/libs',
                     'app/locales','app/models','app/station','app/views',
                     'app/views/layouts','app/views/pages','app/views/stylesheets'];

const APP_TEMPLATES = ['app/app.js','app/bootstrap.js','app/config.json','app/routes.js',
                       'controllers/main.js','controllers/user.js','libs/mongoose.js',
                       'locales/en.js','locales/ru.js','models/user.js','station/errors.js',
                       'station/parsers.js','station/session.js','station/statics.js',
                       'station/templates.js','styles/default.styl','styles/reset.styl',
                       'tpl/default.hbs','tpl/index.hbs','bin/www','bin/wwwcluster'];

const APP_DESTINATIONS = ['app.js','app/bootstrap.js','app/config.json','app/routes.js',
                          'app/controllers/main.js','app/controllers/user.js','app/libs/mongoose.js',
                          'app/locales/en.js','app/locales/ru.js','app/models/user.js','app/station/errors.js',
                          'app/station/parsers.js','app/station/session.js','app/station/statics.js',
                          'app/station/templates.js','app/views/stylesheets/layouts/default.styl','app/views/stylesheets/reset.styl',
                          'app/views/layouts/default.hbs','app/views/pages/index.hbs','bin/www','bin/wwwcluster'];

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    initializing: function(){

    },
    prompting: function () {
        let prompts = [];

        prompts = prompts.concat([
            {type:'input',name:'appName',message:'Project name.',default:'koa'},
            {type:'input',name:'mainFolder',message:'Project basic folder.',default:'./koa'},
            {type:'input',name:'port',message:'Server will be listening this port.',default: 3000},
            {type:'input',name:'dbName',message:'Name of local database that will be used in this app.',default: 'koa-starter'},
        ]);

        return this.prompt(prompts).then((answers)=>{
            this.answers = answers;
        });
    },
    configuring: function(){
        this.destinationRoot(this.answers.mainFolder);
    },
    writing: {
        folders: function(){
            mkdirp(this.destinationRoot());
            APP_FOLDERS.forEach(dirPath=>mkdirp(path.join(this.destinationRoot(),dirPath)));
        },
        files: function(){
            const copy = (tplPath,destPath)=>this.fs.copyTpl(path.resolve(this.templatePath(),tplPath),
                                                             path.resolve(this.destinationRoot(),destPath),
                                                             this.answers);
            APP_TEMPLATES.forEach((tplPath,index)=>copy(tplPath,APP_DESTINATIONS[index]));
        }
    }
});