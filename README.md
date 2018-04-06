Appolo HTTP [![Build Status](https://travis-ci.org/shmoop207/appolo-http.png?branch=master)](https://travis-ci.org/shmoop207/appolo-http) [![Dependencies status](https://david-dm.org/shmoop207/appolo-http.png)](https://david-dm.org/shmoop207/appolo-http) [![NPM version](https://badge.fury.io/js/appolo-http.svg)](https://badge.fury.io/js/appolo-http)
[![npm Downloads](https://img.shields.io/npm/dm/wascally.svg?style=flat)](https://www.npmjs.com/package/wascally)
=======

![appolo](https://www.dropbox.com/s/pwdvd6ohb74t7r7/appollo.png?raw=1)

Appolo HTTP is an light MVC Framework for Node.js written in Typescript<br>
Build with [appolo][2] framework and [appolo-inject][3] dependency injection module.<br>
Appolo architecture follows common patten of MVC and dependency injection which makes it easy to build better performance, flexibility and easy maintenance server side in nodejs.


## Features
  * Super fast
  * MVC Architecture
  * Full support for [express][4] middlewares
  * Dependency injection system
  * Simple routing system
  * Routes validation
  * Manage easily configurations and environments 
  * Simple folder structures
  * Easy integrate third party modules
  * Easy to get started
      
## Installation
```javascript
npm install appolo-http --save
```
## Typescript
`appolo-http` requires TypeScript compiler version > 2.1 and the following settings in `tsconfig.json`:
```javascript
{
    "experimentalDecorators": true
}
```
## Quick Start 
In your app.js file:
```javascript
var appolo  = require('appolo-http');
appolo.launch();
```

## Benchmarks
```
node benchmarks/benchmarks
```
__Machine:__ 2.2 GHz Intel Core i7, 16GiB RAM

__Method:__ `autocannon -c 100 -d 10 -p 10 localhost:3000`

| Name | Average | Min | Max
| --- | --- | --- | --- |
| Req/Sec | 32,821.6  | 23,840 | 34,463

<!---## Appolo Http Boilerplate
Small example project to get you started with appolo.<br>
source code : [https://github.com/shmoop207/appolo-express-boilerplate][8]
```bash
git clone https://github.com/shmoop207/appolo-express-boilerplate.git
```
-->
## Examples
#### Real-time Stocks
  * live demo: [demo](http://appolo-http-quotes-example.herokuapp.com). 
  * source code: [code](https://github.com/shmoop207/quotes-example).

#### Chat
* source code: [source](https://github.com/shmoop207/appolo-chat-example)
* live demo:[demo](http://appolo-chat-example.herokuapp.com/)


## Recommended Directory Structure
The `config/environments` folder is required. Appolo will require all files in the `config` and `server` folders, but the environments folder will be loaded first. All other folders are optional and will not influence the way appolo-http works. 
```javascript
|- config
  |- environments
    |- all.ts
    |- development.ts
    |- production.ts
  |- express
    |- all.ts
  |- modules
    |- logger.ts
    |- redis.ts
    |- mongo.ts
    |- modules.ts
    ...
|- server
    |- controllers
    |- managers
    |- middleware
    |- services
    |- bootstrap.ts
    ...
|- app.ts
   
```

## Configuration
appolo launch configuration options, all options are optional

| key | Description | Type | Default
| --- | --- | --- | --- |
| `paths` | folders that will be required and loaded on appolo launch | `array`|  `['config', 'server']`| 
| `root` | the root folder of the paths option | `string` | `process.cwd()` |
| `environment` | environment file name that will override the settinngs in `environments/all.js` | `string` | `(process.env.NODE_ENV || 'development')` |
| `startMessage` | the message that will be written to console log the the server starts | `string` | `'Appolo Server listening on port: {port} version:{version} environment: {environment}'` |
| `startServer` | if true the server will start immediately to listen to port else you will have to start in manually. | `boolean` | `true` |
| `port` | the port that the app will listen to. | `number` | `process.env.PORT || this._options.port || appolo.environment.port || 8080)`` |
| `errorStack` | print route http stack error when env is not development | `boolen` | `false` |
| `errorMessage` | print route http error.toString() | `boolen` | `true` |
| `maxRouteCache` | the max size of route lookup lru cache | `number` | `10000` |

#### usage example:
```javascript
let appolo  = require('appolo-http');

appolo.launcher.launch( {
    paths:['config', 'server'],
    root : process.cwd()+'/app',
    environment : 'testing',
    port:8182,    
});
```

## Environments
With environments you can define different configurations depending on the environment type your app is currently running.
It is recommended to have 4 types of environments: `development`, `testing`, `staging`, `production`.
After `appolo.launch` you can always access the current environment vars via `appolo.environment`.
```javascript
//all.ts
export = {
    name:'all',
    someVar:'someVar'
}
//development.ts
export = {
    name:'develpment',
    db:'mongo://development-url'
}
//development.ts
export = {
    name:'testing',
    db:'mongo://testing-url'
}

```
If we launch our app.js with `NODE_ENV = testing`
```javascript
var appolo  = require('appolo-http');
appolo.launcher.launch();
var env = appolo.environment;
console.log(env.name,env.someVar,env.db) // 'testing someVar monog:://testing-url'
```

## Express modules
You can configure express modules or add custom middleware by adding configuration files to the express folder.
The express configuration file is called after the environment files were loaded.
```javascript
//express/all.ts
import favicon = require('static-favicon');
import bodyParser = require("body-parser");

export = function (app: appolo.App) {
    app.use(bodyParser.json());
    
    app.use(function (req: appolo.IRequest, res: appolo.IResponse, next: appolo.NextFn) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });
    app.use(favicon());
}
```
## Routes
You can easily bind a route path to a controller method.
The routes path are defined in the same way as in [expressjs][10] router.

Each route class has the following methods:

 - `path` - same as in expressjs.
 - `method` - one of `get`,`post`,`patch`,`delete`,`put`. default `get`.
 - `action` - the action function the will be invoked to handle the route.
 - `middleware` - middleware function the will be invoked before the controller. If the `next` function is not called or called with an error, the controller won`t be created.
 - `validation` - validations object as defined in [joi][11].

```javascript
import {define,singleton,initMethod,inject,Controller,IRequest,IResponse} from 'appolo-http';

@define()
export class TestController extends Controller{
    @inject() dataManager:DataManager
    
    @path("/test/:userId")
    @method(appolo.Methods.POST)
    public test (req:IRequest, res:IResponse) {
       res.send(this.dataManager.getData(req.params.userId));
    }
}

@define()
export class Test2Controller extends Controller{
    @inject() dataManager:DataManager
    
    @pathPost("/test2/:userId")
    @validations("userId",validator.string().required())
    public test (req:IRequest, res:IResponse) {
       res.send(this.dataManager.getData(req.params.userId));
    }
}
```
You can also define routes using `appolo.route` method:

```javascript
import {define,singleton,initMethod,inject,Controller,IRequest,IResponse} from 'appolo-http';

@define()
export class TestController extends Controller{
    @inject() dataManager:DataManager
    
    public test (req:IRequest, res:IResponse) {
       res.send(this.dataManager.getData());
    }
}

appolo.route<TestController>(TestController)
    .path("/test/")
    .method(appolo.Methods.GET)
    .action(c=>c.test)
```

## Routes Validation 
You can add validations to your routes. The action controller will be called only if the route params are valid.<br>
Validations are done using [joi module][11] .<br>
The validator takes request params from `req.param` , `req.query` and `req.body`. After validation, all request params will be available on `req.model`.

```javascript
import {define,singleton,initMethod,inject,Controller,IRequest,IResponse} from 'appolo-http';
let validator = appolo.validator;

@define()
export class TestController extends Controller{
    
    @inject() dataManager:DataManager
    
    public async search (req:IRequest, res:IResponse) {
       try{
           let model = req.model;
           let result = await this.dataManager.getSearchResults(model.search,model.page,model.pageSize)
            this.sendOk(result)
       }catch(e){
           this.sendError(e)
       } 
    }
}

appolo.route<TestController>(TestController)
    .path('/search/')
    .action(c=>c.search)
    .validations({
        search:validator.string().required(),
        pageSize:validator.number().default(20),
        page:validator.number().default(1)
    })
```

If the request params are not valid, appolo will return a `400 Bad Request` response with detailed validation errors.
```javascript
{
    status: 400,
    statusText: "Bad Request",
    error: "userId is required"
    
}
```

## Controllers
Controllers are classes that handle routes request.
In order for the router to be able to handle the request, a controller class must extend `appolo.Controller`.
Each controller action will be called with [request][12] and [response][13] objects.

```javascript
import {define,inject,mehtod,path,validation,Controller,Methods,IRequest,IResponse,IRouteOptions,validator} from 'appolo-http';

@define()
export class LoginController extends Controller{
    
    @inject() authManager:AuthManager;
    
    @path("/login/")
    @mehtod(Methods.POST)
    @validation("username", validator.string())
    @validation("password", validator.string())
    public aynsc loginUser(req:IRequest,res:IResponse,route:IRouteOptions){
        try{
            let result =  await this.authManager.validateUser(req.model.username,req.model.password)
            this.send(result)

        }catch (e){
            this.sendError(e)
        }
    }
}
```
By default, appolo creates a new controller instance for every request. If you do not need a new controller instance for every request, you can inherit from StaticController which is singleton.
```javascript
import {define,singleton,inject,lazy,mehtod,path,validation,StaticController,Methods,validator,IRequest,IResponse,IRouteOptions} from 'appolo-http';
@define()
@singleton()
@lazy()
export class LoginController extends StaticController{
    @inject() authManager:AuthManager;
    
    @path("/login/")
    @mehtod(Methods.POST)
    @validation("username", validator.string().required())
    @validation("password", validator.string().required())
    public aynsc loginUser(req:IRequest,res:IResponse,route:IRouteOptions){
        try{
            let result = await this.authManager.validateUser(req.model.username,req.model.password)
            this.send(res,result)
        
        }catch (e){
            this.sendError(e)
        }
    }
}
```
### appolo.Controller
 - `this.req` -   request object
 - `this.res` -   response object
 - `this.route` - the route object of the current action 

### json success helper methods

 - `this.send([statusCode?:number?,data?:any])` - send json response with status code 
 - `this.sendOk([data?:any])` - send json with statusCode 200
 - `this.sendCreated([data?:any])` - send json with statusCode 201
 - `this.sendNoContent()` send empty response with statusCode 204

### json server error helper methods
 - `this.sendError([error?:Error,code?:number])` send Error with statusCode 500
 - `this.sendBadRequest([error?:Error,code?:number])` send Error with statusCode 400
 - `this.sendUnauthorized([error?:Error,code?:number])` send Error with statusCode 403
 - `this.sendNotFound([error?:Error,code?:number])` send Error with statusCode 404

send json error response with optional message

 - `error` - the error object that will be passed to the response
 - `code` - the error code object that will be passed to the response


```javascript
{
     "status": 500,
     "statusText": "Internal Server Error",
     "error":"something is wrong",
     "code":1001
}
```

## Middleware 
A middleware class will run before the action of the controller is invoked.
The middleware class must extend must extend `appolo.Middleware` and implement the `run` method.

Middleware file:
```javascript
import {define,inject,Middleware,IRequest,IResponse,NextFn,IRouteOptions} from 'appolo-http';
@define()
export class AuthMiddleware extends Middleware {
    
    @inject() authManager:AuthManager;
    
    public async run(req:appolo.IRequest,res:IResponse,next:NextFn,route:IRouteOptions){
        try{
            let result =  await this.authManager.validateToken(req.headers.authorization)     
            req.user = user;
            next();
            
        }catch(e){
            this.sendUnauthorized();
        } 
    }
    
}
```

In order to use a middleware in a controller, add it using `appolo.route(...).middleware(<middleware-id>)`:
```javascript
    appolo.route("someController").path("somePath").middleware(AuthMiddleware)
```

## Dependency Injection System
Appolo has a powerful [Dependency Injection][22] system based on [appolo-inject][23].
It enables you to write organised, testable code based on the [loose coupling][24] idea.
You can always access the injector via `appolo.injector`.

### class decorators 
 - `define` - make the object injectable
 - [`singleton`](https://github.com/shmoop207/appolo-inject#singleton) - the class will be created only once and the injector will return the same instance every time
 - `lazy` - wait for the class to be injected before creating it
 - [`alias`](https://github.com/shmoop207/appolo-inject#alias) - add alias name to the object (allows injecting multiple objects which share an alias using `injectAlias`)
 - [`aliasFactory`](https://github.com/shmoop207/appolo-inject#alias-factory) - add alias factory name to the object (allows injecting multiple objects which share an alias using `injectAliasFactory`)
### methods decorators  
 - [`initMethod`](https://github.com/shmoop207/appolo-inject#init-method) - The method will be called after all instances were created and all the properties injected.
 ### property decorators  
 - [`inject`](https://github.com/shmoop207/appolo-inject#inject-property-instance) - inject instance reference by id
 - [`injectFactoryMethod`](https://github.com/shmoop207/appolo-inject#inject-factory-method) - factory method is a function that will return the injected object. This is useful to create many instances of the same class.
 - [`injectAlias`](https://github.com/shmoop207/appolo-inject#alias) - inject objects by alias name
 - [`injectArray`](https://github.com/shmoop207/appolo-inject#inject-property-array) - inject array of properties by reference or by value
 - [`injectDictionary`](https://github.com/shmoop207/appolo-inject#inject-property-dictionary) - inject a dictionary of properties by reference or by value.
 - [`injectAliasFactory`](https://github.com/shmoop207/appolo-inject#alias-factory) - inject factory methods by alias name
 - [`injectFactory`](https://github.com/shmoop207/appolo-inject#inject-property-from-factory-object) inject object by factory class
 - [`injectObjectProperty`](https://github.com/shmoop207/appolo-inject#inject-property-from-object-property) inject property of another object
 - [`injectValue`](https://github.com/shmoop207/appolo-inject#inject-property-value) inject property by value
###  method parameter decorators
 - `injectParam` - inject object by parameter
```javascript
//dataManager.ts
import {define,singleton,initMethod,inject} from 'appolo-http';
@define()
@singleton()
export class DataManager {
    getData(){
        ...
    }
}
//fooController.ts
@define()
export class FooController{
   
    @inject() dataManager:DataManager
    
    constructor() {
        this.data = null
    }
    @initMethod()
    initialize(){
        this.data =  this.dataManager.getData();
        //do something
    }
}
//app.ts
let fooController = appolo.inject.getObject('fooController');
console.log(fooController.data)
```
you can also `use appolo.register`
```javascript
appolo.register('dataManager')
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

appolo.register('fooController')
    .type(FooController)
    .singleton()
    .initMethod('initialize')
    .inject('dataManager');

let fooController = appolo.inject.getObject('fooController');
console.log(fooController.data)
```

You can also use constructor injection or method parameter injection:
```javascript
import {define,singleton,injectParam,initMethod,inject} from 'appolo-http';
@define()
@singleton()
export class DataManager {
    getData(){
        ...
    }
}
@define()
class FooController{
    constructor(@injectParam() dataManager:DataManager) {
       this.dataManager = dataManager;
    }
    @initMethod()
    public initialize(){
        this.data =  this.dataManager.getData();
    }
    
    public test(@injectParam() logger:Logger){
        //...
    }
}

```

### Inherited injections
Inherited injections are supported as well.
Anything you inject on a base class will be available to child classes.
Remember not to use `@define` on the parent class.
```javascript
import {define,singleton,injectParam,initMethod,inject} from 'appolo-http';

export class BaseManager {
    @inject() protected env:any
    private getData(){
        ...
    }
}
@define()
class FooManager extends BaseManager{
    
    @initMethod()
    public initialize(){
        //the env object in injected from the base class
        console.log(this.env.test) 
    }
    
}

``` 

## Event Dispatcher
Appolo has a built-in event dispatcher to enable classes to listen to and fire events.
Event Dispatcher has the following methods:

- `eventDispatcher.on(event,callback,[scope])` add an event listener
   - `event` - event name.
   - `callback` - callback function that will triggered on event name.
   - `scope` - optional, the scope of the `callback` function default: `this`.

- `eventDispatcher.un(event,callback,[scope])` - remove an event listener. All the arguments must be `===` to the onces used in the `on` method, or else it won\`t be removed.
   -  `event` - event name.
   -  `callback` - callback function.
   -  `scope` - optional, the scope of the callback function.
 
- `eventDispatcher.fireEvent(event,[arguments])` fireEvent - triggers the callback functions of a given event name
   - `eventName` - name of the event
   - `arguments` -  all other `arguments` will be passed to the `callback` function

```javascript
import {define,singleton,injectParam,initMethod,inject,EventDispatcher} from 'appolo-http';
@define()
@singleton()
export class FooManager extends EventDispatcher{
    public notifyUsers(){
        this.fireEvent('someEventName',{someData:'someData'})
    }
}
@define()
export class FooController {
    
    @inject() fooManager:FooManager;
    
    @initMethod()
    public initialize(){
        this.fooManager.on('someEventName',(data)=>{
            this.doSomething(data.someData)
        },this);
    }
    doSomething(data){
        ///    
    }
}
```


## Modules
Third party modules can be easily loaded intto appolo inject and used in the inject container.
Each module must call `appolo.use` before it can be used by `appolo launcher`.
`appolo.use` accepts a function as anargument. The last argument to that function must be the `next` function: modules are loaded serially, so each module must call the `next` function or return a `promise` in order to continue the launch process.
Other arguments to the function are object which you wish to inject into the module (these objects must be injected earlier). 

By default, each module can inject:

 - `env` - environment object,
 - `inject` - injector  - to add objects to the injector,

Module example:
```javascript
import appolo = require('appolo-http');
export = function(){
//my custom module 
    appolo.use(function(env:any,inject:appolo.Injector,next:appolo.NextFn){
        let myModuleObject = {data:'test'};	
        inject.addObject('myModuleObject',myModuleObject);
        next();
    }); 
//or with promise
    appolo.use(async function(env:any,inject:appolo.Injector){
        let myModuleObject = {data:'test'};
        await toSomeThing();
        inject.addObject('myModuleObject',myModuleObject);
    });

}
//or with asyc await and appolo load
export = async function(){
    await appolo.load(function(env:any,inject:appolo.Injector){
        let myModuleObject = {data:'test'};	
        inject.addObject('myModuleObject',myModuleObject);
    });
}
```
Now we can inject `myModuleObject` to any class:
```javascript
import {define,singleton,injectParam,initMethod,inject} from 'appolo-http';
@define()
export  class AuthMiddleware{
	
    @inject('myModuleObject') testObject:any
    
    public doSomeThing() {
        return this.testObject.data; //return 'test'
    }
}
```

### Logger module example
A logger module example with [winston][19]

loggerModule.js file:
```javascript
import winston = require('winston');
import appolo = require('appolo');

appolo.use(async function(env:any,inject:appolo.Injector){
    
    transports.push(new (winston.transports.Console)({
        json: false,
        timestamp: true,
        handleExceptions: true
    }));

    let logger = new (winston.Logger)({
        transports: transports,
        exitOnError: false
    });

    inject.addObject('logger', logger);
});
```
Now we you inject logger anywhere we need it:
```javascript
import {define,singleton,initMethod,inject} from 'appolo-http';
@define()
export class DataManager{
    @inject() logger:Logger
    public initialize(){
        this.logger.info("dataManager initialized",{someData:'someData'})
    }
}
```

## Appolo Bootstrap

Once it launched, appolo will try to find an appolo `bootstrap` class and call it's `run` method. Only when the bootstrap is finished, the server will start
```javascript
import {define,singleton,injectParam,initMethod,inject,bootstrap,IBootstrap} from 'appolo-http';
@define()
@bootstrap()
export class Bootstrap implements IBootstrap{
    
    @inject() someManager1:SomeManager1
    public async run(){
        //start your application logic here
        await this.someManager1.doSomeThing();
    }
}

```


## Appolo Reset ##
You can reset appolo sever by calling `appolo.reset()`. This will clean all environments, config, injector and close the server.

    
## Tests ##
```javascript
    grunt test
```

## License ##

The `appolo` library is released under the MIT license. So feel free to modify and distribute it as you wish.


  [1]: http://expressjs.com/
  [2]: https://www.github.com/shmoop207/appolo
  [3]: https://www.github.com/shmoop207/appolo-inject
  [4]: http://expressjs.com/en/resources/middleware.html
  [10]:http://expressjs.com/en/guide/routing.html
  [11]: https://github.com/hapijs/joi
  [12]: http://expressjs.com/en/4x/api.html#req
  [13]: http://expressjs.com/en/4x/api.html#res
  [19]: https://github.com/flatiron/winston
  [22]: http://en.wikipedia.org/wiki/Dependency_injection
  [23]: https://github.com/shmoop207/appolo-inject
  [24]: http://en.wikipedia.org/wiki/Loose_coupling
