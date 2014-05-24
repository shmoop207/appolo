Appolo  [![Build Status](https://travis-ci.org/shmoop207/appolo.png?branch=master)](https://travis-ci.org/shmoop207/appolo) [![Dependencies status](https://david-dm.org/shmoop207/appolo.png)](https://david-dm.org/shmoop207/appolo)
=======

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
  
 
## Installation ##
```javascript
npm install appolo --save
```

##Quick start ##
in your app.js file

```javascript
var appolo  = require('appolo');

appolo.launcher.launch();
```

##Recommended Directory Structure ##
the environments folder must to exist every thing else is optional appolo will require all files in the config and server folders but the environments folder will be loaded first.
```javascript
    - config
        - enviremnts
            - all.js
            - develpment.js
            - production.js
        - loggers
            - logger.js
        - redis
            - redis.js
        ...
    - server
        - controllers
        - managers
        - services
        - bootstrap.js
        ...
    - app.js
   
```

##Configuration##
appolo launch configuration options

####options.paths####
Type :`array`, Default: `['config', 'server']`
The folder will be required and loaded on appolo launch

####options.root####
Type :`string`, Default: process.cwd()
the root folder of the paths option

####options.bootStrapClassId####
Type :`string`, Default: `(process.env.NODE_ENV || 'development')`
environment file name that will override the environment all.js file
default is the node env or if not defined it will be `development`

####options.bootStrapClassId####
Type :`string`, Default: `appolo-bootstrap`
appolo will try to find the bootstrap class after it launched and run it.
this is optinal if the class is not defined nothing will happen. 

```javascript
var appolo  = require('appolo');

appolo.launcher.launch( {
    paths:['config', 'server'],
    root : process.cwd()+'/app',
    environment : 'testing',
    bootStrapClassId :'my-bootsrap'
});
```

##Environments##
With environments you can define different set of configurations depending on the environment type your app is currently running.
it is recommened to have 4 types of environments : `develpment`, `testing`, `staging`, `production`.
after `appolo launch` you can always to access to current environment vars via `appolo.environment`.

```javascript
//all.js
module.exports = {
    name:'all'
    someVar:'someVar'
}
//develpment.js
module.exports = {
    name:'develpment'
    db:'monog:://develpment-url'
}
//develpment.js
module.exports = {
    name:'testing'
    db:'monog:://testing-url'
}

```
if we launch our app.js with `NODE_ENV = testing`
```javascript
var appolo  = require('appolo');
appolo.launcher.launch();
var env = appolo.environment;

console.log(env.name,env.someVar,env.db) // 'testing someVar monog:://testing-url'

```

##Class System ##
appolo have powerful class system based on [appolo-class][3].
enables you write your server code classes in elegant way with `inheritance` and `mixins` for better code reuse.
```javascript
var appolo  = require('appolo');

var Rectangle = appolo.Class.define({
    constructor: function (width, height) {
        this.height = height;
        this.width = width;
    },
    area: function () {
        return this.width * this.height;
    }
});

var Square = Rectangle.define({
    constructor: function (side) {
        this.callParent(side, side);
    }
});

var square = new Square(6);
console.log(square.area()) // 36
```

##Dependency Injection System ##
appolo have powerful [Dependency Injection][4] system based on [appolo-inject][5].
enables you to organize your code in [loose coupling][6] classes.
you can always access to injector via `appolo-inject`.
```javascript
var appolo  = require('appolo');

appolo.Class.define({
    $config:{
        id:'fooController',
        singleton: true
    },
    constructor: function () {
    },
    ...
});

var fooController = appolo.inject .getObject('fooController');
```

##Event Dispatcher ##
appolo have built in event dispatcher to enable classes to listen and fire events
Event Dispatcher has the following methods:

- on - add event listener:   
    - event - event name. 
    - callback - callback function that will triggered on event name.
    - scope - the scope of the `callback` function default: `this`.
- un - remove event listener all the arguments must be `===` to on method else it won`t be removed.
     - event - event name. 
     - callback - callback function
     - scope - the scope of the callback function
- fireEvent - triggers the callback functions on given event name
    - eventName
    - arguments -  all the rest `arguments` will be applied on the `callback` function
```javascript
var appolo  = require('appolo');

appolo.EventDispatcher.define({
    $config:{
        id:'fooManager',
        singleton: true
    },
    notifyUsers:function(){
    
        this.fireEvent('someEventName',{someData:'someData'})
    }
    ...
});

appolo.Class.define({
    $config:{
        id:'fooController',
        initMethod:'initialize',
        inject:['fooManager']
    },
    initialize:function(){
        this.fooManager.on('someEventName',function(data){
            this.doSomething(data.someData)
        },this);
    },
    doSomething:function(){
    }
    ...
});

```

##Appolo Bootstrap ##

once it lanched appolo try to find appolo `bootstrap` class and call it's `run` mehtod.
```javascript
var appolo  = require('appolo');

appolo.Class.define({
    $config:{
        id:'appolo-bootstrap',
        singleton: true,
        inject:['someManager1','someManager2']
    },
    run:function(){
        //start your application logic here
        this.someManager1.doSomeThing();
    }
    ...
});

```


    
## Tests ##
```javascript
    grunt test
```

## License ##

The `appolo` library is released under the MIT license. So feel free to modify and distribute it as you wish.


  [1]: www.github.com/shmoop207/appolo-class
  [2]: www.github.com/shmoop207/appolo-inject
  [3]: https://github.com/shmoop207/appolo-class
  [4]: http://en.wikipedia.org/wiki/Dependency_injection
  [5]: https://github.com/shmoop207/appolo-inject
  [6]: http://en.wikipedia.org/wiki/Loose_coupling
