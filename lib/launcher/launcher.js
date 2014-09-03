"use strict";
var EventDispatcher = require('../events/event-dispatcher'),
    filesLoader = require('../loader/loader'),
    environments = require('../environments/environments'),
    inject = require('../inject/inject'),
    moduleManager = require('../modules/modules'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

var Launcher = EventDispatcher.define({

    constructor: function () {
        this.cachedRequire = [];

    },

    launch: function (config,callback) {

        this.loadOptions(config)

        this.loadEnvironments();

        this.loadFiles();

        moduleManager.initialize(this._onModuleInitialized.bind(this,callback));
    },

    _onModuleInitialized:function(callback, err,results){
        if(err) {
            if(callback){
             return callback(err)
            } else {
                throw err;
            }
        }

        this.loadInjector();

        this.loadBootStrap(this._onBootstrapInitialized.bind(this,callback))
    },

    _onBootstrapInitialized:function(callback,err){

        if(err) {
            if(callback){
                return callback(err);
            } else {
                throw err;
            }
        }

        this.fireEvent('appolo-launched');

        if(callback){
            callback();
        }
    },

    loadOptions:function(config){

        var defaults = {
            paths:['config', 'server'],
            root : process.cwd(),
            environment : (process.env.NODE_ENV || 'development'),
            bootStrapClassId :'appolo-bootstrap'

        }

        this._options = _.extend(defaults ,config || {});

        return this._options;
    },

    loadFiles:function(){
        var loadPaths = _.union(this._options.paths, environments.paths);

        //load env files
        filesLoader.load(this._options.root,loadPaths,function(filePath){
            require(filePath);
            this.cachedRequire.push(filePath);
        }.bind(this));
    },

    loadEnvironments: function () {
        var allPath = path.join(this._options.root, 'config/environments/all'),
            environmentPath = path.join(this._options.root, 'config/environments/', this._options.environment + '.js'),
            all = require(allPath),
            environment = require(environmentPath);

        this.cachedRequire.push(allPath);
        this.cachedRequire.push(environmentPath);

        //add current env config to appolo env
        _.deepExtend(environments, all, environment || {});

        //save evn name
        environments.type = this._options.environment;

        var pkg = require(path.join(process.cwd(),'package.json'));

        environments.version = pkg ?pkg.version : ""

        //add root
        environments.rootDir = this._options.root;

        inject.addObject('environment', environments);
        inject.addObject('env', environments);
        inject.addObject('inject', inject);
    },

    loadInjector: function () {
        var definitions = {},
            injectPath = path.join(this._options.root, 'config/inject');

        if (fs.existsSync(injectPath)) {

            filesLoader.load(this._options.root,path.join('config', 'inject'),function(filePath){
                _.extend(definitions, require(filePath));
                this.cachedRequire.push(filePath);
            }.bind(this));
        }

        //load inject
        inject.initialize({
            definitions: definitions,
            root: this._options.root
        });



    },

    loadBootStrap:function(callback){
        var bootstrapDef = inject.getDefinition(this._options.bootStrapClassId);

        if(bootstrapDef){
            var bootstrap = inject.getObject(this._options.bootStrapClassId);

            var args = _.getFunctionArgs(bootstrap.run);

            bootstrap.run(callback)

            if(args.length == 0){
                callback();
            }

        } else {
            callback();
        }

    },

    reset:function(){
        _.forEach(this.cachedRequire,function(filePath){
            delete require.cache[filePath];
        });

        this.cachedRequire.length = 0;

        moduleManager.reset();

        this._options = null;

        _.forEach(environments,function(value,key){
            delete environments[key];
        });

        inject.reset();

        process.removeAllListeners();
    }
});

module.exports = new Launcher();