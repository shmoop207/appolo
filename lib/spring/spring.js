"use strict";

var Class  = require('../class/class'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs');



var Spring =  function () {

    var $scope = this,
        m_instances = [],
        m_definitions = {},
        m_options = {};




    function createDelegate(fn, obj, args) {
        return function () {
            //var callArgs = args || arguments;

            return fn.apply(obj, args);
        };
    }

    /*
     * private capitalize the first letter
     */
    function getMethodName(str) {

        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /*
     * create single object instance by object ID and definition
     */

    function createObjectInstance(objectID, objectDefinition, runtimeArgs) {
        var argumentInstances = [],
            commands = [],
            args = [],
            i = 0,
            j = 0,
            newObjectInstance,
            Func,
            arg,
            argValue;

        //checks if we have a valid object definition
        if (!objectDefinition) {
            throw new Error("SpringJS:cant find object definition for objectID:" + objectID);
        }


        newObjectInstance = m_instances[objectID];

        //	If the instance does not already exist make it
        if (!newObjectInstance) {
            args = objectDefinition.args || [];
            //add runtime args to the end of args obj
            if (runtimeArgs) {
                for (i = 0; i < runtimeArgs.length; i++) {
                    args.push({value: runtimeArgs[i]});
                }
            }



            //loop over args and get the arg value or create arg object instance
            for (i = 0; i < args.length; i++) {
                arg = args[i];

                //if we have arg references to another object we will try to create it
                argValue =  arg.value ||  createObjectInstance(arg.ref, m_definitions[arg.ref]);

                //push arg value
                argumentInstances[i] = argValue;

                //store the arg array ref for the eval func
                commands[commands.length] = "argumentInstances[" + i + "]";
            }

            //crate object instance
            try {

                if (typeof objectDefinition.type === 'function') {

                    eval("newObjectInstance = new objectDefinition.type (" + commands.join(",") + ")");

                } else if (objectDefinition.path) {

                    eval("newObjectInstance = new require( path.join(m_options.root, objectDefinition.path + '.js')) (" + commands.join(",") + ")");

                } else if (objectDefinition.type === 'string') {

                    eval("newObjectInstance = new " + objectDefinition.type + " (" + commands.join(",") + ")");

                } else {

                    throw new Error("can't find valid type");
                }



//                if (objectDefinition.path) {
//                    var rootPath = path.join(m_options.root, objectDefinition.path + '.js');
//
//                    Func = (fs.existsSync(rootPath)) ? require(rootPath) : require(objectDefinition.path);
//
//                    if (objectDefinition.type) {
//                        Func = Func[objectDefinition.type];
//
//                    }
//
//                    eval("newObjectInstance = new Func (" + commands.join(",") + ")");
//                } else {
//                    eval("newObjectInstance = new " + objectDefinition.type + " (" + commands.join(",") + ")");
//                }


                //newObjectInstance = new Func(eval(commands.join(",")));

            } catch (e) {
                throw new Error("SpringJS can't find object type for objectID:" + objectID + "' \n" + e);
            }

            //if its not singleton wire the object else store it in the hash array
            if (!objectDefinition.singleton) {
                wireObjectInstance(newObjectInstance, objectDefinition);
            } else {
                m_instances[objectID] = newObjectInstance;

            }
        }

        return newObjectInstance;
    }

    /*
     * public get object by object Id
     */
    function getObject(objectID, runtimeArgs) {
        var instance = m_instances[objectID];

        if (!instance) {

            instance = createObjectInstance(objectID, m_definitions[objectID], runtimeArgs);
        }

        return instance;
    }

    /*
     * private creates new objects instances and inject properties
     */
    function wireObjects(definitions) {
        var objectID;
        //loop over definition and create all singletons objects
        for (objectID in definitions) {
            if (definitions.hasOwnProperty(objectID)) {
                if (definitions[objectID].singleton) {
                    createObjectInstance(objectID, definitions[objectID]);
                }
            }
        }

        //loop over instances and inject properties and look up methods
        for (objectID in m_instances) {
            if (m_instances.hasOwnProperty(objectID)) {
                //check if we have a definition
                if (definitions[objectID]) {
                    injectPropertiesAndLookUpMethods(m_instances[objectID], definitions[objectID]);
                }
            }
        }

        //loop instances and invoke init methods
        for (objectID in m_instances) {
            if (m_instances.hasOwnProperty(objectID)) {
                //check if we have a definition
                if (definitions[objectID]) {
                    invokeInitMethod(m_instances[objectID], definitions[objectID]);
                }
            }
        }
    }

    /*
     * invoke the init method of given object
     */
    function invokeInitMethod(object, definition) {
        if (definition.initMethod) {
            object[definition.initMethod]();
        }
    }

    /*
     * private inject values and look up methods to object properties
     */
    function injectPropertiesAndLookUpMethods(object, objectDefinition) {
        var prop,
            i = 0,
            j = 0,
            length,
            propObj,
            injectObject,
            obj,
            methodToInvoke;

        //check if we have properties
        if (objectDefinition.props) {

            //loop over the properties definition
            for (i = 0; i < objectDefinition.props.length; i++) {
                //get property obj
                prop = objectDefinition.props[i];
                injectObject = null;

                if (prop.array) {
                    injectObject = [];

                    for (j = 0; j < prop.array.length; j++) {
                        propObj = prop.array[j];
                        injectObject.push(propObj.value || getObject(propObj.ref));
                    }
                } else if (prop.dictionray) {
                    injectObject = [];

                    for (j = 0; j < prop.dictionray.length; j++) {
                        propObj = prop.dictionray[j];
                        injectObject[propObj.key] = propObj.value ||  getObject(propObj.ref);
                    }
                } else if (prop.value) {

                    injectObject = prop.value;
                } else if (prop.ref) {
                    injectObject = getObject(prop.ref);
                } else if (prop.objectProperty) {
                    obj = getObject(prop.objectProperty.object);

                    injectObject = obj[prop.objectProperty.property];
                }

                //get method name in java style
                methodToInvoke = 'set' + getMethodName(prop.name);

                //try to invoke the set method if  not found inject the property value
                if (object[methodToInvoke]) {
                    object[methodToInvoke](injectObject);
                } else {
                    object[prop.name] = injectObject;
                }
            }
        }

        //check if we need to inject look up method
        if (objectDefinition.lookUpMethod) {
            //loop over look up methods array
            for (i = 0, length = objectDefinition.lookUpMethod.length; i < length; i++) {

                object[objectDefinition.lookUpMethod[i].name] = createDelegate(getObject, object, [objectDefinition.lookUpMethod[i].object]);
            }
        }

        if (objectDefinition.contextAware) {
            object.springJSContext = $scope;
        }

    }
    /*
     * private  fire single object instance
     */
    function wireObjectInstance(object, definition) {


        //inject properties  and look up methods
        injectPropertiesAndLookUpMethods(object, definition);

        //invoke init method
        invokeInitMethod(object, definition);
    }

    /*
     * public  loads the context by given definitions object
     */
    function initialize(options) {
        m_options = options;

        _.extend(m_definitions, options.definitions);



        //addObject("app", options.app);
        //start wire objects
        wireObjects(m_definitions);
    }

    function addDefinitions(definitions) {
        var objectID;

        _.forEach(definitions, function(value,key) {
            m_definitions[key] = value;
        });

        /*for (objectID in definitions) {
            if (definitions.hasOwnProperty(objectID)) {
                if (!m_definitions[objectID]) {

                } else {
                    throw new Error("SpringJS:object id already exists:" + objectID);
                }

                wireObjects(definitions);
            }
        }*/
    }

    function addObject(objectId, instance) {
        if (!m_instances[objectId]) {
            m_instances[objectId] = instance;
        } else {
            throw new Error("SpringJS:object id already exists:" + objectId);
        }
    }

    function getObjectsByType(type) {
        var arr = [], objectID;

        for (objectID in m_instances) {
            if (m_instances.hasOwnProperty(objectID)) {

                if (m_instances[objectID] instanceof type) {
                    arr.push(m_instances[objectID]);
                }
            }
        }

        return arr;
    }

    //make load function public
    this.initialize = initialize;
    this.getObject = getObject;
    this.addObject = addObject;
    this.instance = m_instances;
    this.addDefinitions = addDefinitions;
    this.getObjectsByType = getObjectsByType;
};

module.exports = new Spring();