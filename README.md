Appolo  [![Build Status](https://travis-ci.org/shmoop207/appolo.png?branch=master)](https://travis-ci.org/shmoop207/appolo) [![Dependencies status](https://david-dm.org/shmoop207/appolo.png)](https://david-dm.org/shmoop207/appolo)
=======
![appolo](https://dl.dropboxusercontent.com/u/19179794/appollo.png)

Appolo is an MVC Framework for Node.jS. 
Build with [appolo-class][1] class system and [appolo-inject][2] dependency injection system.
Appolo architecture follows common patten of MVC and dependency injection which makes it easy to build better performance, flexibility and easy maintenance server side in nodejs.


## Features
  * MVC Architecture
  * Powerful class system
  * dependency injection
  * Manage easily configurations and environments 
  * Simple folder structures
  * Easy to get started
  * Easy integrate third party modules
  
 
## Installation ##
```javascript
npm install appolo --save
```

## Quick start
in your app.js file
```javascript
var appolo  = require('appolo');
appolo.launcher.launch();
```

## Recommended Directory Structure
the environments folder must to exist every thing else is optional appolo will require all files in the config and server folders but the environments folder will be loaded first.
```javascript
- config
    - environments
        - all.js
        - develpment.js
        - production.js
    |- modules
		|- logger.js	    
	    |- redis.js 
	    |- mongo.js
        |- modules.js
    ...
- server
    - controllers
    - managers
    - services
    - bootstrap.js
    ...
- app.js
   
```

## Configuration
appolo launch configuration options

#### options.path
Type :`array`, Default: `['config', 'server']`
The folder will be required and loaded on appolo launch

#### options.root 
Type :`string`, Default: process.cwd()
the root folder of the paths option

#### options.bootStrapClassId
Type :`string`, Default: `(process.env.NODE_ENV || 'development')`
environment file name that will override the environment all.js file
default is the node env or if not defined it will be `development`

#### options.bootStrapClassId 
Type :`string`, Default: `appolo-bootstrap`
appolo will try to find the bootstrap class after it launched and run it.
this is optional if the class is not defined nothing will happen. 

```javascript
var appolo  = require('appolo');

appolo.launcher.launch( {
    paths:['config', 'server'],
    root : process.cwd()+'/app',
    environment : 'testing',
    bootStrapClassId :'my-bootstrap'
});
```

## Environments 
With environments you can define different set of configurations depending on the environment type your app is currently running.
it is recommended to have 4 types of environments : `development`, `testing`, `staging`, `production`.
after `appolo launch` you can always to access to current environment vars via `appolo.environment`.
```javascript
//all.js
module.exports = {
    name:'all'
    someVar:'someVar'
}
//development.js
module.exports = {
    name:'development'
    db:'mongo://development-url'
}
//development.js
module.exports = {
    name:'testing'
    db:'mongo://testing-url'
}

```
if we launch our app.js with `NODE_ENV = testing`
```javascript
var appolo  = require('appolo');
appolo.launcher.launch();
var env = appolo.environment;

console.log(env.name,env.someVar,env.db) // 'testing someVar monog:://testing-url'

```
## Dependency Injection System
appolo have powerful [Dependency Injection][11] system based on [appolo-inject][12].
enables you to organize your code in [loose coupling][13] classes.
you can always access to injector via `appolo.inject`.
```javascript
//dataManager.js
var appolo  = require('appolo');
module.exports = class DataManager {
    static get $config(){ 
        return{ 
            id:'dataManager',
            singleton: true
        }
    }
    getData(){
        ...
    }
}
//fooController.js
module.exports = class FooController{
    static get $config() { 
        return {
            id:'fooController',
            singleton: false,
            initMethod:'initialize',
            inject:['dataManager']
        }
    }
    constructor() {
        this.data = null
    }
    initialize(){
        this.data =  this.dataManager.getData();
        //do something
    }
}
//app.js
var fooController = appolo.inject.getObject('fooController');
console.log(fooController.data)
```
you can also `use appolo.define`
```javascript
var appolo  = require('appolo');
class DataManager {
    getData(){
        ...
    }
}
appolo.define({ 
    id:'dataManager',
    singleton: true,
    type:DataManager
})
//or 
appolo.define('dataManager')
    .type(DataManager)
    .singleton()

class FooController{
    constructor() {
        this.data = null
    }
    initialize(){
        this.data =  this.dataManager.getData();
        //do something
    }
}
appolo.define({
    id:'fooController',
    singleton: false,
    initMethod:'initialize',
    type:FooController
    inject:['dataManager']
});
//or
appolo.define('fooController')
    .type(FooController)
    .singleton()
    .initMethod('initialize')
    .inject('dataManager');

var fooController = appolo.inject.getObject('fooController');
console.log(fooController.data)
```

you can also use constructor injection
```javascript
var appolo  = require('appolo');
class DataManager {
    getData(){
        ...
    }
}
appolo.define('dataManager')
	.type(DataManager)
	.singleton();

class FooController{
    constructor(dataManager) {
       this.dataManager = dataManager;
    }
    initialize(){
        this.data =  this.dataManager.getData();
    }
}
appolo.define('fooController')
    .type(FooController)
    .singleton()
    .initMethod('initialize');
```

## Namespace
you can define global class namespace and use it without require
```javascript
class Person{
}
appolo.define(Person).namespace("Foo.Person");

var person = new Foo.Person()
```

## statics
you can define statics value both on the class prototype and class instance
```javascript
class Person{
    get name(){
        return this.Foo
    }
}
appolo.define(Person)
    .namespace("Foo.Person")
    .statics("BAR","1")
    .statics({Foo:2});

var person = new Foo.Person()
console.log(Person.BAR) // 1
console.log(person.BAR) // 1
console.log(person.name) //2
```

## Mixins
used to add prototype functions from other classes
```javascript
class Events{
    on (event, fn) {
        return true;
    },
    un (event, fn) {
        return true;
    }
}

class Foo{
    constructor() {
    }
}

appolo.define(Foo).mixins(Events)

var foo = new Foo();
foo.on('test',function(){})

```
## Event Dispatcher
appolo have built in event dispatcher to enable classes to listen and fire events
Event Dispatcher has the following methods:

### `eventDispatcher.on(event,callback,[scope])`
add event listener
 - `event` - event name.
 - `callback` - callback function that will triggered on event name.
 - `scope` - optional, the scope of the `callback` function default: `this`.

### `eventDispatcher.un(event,callback,[scope])`     
remove event listener all the arguments must be `===` to on method else it won`t be removed.
 -  `event` - event name.
 -  `callback` - callback function.
 -  `scope` - optional, the scope of the callback function.
 
### `eventDispatcher.fireEvent(event,[arguments])`
fireEvent - triggers the callback functions on given event name
- `eventName`
- `arguments` -  all the rest `arguments` will be applied on the `callback` function

```javascript
var appolo  = require('appolo');
class FooManager extends appolo.EventDispatcher{
    notifyUsers:function(){
        this.fireEvent('someEventName',{someData:'someData'})
    }
}
appolo.define('fooManager').type(FooManager).singleton()

class FooController {
    initialize(){
        this.fooManager.on('someEventName',function(data){
            this.doSomething(data.someData)
        },this);
    }
    doSomething:function(){
    }
}

appolo.define('fooController').type(FooController)
    .initMethod('initialize')
    .inject('fooManager')
```


## Modules
third party modules can be easily loaded to appolo inject and used in the inject class system.
each module must call `appolo.use` before it can be used by `appolo launcher`.
the modules loaded in series so the module must call the `next` function in order to continue the lunch process.
you can inject the `appolo.use` function any object that is already exists in the injector 

the default injectable objects:

 - `env` - environment object,
 - `inject` - injector  - to add objects to the injector,

the last argument must be the `next` function 

```javascript
var appolo = require('appolo');

//my custom module 
appolo.use(function(env,inject,next){
	var myModuleObject = {data:'test'};	
	
	inject.addObject('myModuleObject',myModuleObject);
	
	next();
}); 
	
```
now I can inject `myModuleObject` to any class
```javascript
var appolo = require('appolo');
module.exports = class AuthMiddleware{
	static get $config(){ 
	    return {
            id:'authMiddleware',
            inject:['myModuleObject']
        }
    }
    doSomeThing {
        return this.myModuleObject.data;
    }
}
```

### Logger module
logger module example with [winston][8] and [sentry][9]

loggerModule.js file
```javascript
var winston = require('winston'),
    appolo = require('appolo'),
    Sentry = require('winston-sentry');

module.exports = function(options){
	return function(env,inject,next){
		var transports = [];
	
		if(env.type == 'production'){
		    transports.push(new Sentry({
	            level: 'warn',
	            dsn: env.sentryConnectionString,
	            json: true,
	            timestamp: true,
	            handleExceptions: true,
	            patchGlobal: true
		    }));
		}

		transports.push(new (winston.transports.Console)({
		    json: false,
		    timestamp: true,
		    handleExceptions: true
		}));

		var logger = new (winston.Logger)({
		    transports: transports,
		    exitOnError: false
		});

		inject.addObject('logger', logger);
	}
}
```
in your modules.js
```javascript
var logger= require('./loggerModule'),
    appolo = require('appolo');

appolo.use(loggerModule());	
```
now you you inject logger anywhere you want
```javascript
var appolo  = require('appolo');

class DataManager{
    initialize:function(){
        this.logger.info("dataManager initialized",{someData:'someData'})
    }
});
appolo.define('dataManager',DataManager)
    .singleton()
    .initMethod()
    .inject('logger')

```

### Socket.io Module
[Socket.io][3] module example

socketModule.js file
```javascript
var sio = require('socket.io'),
    appolo = require('appolo');

module.exports = function(options){
	return function(env,inject,app,next){
		
		var io = sio.listen(app.server);
		
		inject.addObject('io', io);
		
		next();
	}
}
```
in your modules.js
```javascript
var loggerModule= require('./loggerModule'),
	socketModule= require('./socketModule'),
    appolo = require('appolo');

appolo.use(loggerModule());
appolo.use(socketModule());	
```
usage:
```javascript

var appolo  = require('appolo');
class ChatController{
    initialize:function(){
        this.io.sockets.on('connection', function(socket){
	        this.logger.info("client connected")
            socket.broadcast.to('some_room').emit('message','client connected');
        }.bind(this);
    }
}

appolo.define('chatController')
    .type(ChatController)
    .singleton()
    .initMethod()
    .inject('io','logger')
```

### Redis Module
[Redis][4] module and [Q][5] example

redisModule.js file
```javascript
var redis = require('redis'),
    appolo = require('appolo'),
    url = require('url');

module.exports = function(options){
	return function(env,inject,logger,next){
		//you can put redis connection string in appolo environments to support 
		//different redis db in different environments
		var redisURL = url.parse(appolo.environment.redisConnectionString);
		var redisClient = redis.createClient(redisURL.port, redisURL.hostname);
		if(redisURL.auth){
		    redisClient.auth(redisURL.auth.split(":")[1]);
		}
		redisClient .on('connect', function () {
	        logger.info("connected to redisClient");
	        next();
		});
		
		inject.addObject('redis', redisClient);
	}
}
```
in your modules.js
```javascript
var loggerModule= require('./loggerModule'),
	redisModule= require('./redisModule'),
    appolo = require('appolo');

appolo.use(loggerModule());
appolo.use(redisModule());	
```
usage:
```javascript
var appolo  = require('appolo'),
    Q = require('q');

class DataManager {
    getData(){
        var deferred = Q.defer();
         this.redis.get('someKey', function (err, value) {
            err ? deferred.reject() : deferred.resolve(value);
         });
         
         return deferred.promise;
    }
}
appolo.define('dataManager',DataManager)
    .singleton()
    .inject('redis')

```
### MongoDb Module
MongoDb with [Mongose][6] and [Q][7] example

in mongooseModule.js
```javascript
var mongoose = require('mongoose'),,
    appolo = require('appolo');

module.exports = function(options){
	return function(env,inject,logger,next){
		mongoose.connect(appolo.environment.db);
		
		mongoose.on('connection',function(){
			logger.info("connected to mongo");
			next()
		});
		
		inject.addObject('mongoose', mongoose);
	}
}
```
in modules.js
```javascript
var loggerModule= require('./loggerModule'),
	mongooseModule= require('./mongooseModule'),
    appolo = require('appolo');

appolo.use(loggerModule());
appolo.use(mongooseModule());	
```

in userSchema.js 
```javascript
	var mongoose = require('mongoose'),
	    appolo = require('appolo');
	
	var userSchema = new mongoose.Schema( name : {type: String});
	var userModel = mongoose.model('User', userSchema);
	
	appolo.inject.addObject('UserModel', userModel);
	
	module.exports = userSchema ;
```
usage:
```javascript
var appolo  = require('appolo'),
    Q = require('q');

module.exports = class UserManager{
    getUser(id){
        var deferred = Q.defer();
       this.UserModel.findById(id,function(err,data){
            err ? deferred.reject() : deferred.resolve(value);
        });
        return deferred.promise;
    }
}
appolo.define('userManager',UserManager)
    .singleton()
    .inject('UserModel')
```


## Appolo Bootstrap

once it launched appolo try to find appolo `bootstrap` class and call it's `run` method.
```javascript
var appolo  = require('appolo');

class Bootstrap{
    run(){
        //start your application logic here
        this.someManager1.doSomeThing();
    }
}
appolo.define('appolo-bootstrap',Bootstrap)
    .singleton()
    .inject(['someManager1','someManager2'])

```


    
## Tests ##
```javascript
    grunt test
```

## License ##

The `appolo` library is released under the MIT license. So feel free to modify and distribute it as you wish.


  [1]: http://www.github.com/shmoop207/appolo-class
  [2]: http://www.github.com/shmoop207/appolo-inject
  [3]: https://github.com/Automattic/socket.io
  [4]: https://github.com/mranney/node_redis
  [5]: https://github.com/kriskowal/q
  [6]: https://github.com/LearnBoost/mongoose
  [7]: https://github.com/kriskowal/q
  [8]: https://github.com/flatiron/winston
  [9]: https://github.com/guzru/winston-sentry
  [10]: http://www.github.com/shmoop207/appolo-class
  [11]: http://en.wikipedia.org/wiki/Dependency_injection
  [12]: http://www.github.com/shmoop207/appolo-inject
  [13]: http://en.wikipedia.org/wiki/Loose_coupling
  [14]: https://dl-web.dropbox.com/get/Photos/appolo/appollo.png?_subject_uid=19179794&w=AABSXkNHE8R-Lr9bSD815vzTPBS_U1aJGQMsvhcRxQ38qQ
