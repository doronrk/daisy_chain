/*
 * @version v1.0-SNAPSHOT
 * @date 11-26-2014
 * @timestamp 12:17:2
 */



/* jshint ignore:start */

/*!
 * Terrific JavaScript Framework v2.0.1
 * http://terrifically.org
 *
 * Copyright 2012, Remo Brunschwiler
 * MIT Licensed.
 *
 * Date: Mon, 10 Sep 2012 13:44:44 GMT
 *
 *
 * Includes:
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 * @module Tc
 *
 */
var Tc = Tc || {};

/*
 * The base library object.
 */
Tc.$ = $;

/*!
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
(function(){
    var initializing = false, fnTest = /xyz/.test(function() { xyz; }) ? /\b_super\b/ : /.*/;
    
    // The base Class implementation (does nothing)
    this.Class = function(){
    };
    
    // Create a new Class that inherits from this class
    Class.extend = function(prop){
        var _super = this.prototype;
        
        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;
        
        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" &&
            fnTest.test(prop[name]) ? (function(name, fn){
                return function(){
                    var tmp = this._super;
                    
                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];
                    
                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }
        
        // The dummy class constructor
        function Class(){
            // All construction is actually done in the init method
            if (!initializing && this.init) {
				this.init.apply(this, arguments);
			}
        }
        
        // Populate our constructed prototype object
        Class.prototype = prototype;
        
        // Enforce the constructor to be what we expect
        Class.constructor = Class;
        
        // And make this class extendable
        Class.extend = arguments.callee;
        
        return Class;
    };
})();

/**
 * Contains the application base config.
 * The base config can be extended or overwritten either via
 * new Application ($ctx, config) during bootstrapping the application or via
 * overriding the Tc.Config object in your project.
 *
 * @author Remo Brunschwiler
 * @namespace Tc
 * @class Config
 * @static
 */
Tc.Config = {
    /** 
     * The paths for the different types of dependencies.
     *
     * @property dependencies
     * @type Object
     */
    dependencies: {
        css: '/css/dependencies',
        js: '/js/dependencies'
    }
};

(function($) {
    "use strict";

    /**
     * Responsible for application-wide issues such as the creation of modules and establishing connections between them.
     *
     * @author Remo Brunschwiler
     * @namespace Tc
     * @class Application
     */
    Tc.Application = Class.extend({

        /**
         * Initializes the application.
         *
         * @method init
         * @constructor
         * @param {jQuery} $ctx
         *      The jQuery context
         * @param {Object} config
         *      The configuration
         */
        init: function($ctx, config) {
            /**
             * The configuration.
             *
             * @property config
             * @type Object
             */
            this.config = $.extend(Tc.Config, config);

            /**
             * The jQuery context.
             *
             * @property $ctx
             * @type jQuery
             */
            this.$ctx = $ctx || $('body');

            /**
             * Contains references to all modules on the page. This can, for
             * example, be useful when there are interactions between Flash
             * objects and Javascript.
             *
             * @property modules
             * @type Array
             */
            this.modules = [];

            /**
             * Contains references to all connectors on the page.
             *
             * @property connectors
             * @type Object
             */
            this.connectors = {};

            /**
             * The sandbox to get the resources from
             * This sandbox is shared between all modules.
             *
             * @property sandbox
             * @type Sandbox
             */
            this.sandbox = new Tc.Sandbox(this, this.config);
        },

        /**
         * Register modules withing scope
         * Automatically registers all modules within the scope,
         * as long as the modules use the OOCSS naming conventions.
         *
         * @method registerModules
         * @param {jQuery} $ctx
         *      The jQuery context
         * @return {Array}
         *      A list containing the references of the registered modules
         */
        registerModules : function($ctx) {
            var self = this,
                modules = [],
                stringUtils = Tc.Utils.String;

            $ctx = $ctx || this.$ctx;

            $ctx.find('.mod:not([data-ignore="true"])').each(function() {
                var $this = $(this),
                    classes = $this.attr('class').split(' ');

                /*
                 * A module can have several different classes and data attributes.
                 * See below for possible values.
                 */

                /*
                 * @config .mod
                 *
                 * Indicates that it is a base module, this is the default and
                 * no JavaScript needs to be involved. It must occur excactly
                 * once.
                 */

                /*
                 * @config .mod{moduleName} || .mod-{module-name}
                 *
                 * Indicates that it is a module of type basic, which is
                 * derived from the base module. It can occur at most
                 * once. Example: .modBasic || .mod-basic
                 */

                /*
                 * @config .skin{moduleName}{skinName} || .skin-{module-name}-{skin-name}
                 *
                 * Indicates that the module basic has the submarine skin. It
                 * will be decorated by the skin JS (if it exists). It can occur
                 * arbitrarily. Example: .skinBasicSubmarine || .skin-basic-submarine
                 */

                /*
                 * @config data-connectors
                 *
                 * A module can have a comma-separated list of data connectors.
                 * The list contains the IDs of the connectors in the following
                 * schema: {connectorType}-{connectorId}
                 *
                 * {connectorType} is optional. If only the {connectorId} is given, the
                 * default connector is instantiated.
                 *
                 * The example MasterSlave-Navigation decodes to: type =
                 * MasterSlave, id = Navigation. This instantiates the MasterSlave
                 * connector (as mediator) with the connector id Navigation.
                 * The connector id is used to chain the appropriate (the ones with the same id)
                 * modules together and to improve the reusability of the connector.
                 * It can contain multiple connector ids (e.g. 1,2,MasterSlave-Navigation).
                 */

                if (classes.length > 1) {
                    var modName,
                        skins = [],
                        connectors = [],
                        dataConnectors;

                    for (var i = 0, len = classes.length; i < len; i++) {
                        var part = $.trim(classes[i]);

                        // do nothing for empty parts
                        if(part) {
                            // convert to camel if necessary
                            if (part.indexOf('-') > -1) {
                                part = stringUtils.toCamel(part);
                            }

                            if (part.indexOf('mod') === 0 && part.length > 3) {
                                modName = part.substr(3);
                            }
                            else if (part.indexOf('skin') === 0) {
                                // Remove the mod name part from the skin name
                                skins.push(part.substr(4).replace(modName, ''));
                            }
                        }
                    }

                    /*
                     * This needs to be done via attr() instead of data().
                     * As data() cast a single number-only connector to an integer, the split will fail.
                     */
                    dataConnectors = $this.attr('data-connectors');

                    if (dataConnectors) {
                        connectors = dataConnectors.split(',');
                        for (var i = 0, len = connectors.length; i < len; i++) {
                            var connector = $.trim(connectors[i]);
                            // do nothing for empty connectors
                            if(connector) {
                                connectors[i] = connector;
                            }
                        }
                    }

                    if (modName && Tc.Module[modName]) {
                        modules.push(self.registerModule($this, modName, skins, connectors));
                    }
                }
            });

            return modules;
        },

        /**
         * Unregisters the modules given by the module instances.
         *
         * @method unregisterModule
         * @param {Array} modules
         *      A list containting the module instances to unregister
         */
        unregisterModules : function(modules) {
            var connectors = this.connectors;

            modules = modules || this.modules;

            if (modules === this.modules) {
                // Clear everything if the arrays are equal
                this.connectors = [];
                this.modules = [];
            }
            else {
                // Unregister the given modules
                for (var i = 0, len = modules.length; i < len; i++) {
                    var module = modules[i],
                        index;

                    // Delete the references in the connectors
                    for (var connectorId in connectors) {
                        if (connectors.hasOwnProperty(connectorId)) {
                            connectors[connectorId].unregisterComponent(module);
                        }
                    }

                    // Delete the module instance itself
                    index = $.inArray(module, this.modules);
                    if(index > -1) {
                        delete this.modules[index];
                    }
                }
            }
        },

        /**
         * Starts (intializes) the registered modules.
         *
         * @method start
         * @param {Array} modules
         *      A list of the modules to start
         */
        start: function(modules) {
            modules = modules || this.modules;

            // Start the modules
            for (var i = 0, len = modules.length; i < len; i++) {
                modules[i].start();
            }
        },

        /**
         * Stops the registered modules.
         *
         * @method stop
         * @param {Array} modules
         *      A list containting the module instances to stop
         */
        stop: function(modules) {
            modules = modules || this.modules;

            // Stop the modules
            for (var i = 0, len = modules.length; i < len; i++) {
                modules[i].stop();
            }
        },

        /**
         * Registers a module.
         *
         * @method registerModule
         * @param {jQuery} $node
         *      The module node
         * @param {String} modName
         *      The module name. It must match the class name of the module
         * @param {Array} skins
         *      A list of skin names. Each entry must match a class name of a skin
         * @param {Array} connectors
         *      A list of connectors identifiers (e.g. MasterSlave-Navigation)
         *      Schema: {connectorName}-{connectorId}
         * @return {Module}
         *      The reference to the registered module
         */
        registerModule : function($node, modName, skins, connectors) {
            var modules = this.modules;

            modName = modName || undefined;
            skins = skins || [];
            connectors = connectors || [];

            if (modName && Tc.Module[modName]) {
                // Generate a unique ID for every module
                var id = modules.length;
                $node.data('id', id);

                // Instantiate module
                modules[id] = new Tc.Module[modName]($node, this.sandbox, id);

                // Decorate it
                for (var i = 0, len = skins.length; i < len; i++) {
                    var skinName = skins[i];

                    if (Tc.Module[modName][skinName]) {
                        modules[id] = modules[id].getDecoratedModule(modName, skinName);
                    }
                }

                // Register connections
                for (var i = 0, len = connectors.length; i < len; i++) {
                    this.registerConnection(connectors[i], modules[id]);
                }

                return modules[id];
            }

            return null;
        },

        /**
         * Registers a connection between a module and a connector.
         *
         * @method registerConnection
         * @param {String} connector
         *      The full connector name (e.g. MasterSlave-Navigation)
         * @param {Module} component
         *      The module instance
         */
        registerConnection : function(connector, component) {
            connector = $.trim(connector);

            var parts = connector.split('-'),
                connectorType,
                connectorId,
                identifier;

            if(parts.length === 1) {
                // default connector
                identifier = connectorId = parts[0];
            }
            else if(parts.length === 2) {
                // a specific connector type is given
                connectorType = parts[0];
                connectorId = parts[1];
                identifier = connectorType + connectorId;
            }

            if(identifier) {
                var connectors = this.connectors;

                if (!connectors[identifier]) {
                    // Instantiate the appropriate connector if it does not exist yet
                    if (!connectorType) {
                        connectors[identifier] = new Tc.Connector(connectorId);
                    }
                    else if (Tc.Connector[connectorType]) {
                        connectors[identifier] = new Tc.Connector[connectorType](connectorId);
                    }
                }

                if (connectors[identifier]) {
                    /*
                     * The connector observes the component and attaches it as
                     * an observer.
                     */
                    component.attachConnector(connectors[identifier]);

                    /*
                     * The component wants to be informed over state changes.
                     * It registers it as connector member.
                     */
                    connectors[identifier].registerComponent(component);
                }
            }
        },

        /**
         * Unregisters a module from a connector.
         *
         * @method unregisterConnection
         * @param {String} connectorId
         *      The connector channel id (e.g. 2)
         * @param {Module} component
         *      The module instance
         */
        unregisterConnection : function(connectorId, component) {
            var connector =  this.connectors[connectorId];

            // Delete the references in the connector and the module
            if (connector) {
                connector.unregisterComponent(component);
                component.detachConnector(connector);
            }
        }
    });
})(Tc.$);

(function($) {
    "use strict";

    /**
     * The sandbox is used as a central point to get resources from, grant
     * permissions, etc.  It is shared between all modules.
     *
     * @author Remo Brunschwiler
     * @namespace Tc
     * @class Sandbox
     */
    Tc.Sandbox = Class.extend({

        /**
         * Initializes the Sandbox.
         *
         * @method init
         * @constructor
         * @param {Applicaton} application 
         *      The application reference
         * @param {Object} config 
         *      The configuration
         */
        init : function(application, config) {

            /**
             * The application
             *
             * @property application
             * @type Application
             */
            this.application = application;

            /**
             * The configuration.
             *
             * @property config
             * @type Object
             */
            this.config = config;

            /**
             * Contains the 'after' hook module callbacks.
             *
             * @property afterCallbacks
             * @type Array
             */
            this.afterCallbacks = [];
        },

        /**
         * Adds (register and start) all modules in the given context scope.
         *
         * @method addModules
         * @param {jQuery} $ctx 
         *      The jQuery context
         * @return {Array} 
         *      A list containing the references of the registered modules
         */
        addModules: function($ctx) {
            var modules = [],
                application = this.application;

            if ($ctx) {
                // Register modules
                modules = application.registerModules($ctx);

                // Start modules
                application.start(modules);
            }

            return modules;
        },

        /**
         * Removes a module by module instances.
         * This stops and unregisters a module through a module instance.
         *
         * @method removeModules
         * @param {Array} modules 
         *      A list containting the module instances to remove
         */
        removeModules: function(modules) {
            var application = this.application;

            if (modules) {
                // Stop modules
                application.stop(modules);

                // Unregister modules
                application.unregisterModules(modules);
            }
        },

        /**
         * Subscribes a module to a connector.
         *
         * @method subscribe
         * @param {String} connector The full connector name (e.g. MasterSlave-Navigation)
         * @param {Module} module The module instance
         */
        subscribe: function(connector, module) {
            var application = this.application;

            if(module instanceof Tc.Module && connector) {
                // explicitly cast connector to string
                connector = connector + '';
                application.registerConnection(connector, module);
            }
        },

        /**
         * Unsubscribes a module from a connector.
         *
         * @method unsubscribe
         * @param {String} connectorId The connector channel id (e.g. 2 or Navigation)
         * @param {Module} module The module instance
         */
        unsubscribe: function(connectorId, module) {
            var application = this.application;

            if(module instanceof Tc.Module && connectorId) {
                // explicitly cast connector id to string
                connectorId = connectorId + '';
                application.unregisterConnection(connectorId, module);
            }
        },

        /**
         * Gets the appropriate module for the given ID.
         *
         * @method getModuleById
         * @param {int} id 
         *      The module ID
         * @return {Module} 
         *      The appropriate module
         */
        getModuleById: function(id) {
            var application = this.application;

            if (application.modules[id] !== undefined) {
                return application.modules[id];
            }
            else {
                throw new Error('the module with the id ' + id + 
                                ' does not exist');
            }
        },

        /**
         * Gets the application config.
         *
         * @method getConfig
         * @return {Object} 
         *      The configuration object
         */
        getConfig: function() {
            return this.config;
        },

        /**
         * Gets an application config param.
         *
         * @method getConfigParam
         * @param {String} name 
         *      The param name
         * @return {mixed} 
         *      The appropriate configuration param
         */
        getConfigParam: function(name) {
            var config = this.config;

            if (config[name] !== undefined) {
                return config[name];
            }
            else {
                throw new Error('the config param ' + name + ' does not exist');
            }
        },

        /**
         * Collects the module status messages and handles the callbacks.
         * This means that it is ready for the 'after' hook.
         *
         * @method ready
         * @param {Function} callback 
         *      The 'after' hook module callback
         */
        ready: function(callback) {
            var afterCallbacks = this.afterCallbacks;

            // Add the callback to the stack
            afterCallbacks.push(callback);

            // Check whether all modules are ready for the 'after' hook
            if (this.application.modules.length === afterCallbacks.length) {
                for (var i = 0; i < afterCallbacks.length; i++) {
                    var afterCallback = afterCallbacks[i];

                    if(typeof afterCallback === "function") {
                        // make sure the callback is only executed once (and is not called during addModules)
                        delete afterCallbacks[i];
                        afterCallback();
                    }
                }
            }
        }
    });
})(Tc.$);

(function($) {
    "use strict";

    /**
     * Base class for the different modules.
     *
     * @author Remo Brunschwiler
     * @namespace Tc
     * @class Module
     */
    Tc.Module = Class.extend({

        /**
         * Initializes the Module.
         *
         * @method init
         * @constructor
         * @param {jQuery} $ctx
         *      The jQuery context
         * @param {Sandbox} sandbox
         *      The sandbox to get the resources from
         * @param {String} id
         *      The Unique module ID
         */
        init: function($ctx, sandbox, id) {
            /**
             * Contains the module context.
             *
             * @property $ctx
             * @type jQuery
             */
            this.$ctx = $ctx;

            /**
             * Contains the unique module ID.
             *
             * @property id
             * @type String
             */
            this.id = id;

            /**
             * Contains the attached connectors.
             *
             * @property connectors
             * @type Object
             */
            this.connectors = {};

            /**
             * The sandbox to get the resources from.
             *
             * @property sandbox
             * @type Sandbox
             */
            this.sandbox = sandbox;
        },

        /**
         * Template method to start (i.e. init) the module.
         * This method provides hook functions which can be overridden
         * by the individual instance.
         *
         * @method start
         */
        start: function() {
            var self = this;

            // Call the hook method from the individual instance and provide the appropriate callback
            if (this.on) {
                this.on(function() {
                    self.initAfter();
                });
            }
        },

        /**
         * Template method to stop the module.
         *
         * @method stop
         */
        stop: function() {
            var $ctx = this.$ctx;

            // Remove all bound events and associated jQuery data
            $('*', $ctx).unbind().removeData();
            $ctx.unbind().removeData();
        },


        /**
         * Initialization callback.
         *
         * @method initAfter
         * @protected
         */
        initAfter: function() {
            var self = this;

            this.sandbox.ready(function() {
                /*
                 * Call the 'after' hook method from the individual instance
                 */
                if (self.after) {
                    self.after();
                }
            });
        },

        /**
         * Notifies all attached connectors about changes.
         *
         * @method fire
         * @param {String} state The new state
         * @param {Object} data The data to provide to your connected modules (optional)
         * @param {Array} channels  A list containting the channel ids to send the event to (optional)
         * @param {Function} defaultAction The default action to perform (optinal)
         */
        fire: function(state, data, channels, defaultAction) {
            var self = this,
                connectors = this.connectors,
                shouldBeCalled = true;  // indicates whether the default handler should be called

            // validate params
            if(channels == null && defaultAction == null) {
                // Max. 2 params
                if (typeof data === 'function') {
                    // (state, defaultAction)
                    defaultAction = data;
                    data = undefined;
                }
                else if ($.isArray(data)) {
                    // (state, channels)
                    channels = data;
                    data = undefined;
                }
            }
            else if(defaultAction == null) {
                // 2-3 params
                if (typeof channels === 'function') {
                    // (state, data, defaultAction)
                    defaultAction = channels;
                    channels = undefined;
                }

                if ($.isArray(data)) {
                    // (state, channels, defaultAction)
                    channels = data;
                    data = undefined;
                }
            }

            state = Tc.Utils.String.capitalize(state);
            data = data || {};
            channels = channels || Object.keys(connectors);

            for (var i = 0, len = channels.length; i < len; i++) {
                var connectorId = channels[i];
                if(connectors.hasOwnProperty(connectorId)) {
                    var connector = connectors[connectorId],
                        proceed = connector.notify(self, 'on' + state, data) || false;

                    if (!proceed) {
                        shouldBeCalled = false;
                    }

                } else {
                    throw new Error('the module #' + self.id + ' is not connected to connector ' + connectorId);
                }
            }

            // Execute default action unless a veto is provided
            if (shouldBeCalled) {
                if (typeof defaultAction === 'function') {
                    defaultAction();
                }
            }
        },

        /**
         * Attaches a connector (observer).
         *
         * @method attachConnector
         * @param {Connector} connector
         *      The connector to attach
         */
        attachConnector: function(connector) {
            this.connectors[connector.connectorId] = connector;
        },

        /**
         * Detaches a connector (observer).
         *
         * @method detachConnector
         * @param {Connector} connector The connector to detach
         */
        detachConnector: function(connector) {
            delete this.connectors[connector.connectorId];
        },

        /**
         * Decorates itself with the given skin.
         *
         * @method getDecoratedModule
         * @param {String} module The name of the module
         * @param {String} skin The name of the skin
         * @return {Module} The decorated module
         */
        getDecoratedModule: function(module, skin) {
            if (Tc.Module[module][skin]) {
                var Decorator = Tc.Module[module][skin];

                /*
                 * Sets the prototype object to the module.
                 * So the "non-decorated" functions will be called on the module
                 * without implementing the whole module interface.
                 */
                Decorator.prototype = this;
                Decorator.prototype.constructor = Tc.Module[module][skin];

                return new Decorator(this);
            }

            return null;
        }
    });
})(Tc.$);

(function($) {
    "use strict";

    /**
     * Base class for the different connectors.
     *
     * @author Remo Brunschwiler
     * @namespace Tc
     * @class Connector
     */
    Tc.Connector = Class.extend({

        /**
         * Initializes the Connector.
         *
         * @method init
         * @constructor
         * @param {String} connectorId
         *      The unique connector ID
         */
        init : function(connectorId) {
            this.connectorId = connectorId;
            this.components = {};
        },

        /**
         * Registers a component.
         *
         * @method registerComponent
         * @param {Module} component 
         *      The module to register
         */
        registerComponent: function(component) {
            this.components[component.id] = {
                'component': component
            };
        },

        /**
         * Unregisters a component.
         *
         * @method unregisterComponent
         * @param {Module} component 
         *      The module to unregister
         */
        unregisterComponent: function(component) {
            var components = this.components;

            if(components[component.id]) {
                delete components[component.id];
            }
        },

        /**
         * Notifies all registered components about a state change 
         * This can be be overriden in the specific connectors.
         *
         * @method notify
         * @param {Module} origin
         *      The module that sends the state change
         * @param {String} state 
         *      The component's state
         * @param {Object} data 
         *      Contains the state relevant data (if any)
         * @return {boolean}
         *      Indicates whether the default action should be excuted or not
         */
        notify: function(origin, state, data, callback) {
            /*
             * Gives the components the ability to prevent the default- and
             * after action from the events by returning false in the
             * on {Event}-Handler.
             */
            var proceed = true,
                components = this.components;

            for (var id in components) {
                if(components.hasOwnProperty(id)) {
                    var component = components[id].component;
                    if (component !== origin && component[state]) {
                        if (component[state](data) === false) {
                            proceed = false;
                        }
                    }
                }
            }

            return proceed;
        }
    });
})(Tc.$);

/*
 * Contains utility functions for several tasks.
 */
Tc.Utils = {};

// Helper
if (!Object.keys) {
    Object.keys = function (obj) {
        var keys = [], k;
        for (k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                keys.push(k);
            }
        }
        return keys;
    };
}
/**
 * Contains utility functions for string concerning tasks.
 *
 * @author Remo Brunschwiler
 * @namespace Tc
 * @class Utils.String
 * @static
 */
(function($) {
    "use strict";

    Tc.Utils.String = {
        /**
         * Capitalizes the first letter of the given string.
         *
         * @method capitalize
         * @param {String} str 
         *      The original string
         * @return {String} 
         *      The capitalized string
         */
        capitalize: function(str) {
            // Capitalize the first letter
            return str.substr(0, 1).toUpperCase().concat(str.substr(1));
        },

        /**
         * Camelizes the given string.
         *
         * @method toCamel
         * @param {String} str 
         *      The original string
         * @return {String} 
         *      The camelized string
         */
        toCamel: function(str){
            return str.replace(/(\-[A-Za-z])/g, function($1){return $1.toUpperCase().replace('-','');});
        }
    };
})(Tc.$);

/* jshint ignore:end */
(function($) {
	cabcq = {};
	cabcq.util = {};

    $(document).ready(function() {
        var $page = $('body');
        var application = new Tc.Application($page);
        application.registerModules();
        application.start();
    });
})(Tc.$);
(function($) {
    Tc.Module.AbstractComponent = Tc.Module.extend({
        config: {},
        siteConfig: {},

        init: function($ctx, sandbox, modId) {
            // call base constructor
            this._super($ctx, sandbox, modId);

        },

        on: function(callback) {
            this.setup();
            this.setupSite();
            
            callback();
        },

        setup: function() {

        },

        setupSite: function(){

        },

        getConfig: function(){
            return $.extend({}, this.config, this.siteConfig);
        }

    });
})(Tc.$);

/* 
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Defines the global Placeholders object along with various utility methods
(function (global) {

    "use strict";

    // Cross-browser DOM event binding
    function addEventListener(elem, event, fn) {
        if (elem.addEventListener) {
            return elem.addEventListener(event, fn, false);
        }
        if (elem.attachEvent) {
            return elem.attachEvent("on" + event, fn);
        }
    }

    // Check whether an item is in an array (we don't use Array.prototype.indexOf so we don't clobber any existing polyfills - this is a really simple alternative)
    function inArray(arr, item) {
        var i, len;
        for (i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    // Move the caret to the index position specified. Assumes that the element has focus
    function moveCaret(elem, index) {
        var range;
        if (elem.createTextRange) {
            range = elem.createTextRange();
            range.move("character", index);
            range.select();
        } else if (elem.selectionStart) {
            elem.focus();
            elem.setSelectionRange(index, index);
        }
    }

    // Attempt to change the type property of an input element
    function changeType(elem, type) {
        try {
            elem.type = type;
            return true;
        } catch (e) {
            // You can't change input type in IE8 and below
            return false;
        }
    }

    // Expose public methods
    global.Placeholders = {
        Utils: {
            addEventListener: addEventListener,
            inArray: inArray,
            moveCaret: moveCaret,
            changeType: changeType
        }
    };

}(this));

(function (global) {

    "use strict";

    var validTypes = [
            "text",
            "search",
            "url",
            "tel",
            "email",
            "password",
            "number",
            "textarea"
        ],

        // The list of keycodes that are not allowed when the polyfill is configured to hide-on-input
        badKeys = [

            // The following keys all cause the caret to jump to the end of the input value
            27, // Escape
            33, // Page up
            34, // Page down
            35, // End
            36, // Home

            // Arrow keys allow you to move the caret manually, which should be prevented when the placeholder is visible
            37, // Left
            38, // Up
            39, // Right
            40, // Down

            // The following keys allow you to modify the placeholder text by removing characters, which should be prevented when the placeholder is visible
            8, // Backspace
            46 // Delete
        ],

        // Styling variables
        placeholderStyleColor = "#ccc",
        placeholderClassName = "placeholdersjs",
        classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"),

        // These will hold references to all elements that can be affected. NodeList objects are live, so we only need to get those references once
        inputs, textareas,

        // The various data-* attributes used by the polyfill
        ATTR_CURRENT_VAL = "data-placeholder-value",
        ATTR_ACTIVE = "data-placeholder-active",
        ATTR_INPUT_TYPE = "data-placeholder-type",
        ATTR_FORM_HANDLED = "data-placeholder-submit",
        ATTR_EVENTS_BOUND = "data-placeholder-bound",
        ATTR_OPTION_FOCUS = "data-placeholder-focus",
        ATTR_OPTION_LIVE = "data-placeholder-live",
        ATTR_MAXLENGTH = "data-placeholder-maxlength",

        // Various other variables used throughout the rest of the script
        test = document.createElement("input"),
        head = document.getElementsByTagName("head")[0],
        root = document.documentElement,
        Placeholders = global.Placeholders,
        Utils = Placeholders.Utils,
        hideOnInput, liveUpdates, keydownVal, styleElem, styleRules, placeholder, timer, form, elem, len, i;

    // No-op (used in place of public methods when native support is detected)
    function noop() {}

    // Avoid IE9 activeElement of death when an iframe is used.
    // More info:
    // http://bugs.jquery.com/ticket/13393
    // https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }

    // Hide the placeholder value on a single element. Returns true if the placeholder was hidden and false if it was not (because it wasn't visible in the first place)
    function hidePlaceholder(elem, keydownValue) {
        var type,
            maxLength,
            valueChanged = (!!keydownValue && elem.value !== keydownValue),
            isPlaceholderValue = (elem.value === elem.getAttribute(ATTR_CURRENT_VAL));

        if ((valueChanged || isPlaceholderValue) && elem.getAttribute(ATTR_ACTIVE) === "true") {
            elem.removeAttribute(ATTR_ACTIVE);
            elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), "");
            elem.className = elem.className.replace(classNameRegExp, "");

            // Restore the maxlength value
            maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            if (parseInt(maxLength, 10) >= 0) { // Old FF returns -1 if attribute not set (see GH-56)
                elem.setAttribute("maxLength", maxLength);
                elem.removeAttribute(ATTR_MAXLENGTH);
            }

            // If the polyfill has changed the type of the element we need to change it back
            type = elem.getAttribute(ATTR_INPUT_TYPE);
            if (type) {
                elem.type = type;
            }
            return true;
        }
        return false;
    }

    // Show the placeholder value on a single element. Returns true if the placeholder was shown and false if it was not (because it was already visible)
    function showPlaceholder(elem) {
        var type,
            maxLength,
            val = elem.getAttribute(ATTR_CURRENT_VAL);
        if (elem.value === "" && val) {
            elem.setAttribute(ATTR_ACTIVE, "true");
            elem.value = val;
            elem.className += " " + placeholderClassName;

            // Store and remove the maxlength value
            maxLength = elem.getAttribute(ATTR_MAXLENGTH);
            if (!maxLength) {
                elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength);
                elem.removeAttribute("maxLength");
            }

            // If the type of element needs to change, change it (e.g. password inputs)
            type = elem.getAttribute(ATTR_INPUT_TYPE);
            if (type) {
                elem.type = "text";
            } else if (elem.type === "password") {
                if (Utils.changeType(elem, "text")) {
                    elem.setAttribute(ATTR_INPUT_TYPE, "password");
                }
            }
            return true;
        }
        return false;
    }

    function handleElem(node, callback) {

        var handleInputsLength, handleTextareasLength, handleInputs, handleTextareas, elem, len, i;

        // Check if the passed in node is an input/textarea (in which case it can't have any affected descendants)
        if (node && node.getAttribute(ATTR_CURRENT_VAL)) {
            callback(node);
        } else {

            // If an element was passed in, get all affected descendants. Otherwise, get all affected elements in document
            handleInputs = node ? node.getElementsByTagName("input") : inputs;
            handleTextareas = node ? node.getElementsByTagName("textarea") : textareas;

            handleInputsLength = handleInputs ? handleInputs.length : 0;
            handleTextareasLength = handleTextareas ? handleTextareas.length : 0;

            // Run the callback for each element
            for (i = 0, len = handleInputsLength + handleTextareasLength; i < len; i++) {
                elem = i < handleInputsLength ? handleInputs[i] : handleTextareas[i - handleInputsLength];
                callback(elem);
            }
        }
    }

    // Return all affected elements to their normal state (remove placeholder value if present)
    function disablePlaceholders(node) {
        handleElem(node, hidePlaceholder);
    }

    // Show the placeholder value on all appropriate elements
    function enablePlaceholders(node) {
        handleElem(node, showPlaceholder);
    }

    // Returns a function that is used as a focus event handler
    function makeFocusHandler(elem) {
        return function () {

            // Only hide the placeholder value if the (default) hide-on-focus behaviour is enabled
            if (hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && elem.getAttribute(ATTR_ACTIVE) === "true") {

                // Move the caret to the start of the input (this mimics the behaviour of all browsers that do not hide the placeholder on focus)
                Utils.moveCaret(elem, 0);

            } else {

                // Remove the placeholder
                hidePlaceholder(elem);
            }
        };
    }

    // Returns a function that is used as a blur event handler
    function makeBlurHandler(elem) {
        return function () {
            showPlaceholder(elem);
        };
    }

    // Functions that are used as a event handlers when the hide-on-input behaviour has been activated - very basic implementation of the "input" event
    function makeKeydownHandler(elem) {
        return function (e) {
            keydownVal = elem.value;

            //Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
            if (elem.getAttribute(ATTR_ACTIVE) === "true") {
                if (keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && Utils.inArray(badKeys, e.keyCode)) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    return false;
                }
            }
        };
    }
    function makeKeyupHandler(elem) {
        return function () {
            hidePlaceholder(elem, keydownVal);

            // If the element is now empty we need to show the placeholder
            if (elem.value === "") {
                elem.blur();
                Utils.moveCaret(elem, 0);
            }
        };
    }
    function makeClickHandler(elem) {
        return function () {
            if (elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && elem.getAttribute(ATTR_ACTIVE) === "true") {
                Utils.moveCaret(elem, 0);
            }
        };
    }

    // Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
    function makeSubmitHandler(form) {
        return function () {

            // Turn off placeholders on all appropriate descendant elements
            disablePlaceholders(form);
        };
    }

    // Bind event handlers to an element that we need to affect with the polyfill
    function newElement(elem) {

        // If the element is part of a form, make sure the placeholder string is not submitted as a value
        if (elem.form) {
            form = elem.form;

            // If the type of the property is a string then we have a "form" attribute and need to get the real form
            if (typeof form === "string") {
                form = document.getElementById(form);
            }

            // Set a flag on the form so we know it's been handled (forms can contain multiple inputs)
            if (!form.getAttribute(ATTR_FORM_HANDLED)) {
                Utils.addEventListener(form, "submit", makeSubmitHandler(form));
                form.setAttribute(ATTR_FORM_HANDLED, "true");
            }
        }

        // Bind event handlers to the element so we can hide/show the placeholder as appropriate
        Utils.addEventListener(elem, "focus", makeFocusHandler(elem));
        Utils.addEventListener(elem, "blur", makeBlurHandler(elem));

        // If the placeholder should hide on input rather than on focus we need additional event handlers
        if (hideOnInput) {
            Utils.addEventListener(elem, "keydown", makeKeydownHandler(elem));
            Utils.addEventListener(elem, "keyup", makeKeyupHandler(elem));
            Utils.addEventListener(elem, "click", makeClickHandler(elem));
        }

        // Remember that we've bound event handlers to this element
        elem.setAttribute(ATTR_EVENTS_BOUND, "true");
        elem.setAttribute(ATTR_CURRENT_VAL, placeholder);

        // If the element doesn't have a value and is not focussed, set it to the placeholder string
        if (hideOnInput || elem !== safeActiveElement()) {
            showPlaceholder(elem);
        }
    }

    Placeholders.nativeSupport = test.placeholder !== void 0;

    if (!Placeholders.nativeSupport) {

        // Get references to all the input and textarea elements currently in the DOM (live NodeList objects to we only need to do this once)
        inputs = document.getElementsByTagName("input");
        textareas = document.getElementsByTagName("textarea");

        // Get any settings declared as data-* attributes on the root element (currently the only options are whether to hide the placeholder on focus or input and whether to auto-update)
        hideOnInput = root.getAttribute(ATTR_OPTION_FOCUS) === "false";
        liveUpdates = root.getAttribute(ATTR_OPTION_LIVE) !== "false";

        // Create style element for placeholder styles (instead of directly setting style properties on elements - allows for better flexibility alongside user-defined styles)
        styleElem = document.createElement("style");
        styleElem.type = "text/css";

        // Create style rules as text node
        styleRules = document.createTextNode("." + placeholderClassName + " { color:" + placeholderStyleColor + "; }");

        // Append style rules to newly created stylesheet
        if (styleElem.styleSheet) {
            styleElem.styleSheet.cssText = styleRules.nodeValue;
        } else {
            styleElem.appendChild(styleRules);
        }

        // Prepend new style element to the head (before any existing stylesheets, so user-defined rules take precedence)
        head.insertBefore(styleElem, head.firstChild);

        // Set up the placeholders
        for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Get the value of the placeholder attribute, if any. IE10 emulating IE7 fails with getAttribute, hence the use of the attributes node
            placeholder = elem.attributes.placeholder;
            if (placeholder) {

                // IE returns an empty object instead of undefined if the attribute is not present
                placeholder = placeholder.nodeValue;

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                if (placeholder && Utils.inArray(validTypes, elem.type)) {
                    newElement(elem);
                }
            }
        }

        // If enabled, the polyfill will repeatedly check for changed/added elements and apply to those as well
        timer = setInterval(function () {
            for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
                elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                placeholder = elem.attributes.placeholder;
                if (placeholder) {
                    placeholder = placeholder.nodeValue;
                    if (placeholder && Utils.inArray(validTypes, elem.type)) {

                        // If the element hasn't had event handlers bound to it then add them
                        if (!elem.getAttribute(ATTR_EVENTS_BOUND)) {
                            newElement(elem);
                        }

                        // If the placeholder value has changed or not been initialised yet we need to update the display
                        if (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE))) {

                            // Attempt to change the type of password inputs (fails in IE < 9)
                            if (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE) && Utils.changeType(elem, "text")) {
                                elem.setAttribute(ATTR_INPUT_TYPE, "password");
                            }

                            // If the placeholder value has changed and the placeholder is currently on display we need to change it
                            if (elem.value === elem.getAttribute(ATTR_CURRENT_VAL)) {
                                elem.value = placeholder;
                            }

                            // Keep a reference to the current placeholder value in case it changes via another script
                            elem.setAttribute(ATTR_CURRENT_VAL, placeholder);
                        }
                    }
                } else if (elem.getAttribute(ATTR_ACTIVE)) {
                    hidePlaceholder(elem);
                    elem.removeAttribute(ATTR_CURRENT_VAL);
                }
            }

            // If live updates are not enabled cancel the timer
            if (!liveUpdates) {
                clearInterval(timer);
            }
        }, 100);
    }

    Utils.addEventListener(global, "beforeunload", function () {
        Placeholders.disable();
    });

    // Expose public methods
    Placeholders.disable = Placeholders.nativeSupport ? noop : disablePlaceholders;
    Placeholders.enable = Placeholders.nativeSupport ? noop : enablePlaceholders;

}(this));

(function($) {

    // here we go!
    $.cabdb = function(element, options) {

        var defaults = {
            productId: null,
            categoryId: null,
            isMobile: false,
            bannerType: null,
            authorMode : false,
            debug: false
        };

        // to avoid confusions, use "plugin" to reference the
        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('cabdb').settings.propertyName from outside the plugin,
        // where "element" is the element the plugin is attached to;
        plugin.settings = {};
        plugin.product = null;
        plugin.category = null;

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // Options validation
            if (options.categoryId == null && options.productId == null) {
                abort("productId OR categoryId must be specified");
            } else if (options.bannerType == null) {
                abort("Must specify type of banner: [ Default|New|Sale|DollarOff|PercentOff|TopRated|StartingAt ]");
            }

            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            // determine if its a mobile browser
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                plugin.settings.isMobile = true;
            }
            if (plugin.settings.debug) {console.log("plugin.settings", plugin.settings);}

            if (plugin.settings.productId != null) { // Its a product
                $.when(fetchProductJson()).done(function(a1){
                    if (options.sampleJson) {
                        plugin.product = options.sampleJson.dataset.productbanner.values;
                    } else {
                        plugin.product = a1.dataset.datasetResponse.values;
                    }
                    if (plugin.settings.debug) console.log(plugin.product);

                    buildBaseBanner();

                    if (plugin.settings.bannerType === "NEW") {/*buildProductNew();*/} //TODO: does this exist?
                    else if (plugin.settings.bannerType === "SALE") { buildProductSale(); }
                    else if (plugin.settings.bannerType === "DOLLAROFF") {}//TODO: DollarOff is still broken with IT
                    else if (plugin.settings.bannerType === "PERCENTOFF") {}//TODO: PercentOff is still broken with IT
                    else if (plugin.settings.bannerType === "TOPRATED") {buildProductTopRated();}
                    else {buildProductDefault();}
                    setupHolidayBanner();
                    setUpWT();
                });
            } else { //Its a category
                $.when(fetchCategoryJson()).done(function(a1){
                    if (options.sampleJson) {
                        plugin.category = options.sampleJson.dataset.datasetResponse.values;
                    } else {
                        plugin.category = a1.dataset.datasetResponse.values;
                    }
                    if (plugin.settings.debug) {console.log(plugin.category);}

                    buildBaseBanner();

                    if (plugin.settings.bannerType === "SALE") {buildCategorySale();}
                    else if (plugin.settings.bannerType === "TOPRATED") {buildCategoryTopRated();}
                    else if (plugin.settings.bannerType === "PERCENTOFF") {buildCategoryPercentOff();}
                    else if (plugin.settings.bannerType === "STARTINGAT") {} //TODO: StartingAt is still broken with IT
                    else  {buildCategoryDefault();}
                    setupHolidayBanner();
                    setUpWT();
                });
            }

        };

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('cabdb').publicMethod(arg1, arg2, ... argn) from outside
        // the plugin, where "element" is the element the plugin is attached to;
        plugin.setHolidayCookie = function(c_name,value,exdays) {
            var currentDate = new Date();
            var exdate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);

            var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie=c_name + "=" + c_value + ";path=/";
        };
        plugin.getHolidayCookie = function(c_name) {
            var c_value = document.cookie;
            var c_start = c_value.indexOf(" " + c_name + "=");
            if (c_start == -1) {
                c_start = c_value.indexOf(c_name + "=");
            }

            if (c_start == -1) {
                c_value = null;
            } else {
                c_start = c_value.indexOf("=", c_start) + 1;
                var c_end = c_value.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = c_value.length;
                }
                c_value = unescape(c_value.substring(c_start,c_end));
            }
            return c_value;
        };

        // private methods
        var fetchProductJson = function() {
            return $.ajax(
                {
                    url      :  "/services/product/" + plugin.settings.productId + "/banners.do",
                    dataType : "json"
                }
            );
        };

        var fetchCategoryJson = function() {
            return $.ajax({
                    url      : "/services/category/" + plugin.settings.categoryId + "/banners.do",
                    dataType : "json"
                }
            );
        };

        var buildBaseBanner = function() {
            var url = (plugin.product) ? plugin.product.url : plugin.category.url;

            $(element).empty();
            $.el('div', {'class':'DynBnrMain'}).append(
                    $.el('div', {'id':'DynBnrHoliday', 'class':'DynBnrHoliday'})
                ).append(
                $.el('div', {'class':'DynBnrLeft', 'style':'overflow-x: visible !important;'}).append(
                        $.el('center', {}).append(
                            $.el('div', {'class':"DynBnrProdimg"}).append(
                                $.el('a',
                                    {
                                        'href': url,
                                        'class': 'DynBnrProduct mdkTag'
                                    }
                                ).append(function(){
                                    var appendString = "";
                                    var image = "";

                                    if (plugin.category) {
                                        image = plugin.category.image;
                                    } else {
                                        image = plugin.product.imageSet;
                                    }

                                    if (plugin.product && (plugin.product.imageSet == null
                                        || plugin.product.imageSet === "")) {
                                        appendString = "?hei=128";
                                    }

                                    return $.el(
                                        'img',
                                        {
                                            'class': 'DynBnrProduct',
                                            'style': 'overflow-x: visible !important; width: auto !important;',
                                            'src'  : image + appendString
                                        }
                                    )
                                })
                            )
                        )
                    )
            ).appendTo(element);
        };

        var buildProductSale = function() {

            $(element).find("center").append(
                $.el(
                    'div',
                    {
                        'class':'DynBnrCenter',
                        'style': 'overflow-x: visible !important; width: auto !important;'
                    }
                ).append(
                    $.el('a',
                        {
                            'href': plugin.product.url,
                            'class': 'mdkTag'
                        }
                    ).append(function(){
                        if (plugin.product.partialSale === "Y"
                            || plugin.product.fullSale === "Y") {
                            return $.el(
                                'img',
                                {
                                    'style': 'overflow-x: visible !important; width: auto !important;',
                                    'src':'//assets.cabelas.com/assets/dynamic_banners/DynBnr_icn_Sale.png',
                                    'width':'63',
                                    'height':'63',
                                    'border':'0',
                                    'class':'DynBnrIcon dbiSale'
                                }
                            )
                        } else {
                            return $.el(
                                'img',
                                {
                                    'src':'//assets.cabelas.com/assets/images/spacer.gif',
                                    'width':'1',
                                    'height':'1',
                                    'border':'0'
                                }
                            )
                        }
                    })
                )
            );
            $(element).find('.DynBnrMain').append(
                $.el('div', {'class':'DynBnrRight'}).append(
                    $.el('div', {'class':'DynBnrCopyBlock'}).append(
                        $.el('div', {'class':'DynBnrTeaser'}).append(
                            function(){
                                if (plugin.product.bannerTeaser
                                    && plugin.product.bannerTeaser != '') {
                                    return plugin.product.bannerTeaser
                                } else if (plugin.product.badges && plugin.product.badges.indexOf("FREE_SHIPPING") != -1) {
                                    return $.el('span', {'style': 'font-size:14px;'}).html('Free Shipping Eligible');
                                }
                                return undefined;
                            }
                        )
                    ).append(
                        $.el('a',
                            {
                                'href': plugin.product.url,
                                'class': 'DynBnrHeadline mdkTag',
                                'align':'right',
                                'style':'text-decoration: none;'
                            }
                        ).html(plugin.product.name)
                    ).append(
                        $.el('br',{})
                    ).append(
                        function(){
                            if (plugin.product.partialSale === "Y"
                                || plugin.product.fullSale === "Y") {
                                var span1 = $.el('span', {'class':'DynBnrRegPrice'});

                                if (!(plugin.product.regularLowPrice == plugin.product.sellLowPrice
                                    && plugin.product.regularHighPrice == plugin.product.sellHighPrice)) {
                                    var toAppend = "";
                                    if (plugin.product.regularLowPrice //not null
                                        && plugin.product.regularLowPrice != '') {
                                        toAppend += 'Reg.' + plugin.product.regularLowPrice;
                                    }
                                    if (plugin.product.regularHighPrice //not null
                                        && plugin.product.regularHighPrice != ''
                                        && plugin.product.regularHighPrice != plugin.product.regularLowPrice) {
                                        toAppend += " - " + plugin.product.regularHighPrice;
                                    }
                                    span1.text(toAppend);
                                }
                                return span1;
                            }
                            return undefined;
                        }
                    ).append(
                        function(){
                            if (plugin.product.partialSale === "Y"
                                || plugin.product.fullSale === "Y") {
                                var span1 = $.el('span', {'class':'DynBnrSalePrice'});
                                var toAppend = "";

                                if (plugin.product.regularLowPrice == plugin.product.sellLowPrice
                                    && plugin.product.regularHighPrice == plugin.product.sellHighPrice) {
                                    toAppend += 'Select items on sale: ' + plugin.product.sellLowPrice + " - " + plugin.product.sellHighPrice;
                                } else {
                                    if (plugin.product.sellLowPrice //not null
                                        && plugin.product.sellLowPrice != '') {
                                        toAppend += 'Sale: ' + plugin.product.sellLowPrice;
                                    }
                                    if ((plugin.product.sellHighPrice //not null
                                        && plugin.product.sellHighPrice != '')
                                        && plugin.product.sellHighPrice != plugin.product.sellLowPrice) {
                                        toAppend += ' - ' + plugin.product.sellHighPrice;
                                    }
                                }

                                span1.text(toAppend);
                                return span1;
                            }
                            return undefined;
                        }
                    ).append(
                        $.el('br',{})
                    ).append(
                        $.el(
                            'a',
                            {
                                'href': plugin.product.url,
                                'class': 'mdkTag'
                            }
                        ).append(
                            $.el(
                                'img',
                                {
                                    'style': 'overflow-x: visible !important; width: auto !important;',
                                    'src': '/assets/dynamic_banners/DynBnr_btn_ShopNow.png',
                                    'width': '77',
                                    'height': '18',
                                    'border': '0',
                                    'alt': 'Shop Now',
                                    'class': 'DynBnrShopNow'
                                }
                            )
                        )
                    )
                )
            );
        };
        var buildProductPercentOff = function() {};
        var buildProductDollarOff = function() {};
        var buildProductNew = function() {};
        var buildProductTopRated = function() {
            $(element).find('.DynBnrMain').append(
                $.el('div', {'class':'DynBnrRight'}).append(
                    $.el('div', {'class':'DynBnrCopyBlock'}).append(
                        $.el('div', {'class':'DynBnrTeaser'}).append(
                            function(){
                                if (plugin.product.rating
                                    && plugin.product.rating != ''
                                    && plugin.product.rating > 4) {
                                    var rating = plugin.product.rating;
                                    rating = rating.replace(".", "_");
                                    return "Top Rated:"
                                        + '<img  style="overflow-x: visible !important; width: auto !important;" class="dbiTopRated" src="'
                                        + '//reviews.cabelas.com/8815/' + rating + '/5/rating.gif"></img>';
                                    //TODO: I don't like that this is not an object... find a way to use $.el()

                                }
                                return undefined;
                            }
                        ).append(
                            function() {
                                if (plugin.product.bannerTeaser
                                    && plugin.product.bannerTeaser != '') {
                                    return '<br />' + plugin.product.bannerTeaser;
                                }
                                return undefined;
                            }
                        ).append(
                            function() {
                                if (plugin.product.badges.indexOf("FREE_SHIPPING") != -1) {
                                    return $.el('span', {'style':'font-size:14px;'}).html('Free Shipping Eligible')
                                }
                                return undefined;
                            }
                        )
                    ).append(
                        $.el('a',
                            {
                                'href': plugin.product.url,
                                'class': 'DynBnrHeadline mdkTag',
                                'align':'right',
                                'style':'text-decoration: none;'
                            }
                        ).html(plugin.product.name)
                    ).append(
                        $.el('br',{})
                    ).append(
                        $.el(
                            'a',
                            {
                                'href': plugin.product.url,
                                'class': 'mdkTag'
                            }
                        ).append(
                            $.el(
                                'img',
                                {
                                    'style': 'overflow-x: visible !important; width: auto !important;',
                                    'src': '/assets/dynamic_banners/DynBnr_btn_ShopNow.png',
                                    'width': '77',
                                    'height': '18',
                                    'border': '0',
                                    'alt': 'Shop Now',
                                    'class': 'DynBnrShopNow'
                                }
                            )
                        )
                    )
                )
            );

        };
        var buildProductDefault = function() {
            $(element).find('.DynBnrMain').append(
                $.el('div', {'class':'DynBnrRight'}).append(
                    $.el('div', {'class':'DynBnrCopyBlock'}).append(
                        $.el('div', {'class':'DynBnrTeaser'}).append(
                            function() {
                                if (plugin.product.bannerTeaser
                                    && plugin.product.bannerTeaser != '') {
                                    return '<br />' + plugin.product.bannerTeaser;
                                }
                                return undefined;
                            }
                        ).append(
                            function() {
                                if (plugin.product.badges.indexOf("FREE_SHIPPING") != -1) {
                                    return $.el('span', {'style':'font-size:14px;'}).html('Free Shipping Eligible')
                                }
                                return undefined;
                            }
                        )
                    ).append(
                        $.el('a',
                            {
                                'href': plugin.product.url,
                                'class': 'DynBnrHeadline mdkTag',
                                'align':'right',
                                'style':'text-decoration: none;'
                            }
                        ).html(plugin.product.name)
                    ).append(
                        $.el('br',{})
                    ).append(
                        $.el(
                            'a',
                            {
                                'href': plugin.product.url,
                                'class': 'mdkTag'
                            }
                        ).append(
                            $.el(
                                'img',
                                {
                                    'style': 'overflow-x: visible !important; width: auto !important;',
                                    'src': '/assets/dynamic_banners/DynBnr_btn_ShopNow.png',
                                    'width': '77',
                                    'height': '18',
                                    'border': '0',
                                    'alt': 'Shop Now',
                                    'class': 'DynBnrShopNow'
                                }
                            )
                        )
                    )
                )
            );

        };

        var buildCategoryDefault = function() {
            if (plugin.debug) {console.log("building Category Default Banner")}

            $(element).find('.DynBnrMain').append(
                $.el('div', {'class':'DynBnrRight'}).append(
                    $.el('div', {'class':'DynBnrCopyBlock'}).append(
                            $.el('div', {'class':'DynBnrTeaser'}).append(
                                function(){
                                    if (plugin.category.bannerTeaser
                                        && plugin.category.bannerTeaser != '') {
                                        return plugin.category.bannerTeaser
                                    }
                                    return undefined;
                                }
                            )
                        ).append(
                            $.el('a',
                                {
                                    'href': plugin.category.url,
                                    'class': 'DynBnrHeadline mdkTag',
                                    'align':'right',
                                    'style':'text-decoration: none;'
                                }
                            ).html(plugin.category.name)
                        ).append(
                            $.el('br',{})
                        ).append(
                            $.el(
                                'a',
                                {
                                    'href': plugin.category.url,
                                    'class': 'mdkTag'
                                }
                            ).append(
                                    $.el(
                                        'img',
                                        {
                                            'style': 'overflow-x: visible !important; width: auto !important;',
                                            'src': '/assets/dynamic_banners/DynBnr_btn_ShopNow.png',
                                            'width': '77',
                                            'height': '18',
                                            'border': '0',
                                            'alt': 'Shop Now',
                                            'class': 'DynBnrShopNow'
                                        }
                                    )
                                )
                        )
                )
            );
        };
        var buildCategorySale = function() {
            if (plugin.debug) {console.log("building Category Sale Banner")}
            $(element).find("center").append(
                $.el(
                    'div',
                    {
                        'class':'DynBnrCenter',
                        'style': 'overflow-x: visible !important; width: auto !important;'
                    }
                ).append(
                    $.el('a',
                        {
                            'href': plugin.category.url,
                            'class': 'mdkTag'
                        }
                    ).append(
                        function() {
                            if (plugin.category.highDiscountAmount > 0) {
                                return $.el(
                                    'img',
                                    {
                                        'style': 'overflow-x: visible !important; width: auto !important;',
                                        'src':'/assets/dynamic_banners/DynBnr_icn_Sale.png',
                                        'width':'63',
                                        'height':'63',
                                        'border':'0',
                                        'class':'DynBnrIcon dbiSale'
                                    }
                                )
                            }
                            return undefined;
                        }
                    )
                )
            );
            $(element).find('.DynBnrMain').append(
                $.el('div', {'class':'DynBnrRight'}).append(
                    $.el('div', {'class':'DynBnrCopyBlock'}).append(
                        $.el('div', {'class':'DynBnrTeaser'}).append(
                            function(){
                                if (plugin.category.bannerTeaser
                                    && plugin.category.bannerTeaser != '') {
                                    return plugin.category.bannerTeaser
                                }
                                return undefined;
                            }
                        )
                    ).append(
                        $.el('a',
                            {
                                'href': plugin.category.url,
                                'class': 'DynBnrHeadline mdkTag',
                                'align':'right',
                                'style':'text-decoration: none;'
                            }
                        ).html(plugin.category.name)
                    ).append(
                        $.el('br',{})
                    ).append(
                        $.el(
                            'a',
                            {
                                'href': plugin.category.url,
                                'class': 'mdkTag'
                            }
                        ).append(
                            $.el(
                                'img',
                                {
                                    'style': 'overflow-x: visible !important; width: auto !important;',
                                    'src': '/assets/dynamic_banners/DynBnr_btn_ShopNow.png',
                                    'width': '77',
                                    'height': '18',
                                    'border': '0',
                                    'alt': 'Shop Now',
                                    'class': 'DynBnrShopNow'
                                }
                            )
                        )
                    )
                )
            );
        };
        var buildCategoryTopRated = function() {
            if (plugin.settings.debug) {console.log("Starting Category Top Rated Banner")}
            $(element).find('.DynBnrMain').append(
                $.el('div', {'class':'DynBnrRight'}).append(
                    $.el('div', {'class':'DynBnrCopyBlock'}).append(
                        $.el('div', {'class':'DynBnrTeaser'}).append(
                            function(){
                                if (plugin.settings.debug) {console.log(" - Low Rating: " + plugin.category.lowestRatedProduct)}
                                if (plugin.category.lowestRatedProduct
                                    && plugin.category.lowestRatedProduct != ''
                                    && plugin.category.lowestRatedProduct > 3.9) {
                                    var rating = plugin.category.lowestRatedProduct;
                                    rating = rating.replace(".", "_");
                                    return "Top Rated:"
                                        + '<img  style="overflow-x: visible !important; width: auto !important;" class="dbiTopRated" src="'
                                        + '//reviews.cabelas.com/8815/' + rating + '/5/rating.gif"></img>';
                                    //TODO: I don't like that this is not an object... find a way to use $.el()
                                }
                                return undefined;
                            }
                        )
                    ).append(
                        $.el('a',
                            {
                                'href': plugin.category.url,
                                'class': 'DynBnrHeadline mdkTag',
                                'align':'right',
                                'style':'text-decoration: none;'
                            }
                        ).html(plugin.category.name)
                    ).append(
                        $.el('br',{})
                    ).append(
                        $.el(
                            'a',
                            {
                                'href': plugin.category.url,
                                'class': 'mdkTag'
                            }
                        ).append(
                            $.el(
                                'img',
                                {
                                    'style': 'overflow-x: visible !important; width: auto !important;',
                                    'src': '/assets/dynamic_banners/DynBnr_btn_ShopNow.png',
                                    'width': '77',
                                    'height': '18',
                                    'border': '0',
                                    'alt': 'Shop Now',
                                    'class': 'DynBnrShopNow'
                                }
                            )
                        )
                    )
                )
            );

        };
        var buildCategoryPercentOff = function() {
            if (plugin.debug) {console.log("building Category Sale Banner")}
            $(element).find("center").append(
                $.el(
                    'div',
                    {
                        'class':'DynBnrCenter',
                        'style': 'overflow-x: visible !important; width: auto !important;'
                    }
                ).append(
                    $.el('a',
                        {
                            'href': plugin.category.url,
                            'class': 'mdkTag'
                        }
                    ).append(
                        function() {
                            if (plugin.category.highDiscountAmount > 0) {
                                return $.el(
                                    'img',
                                    {
                                        'style': 'overflow-x: visible !important; width: auto !important;',
                                        'src':'/assets/dynamic_banners/DynBnr_icn_Sale.png',
                                        'width':'63',
                                        'height':'63',
                                        'border':'0',
                                        'class':'DynBnrIcon dbiSale'
                                    }
                                )
                            }
                            return undefined;
                        }
                    )
                )
            );
            $(element).find('.DynBnrMain').append(
                $.el('div', {'class':'DynBnrRight'}).append(
                    $.el('div', {'class':'DynBnrCopyBlock'}).append(
                        $.el('div', {'class':'DynBnrTeaser'}).append(
                            function(){
                                if (plugin.category.highDiscountPercentage > 0) {
                                    return "Save Up To " + Math.floor(plugin.category.highDiscountPercentage) + "%";
                                }
                                return undefined;
                            }
                        )
                    ).append(
                        $.el('a',
                            {
                                'href': plugin.category.url,
                                'class': 'DynBnrHeadline mdkTag',
                                'align':'right',
                                'style':'text-decoration: none;'
                            }
                        ).html(plugin.category.name)
                    ).append(
                        $.el('br',{})
                    ).append(
                        $.el(
                            'a',
                            {
                                'href': plugin.category.url,
                                'class': 'mdkTag'
                            }
                        ).append(
                            $.el(
                                'img',
                                {
                                    'style': 'overflow-x: visible !important; width: auto !important;',
                                    'src': '/assets/dynamic_banners/DynBnr_btn_ShopNow.png',
                                    'width': '77',
                                    'height': '18',
                                    'border': '0',
                                    'alt': 'Shop Now',
                                    'class': 'DynBnrShopNow'
                                }
                            )
                        )
                    )
                )
            );
        };

        var setUpWT = function() {
            var mdkTagVariable = "dynbanP";
            if (plugin.settings.isSale) {
                mdkTagVariable = "dynbanP_SL";
            } else if (plugin.settings.isTopRated) {
                mdkTagVariable = "dynbanP_TR";
            } else if (plugin.settings.isPercentOff) {
                mdkTagVariable = "dynbanP_PO";
            } else if (plugin.settings.isDollarOff) {
                mdkTagVariable = "dynbanP_DO";
            } else {
                mdkTagVariable = "dynbanP_BC";
            }

            if (!$('.mdkTag img').hasClass('dbiSale')) {
                mdkTagVariable = mdkTagVariable + "b";
            }

            var jqMdkTag = $(element).find('.mdkTag');
            var currentHref = $(jqMdkTag).attr('href');
            var currentCat = $("meta[name='WT.z_pg']").attr('content');
            var currentMeta = "&amp;MDC=" + currentCat;
            $(jqMdkTag).attr('href', currentHref + "&amp;MDK=" + mdkTagVariable + currentMeta);
            if (typeof _gaq != "undefined") {
                _gaq.push(['_trackEvent','DynBanView', mdkTagVariable, currentCat, 1]);
            }

        };
        var setupHolidayBanner = function() {

            var cookie_name = "cab_holiday_banner";
            if (plugin.settings.isMobile) {
                cookie_name += "_mob";
            }

            if (plugin.getHolidayCookie(cookie_name)) {
                $(element).find('#DynBnrHoliday').hide().html(plugin.getHolidayCookie(cookie_name)).show();
                $(element).find('.DynBnrRight').addClass('DynBnrRightSmaller');
                if (plugin.settings.isMobile) { $(element).find('#DynBnrHoliday').addClass('DynBnrFloat')}
            } else {
                if (plugin.settings.debug) {console.log("Creating holidayBanner")}
                var holidayBannerUrl = "";
                if (plugin.settings.isMobile) {holidayBannerUrl = "_MB";}

                $.ajax({
                    type: "GET",
                    url: "/custserv/custserv_popup.jsp?pageName=HolidayBanner" + holidayBannerUrl,
                    success: function(data){
                        var bannerContent = $(data).find('#bannerContent').html();
                        plugin.setHolidayCookie(cookie_name, bannerContent, 1);
                        $('#DynBnrHoliday').hide().html(bannerContent).delay(500).animate({width: 'toggle'}, 1000);
                        if (plugin.settings.isMobile) { $(element).find('#DynBnrHoliday').addClass('DynBnrFloat')}
                    },
                    error: function(){console.log("error");}
                });
            }
        };
        var abort = function(message) {
            //Catch all function to fail gracefully when things are not as they seem
            $element.html(""); //Empty the html
            $.error(message);
        };

        // fire up the plugin!
        // call the "constructor" method
        plugin.init();

    };

    // add the plugin to the jQuery.fn object
    $.fn.cabdb = function(options) {
        return this.each(function() {
            // if plugin has not already been attached to the element
            if (undefined == $(this).data('cabdb')) {
                var plugin = new $.cabdb(this, options);
                // element.data('cabdb').publicMethod(arg1, arg2, ... argn) or
                // element.data('cabdb').settings.propertyName
                $(this).data('cabdb', plugin);
            }
        });
    };

    $.extend({
        el: function(el, props) {
            var $el = $(document.createElement(el));
            $el.attr(props);
            return $el;
        }
    });

})(jQuery);
/*!
	Colorbox 1.5.14
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function ($, document, window) {
	var
	// Default settings object.
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		// data sources
		html: false,
		photo: false,
		iframe: false,
		inline: false,

		// behavior and appearance
		transition: "elastic",
		speed: 300,
		fadeOut: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		opacity: 0.9,
		preloading: true,
		className: false,
		overlayClose: true,
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined,
		closeButton: true,
		fastIframe: true,
		open: false,
		reposition: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,

		// alternate image paths for high-res displays
		retinaImage: false,
		retinaUrl: false,
		retinaSuffix: '@2x.$1',

		// internationalization
		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",

		// accessbility
		returnFocus: true,
		trapFocus: true,

		// callbacks
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,

		rel: function() {
			return this.rel;
		},
		href: function() {
			// using this.href would give the absolute url, when the href may have been inteded as a selector (e.g. '#container')
			return $(this).attr('href');
		},
		title: function() {
			return this.title;
		}
	},

	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',
	
	// Events
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,
	$events = $('<a/>'), // $({}) would be prefered, but there is an issue with jQuery 1.4.2
	
	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div",
	requests = 0,
	previousCSS = {},
	init;

	// ****************
	// HELPER FUNCTIONS
	// ****************
	
	// Convenience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);

		if (id) {
			element.id = prefix + id;
		}

		if (css) {
			element.style.cssText = css;
		}

		return $(element);
	}
	
	// Get the window height using innerHeight when available to avoid an issue with iOS
	// http://bugs.jquery.com/ticket/6724
	function winheight() {
		return window.innerHeight ? window.innerHeight : $(window).height();
	}

	function Settings(element, options) {
		if (options !== Object(options)) {
			options = {};
		}

		this.cache = {};
		this.el = element;

		this.value = function(key) {
			var dataAttr;

			if (this.cache[key] === undefined) {
				dataAttr = $(this.el).attr('data-cbox-'+key);

				if (dataAttr !== undefined) {
					this.cache[key] = dataAttr;
				} else if (options[key] !== undefined) {
					this.cache[key] = options[key];
				} else if (defaults[key] !== undefined) {
					this.cache[key] = defaults[key];
				}
			}

			return this.cache[key];
		};

		this.get = function(key) {
			var value = this.value(key);
			return $.isFunction(value) ? value.call(this.el, this) : value;
		};
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var
		max = $related.length,
		newIndex = (index + increment) % max;
		
		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by the regex.
	function isImage(settings, url) {
		return settings.get('photo') || settings.get('photoRegex').test(url);
	}

	function retinaUrl(settings, url) {
		return settings.get('retinaUrl') && window.devicePixelRatio > 1 ? url.replace(settings.get('photoRegex'), settings.get('retinaSuffix')) : url;
	}

	function trapFocus(e) {
		if ('contains' in $box[0] && !$box[0].contains(e.target) && e.target !== $overlay[0]) {
			e.stopPropagation();
			$box.focus();
		}
	}

	function setClass(str) {
		if (setClass.str !== str) {
			$box.add($overlay).removeClass(setClass.str).addClass(str);
			setClass.str = str;
		}
	}

	function getRelated(rel) {
		index = 0;
		
		if (rel && rel !== false && rel !== 'nofollow') {
			$related = $('.' + boxElement).filter(function () {
				var options = $.data(this, colorbox);
				var settings = new Settings(this, options);
				return (settings.get('rel') === rel);
			});
			index = $related.index(settings.el);
			
			// Check direct calls to Colorbox.
			if (index === -1) {
				$related = $related.add(settings.el);
				index = $related.length - 1;
			}
		} else {
			$related = $(settings.el);
		}
	}

	function trigger(event) {
		// for external use
		$(document).trigger(event);
		// for internal use
		$events.triggerHandler(event);
	}

	var slideshow = (function(){
		var active,
			className = prefix + "Slideshow_",
			click = "click." + prefix,
			timeOut;

		function clear () {
			clearTimeout(timeOut);
		}

		function set() {
			if (settings.get('loop') || $related[index + 1]) {
				clear();
				timeOut = setTimeout(publicMethod.next, settings.get('slideshowSpeed'));
			}
		}

		function start() {
			$slideshow
				.html(settings.get('slideshowStop'))
				.unbind(click)
				.one(click, stop);

			$events
				.bind(event_complete, set)
				.bind(event_load, clear);

			$box.removeClass(className + "off").addClass(className + "on");
		}

		function stop() {
			clear();
			
			$events
				.unbind(event_complete, set)
				.unbind(event_load, clear);

			$slideshow
				.html(settings.get('slideshowStart'))
				.unbind(click)
				.one(click, function () {
					publicMethod.next();
					start();
				});

			$box.removeClass(className + "on").addClass(className + "off");
		}

		function reset() {
			active = false;
			$slideshow.hide();
			clear();
			$events
				.unbind(event_complete, set)
				.unbind(event_load, clear);
			$box.removeClass(className + "off " + className + "on");
		}

		return function(){
			if (active) {
				if (!settings.get('slideshow')) {
					$events.unbind(event_cleanup, reset);
					reset();
				}
			} else {
				if (settings.get('slideshow') && $related[1]) {
					active = true;
					$events.one(event_cleanup, reset);
					if (settings.get('slideshowAuto')) {
						start();
					} else {
						stop();
					}
					$slideshow.show();
				}
			}
		};

	}());


	function launch(element) {
		var options;

		if (!closing) {

			options = $(element).data(colorbox);

			settings = new Settings(element, options);
			
			getRelated(settings.get('rel'));

			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

				setClass(settings.get('className'));
				
				// Show colorbox so the sizes can be calculated in older versions of jQuery
				$box.css({visibility:'hidden', display:'block', opacity:''});
				
				$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden; visibility:hidden');
				$content.css({width:'', height:''}).append($loaded);

				// Cache values needed for size calculations
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);

				// Opens inital empty Colorbox prior to content being loaded.
				var initialWidth = setSize(settings.get('initialWidth'), 'x');
				var initialHeight = setSize(settings.get('initialHeight'), 'y');
				var maxWidth = settings.get('maxWidth');
				var maxHeight = settings.get('maxHeight');

				settings.w = (maxWidth !== false ? Math.min(initialWidth, setSize(maxWidth, 'x')) : initialWidth) - loadedWidth - interfaceWidth;
				settings.h = (maxHeight !== false ? Math.min(initialHeight, setSize(maxHeight, 'y')) : initialHeight) - loadedHeight - interfaceHeight;

				$loaded.css({width:'', height:settings.h});
				publicMethod.position();

				trigger(event_open);
				settings.get('onOpen');

				$groupControls.add($title).hide();

				$box.focus();
				
				if (settings.get('trapFocus')) {
					// Confine focus to the modal
					// Uses event capturing that is not supported in IE8-
					if (document.addEventListener) {

						document.addEventListener('focus', trapFocus, true);
						
						$events.one(event_closed, function () {
							document.removeEventListener('focus', trapFocus, true);
						});
					}
				}

				// Return focus on closing
				if (settings.get('returnFocus')) {
					$events.one(event_closed, function () {
						$(settings.el).focus();
					});
				}
			}

			var opacity = parseFloat(settings.get('opacity'));
			$overlay.css({
				opacity: opacity === opacity ? opacity : '',
				cursor: settings.get('overlayClose') ? 'pointer' : '',
				visibility: 'visible'
			}).show();
			
			if (settings.get('closeButton')) {
				$close.html(settings.get('close')).appendTo($content);
			} else {
				$close.appendTo('<div/>'); // replace with .detach() when dropping jQuery < 1.4
			}

			load();
		}
	}

	// Colorbox's markup needs to be added to the DOM prior to being called
	// so that the browser will go ahead and load the CSS background images.
	function appendHTML() {
		if (!$box) {
			init = false;
			$window = $(window);
			$box = $tag(div).attr({
				id: colorbox,
				'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.
				role: 'dialog',
				tabindex: '-1'
			}).hide();
			$overlay = $tag(div, "Overlay").hide();
			$loadingOverlay = $([$tag(div, "LoadingOverlay")[0],$tag(div, "LoadingGraphic")[0]]);
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$prev = $('<button type="button"/>').attr({id:prefix+'Previous'}),
				$next = $('<button type="button"/>').attr({id:prefix+'Next'}),
				$slideshow = $tag('button', "Slideshow"),
				$loadingOverlay
			);

			$close = $('<button type="button"/>').attr({id:prefix+'Close'});
			
			$wrap.append( // The 3x3 Grid that makes up Colorbox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});
			
			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');
			
			$groupControls = $next.add($prev).add($current).add($slideshow);
		}
		if (document.body && !$box.parent().length) {
			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
		}
	}

	// Add Colorbox's event bindings
	function addBindings() {
		function clickHandler(e) {
			// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
			// See: http://jacklmoore.com/notes/click-events/
			if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				launch(this);
			}
		}

		if ($box) {
			if (!init) {
				init = true;

				// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
				$next.click(function () {
					publicMethod.next();
				});
				$prev.click(function () {
					publicMethod.prev();
				});
				$close.click(function () {
					publicMethod.close();
				});
				$overlay.click(function () {
					if (settings.get('overlayClose')) {
						publicMethod.close();
					}
				});
				
				// Key Bindings
				$(document).bind('keydown.' + prefix, function (e) {
					var key = e.keyCode;
					if (open && settings.get('escKey') && key === 27) {
						e.preventDefault();
						publicMethod.close();
					}
					if (open && settings.get('arrowKey') && $related[1] && !e.altKey) {
						if (key === 37) {
							e.preventDefault();
							$prev.click();
						} else if (key === 39) {
							e.preventDefault();
							$next.click();
						}
					}
				});

				if ($.isFunction($.fn.on)) {
					// For jQuery 1.7+
					$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
				} else {
					// For jQuery 1.3.x -> 1.6.x
					// This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
					// This is not here for jQuery 1.9, it's here for legacy users.
					$('.'+boxElement).live('click.'+prefix, clickHandler);
				}
			}
			return true;
		}
		return false;
	}

	// Don't do anything if Colorbox already exists.
	if ($[colorbox]) {
		return;
	}

	// Append the HTML when the DOM loads
	$(appendHTML);


	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.colorbox.close();
	// Usage from within an iframe: parent.jQuery.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var settings;
		var $obj = this;

		options = options || {};

		if ($.isFunction($obj)) { // assume a call to $.colorbox
			$obj = $('<a/>');
			options.open = true;
		} else if (!$obj[0]) { // colorbox being applied to empty collection
			return $obj;
		}


		if (!$obj[0]) { // colorbox being applied to empty collection
			return $obj;
		}
		
		appendHTML();

		if (addBindings()) {

			if (callback) {
				options.onComplete = callback;
			}

			$obj.each(function () {
				var old = $.data(this, colorbox) || {};
				$.data(this, colorbox, $.extend(old, options));
			}).addClass(boxElement);

			settings = new Settings($obj[0], options);
			
			if (settings.get('open')) {
				launch($obj[0]);
			}
		}
		
		return $obj;
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		css,
		top = 0,
		left = 0,
		offset = $box.offset(),
		scrollTop,
		scrollLeft;
		
		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height
		$box.css({top: -9e4, left: -9e4});

		scrollTop = $window.scrollTop();
		scrollLeft = $window.scrollLeft();

		if (settings.get('fixed')) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.get('right') !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.get('right'), 'x'), 0);
		} else if (settings.get('left') !== false) {
			left += setSize(settings.get('left'), 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}
		
		if (settings.get('bottom') !== false) {
			top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.get('bottom'), 'y'), 0);
		} else if (settings.get('top') !== false) {
			top += setSize(settings.get('top'), 'y');
		} else {
			top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}

		$box.css({top: offset.top, left: offset.left, visibility:'visible'});
		
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions() {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width,10) - interfaceWidth)+'px';
			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height,10) - interfaceHeight)+'px';
		}

		css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};

		// setting the speed to 0 if the content hasn't changed size or position
		if (speed) {
			var tempSpeed = 0;
			$.each(css, function(i){
				if (css[i] !== previousCSS[i]) {
					tempSpeed = speed;
					return;
				}
			});
			speed = tempSpeed;
		}

		previousCSS = css;

		if (!speed) {
			$box.css(css);
		}

		$box.dequeue().animate(css, {
			duration: speed || 0,
			complete: function () {
				modalDimensions();
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (settings.get('reposition')) {
					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
						$window.bind('resize.' + prefix, publicMethod.position);
					}, 1);
				}

				if ($.isFunction(loadedCallback)) {
					loadedCallback();
				}
			},
			step: modalDimensions
		});
	};

	publicMethod.resize = function (options) {
		var scrolltop;
		
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}

			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}

			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}

			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}

			if (!options.innerHeight && !options.height) {
				scrolltop = $loaded.scrollTop();
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}

			$loaded.css({height: settings.h});

			if(scrolltop) {
				$loaded.scrollTop(scrolltop);
			}
			
			publicMethod.position(settings.get('transition') === "none" ? 0 : settings.get('speed'));
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var callback, speed = settings.get('transition') === "none" ? 0 : settings.get('speed');

		$loaded.remove();

		$loaded = $tag(div, 'LoadedContent').append(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.get('scrolling') ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		
		$(photo).css({'float': 'none'});

		setClass(settings.get('className'));

		callback = function () {
			var total = $related.length,
				iframe,
				complete;
			
			if (!open) {
				return;
			}
			
			function removeFilter() { // Needed for IE8 in versions of jQuery prior to 1.7.2
				if ($.support.opacity === false) {
					$box[0].style.removeAttribute('filter');
				}
			}
			
			complete = function () {
				clearTimeout(loadingTimer);
				$loadingOverlay.hide();
				trigger(event_complete);
				settings.get('onComplete');
			};

			
			$title.html(settings.get('title')).show();
			$loaded.show();
			
			if (total > 1) { // handle grouping
				if (typeof settings.get('current') === "string") {
					$current.html(settings.get('current').replace('{current}', index + 1).replace('{total}', total)).show();
				}
				
				$next[(settings.get('loop') || index < total - 1) ? "show" : "hide"]().html(settings.get('next'));
				$prev[(settings.get('loop') || index) ? "show" : "hide"]().html(settings.get('previous'));
				
				slideshow();
				
				// Preloads images within a rel group
				if (settings.get('preloading')) {
					$.each([getIndex(-1), getIndex(1)], function(){
						var img,
							i = $related[this],
							settings = new Settings(i, $.data(i, colorbox)),
							src = settings.get('href');

						if (src && isImage(settings, src)) {
							src = retinaUrl(settings, src);
							img = document.createElement('img');
							img.src = src;
						}
					});
				}
			} else {
				$groupControls.hide();
			}
			
			if (settings.get('iframe')) {
				iframe = document.createElement('iframe');
				
				if ('frameBorder' in iframe) {
					iframe.frameBorder = 0;
				}
				
				if ('allowTransparency' in iframe) {
					iframe.allowTransparency = "true";
				}

				if (!settings.get('scrolling')) {
					iframe.scrolling = "no";
				}
				
				$(iframe)
					.attr({
						src: settings.get('href'),
						name: (new Date()).getTime(), // give the iframe a unique name to prevent caching
						'class': prefix + 'Iframe',
						allowFullScreen : true // allow HTML5 video to go fullscreen
					})
					.one('load', complete)
					.appendTo($loaded);
				
				$events.one(event_purge, function () {
					iframe.src = "//about:blank";
				});

				if (settings.get('fastIframe')) {
					$(iframe).trigger('load');
				}
			} else {
				complete();
			}
			
			if (settings.get('transition') === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};
		
		if (settings.get('transition') === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	function load () {
		var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;
		
		active = true;
		
		photo = false;
		
		trigger(event_purge);
		trigger(event_load);
		settings.get('onLoad');
		
		settings.h = settings.get('height') ?
				setSize(settings.get('height'), 'y') - loadedHeight - interfaceHeight :
				settings.get('innerHeight') && setSize(settings.get('innerHeight'), 'y');
		
		settings.w = settings.get('width') ?
				setSize(settings.get('width'), 'x') - loadedWidth - interfaceWidth :
				settings.get('innerWidth') && setSize(settings.get('innerWidth'), 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.get('maxWidth')) {
			settings.mw = setSize(settings.get('maxWidth'), 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.get('maxHeight')) {
			settings.mh = setSize(settings.get('maxHeight'), 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.get('href');
		
		loadingTimer = setTimeout(function () {
			$loadingOverlay.show();
		}, 100);
		
		if (settings.get('inline')) {
			var $target = $(href);
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when Colorbox closes or loads new content.
			$inline = $('<div>').hide().insertBefore($target);

			$events.one(event_purge, function () {
				$inline.replaceWith($target);
			});

			prep($target);
		} else if (settings.get('iframe')) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.get('html')) {
			prep(settings.get('html'));
		} else if (isImage(settings, href)) {

			href = retinaUrl(settings, href);

			photo = new Image();

			$(photo)
			.addClass(prefix + 'Photo')
			.bind('error',function () {
				prep($tag(div, 'Error').html(settings.get('imgError')));
			})
			.one('load', function () {
				if (request !== requests) {
					return;
				}

				// A small pause because some browsers will occassionaly report a 
				// img.width and img.height of zero immediately after the img.onload fires
				setTimeout(function(){
					var percent;

					$.each(['alt', 'longdesc', 'aria-describedby'], function(i,val){
						var attr = $(settings.el).attr(val) || $(settings.el).attr('data-'+val);
						if (attr) {
							photo.setAttribute(val, attr);
						}
					});

					if (settings.get('retinaImage') && window.devicePixelRatio > 1) {
						photo.height = photo.height / window.devicePixelRatio;
						photo.width = photo.width / window.devicePixelRatio;
					}

					if (settings.get('scalePhotos')) {
						setResize = function () {
							photo.height -= photo.height * percent;
							photo.width -= photo.width * percent;
						};
						if (settings.mw && photo.width > settings.mw) {
							percent = (photo.width - settings.mw) / photo.width;
							setResize();
						}
						if (settings.mh && photo.height > settings.mh) {
							percent = (photo.height - settings.mh) / photo.height;
							setResize();
						}
					}
					
					if (settings.h) {
						photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';
					}
					
					if ($related[1] && (settings.get('loop') || $related[index + 1])) {
						photo.style.cursor = 'pointer';
						photo.onclick = function () {
							publicMethod.next();
						};
					}

					photo.style.width = photo.width + 'px';
					photo.style.height = photo.height + 'px';
					prep(photo);
				}, 1);
			});
			
			photo.src = href;

		} else if (href) {
			$loadingBay.load(href, settings.get('data'), function (data, status) {
				if (request === requests) {
					prep(status === 'error' ? $tag(div, 'Error').html(settings.get('xhrError')) : $(this).contents());
				}
			});
		}
	}
		
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (settings.get('loop') || $related[index + 1])) {
			index = getIndex(1);
			launch($related[index]);
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (settings.get('loop') || index)) {
			index = getIndex(-1);
			launch($related[index]);
		}
	};

	// Note: to use this within an iframe use the following format: parent.jQuery.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			open = false;
			trigger(event_cleanup);
			settings.get('onCleanup');
			$window.unbind('.' + prefix);
			$overlay.fadeTo(settings.get('fadeOut') || 0, 0);
			
			$box.stop().fadeTo(settings.get('fadeOut') || 0, 0, function () {
				$box.hide();
				$overlay.hide();
				trigger(event_purge);
				$loaded.remove();
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed);
					settings.get('onClosed');
				}, 1);
			});
		}
	};

	// Removes changes Colorbox made to the document, but does not remove the plugin.
	publicMethod.remove = function () {
		if (!$box) { return; }

		$box.stop();
		$[colorbox].close();
		$box.stop(false, true).remove();
		$overlay.remove();
		closing = false;
		$box = null;
		$('.' + boxElement)
			.removeData(colorbox)
			.removeClass(boxElement);

		$(document).unbind('click.'+prefix).unbind('keydown.'+prefix);
	};

	// A method for fetching the current element Colorbox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(settings.el);
	};

	publicMethod.settings = defaults;

}(jQuery, document, window));
/*!
 * jQuery Cycle2; build: v20131005
 * http://jquery.malsup.com/cycle2/
 * Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
 */
/*! core engine; version: 20131003 */
(function(e){"use strict";function t(e){return(e||"").toLowerCase()}var i="20131003";e.fn.cycle=function(i){var n;return 0!==this.length||e.isReady?this.each(function(){var n,s,o,c,r=e(this),l=e.fn.cycle.log;if(!r.data("cycle.opts")){(r.data("cycle-log")===!1||i&&i.log===!1||s&&s.log===!1)&&(l=e.noop),l("--c2 init--"),n=r.data();for(var a in n)n.hasOwnProperty(a)&&/^cycle[A-Z]+/.test(a)&&(c=n[a],o=a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),l(o+":",c,"("+typeof c+")"),n[o]=c);s=e.extend({},e.fn.cycle.defaults,n,i||{}),s.timeoutId=0,s.paused=s.paused||!1,s.container=r,s._maxZ=s.maxZ,s.API=e.extend({_container:r},e.fn.cycle.API),s.API.log=l,s.API.trigger=function(e,t){return s.container.trigger(e,t),s.API},r.data("cycle.opts",s),r.data("cycle.API",s.API),s.API.trigger("cycle-bootstrap",[s,s.API]),s.API.addInitialSlides(),s.API.preInitSlideshow(),s.slides.length&&s.API.initSlideshow()}}):(n={s:this.selector,c:this.context},e.fn.cycle.log("requeuing slideshow (dom not ready)"),e(function(){e(n.s,n.c).cycle(i)}),this)},e.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var t=this.opts(),i=t.slides;t.slideCount=0,t.slides=e(),i=i.jquery?i:t.container.find(i),t.random&&i.sort(function(){return Math.random()-.5}),t.API.add(i)},preInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-pre-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.preInit)&&i.preInit(t),t._preInitialized=!0},postInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-post-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.postInit)&&i.postInit(t)},initSlideshow:function(){var t,i=this.opts(),n=i.container;i.API.calcFirstSlide(),"static"==i.container.css("position")&&i.container.css("position","relative"),e(i.slides[i.currSlide]).css("opacity",1).show(),i.API.stackSlides(i.slides[i.currSlide],i.slides[i.nextSlide],!i.reverse),i.pauseOnHover&&(i.pauseOnHover!==!0&&(n=e(i.pauseOnHover)),n.hover(function(){i.API.pause(!0)},function(){i.API.resume(!0)})),i.timeout&&(t=i.API.getSlideOpts(i.currSlide),i.API.queueTransition(t,t.timeout+i.delay)),i._initialized=!0,i.API.updateView(!0),i.API.trigger("cycle-initialized",[i]),i.API.postInitSlideshow()},pause:function(t){var i=this.opts(),n=i.API.getSlideOpts(),s=i.hoverPaused||i.paused;t?i.hoverPaused=!0:i.paused=!0,s||(i.container.addClass("cycle-paused"),i.API.trigger("cycle-paused",[i]).log("cycle-paused"),n.timeout&&(clearTimeout(i.timeoutId),i.timeoutId=0,i._remainingTimeout-=e.now()-i._lastQueue,(0>i._remainingTimeout||isNaN(i._remainingTimeout))&&(i._remainingTimeout=void 0)))},resume:function(e){var t=this.opts(),i=!t.hoverPaused&&!t.paused;e?t.hoverPaused=!1:t.paused=!1,i||(t.container.removeClass("cycle-paused"),0===t.slides.filter(":animated").length&&t.API.queueTransition(t.API.getSlideOpts(),t._remainingTimeout),t.API.trigger("cycle-resumed",[t,t._remainingTimeout]).log("cycle-resumed"))},add:function(t,i){var n,s=this.opts(),o=s.slideCount,c=!1;"string"==e.type(t)&&(t=e.trim(t)),e(t).each(function(){var t,n=e(this);i?s.container.prepend(n):s.container.append(n),s.slideCount++,t=s.API.buildSlideOpts(n),s.slides=i?e(n).add(s.slides):s.slides.add(n),s.API.initSlide(t,n,--s._maxZ),n.data("cycle.opts",t),s.API.trigger("cycle-slide-added",[s,t,n])}),s.API.updateView(!0),c=s._preInitialized&&2>o&&s.slideCount>=1,c&&(s._initialized?s.timeout&&(n=s.slides.length,s.nextSlide=s.reverse?n-1:1,s.timeoutId||s.API.queueTransition(s)):s.API.initSlideshow())},calcFirstSlide:function(){var e,t=this.opts();e=parseInt(t.startingSlide||0,10),(e>=t.slides.length||0>e)&&(e=0),t.currSlide=e,t.reverse?(t.nextSlide=e-1,0>t.nextSlide&&(t.nextSlide=t.slides.length-1)):(t.nextSlide=e+1,t.nextSlide==t.slides.length&&(t.nextSlide=0))},calcNextSlide:function(){var e,t=this.opts();t.reverse?(e=0>t.nextSlide-1,t.nextSlide=e?t.slideCount-1:t.nextSlide-1,t.currSlide=e?0:t.nextSlide+1):(e=t.nextSlide+1==t.slides.length,t.nextSlide=e?0:t.nextSlide+1,t.currSlide=e?t.slides.length-1:t.nextSlide-1)},calcTx:function(t,i){var n,s=t;return i&&s.manualFx&&(n=e.fn.cycle.transitions[s.manualFx]),n||(n=e.fn.cycle.transitions[s.fx]),n||(n=e.fn.cycle.transitions.fade,s.API.log('Transition "'+s.fx+'" not found.  Using fade.')),n},prepareTx:function(e,t){var i,n,s,o,c,r=this.opts();return 2>r.slideCount?(r.timeoutId=0,void 0):(!e||r.busy&&!r.manualTrump||(r.API.stopTransition(),r.busy=!1,clearTimeout(r.timeoutId),r.timeoutId=0),r.busy||(0!==r.timeoutId||e)&&(n=r.slides[r.currSlide],s=r.slides[r.nextSlide],o=r.API.getSlideOpts(r.nextSlide),c=r.API.calcTx(o,e),r._tx=c,e&&void 0!==o.manualSpeed&&(o.speed=o.manualSpeed),r.nextSlide!=r.currSlide&&(e||!r.paused&&!r.hoverPaused&&r.timeout)?(r.API.trigger("cycle-before",[o,n,s,t]),c.before&&c.before(o,n,s,t),i=function(){r.busy=!1,r.container.data("cycle.opts")&&(c.after&&c.after(o,n,s,t),r.API.trigger("cycle-after",[o,n,s,t]),r.API.queueTransition(o),r.API.updateView(!0))},r.busy=!0,c.transition?c.transition(o,n,s,t,i):r.API.doTransition(o,n,s,t,i),r.API.calcNextSlide(),r.API.updateView()):r.API.queueTransition(o)),void 0)},doTransition:function(t,i,n,s,o){var c=t,r=e(i),l=e(n),a=function(){l.animate(c.animIn||{opacity:1},c.speed,c.easeIn||c.easing,o)};l.css(c.cssBefore||{}),r.animate(c.animOut||{},c.speed,c.easeOut||c.easing,function(){r.css(c.cssAfter||{}),c.sync||a()}),c.sync&&a()},queueTransition:function(t,i){var n=this.opts(),s=void 0!==i?i:t.timeout;return 0===n.nextSlide&&0===--n.loop?(n.API.log("terminating; loop=0"),n.timeout=0,s?setTimeout(function(){n.API.trigger("cycle-finished",[n])},s):n.API.trigger("cycle-finished",[n]),n.nextSlide=n.currSlide,void 0):(s&&(n._lastQueue=e.now(),void 0===i&&(n._remainingTimeout=t.timeout),n.paused||n.hoverPaused||(n.timeoutId=setTimeout(function(){n.API.prepareTx(!1,!n.reverse)},s))),void 0)},stopTransition:function(){var e=this.opts();e.slides.filter(":animated").length&&(e.slides.stop(!1,!0),e.API.trigger("cycle-transition-stopped",[e])),e._tx&&e._tx.stopTransition&&e._tx.stopTransition(e)},advanceSlide:function(e){var t=this.opts();return clearTimeout(t.timeoutId),t.timeoutId=0,t.nextSlide=t.currSlide+e,0>t.nextSlide?t.nextSlide=t.slides.length-1:t.nextSlide>=t.slides.length&&(t.nextSlide=0),t.API.prepareTx(!0,e>=0),!1},buildSlideOpts:function(i){var n,s,o=this.opts(),c=i.data()||{};for(var r in c)c.hasOwnProperty(r)&&/^cycle[A-Z]+/.test(r)&&(n=c[r],s=r.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),o.API.log("["+(o.slideCount-1)+"]",s+":",n,"("+typeof n+")"),c[s]=n);c=e.extend({},e.fn.cycle.defaults,o,c),c.slideNum=o.slideCount;try{delete c.API,delete c.slideCount,delete c.currSlide,delete c.nextSlide,delete c.slides}catch(l){}return c},getSlideOpts:function(t){var i=this.opts();void 0===t&&(t=i.currSlide);var n=i.slides[t],s=e(n).data("cycle.opts");return e.extend({},i,s)},initSlide:function(t,i,n){var s=this.opts();i.css(t.slideCss||{}),n>0&&i.css("zIndex",n),isNaN(t.speed)&&(t.speed=e.fx.speeds[t.speed]||e.fx.speeds._default),t.sync||(t.speed=t.speed/2),i.addClass(s.slideClass)},updateView:function(e,t){var i=this.opts();if(i._initialized){var n=i.API.getSlideOpts(),s=i.slides[i.currSlide];!e&&t!==!0&&(i.API.trigger("cycle-update-view-before",[i,n,s]),0>i.updateView)||(i.slideActiveClass&&i.slides.removeClass(i.slideActiveClass).eq(i.currSlide).addClass(i.slideActiveClass),e&&i.hideNonActive&&i.slides.filter(":not(."+i.slideActiveClass+")").hide(),i.API.trigger("cycle-update-view",[i,n,s,e]),e&&i.API.trigger("cycle-update-view-after",[i,n,s]))}},getComponent:function(t){var i=this.opts(),n=i[t];return"string"==typeof n?/^\s*[\>|\+|~]/.test(n)?i.container.find(n):e(n):n.jquery?n:e(n)},stackSlides:function(t,i,n){var s=this.opts();t||(t=s.slides[s.currSlide],i=s.slides[s.nextSlide],n=!s.reverse),e(t).css("zIndex",s.maxZ);var o,c=s.maxZ-2,r=s.slideCount;if(n){for(o=s.currSlide+1;r>o;o++)e(s.slides[o]).css("zIndex",c--);for(o=0;s.currSlide>o;o++)e(s.slides[o]).css("zIndex",c--)}else{for(o=s.currSlide-1;o>=0;o--)e(s.slides[o]).css("zIndex",c--);for(o=r-1;o>s.currSlide;o--)e(s.slides[o]).css("zIndex",c--)}e(i).css("zIndex",s.maxZ-1)},getSlideIndex:function(e){return this.opts().slides.index(e)}},e.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))},e.fn.cycle.version=function(){return"Cycle2: "+i},e.fn.cycle.transitions={custom:{},none:{before:function(e,t,i,n){e.API.stackSlides(i,t,n),e.cssBefore={opacity:1,display:"block"}}},fade:{before:function(t,i,n,s){var o=t.API.getSlideOpts(t.nextSlide).slideCss||{};t.API.stackSlides(i,n,s),t.cssBefore=e.extend(o,{opacity:0,display:"block"}),t.animIn={opacity:1},t.animOut={opacity:0}}},fadeout:{before:function(t,i,n,s){var o=t.API.getSlideOpts(t.nextSlide).slideCss||{};t.API.stackSlides(i,n,s),t.cssBefore=e.extend(o,{opacity:1,display:"block"}),t.animOut={opacity:0}}},scrollHorz:{before:function(e,t,i,n){e.API.stackSlides(t,i,n);var s=e.container.css("overflow","hidden").width();e.cssBefore={left:n?s:-s,top:0,opacity:1,display:"block"},e.cssAfter={zIndex:e._maxZ-2,left:0},e.animIn={left:0},e.animOut={left:n?-s:s}}}},e.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:-1},e(document).ready(function(){e(e.fn.cycle.defaults.autoSelector).cycle()})})(jQuery),/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130304 */
	function(e){"use strict";function t(t,n){var s,o,c,r=n.autoHeight;if("container"==r)o=e(n.slides[n.currSlide]).outerHeight(),n.container.height(o);else if(n._autoHeightRatio)n.container.height(n.container.width()/n._autoHeightRatio);else if("calc"===r||"number"==e.type(r)&&r>=0){if(c="calc"===r?i(t,n):r>=n.slides.length?0:r,c==n._sentinelIndex)return;n._sentinelIndex=c,n._sentinel&&n._sentinel.remove(),s=e(n.slides[c].cloneNode(!0)),s.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),s.css({position:"static",visibility:"hidden",display:"block"}).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),s.find("*").css("visibility","hidden"),n._sentinel=s}}function i(t,i){var n=0,s=-1;return i.slides.each(function(t){var i=e(this).height();i>s&&(s=i,n=t)}),n}function n(t,i,n,s){var o=e(s).outerHeight(),c=i.sync?i.speed/2:i.speed;i.container.animate({height:o},c)}function s(i,o){o._autoHeightOnResize&&(e(window).off("resize orientationchange",o._autoHeightOnResize),o._autoHeightOnResize=null),o.container.off("cycle-slide-added cycle-slide-removed",t),o.container.off("cycle-destroyed",s),o.container.off("cycle-before",n),o._sentinel&&(o._sentinel.remove(),o._sentinel=null)}e.extend(e.fn.cycle.defaults,{autoHeight:0}),e(document).on("cycle-initialized",function(i,o){function c(){t(i,o)}var r,l=o.autoHeight,a=e.type(l),d=null;("string"===a||"number"===a)&&(o.container.on("cycle-slide-added cycle-slide-removed",t),o.container.on("cycle-destroyed",s),"container"==l?o.container.on("cycle-before",n):"string"===a&&/\d+\:\d+/.test(l)&&(r=l.match(/(\d+)\:(\d+)/),r=r[1]/r[2],o._autoHeightRatio=r),"number"!==a&&(o._autoHeightOnResize=function(){clearTimeout(d),d=setTimeout(c,50)},e(window).on("resize orientationchange",o._autoHeightOnResize)),setTimeout(c,30))})}(jQuery),/*! caption plugin for Cycle2;  version: 20130306 */
	function(e){"use strict";e.extend(e.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>",captionModule:"caption"}),e(document).on("cycle-update-view",function(t,i,n,s){"caption"===i.captionModule&&e.each(["caption","overlay"],function(){var e=this,t=n[e+"Template"],o=i.API.getComponent(e);o.length&&t?(o.html(i.API.tmpl(t,n,i,s)),o.show()):o.hide()})}),e(document).on("cycle-destroyed",function(t,i){var n;e.each(["caption","overlay"],function(){var e=this,t=i[e+"Template"];i[e]&&t&&(n=i.API.getComponent("caption"),n.empty())})})}(jQuery),/*! command plugin for Cycle2;  version: 20130707 */
	function(e){"use strict";var t=e.fn.cycle;e.fn.cycle=function(i){var n,s,o,c=e.makeArray(arguments);return"number"==e.type(i)?this.cycle("goto",i):"string"==e.type(i)?this.each(function(){var r;return n=i,o=e(this).data("cycle.opts"),void 0===o?(t.log('slideshow must be initialized before sending commands; "'+n+'" ignored'),void 0):(n="goto"==n?"jump":n,s=o.API[n],e.isFunction(s)?(r=e.makeArray(c),r.shift(),s.apply(o.API,r)):(t.log("unknown command: ",n),void 0))}):t.apply(this,arguments)},e.extend(e.fn.cycle,t),e.extend(t.API,{next:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?-1:1;e.allowWrap===!1&&e.currSlide+t>=e.slideCount||(e.API.advanceSlide(t),e.API.trigger("cycle-next",[e]).log("cycle-next"))}},prev:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?1:-1;e.allowWrap===!1&&0>e.currSlide+t||(e.API.advanceSlide(t),e.API.trigger("cycle-prev",[e]).log("cycle-prev"))}},destroy:function(){this.stop();var t=this.opts(),i=e.isFunction(e._data)?e._data:e.noop;clearTimeout(t.timeoutId),t.timeoutId=0,t.API.stop(),t.API.trigger("cycle-destroyed",[t]).log("cycle-destroyed"),t.container.removeData(),i(t.container[0],"parsedAttrs",!1),t.retainStylesOnDestroy||(t.container.removeAttr("style"),t.slides.removeAttr("style"),t.slides.removeClass(t.slideActiveClass)),t.slides.each(function(){e(this).removeData(),i(this,"parsedAttrs",!1)})},jump:function(e){var t,i=this.opts();if(!i.busy||i.manualTrump){var n=parseInt(e,10);if(isNaN(n)||0>n||n>=i.slides.length)return i.API.log("goto: invalid slide index: "+n),void 0;if(n==i.currSlide)return i.API.log("goto: skipping, already on slide",n),void 0;i.nextSlide=n,clearTimeout(i.timeoutId),i.timeoutId=0,i.API.log("goto: ",n," (zero-index)"),t=i.currSlide<i.nextSlide,i.API.prepareTx(!0,t)}},stop:function(){var t=this.opts(),i=t.container;clearTimeout(t.timeoutId),t.timeoutId=0,t.API.stopTransition(),t.pauseOnHover&&(t.pauseOnHover!==!0&&(i=e(t.pauseOnHover)),i.off("mouseenter mouseleave")),t.API.trigger("cycle-stopped",[t]).log("cycle-stopped")},reinit:function(){var e=this.opts();e.API.destroy(),e.container.cycle()},remove:function(t){for(var i,n,s=this.opts(),o=[],c=1,r=0;s.slides.length>r;r++)i=s.slides[r],r==t?n=i:(o.push(i),e(i).data("cycle.opts").slideNum=c,c++);n&&(s.slides=e(o),s.slideCount--,e(n).remove(),t==s.currSlide?s.API.advanceSlide(1):s.currSlide>t?s.currSlide--:s.currSlide++,s.API.trigger("cycle-slide-removed",[s,t,n]).log("cycle-slide-removed"),s.API.updateView())}}),e(document).on("click.cycle","[data-cycle-cmd]",function(t){t.preventDefault();var i=e(this),n=i.data("cycle-cmd"),s=i.data("cycle-context")||".cycle-slideshow";e(s).cycle(n,i.data("cycle-arg"))})}(jQuery),/*! hash plugin for Cycle2;  version: 20130905 */
	function(e){"use strict";function t(t,i){var n;return t._hashFence?(t._hashFence=!1,void 0):(n=window.location.hash.substring(1),t.slides.each(function(s){if(e(this).data("cycle-hash")==n){if(i===!0)t.startingSlide=s;else{var o=s>t.currSlide;t.nextSlide=s,t.API.prepareTx(!0,o)}return!1}}),void 0)}e(document).on("cycle-pre-initialize",function(i,n){t(n,!0),n._onHashChange=function(){t(n,!1)},e(window).on("hashchange",n._onHashChange)}),e(document).on("cycle-update-view",function(e,t,i){i.hash&&"#"+i.hash!=window.location.hash&&(t._hashFence=!0,window.location.hash=i.hash)}),e(document).on("cycle-destroyed",function(t,i){i._onHashChange&&e(window).off("hashchange",i._onHashChange)})}(jQuery),/*! loader plugin for Cycle2;  version: 20130307 */
	function(e){"use strict";e.extend(e.fn.cycle.defaults,{loader:!1}),e(document).on("cycle-bootstrap",function(t,i){function n(t,n){function o(t){var o;"wait"==i.loader?(r.push(t),0===a&&(r.sort(c),s.apply(i.API,[r,n]),i.container.removeClass("cycle-loading"))):(o=e(i.slides[i.currSlide]),s.apply(i.API,[t,n]),o.show(),i.container.removeClass("cycle-loading"))}function c(e,t){return e.data("index")-t.data("index")}var r=[];if("string"==e.type(t))t=e.trim(t);else if("array"===e.type(t))for(var l=0;t.length>l;l++)t[l]=e(t[l])[0];t=e(t);var a=t.length;a&&(t.hide().appendTo("body").each(function(t){function c(){0===--l&&(--a,o(d))}var l=0,d=e(this),u=d.is("img")?d:d.find("img");return d.data("index",t),u=u.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'),u.length?(l=u.length,u.each(function(){this.complete?c():e(this).load(function(){c()}).error(function(){0===--l&&(i.API.log("slide skipped; img not loaded:",this.src),0===--a&&"wait"==i.loader&&s.apply(i.API,[r,n]))})}),void 0):(--a,r.push(d),void 0)}),a&&i.container.addClass("cycle-loading"))}var s;i.loader&&(s=i.API.add,i.API.add=n)})}(jQuery),/*! pager plugin for Cycle2;  version: 20130525 */
	function(e){"use strict";function t(t,i,n){var s,o=t.API.getComponent("pager");o.each(function(){var o=e(this);if(i.pagerTemplate){var c=t.API.tmpl(i.pagerTemplate,i,t,n[0]);s=e(c).appendTo(o)}else s=o.children().eq(t.slideCount-1);s.on(t.pagerEvent,function(e){e.preventDefault(),t.API.page(o,e.currentTarget)})})}function i(e,t){var i=this.opts();if(!i.busy||i.manualTrump){var n=e.children().index(t),s=n,o=s>i.currSlide;i.currSlide!=s&&(i.nextSlide=s,i.API.prepareTx(!0,o),i.API.trigger("cycle-pager-activated",[i,e,t]))}}e.extend(e.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerTemplate:"<span>&bull;</span>"}),e(document).on("cycle-bootstrap",function(e,i,n){n.buildPagerLink=t}),e(document).on("cycle-slide-added",function(e,t,n,s){t.pager&&(t.API.buildPagerLink(t,n,s),t.API.page=i)}),e(document).on("cycle-slide-removed",function(t,i,n){if(i.pager){var s=i.API.getComponent("pager");s.each(function(){var t=e(this);e(t.children()[n]).remove()})}}),e(document).on("cycle-update-view",function(t,i){var n;i.pager&&(n=i.API.getComponent("pager"),n.each(function(){e(this).children().removeClass(i.pagerActiveClass).eq(i.currSlide).addClass(i.pagerActiveClass)}))}),e(document).on("cycle-destroyed",function(e,t){var i=t.API.getComponent("pager");i&&(i.children().off(t.pagerEvent),t.pagerTemplate&&i.empty())})}(jQuery),/*! prevnext plugin for Cycle2;  version: 20130709 */
	function(e){"use strict";e.extend(e.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),e(document).on("cycle-initialized",function(e,t){if(t.API.getComponent("next").on(t.nextEvent,function(e){e.preventDefault(),t.API.next()}),t.API.getComponent("prev").on(t.prevEvent,function(e){e.preventDefault(),t.API.prev()}),t.swipe){var i=t.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",n=t.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";t.container.on(i,function(){t.API.next()}),t.container.on(n,function(){t.API.prev()})}}),e(document).on("cycle-update-view",function(e,t){if(!t.allowWrap){var i=t.disabledClass,n=t.API.getComponent("next"),s=t.API.getComponent("prev"),o=t._prevBoundry||0,c=void 0!==t._nextBoundry?t._nextBoundry:t.slideCount-1;t.currSlide==c?n.addClass(i).prop("disabled",!0):n.removeClass(i).prop("disabled",!1),t.currSlide===o?s.addClass(i).prop("disabled",!0):s.removeClass(i).prop("disabled",!1)}}),e(document).on("cycle-destroyed",function(e,t){t.API.getComponent("prev").off(t.nextEvent),t.API.getComponent("next").off(t.prevEvent),t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),/*! progressive loader plugin for Cycle2;  version: 20130315 */
	function(e){"use strict";e.extend(e.fn.cycle.defaults,{progressive:!1}),e(document).on("cycle-pre-initialize",function(t,i){if(i.progressive){var n,s,o=i.API,c=o.next,r=o.prev,l=o.prepareTx,a=e.type(i.progressive);if("array"==a)n=i.progressive;else if(e.isFunction(i.progressive))n=i.progressive(i);else if("string"==a){if(s=e(i.progressive),n=e.trim(s.html()),!n)return;if(/^(\[)/.test(n))try{n=e.parseJSON(n)}catch(d){return o.log("error parsing progressive slides",d),void 0}else n=n.split(RegExp(s.data("cycle-split")||"\n")),n[n.length-1]||n.pop()}l&&(o.prepareTx=function(e,t){var s,o;return e||0===n.length?(l.apply(i.API,[e,t]),void 0):(t&&i.currSlide==i.slideCount-1?(o=n[0],n=n.slice(1),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.API.advanceSlide(1)},50)}),i.API.add(o)):t||0!==i.currSlide?l.apply(i.API,[e,t]):(s=n.length-1,o=n[s],n=n.slice(0,s),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.currSlide=1,t.API.advanceSlide(-1)},50)}),i.API.add(o,!0)),void 0)}),c&&(o.next=function(){var e=this.opts();if(n.length&&e.currSlide==e.slideCount-1){var t=n[0];n=n.slice(1),e.container.one("cycle-slide-added",function(e,t){c.apply(t.API),t.container.removeClass("cycle-loading")}),e.container.addClass("cycle-loading"),e.API.add(t)}else c.apply(e.API)}),r&&(o.prev=function(){var e=this.opts();if(n.length&&0===e.currSlide){var t=n.length-1,i=n[t];n=n.slice(0,t),e.container.one("cycle-slide-added",function(e,t){t.currSlide=1,t.API.advanceSlide(-1),t.container.removeClass("cycle-loading")}),e.container.addClass("cycle-loading"),e.API.add(i,!0)}else r.apply(e.API)})}})}(jQuery),/*! tmpl plugin for Cycle2;  version: 20121227 */
	function(e){"use strict";e.extend(e.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),e.extend(e.fn.cycle.API,{tmpl:function(t,i){var n=RegExp(i.tmplRegex||e.fn.cycle.defaults.tmplRegex,"g"),s=e.makeArray(arguments);return s.shift(),t.replace(n,function(t,i){var n,o,c,r,l=i.split(".");for(n=0;s.length>n;n++)if(c=s[n]){if(l.length>1)for(r=c,o=0;l.length>o;o++)c=r,r=r[l[o]]||i;else r=c[i];if(e.isFunction(r))return r.apply(c,s);if(void 0!==r&&null!==r&&r!=i)return r}return i})}})}(jQuery);

/*! Plugin for Cycle2; Copyright (c) 2012 M. Alsup; ver: 20121120 */
(function(a){"use strict";var b="ontouchend"in document;a.event.special.swipe=a.event.special.swipe||{scrollSupressionThreshold:10,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var b=a(this);b.bind("touchstart",function(c){function g(b){if(!f)return;var c=b.originalEvent.touches?b.originalEvent.touches[0]:b;e={time:(new Date).getTime(),coords:[c.pageX,c.pageY]},Math.abs(f.coords[0]-e.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault()}var d=c.originalEvent.touches?c.originalEvent.touches[0]:c,e,f={time:(new Date).getTime(),coords:[d.pageX,d.pageY],origin:a(c.target)};b.bind("touchmove",g).one("touchend",function(c){b.unbind("touchmove",g),f&&e&&e.time-f.time<a.event.special.swipe.durationThreshold&&Math.abs(f.coords[0]-e.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(f.coords[1]-e.coords[1])<a.event.special.swipe.verticalDistanceThreshold&&f.origin.trigger("swipe").trigger(f.coords[0]>e.coords[0]?"swipeleft":"swiperight"),f=e=undefined})})}},a.event.special.swipeleft=a.event.special.swipeleft||{setup:function(){a(this).bind("swipe",a.noop)}},a.event.special.swiperight=a.event.special.swiperight||a.event.special.swipeleft})(jQuery);

/*
 * jQuery EasIng v1.1.2 - http://gsgd.co.uk/sandbox/jquery.easIng.php
 *
 * Uses the built In easIng capabilities added In jQuery 1.1
 * to offer multiple easIng options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// t: current time, b: begInnIng value, c: change In value, d: duration

jQuery.extend( jQuery.easing,
{
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
/*!
 * Moving Boxes v2.3.4
 * by Chris Coyier
 * http://css-tricks.com/moving-boxes/
 */
/*jshint browser:true, jquery:true */
;(function($){
	"use strict";
	$.movingBoxes = function(el, options){
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var o, base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el).addClass('mb-slider');
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data('movingBoxes', base);

		base.init = function(){
			base.options = o = $.extend({}, $.movingBoxes.defaultOptions, options);

			// Setup formatting (to reduce the amount of initial HTML)
			base.$el.wrap('<div class="movingBoxes mb-wrapper"><div class="mb-scroll" /></div>');

			// defaults
			base.$window = base.$el.parent(); // mb-scroll
			base.$wrap = base.$window.parent() // mb-wrapper
				.prepend('<a class="mb-scrollButtons mb-left"></a>')
				.append('<a class="mb-scrollButtons mb-right"></a><div class="mb-left-shadow"></div><div class="mb-right-shadow"></div>');

			base.$panels = base.$el.children().addClass('mb-panel');
			base.runTime = $('.mb-slider').index(base.$el) + 1; // Get index (run time) of this slider on the page
			base.regex = new RegExp('slider' + base.runTime + '=(\\d+)', 'i'); // hash tag regex

			base.initialized = false;
			base.currentlyMoving = false;
			base.curPanel = (o.initAnimation) ? 1 : base.getHash() || o.startPanel;
			// save original slider width
			base.width = (o.width) ? parseInt(o.width,10) : base.$el.width();
			// save panel width, o.panelWidth originally a fraction (0.5 of o.width) if defined, or get first panel width
			// now can be set after initialization to resize using fraction (value <= 2) or px (all values > 2)
			base.pWidth = (o.panelWidth) ? (o.panelWidth <=2 ? o.panelWidth * base.width : o.panelWidth) : base.$panels.eq(0).width();

			// Set up click on left/right arrows
			base.$left = base.$wrap.find('.mb-left').click(function(){
				base.goBack();
				return false;
			});
			base.$right = base.$wrap.find('.mb-right').click(function(){
				base.goForward();
				return false;
			});
			// code to run to update MovingBoxes when the number of panels change
			base.update({}, false);
			// make sure current panel is centered
			base.setWrap(base.curPanel);
			// go to clicked panel
			base.$el.delegate('.mb-panel', 'click', function(e){
				if (!$(this).hasClass(o.currentPanel)) {
					e.preventDefault();  // prevent non-current panel links from working
					base.change( base.$panels.index($(this)) + base.adj, {}, true );
				}
			});

			// Activate moving box on click or when an internal link obtains focus
			base.$wrap.click(function(){
				if (!base.$wrap.hasClass('mb-active-slider')) {
					base.active();
				}
			});
			base.$panels.delegate('a', 'focus' ,function(e){
				e.preventDefault();
				// focused link centered in moving box
				var loc = base.$panels.index($(this).closest('.mb-panel')) + base.adj;
				if (loc !== base.curPanel){
					base.change( loc, {}, true );
				}
			});

			// Add keyboard navigation
			$(document).keyup(function(e){
				// ignore arrow/space keys if inside a form element
				if (e.target.tagName.match('TEXTAREA|INPUT|SELECT')) { return; }
				switch (e.which) {
					case 39: case 32: // right arrow & space
						if (base.$wrap.is('.mb-active-slider')){
							base.goForward();
						}
						break;
					case 37: // left arrow
						if (base.$wrap.is('.mb-active-slider')){
							base.goBack();
						}
						break;
				}
			});

			// Bind Events
			$.each('preinit initialized initChange beforeAnimation completed'.split(' '), function(i,evt){
				if ($.isFunction(o[evt])){
					base.$el.bind(evt + '.movingBoxes', o[evt]);
				}
			});

			base.$el.trigger( 'preinit.movingBoxes', [ base, base.curPanel ] );

		};

		// update the panel, flag is used to prevent events from firing
		base.update = function(callback, flag){

			// Infinite loop
			base.$el.children('.cloned').remove();
			base.$panels = base.$el.children();
			base.adj = (o.wrap && base.$panels.length > 1) ? 0 : 1; // count adjustment for infinite panels

			base.width = (o.width) ? parseInt(o.width,10) : base.width;
			base.$wrap.css('width', base.width); // set wrapper width

			if (o.wrap && base.$panels.length > 1) {
				base.$el.prepend( base.$panels.filter(':last').clone().addClass('cloned') );
				base.$el.append( base.$panels.filter(':first').clone().addClass('cloned') );
				base.$el.find('.cloned').each(function(){
					// disable all focusable elements in cloned panels to prevent shifting the panels by tabbing
					$(this).find('a,input,textarea,select,button,area').removeAttr('name').attr('disabled', 'disabled');
					$(this).find('[id]').andSelf().removeAttr('id');
				});
			}

			// Set up panes & content sizes
			// defined $panels again to include cloned panels
			base.$panels = base.$el.children()
				.addClass('mb-panel')
				// inner wrap of each panel
				.each(function(){
					if ($(this).find('.mb-inside').length === 0) {
						$(this).wrapInner('<div class="mb-inside" />');
					}
				});
			base.totalPanels = base.$panels.filter(':not(.cloned)').length; // don't include cloned panels in total
			// in case current panel no longer exists
			if (base.totalPanels <= 1) { base.curPanel = 1; }

			base.setSizes(flag);

			base.buildNav();

			base.change(base.curPanel, callback, flag); // initialize from first panel... then scroll to start panel

			// check panel height after all images load
			base.imagesLoaded(function(){
				base.setSizes(false);
				base.setWrap(base.curPanel);

				// animate to chosen start panel - starting from the first panel makes it look better
				if (!base.initialized){
					setTimeout(function(){
						base.initialized = true;
						base.change(base.getHash() || o.startPanel, {}, false);
						base.$el.trigger( 'initialized.movingBoxes', [ base, base.curPanel ] );
					}, o.speed * 2 );
				}

			});

		};

		base.setSizes = function(flag){
			// include padding & margins around the panels
			base.padding = parseInt(base.$panels.css('padding-left'), 10) + parseInt(base.$panels.css('margin-left'), 10);

			// save 'cur' numbers (current larger panel size), use stored sizes if they exist
			base.curWidth = (o.panelWidth) ? (o.panelWidth <=2 ? o.panelWidth * base.width : o.panelWidth) : base.pWidth;
			// save 'reg' (reduced size) numbers
			base.regWidth = base.curWidth * o.reducedSize;
			// set image heights so base container height is correctly set
			base.$panels.css({ width: base.curWidth, fontSize: '1em' }); // make all panels big
			// save each panel height... script will resize container as needed
			// make sure current panel css is applied before measuring
			base.$panels.eq(base.curPanel - base.adj).addClass(o.currentPanel);
			base.heights = base.$panels.css('height','auto').map(function(i,e){ return $(e).outerHeight(true); }).get();

			base.returnToNormal(base.curPanel, 0); // resize new panel, animation time
			base.growBigger(base.curPanel, 0, flag);
			base.updateArrows(base.curPanel);

			// make base container wide enough to contain all the panels
			base.$el.css({
				position : 'absolute',
				// add a bit more width to each box (base.padding *2; then add 1/2 overall width in case only one panel exists)
				width    : (base.curWidth + base.padding * 2) * base.$panels.length + (base.width - base.curWidth) / 2,
				height   : Math.max.apply( this, base.heights ) + 10,
				// add padding so scrollLeft = 0 centers the left-most panel (needed because scrollLeft cannot be < 0)
				'padding-left' : (base.width - base.curWidth) / 2
			});
			base.$window.css({ height : (o.fixedHeight) ? Math.max.apply( this, base.heights ) : base.heights[base.curPanel - base.adj] });
		};

		// Creates the numbered navigation links
		base.buildNav = function() {
			if (base.$nav) {
				base.$nav.find('.mb-links').empty();
			} else {
				base.$nav = $('<div class="mb-controls"><span class="mb-links"></span></div>').appendTo(base.$wrap);
			}
			if (o.buildNav && base.totalPanels > 1) {
				var t, j, a = '', $a;
				base.$panels.filter(':not(.cloned)').each(function(i){
					j = i + 1;
					a = '<a class="mb-link mb-panel' + j + '" href="#"></a>';
					$a = $(a);
					// If a formatter function is present, use it
					if ($.isFunction(o.navFormatter)) {
						t = o.navFormatter(j, $(this));
						if (typeof(t) === "string") {
							$a.html(t);
						} else {
							$a = $('<a/>', t);
						}
					} else {
						$a.html(j);
					}
					$a
					.appendTo(base.$nav.find('.mb-links'))
					.addClass('mb-link mb-panel' + j)
					.data('index', j);
				});
				base.$nav
					.find('a.mb-link').bind('click', function() {
						base.change( $(this).data('index') );
						return false;
					});
			}
		};

		// Resize panels to normal
		base.returnToNormal = function(num, time){
			var panels = base.$panels.not(':eq(' + (num - base.adj) + ')').removeClass(o.currentPanel);
			if (o.reducedSize === 1) {
				panels.css({ width: base.regWidth }); // excluding fontsize change to prevent video flicker
			} else {
				panels.stop(true,false).animate({ width: base.regWidth, fontSize: o.reducedSize + 'em' }, (time === 0) ? 0 : o.speed);
			}
		};

		// Zoom in on selected panel
		base.growBigger = function(num, time, flag){
			var panels = base.$panels.eq(num - base.adj);
			if (o.reducedSize === 1) {
				panels.css({ width: base.curWidth }); // excluding fontsize change to prevent video flicker
				// time delay prevents click outer panel from following links - fixes issue #67
				setTimeout(function(){
					base.completed(num, flag);
				}, (time === 0) ? 0 : o.speed);
			} else {
				panels.stop(true,false).animate({ width: base.curWidth, fontSize: '1em' }, (time === 0) ? 0 : o.speed, function(){
					// completed event trigger
					// even though animation is not queued, trigger is here because it is the last animation to complete
					base.completed(num, flag);
				});
			}
		};

		// instantly center the indicated panel
		base.setWrap = function(panel){
			if (base.totalPanels >= 1) {
				base.growBigger(panel, 0, false);
				var leftValue = base.$panels.eq(panel - base.adj).position().left - (base.width - base.curWidth) / 2 + base.padding;
				base.$window.scrollLeft(leftValue);
			}
		};

		base.completed = function(num, flag){
			// add current panel class after animating in case it has sizing parameters
			var loc = base.$panels.eq(num - base.adj);
			if (!loc.hasClass('cloned')) { loc.addClass(o.currentPanel); }
			if (flag !== false) { base.$el.trigger( 'completed.movingBoxes', [ base, num ] ); }
		};

		// go forward/back
		base.goForward = function(callback){
			if (base.initialized) {
				base.change(base.curPanel + 1, callback);
			}
		};

		base.goBack = function(callback){
			if (base.initialized) {
				base.change(base.curPanel - 1, callback);
			}
		};

		// Change view to display selected panel
		base.change = function(curPanel, callback, flag){

			if (base.totalPanels < 1) {
				if (typeof(callback) === 'function') { callback(base); }
				return;
			}
			var ani, leftValue, wrapped = false;
			flag = flag !== false;

			// check if curPanel is a jQuery selector or object
			// $('' + curPanel) needed because $(3) = [3], but $('3') = []
			if ($('' + curPanel).length || (curPanel instanceof $ && $(curPanel).length)) {
				curPanel = $(curPanel).closest('.mb-panel').index() + base.adj;
			} else {
				// make sure it's a number and not a string
				curPanel = parseInt(curPanel, 10);
			}

			if (base.initialized && flag) {
				// make this moving box active
				if (!base.$wrap.hasClass('mb-active-slider')) { base.active(); }
				// initChange event - has extra parameter with targeted panel (not cleaned)
				base.$el.trigger( 'initChange.movingBoxes', [ base, curPanel ] );
			}

			// Make infinite scrolling work
			if (o.wrap) {
				if (curPanel > base.totalPanels) {
					wrapped = true;
					curPanel = 1;
					base.returnToNormal(0, 0);
					base.setWrap(0);
				} else if (curPanel === 0) {
					wrapped = false;
					curPanel = base.totalPanels;
					base.setWrap(curPanel + 1);
				}
			}

			if ( curPanel < base.adj ) { curPanel = (o.wrap) ? base.totalPanels : 1; }
			if ( curPanel > base.totalPanels - base.adj ) { curPanel = (o.wrap) ? 1 : base.totalPanels; }
			// abort if panel is already animating
			// animation callback needed to clear this flag, but there is no animation before base.initialized is set
			if (base.curPanel !== curPanel && (!base.currentlyMoving || !base.initialized)) {
				// set animation flag; animation callback will clear this flag
				base.currentlyMoving = !o.stopAnimation;

				// center panel in scroll window
				base.$curPanel = base.$panels.eq(curPanel - base.adj);
				leftValue = base.$curPanel.position().left - (base.width - base.curWidth) / 2 + base.padding;
				// when scrolling right, add the difference of the larger current panel width
				if (base.initialized && (curPanel > base.curPanel || wrapped)) { leftValue -= ( base.curWidth - base.regWidth ); }
				ani = (o.fixedHeight) ? { scrollLeft : leftValue } : { scrollLeft: leftValue, height: base.heights[curPanel - base.adj] };
				base.curPanel = curPanel;
				// before animation trigger
				if (base.initialized && flag) { base.$el.trigger( 'beforeAnimation.movingBoxes', [ base, curPanel ] ); }

				if (o.delayBeforeAnimate) {
					// delay starting slide animation
					setTimeout(function(){
						base.animateBoxes(curPanel, ani, flag, callback);
					}, parseInt(o.delayBeforeAnimate, 10) || 0);
				} else {
					base.animateBoxes(curPanel, ani, flag, callback);
				}
			} else {
				base.endAnimation();
			}
		};

		base.animateBoxes = function(curPanel, ani, flag, callback){
			// animate the panels
			base.$window.scrollTop(0).stop(true,false).animate( ani,
				{
					queue    : false,
					duration : o.speed,
					easing   : o.easing,
					complete : function(){
						if (base.initialized) {
							base.$window.scrollTop(0); // Opera fix - otherwise, it moves the focus link to the middle of the viewport
						}
						base.currentlyMoving = false;
						if (typeof(callback) === 'function') { callback(base); }
					}
				}
			);

			base.returnToNormal(curPanel);
			base.growBigger(curPanel, o.speed, flag);
			base.updateArrows(curPanel);
			if (o.hashTags && base.initialized) { base.setHash(curPanel); }
			base.endAnimation();

		};

		base.endAnimation = function(){
			// Update navigation links
			if (o.buildNav && base.$nav.length) {
				base.$nav.find('a.mb-link')
					.removeClass(o.currentPanel)
					.eq(base.curPanel - 1).addClass(o.currentPanel);
			}
		};

		base.updateArrows = function(cur){
			base.$left.toggleClass(o.disabled, (!o.wrap && cur === base.adj) || base.totalPanels <= 1);
			base.$right.toggleClass(o.disabled, (!o.wrap && cur === base.totalPanels) || base.totalPanels <= 1);
		};

		// This method tries to find a hash that matches an ID and slider-X
		// If either found, it tries to find a matching item
		// If that is found as well, then it returns the page number
		base.getHash = function(){
			var h = window.location.hash,
				i = h.indexOf('&'),
				n = h.match(base.regex);
			// test for "/#/" or "/#!/" used by the jquery address plugin - $('#/') breaks jQuery
			if (n === null && !/^#&/.test(h) && !/#!?\//.test(h)) {
				// #quote2&panel1-3&panel3-3
				h = h.substring(0, (i >= 0 ? i : h.length));
				// ensure the element is in the same slider
				n = ($(h).length && $(h).closest('.mb-slider')[0] === base.el) ? $(h).closest('.mb-panel').index() + base.adj : null;
			} else if (n !== null) {
				// #&panel1-3&panel3-3
				n = (o.hashTags) ? parseInt(n[1],10) : null;
			}
			return (n > base.totalPanels) ? null : n;
		};

		// set hash tags
		base.setHash = function(n){
			var s = 'slider' + base.runTime + "=",
				h = window.location.hash;
			if ( typeof h !== 'undefined' ) {
				window.location.hash = (h.indexOf(s) > 0) ? h.replace(base.regex, s + n) : h + "&" + s + n;
			}
		};

		// Make moving box active (for keyboard navigation)
		base.active = function(){
			$('.mb-active-slider').removeClass('mb-active-slider');
			base.$wrap.addClass('mb-active-slider');
		};

		// get: var currentPanel = $('.slider').data('movingBoxes').currentPanel();  // returns # of currently selected/enlarged panel
		// set: var currentPanel = $('.slider').data('movingBoxes').currentPanel(2, function(){ alert('done!'); }); // returns and scrolls to 2nd panel
		base.currentPanel = function(panel, callback){
			if (typeof(panel) !== 'undefined') {
				base.change(panel, callback); // parse in case someone sends a string
			}
			return base.curPanel;
		};

		// based on https://github.com/Mottie/imagesLoaded plugin
		base.imagesLoaded = function(callback, img) {
			var i, ic,
				c = true, // complete flag
				t = img ? $(img) : base.$panels.find('img'),
				l = t.length;
			img = img || []; // array of images that didn't complete
			for ( i = 0; i < l; i++ ) {
				if (t[i].tagName === "IMG") {
					// IE: fileSize property = -1 before image has loaded & if image load error, so if false is returned
					// 10x, then just assume it's an error & call it complete - it's what Firefox & webkit does
					ic = ('fileSize' in t[i] && t[i].fileSize < 0 && t[i].count > 10) ? true : t[i].complete;
					// complete flag, checks previous flag status, complete flag & image height
					// image height may need to be > 20 (or whatever the line-height is) because the alt text is included
					c = (c && ic && t[i].height !== 0); // complete flag
					// save non-complete images for next iteration
					if (ic === false) {
						img.push(t[i]);
						// iteration count for IE
						t[i].count = (t[i].count || 0) + 1;
					}
				}
			}
			if (c) {
				// all complete, run the callback
				if (typeof callback === "function") { callback(); }
			} else {
				// some images not loaded, rinse & repeat
				setTimeout(function(){
					base.imagesLoaded(callback, img);
				}, 200);
			}
		};

		// Run initializer
		base.init();
	};

	$.movingBoxes.defaultOptions = {
		// Appearance
		startPanel   : 1,         // start with this panel
		reducedSize  : 0.8,       // non-current panel size: 80% of panel size
		fixedHeight  : false,     // if true, slider height set to max panel height; if false, slider height will auto adjust.

		// Behaviour
		initAnimation: true,      // if true, movingBoxes will initialize, then animate into the starting slide (if not the first slide)
		stopAnimation: false,     // if true, movingBoxes will force the animation to complete immediately, if the user selects the next panel
		hashTags     : true,      // if true, hash tags are enabled
		wrap         : false,     // if true, the panel will loop through the panels infinitely
		buildNav     : false,     // if true, navigation links will be added
		navFormatter : null,      // function which returns the navigation text for each panel
		easing       : 'swing',   // anything other than "linear" or "swing" requires the easing plugin

		// Times
		speed              : 500, // animation time in milliseconds
		delayBeforeAnimate : 0,   // time to delay in milliseconds before MovingBoxes animates to the selected panel

		// Selectors & classes
		currentPanel : 'current', // current panel class
		tooltipClass : 'tooltip', // added to the navigation, but the title attribute is blank unless the link text-indent is negative
		disabled     : 'disabled',// class added to arrows that are disabled (left arrow when on first panel, right arrow on last panel)

		// Callbacks
		preinit         : null,   // callback after the basic MovingBoxes structure has been built; before "initialized"
		initialized     : null,   // callback when MovingBoxes has completed initialization; all images loaded
		initChange      : null,   // callback upon change panel initialization
		beforeAnimation : null,   // callback before any animation occurs
		completed       : null    // callback after animation completes

		// deprecated options - but still used to keep the plugin backwards compatible
		// and allow resizing the overall width and panel width dynamically (i.e. on window resize)
		// width        : 800,       // overall width of movingBoxes (not including navigation arrows)
		// panelWidth   : 0.5        // current panel width adjusted to 50% of overall width

	};

	$.fn.movingBoxes = function(options, callback, flag){
		var mb;
		return this.each(function(){
			mb = $(this).data('movingBoxes');
			// initialize the slider but prevent multiple initializations
			if ((typeof(options)).match('object|undefined')){
				if (mb && options instanceof $ && options.length) {
					// pass a jQuery object to change panels
					mb.change(options, callback, flag);
				} else if (mb) {
					mb.update(callback, flag);
				} else {
					(new $.movingBoxes(this, options));
				}
			} else if (mb) {
				// page #, autoplay, one time callback, if flag is false then no events triggered and animation time = 0
				mb.change(options, callback, flag);
			}
		});
	};

	// Return the movingBoxes object
	$.fn.getMovingBoxes = function(){
		return this.data('movingBoxes');
	};

})(jQuery);
/**
 * Tabs plugin
 *
 * @copyright	Copyright 2012, Dimitris Krestos
 * @license		Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link		http://vdw.staytuned.gr
 * @version		v1.4.2
 */

	/* Sample html structure

	<div class='tabs'>
		<ul class='horizontal'>
			<li><a href="#tab-1">Tab 1</a></li>
			<li><a href="#tab-2">Tab 2</a></li>
			<li><a href="#tab-3">Tab 3</a></li>
		</ul>
		<div id='tab-1'></div>
		<div id='tab-2'></div>
		<div id='tab-3'></div>
	</div>

	*/

;(function($, window, undefined) {
	"use strict";

	$.fn.tabslet = function(options) {

		var defaults = {
			mouseevent:   'click',
			attribute:    'href',
			animation:    false,
			autorotate:   false,
			pauseonhover: true,
			delay:        2000,
			active:       1,
			controls:     {
				prev: '.prev',
				next: '.next'
			}
		};

		var options = $.extend(defaults, options);

		return this.each(function() {

			var $this = $(this);

			// Ungly overwrite
			options.mouseevent    = $this.data('mouseevent') || options.mouseevent;
			options.attribute     = $this.data('attribute') || options.attribute;
			options.animation     = $this.data('animation') || options.animation;
			options.autorotate    = $this.data('autorotate') || options.autorotate;
			options.pauseonhover 	= $this.data('pauseonhover') || options.pauseonhover;
			options.delay 				= $this.data('delay') || options.delay;
			options.active 				= $this.data('active') || options.active;

			$this.find('> div').hide();
			$this.find('> div').eq(options.active - 1).show();
			$this.find('> ul li').eq(options.active - 1).addClass('active');

			var fn = eval(

				function() {

					$(this).trigger('_before');

					$this.find('> ul li').removeClass('active');
					$(this).addClass('active');
					$this.find('> div').hide();

					var currentTab = $(this).find('a').attr(options.attribute);

					if (options.animation) {

						$this.find(currentTab).animate( { opacity: 'show' }, 'slow', function() {
							$(this).trigger('_after');
						});

					} else {

						$this.find(currentTab).show();
						$(this).trigger('_after');

					}

					return false;

				}

			);

			var init = eval("$this.find('> ul li')." + options.mouseevent + "(fn)");

			init;

			// Autorotate
			var elements = $this.find('> ul li'), i = options.active - 1; // ungly

			function forward() {

				i = ++i % elements.length; // wrap around

				options.mouseevent == 'hover' ? elements.eq(i).trigger('mouseover') : elements.eq(i).click();

				var t = setTimeout(forward, options.delay);

				$this.mouseover(function () {

					if (options.pauseonhover) clearTimeout(t);

				});

			}

			if (options.autorotate) {

				setTimeout(forward, 0);

				if (options.pauseonhover) $this.on( "mouseleave", function() { setTimeout(forward, 1000); });

			}

			function move(direction) {

				if (direction == 'forward') i = ++i % elements.length; // wrap around

				if (direction == 'backward') i = --i % elements.length; // wrap around

				elements.eq(i).click();

			}

			$this.find(options.controls.next).click(function() {
				move('forward');
			});

			$this.find(options.controls.prev).click(function() {
				move('backward');
			});

			$this.on ('destroy', function() {
				$(this).removeData();
			});

		});

	};

	$(document).ready(function () { $('[data-toggle="tabslet"]').tabslet(); });

})(jQuery);
//! moment.js
//! version : 2.8.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.8.4',
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenOffsetMs = /[\+\-]?\d+/, // 1234567890123
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-15', '30']
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            x    : function () {
                return this.valueOf();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 24 ||
                    (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||
                                           m._a[SECOND] !== 0 ||
                                           m._a[MILLISECOND] !== 0)) ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0 &&
                    m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ?
                    +input : +moment(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        } else {
            return moment(input).local();
        }
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _ordinalParseLenient.
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName, format, strict) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = moment.utc([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                    return i;
                } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LTS : 'h:mm:ss A',
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom, now) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom, [now]) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',
        _ordinalParse : /\d{1,2}/,

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'x':
            return parseTokenOffsetMs;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input, token, config._strict);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(
                            input.match(/\d{1,2}/)[0], 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = config._locale.isPM(input);
            break;
        // HOUR
        case 'h' : // fall through to hh
        case 'hh' :
            config._pf.bigHour = true;
            /* falls through */
        case 'H' : // fall through to HH
        case 'HH' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX OFFSET (MILLISECONDS)
        case 'x':
            config._d = new Date(toInt(input));
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual zone can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day || normalizedInput.date,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }
        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f,
            res;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        res = new Moment(config);
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ('function' === typeof Date.prototype.toISOString) {
                    // native implementation is ~50x faster, use it when we can
                    return this.toDate().toISOString();
                } else {
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.zone(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.zone(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.add(this._dateTzOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output, daysAdjust;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                daysAdjust = (this - moment(this).startOf('month')) -
                    (that - moment(that).startOf('month'));
                // same as above but with zones, to negate all dst
                daysAdjust -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4;
                output += daysAdjust / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond') {
                return this;
            }
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },

        isBefore: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },

        isSame: function (input, units) {
            var inputMs;
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                inputMs = +moment(input);
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
            }
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateTzOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.subtract(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._dateTzOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },

        lang : deprecate(
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        ),

        localeData : function () {
            return this._locale;
        },

        _dateTzOffset : function () {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)',
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        }
    });

    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LOCALES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define('moment', function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

/*!
 * FullCalendar v2.2.0
 * Docs & License: http://arshaw.com/fullcalendar/
 * (c) 2013 Adam Shaw
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery', 'moment' ], factory);
	}
	else {
		factory(jQuery, moment);
	}
})(function($, moment) {

;;

var defaults = {

	lang: 'en',

	defaultTimedEventDuration: '02:00:00',
	defaultAllDayEventDuration: { days: 1 },
	forceEventDuration: false,
	nextDayThreshold: '09:00:00', // 9am

	// display
	defaultView: 'month',
	aspectRatio: 1.35,
	header: {
		left: 'title',
		center: '',
		right: 'today prev,next'
	},
	weekends: true,
	weekNumbers: false,

	weekNumberTitle: 'W',
	weekNumberCalculation: 'local',
	
	//editable: false,
	
	// event ajax
	lazyFetching: true,
	startParam: 'start',
	endParam: 'end',
	timezoneParam: 'timezone',

	timezone: false,

	//allDayDefault: undefined,
	
	// time formats
	titleFormat: {
		month: 'MMMM YYYY', // like "September 1986". each language will override this
		week: 'll', // like "Sep 4 1986"
		day: 'LL' // like "September 4 1986"
	},
	columnFormat: {
		month: 'ddd', // like "Sat"
		week: generateWeekColumnFormat,
		day: 'dddd' // like "Saturday"
	},
	timeFormat: { // for event elements
		'default': generateShortTimeFormat
	},

	displayEventEnd: {
		month: false,
		basicWeek: false,
		'default': true
	},
	
	// locale
	isRTL: false,
	defaultButtonText: {
		prev: "prev",
		next: "next",
		prevYear: "prev year",
		nextYear: "next year",
		today: 'today',
		month: 'month',
		week: 'week',
		day: 'day'
	},

	buttonIcons: {
		prev: 'left-single-arrow',
		next: 'right-single-arrow',
		prevYear: 'left-double-arrow',
		nextYear: 'right-double-arrow'
	},
	
	// jquery-ui theming
	theme: false,
	themeButtonIcons: {
		prev: 'circle-triangle-w',
		next: 'circle-triangle-e',
		prevYear: 'seek-prev',
		nextYear: 'seek-next'
	},

	dragOpacity: .75,
	dragRevertDuration: 500,
	dragScroll: true,
	
	//selectable: false,
	unselectAuto: true,
	
	dropAccept: '*',

	eventLimit: false,
	eventLimitText: 'more',
	eventLimitClick: 'popover',
	dayPopoverFormat: 'LL',
	
	handleWindowResize: true,
	windowResizeDelay: 200 // milliseconds before a rerender happens
	
};


function generateShortTimeFormat(options, langData) {
	return langData.longDateFormat('LT')
		.replace(':mm', '(:mm)')
		.replace(/(\Wmm)$/, '($1)') // like above, but for foreign langs
		.replace(/\s*a$/i, 't'); // convert to AM/PM/am/pm to lowercase one-letter. remove any spaces beforehand
}


function generateWeekColumnFormat(options, langData) {
	var format = langData.longDateFormat('L'); // for the format like "MM/DD/YYYY"
	format = format.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ''); // strip the year off the edge, as well as other misc non-whitespace chars
	if (options.isRTL) {
		format += ' ddd'; // for RTL, add day-of-week to end
	}
	else {
		format = 'ddd ' + format; // for LTR, add day-of-week to beginning
	}
	return format;
}


var langOptionHash = {
	en: {
		columnFormat: {
			week: 'ddd M/D' // override for english. different from the generated default, which is MM/DD
		},
		dayPopoverFormat: 'dddd, MMMM D'
	}
};


// right-to-left defaults
var rtlDefaults = {
	header: {
		left: 'next,prev today',
		center: '',
		right: 'title'
	},
	buttonIcons: {
		prev: 'right-single-arrow',
		next: 'left-single-arrow',
		prevYear: 'right-double-arrow',
		nextYear: 'left-double-arrow'
	},
	themeButtonIcons: {
		prev: 'circle-triangle-e',
		next: 'circle-triangle-w',
		nextYear: 'seek-prev',
		prevYear: 'seek-next'
	}
};

;;

var fc = $.fullCalendar = { version: "2.2.0" };
var fcViews = fc.views = {};


$.fn.fullCalendar = function(options) {
	var args = Array.prototype.slice.call(arguments, 1); // for a possible method call
	var res = this; // what this function will return (this jQuery object by default)

	this.each(function(i, _element) { // loop each DOM element involved
		var element = $(_element);
		var calendar = element.data('fullCalendar'); // get the existing calendar object (if any)
		var singleRes; // the returned value of this single method call

		// a method call
		if (typeof options === 'string') {
			if (calendar && $.isFunction(calendar[options])) {
				singleRes = calendar[options].apply(calendar, args);
				if (!i) {
					res = singleRes; // record the first method call result
				}
				if (options === 'destroy') { // for the destroy method, must remove Calendar object data
					element.removeData('fullCalendar');
				}
			}
		}
		// a new calendar initialization
		else if (!calendar) { // don't initialize twice
			calendar = new Calendar(element, options);
			element.data('fullCalendar', calendar);
			calendar.render();
		}
	});
	
	return res;
};


// function for adding/overriding defaults
function setDefaults(d) {
	mergeOptions(defaults, d);
}


// Recursively combines option hash-objects.
// Better than `$.extend(true, ...)` because arrays are not traversed/copied.
//
// called like:
//     mergeOptions(target, obj1, obj2, ...)
//
function mergeOptions(target) {

	function mergeIntoTarget(name, value) {
		if ($.isPlainObject(value) && $.isPlainObject(target[name]) && !isForcedAtomicOption(name)) {
			// merge into a new object to avoid destruction
			target[name] = mergeOptions({}, target[name], value); // combine. `value` object takes precedence
		}
		else if (value !== undefined) { // only use values that are set and not undefined
			target[name] = value;
		}
	}

	for (var i=1; i<arguments.length; i++) {
		$.each(arguments[i], mergeIntoTarget);
	}

	return target;
}


// overcome sucky view-option-hash and option-merging behavior messing with options it shouldn't
function isForcedAtomicOption(name) {
	// Any option that ends in "Time" or "Duration" is probably a Duration,
	// and these will commonly be specified as plain objects, which we don't want to mess up.
	return /(Time|Duration)$/.test(name);
}
// FIX: find a different solution for view-option-hashes and have a whitelist
// for options that can be recursively merged.

;;

//var langOptionHash = {}; // initialized in defaults.js
fc.langs = langOptionHash; // expose


// Initialize jQuery UI Datepicker translations while using some of the translations
// for our own purposes. Will set this as the default language for datepicker.
// Called from a translation file.
fc.datepickerLang = function(langCode, datepickerLangCode, options) {
	var langOptions = langOptionHash[langCode];

	// initialize FullCalendar's lang hash for this language
	if (!langOptions) {
		langOptions = langOptionHash[langCode] = {};
	}

	// merge certain Datepicker options into FullCalendar's options
	mergeOptions(langOptions, {
		isRTL: options.isRTL,
		weekNumberTitle: options.weekHeader,
		titleFormat: {
			month: options.showMonthAfterYear ?
				'YYYY[' + options.yearSuffix + '] MMMM' :
				'MMMM YYYY[' + options.yearSuffix + ']'
		},
		defaultButtonText: {
			// the translations sometimes wrongly contain HTML entities
			prev: stripHtmlEntities(options.prevText),
			next: stripHtmlEntities(options.nextText),
			today: stripHtmlEntities(options.currentText)
		}
	});

	// is jQuery UI Datepicker is on the page?
	if ($.datepicker) {

		// Register the language data.
		// FullCalendar and MomentJS use language codes like "pt-br" but Datepicker
		// does it like "pt-BR" or if it doesn't have the language, maybe just "pt".
		// Make an alias so the language can be referenced either way.
		$.datepicker.regional[datepickerLangCode] =
			$.datepicker.regional[langCode] = // alias
				options;

		// Alias 'en' to the default language data. Do this every time.
		$.datepicker.regional.en = $.datepicker.regional[''];

		// Set as Datepicker's global defaults.
		$.datepicker.setDefaults(options);
	}
};


// Sets FullCalendar-specific translations. Also sets the language as the global default.
// Called from a translation file.
fc.lang = function(langCode, options) {
	var langOptions;

	if (options) {
		langOptions = langOptionHash[langCode];

		// initialize the hash for this language
		if (!langOptions) {
			langOptions = langOptionHash[langCode] = {};
		}

		mergeOptions(langOptions, options || {});
	}

	// set it as the default language for FullCalendar
	defaults.lang = langCode;
};
;;

 
function Calendar(element, instanceOptions) {
	var t = this;



	// Build options object
	// -----------------------------------------------------------------------------------
	// Precedence (lowest to highest): defaults, rtlDefaults, langOptions, instanceOptions

	instanceOptions = instanceOptions || {};

	var options = mergeOptions({}, defaults, instanceOptions);
	var langOptions;

	// determine language options
	if (options.lang in langOptionHash) {
		langOptions = langOptionHash[options.lang];
	}
	else {
		langOptions = langOptionHash[defaults.lang];
	}

	if (langOptions) { // if language options exist, rebuild...
		options = mergeOptions({}, defaults, langOptions, instanceOptions);
	}

	if (options.isRTL) { // is isRTL, rebuild...
		options = mergeOptions({}, defaults, rtlDefaults, langOptions || {}, instanceOptions);
	}


	
	// Exports
	// -----------------------------------------------------------------------------------

	t.options = options;
	t.render = render;
	t.destroy = destroy;
	t.refetchEvents = refetchEvents;
	t.reportEvents = reportEvents;
	t.reportEventChange = reportEventChange;
	t.rerenderEvents = renderEvents; // `renderEvents` serves as a rerender. an API method
	t.changeView = changeView;
	t.select = select;
	t.unselect = unselect;
	t.prev = prev;
	t.next = next;
	t.prevYear = prevYear;
	t.nextYear = nextYear;
	t.today = today;
	t.gotoDate = gotoDate;
	t.incrementDate = incrementDate;
	t.zoomTo = zoomTo;
	t.getDate = getDate;
	t.getCalendar = getCalendar;
	t.getView = getView;
	t.option = option;
	t.trigger = trigger;



	// Language-data Internals
	// -----------------------------------------------------------------------------------
	// Apply overrides to the current language's data


	// Returns moment's internal locale data. If doesn't exist, returns English.
	// Works with moment-pre-2.8
	function getLocaleData(langCode) {
		var f = moment.localeData || moment.langData;
		return f.call(moment, langCode) ||
			f.call(moment, 'en'); // the newer localData could return null, so fall back to en
	}


	var localeData = createObject(getLocaleData(options.lang)); // make a cheap copy

	if (options.monthNames) {
		localeData._months = options.monthNames;
	}
	if (options.monthNamesShort) {
		localeData._monthsShort = options.monthNamesShort;
	}
	if (options.dayNames) {
		localeData._weekdays = options.dayNames;
	}
	if (options.dayNamesShort) {
		localeData._weekdaysShort = options.dayNamesShort;
	}
	if (options.firstDay != null) {
		var _week = createObject(localeData._week); // _week: { dow: # }
		_week.dow = options.firstDay;
		localeData._week = _week;
	}



	// Calendar-specific Date Utilities
	// -----------------------------------------------------------------------------------


	t.defaultAllDayEventDuration = moment.duration(options.defaultAllDayEventDuration);
	t.defaultTimedEventDuration = moment.duration(options.defaultTimedEventDuration);


	// Builds a moment using the settings of the current calendar: timezone and language.
	// Accepts anything the vanilla moment() constructor accepts.
	t.moment = function() {
		var mom;

		if (options.timezone === 'local') {
			mom = fc.moment.apply(null, arguments);

			// Force the moment to be local, because fc.moment doesn't guarantee it.
			if (mom.hasTime()) { // don't give ambiguously-timed moments a local zone
				mom.local();
			}
		}
		else if (options.timezone === 'UTC') {
			mom = fc.moment.utc.apply(null, arguments); // process as UTC
		}
		else {
			mom = fc.moment.parseZone.apply(null, arguments); // let the input decide the zone
		}

		if ('_locale' in mom) { // moment 2.8 and above
			mom._locale = localeData;
		}
		else { // pre-moment-2.8
			mom._lang = localeData;
		}

		return mom;
	};


	// Returns a boolean about whether or not the calendar knows how to calculate
	// the timezone offset of arbitrary dates in the current timezone.
	t.getIsAmbigTimezone = function() {
		return options.timezone !== 'local' && options.timezone !== 'UTC';
	};


	// Returns a copy of the given date in the current timezone of it is ambiguously zoned.
	// This will also give the date an unambiguous time.
	t.rezoneDate = function(date) {
		return t.moment(date.toArray());
	};


	// Returns a moment for the current date, as defined by the client's computer,
	// or overridden by the `now` option.
	t.getNow = function() {
		var now = options.now;
		if (typeof now === 'function') {
			now = now();
		}
		return t.moment(now);
	};


	// Calculates the week number for a moment according to the calendar's
	// `weekNumberCalculation` setting.
	t.calculateWeekNumber = function(mom) {
		var calc = options.weekNumberCalculation;

		if (typeof calc === 'function') {
			return calc(mom);
		}
		else if (calc === 'local') {
			return mom.week();
		}
		else if (calc.toUpperCase() === 'ISO') {
			return mom.isoWeek();
		}
	};


	// Get an event's normalized end date. If not present, calculate it from the defaults.
	t.getEventEnd = function(event) {
		if (event.end) {
			return event.end.clone();
		}
		else {
			return t.getDefaultEventEnd(event.allDay, event.start);
		}
	};


	// Given an event's allDay status and start date, return swhat its fallback end date should be.
	t.getDefaultEventEnd = function(allDay, start) { // TODO: rename to computeDefaultEventEnd
		var end = start.clone();

		if (allDay) {
			end.stripTime().add(t.defaultAllDayEventDuration);
		}
		else {
			end.add(t.defaultTimedEventDuration);
		}

		if (t.getIsAmbigTimezone()) {
			end.stripZone(); // we don't know what the tzo should be
		}

		return end;
	};



	// Date-formatting Utilities
	// -----------------------------------------------------------------------------------


	// Like the vanilla formatRange, but with calendar-specific settings applied.
	t.formatRange = function(m1, m2, formatStr) {

		// a function that returns a formatStr // TODO: in future, precompute this
		if (typeof formatStr === 'function') {
			formatStr = formatStr.call(t, options, localeData);
		}

		return formatRange(m1, m2, formatStr, null, options.isRTL);
	};


	// Like the vanilla formatDate, but with calendar-specific settings applied.
	t.formatDate = function(mom, formatStr) {

		// a function that returns a formatStr // TODO: in future, precompute this
		if (typeof formatStr === 'function') {
			formatStr = formatStr.call(t, options, localeData);
		}

		return formatDate(mom, formatStr);
	};


	
	// Imports
	// -----------------------------------------------------------------------------------


	EventManager.call(t, options);
	var isFetchNeeded = t.isFetchNeeded;
	var fetchEvents = t.fetchEvents;



	// Locals
	// -----------------------------------------------------------------------------------


	var _element = element[0];
	var header;
	var headerElement;
	var content;
	var tm; // for making theme classes
	var currentView;
	var suggestedViewHeight;
	var windowResizeProxy; // wraps the windowResize function
	var ignoreWindowResize = 0;
	var date;
	var events = [];
	
	
	
	// Main Rendering
	// -----------------------------------------------------------------------------------


	if (options.defaultDate != null) {
		date = t.moment(options.defaultDate);
	}
	else {
		date = t.getNow();
	}
	
	
	function render(inc) {
		if (!content) {
			initialRender();
		}
		else if (elementVisible()) {
			// mainly for the public API
			calcSize();
			renderView(inc);
		}
	}
	
	
	function initialRender() {
		tm = options.theme ? 'ui' : 'fc';
		element.addClass('fc');

		if (options.isRTL) {
			element.addClass('fc-rtl');
		}
		else {
			element.addClass('fc-ltr');
		}

		if (options.theme) {
			element.addClass('ui-widget');
		}
		else {
			element.addClass('fc-unthemed');
		}

		content = $("<div class='fc-view-container'/>").prependTo(element);

		header = new Header(t, options);
		headerElement = header.render();
		if (headerElement) {
			element.prepend(headerElement);
		}

		changeView(options.defaultView);

		if (options.handleWindowResize) {
			windowResizeProxy = debounce(windowResize, options.windowResizeDelay); // prevents rapid calls
			$(window).resize(windowResizeProxy);
		}
	}
	
	
	function destroy() {

		if (currentView) {
			currentView.destroy();
		}

		header.destroy();
		content.remove();
		element.removeClass('fc fc-ltr fc-rtl fc-unthemed ui-widget');

		$(window).unbind('resize', windowResizeProxy);
	}
	
	
	function elementVisible() {
		return element.is(':visible');
	}
	
	

	// View Rendering
	// -----------------------------------------------------------------------------------


	function changeView(viewName) {
		renderView(0, viewName);
	}


	// Renders a view because of a date change, view-type change, or for the first time
	function renderView(delta, viewName) {
		ignoreWindowResize++;

		// if viewName is changing, destroy the old view
		if (currentView && viewName && currentView.name !== viewName) {
			header.deactivateButton(currentView.name);
			freezeContentHeight(); // prevent a scroll jump when view element is removed
			if (currentView.start) { // rendered before?
				currentView.destroy();
			}
			currentView.el.remove();
			currentView = null;
		}

		// if viewName changed, or the view was never created, create a fresh view
		if (!currentView && viewName) {
			currentView = new fcViews[viewName](t);
			currentView.el =  $("<div class='fc-view fc-" + viewName + "-view' />").appendTo(content);
			header.activateButton(viewName);
		}

		if (currentView) {

			// let the view determine what the delta means
			if (delta) {
				date = currentView.incrementDate(date, delta);
			}

			// render or rerender the view
			if (
				!currentView.start || // never rendered before
				delta || // explicit date window change
				!date.isWithin(currentView.intervalStart, currentView.intervalEnd) // implicit date window change
			) {
				if (elementVisible()) {

					freezeContentHeight();
					if (currentView.start) { // rendered before?
						currentView.destroy();
					}
					currentView.render(date);
					unfreezeContentHeight();

					// need to do this after View::render, so dates are calculated
					updateTitle();
					updateTodayButton();

					getAndRenderEvents();
				}
			}
		}

		unfreezeContentHeight(); // undo any lone freezeContentHeight calls
		ignoreWindowResize--;
	}
	
	

	// Resizing
	// -----------------------------------------------------------------------------------


	t.getSuggestedViewHeight = function() {
		if (suggestedViewHeight === undefined) {
			calcSize();
		}
		return suggestedViewHeight;
	};


	t.isHeightAuto = function() {
		return options.contentHeight === 'auto' || options.height === 'auto';
	};
	
	
	function updateSize(shouldRecalc) {
		if (elementVisible()) {

			if (shouldRecalc) {
				_calcSize();
			}

			ignoreWindowResize++;
			currentView.updateSize(true); // isResize=true. will poll getSuggestedViewHeight() and isHeightAuto()
			ignoreWindowResize--;

			return true; // signal success
		}
	}


	function calcSize() {
		if (elementVisible()) {
			_calcSize();
		}
	}
	
	
	function _calcSize() { // assumes elementVisible
		if (typeof options.contentHeight === 'number') { // exists and not 'auto'
			suggestedViewHeight = options.contentHeight;
		}
		else if (typeof options.height === 'number') { // exists and not 'auto'
			suggestedViewHeight = options.height - (headerElement ? headerElement.outerHeight(true) : 0);
		}
		else {
			suggestedViewHeight = Math.round(content.width() / Math.max(options.aspectRatio, .5));
		}
	}
	
	
	function windowResize(ev) {
		if (
			!ignoreWindowResize &&
			ev.target === window && // so we don't process jqui "resize" events that have bubbled up
			currentView.start // view has already been rendered
		) {
			if (updateSize(true)) {
				currentView.trigger('windowResize', _element);
			}
		}
	}
	
	
	
	/* Event Fetching/Rendering
	-----------------------------------------------------------------------------*/
	// TODO: going forward, most of this stuff should be directly handled by the view


	function refetchEvents() { // can be called as an API method
		destroyEvents(); // so that events are cleared before user starts waiting for AJAX
		fetchAndRenderEvents();
	}


	function renderEvents() { // destroys old events if previously rendered
		if (elementVisible()) {
			freezeContentHeight();
			currentView.destroyEvents(); // no performance cost if never rendered
			currentView.renderEvents(events);
			unfreezeContentHeight();
		}
	}


	function destroyEvents() {
		freezeContentHeight();
		currentView.destroyEvents();
		unfreezeContentHeight();
	}
	

	function getAndRenderEvents() {
		if (!options.lazyFetching || isFetchNeeded(currentView.start, currentView.end)) {
			fetchAndRenderEvents();
		}
		else {
			renderEvents();
		}
	}


	function fetchAndRenderEvents() {
		fetchEvents(currentView.start, currentView.end);
			// ... will call reportEvents
			// ... which will call renderEvents
	}

	
	// called when event data arrives
	function reportEvents(_events) {
		events = _events;
		renderEvents();
	}


	// called when a single event's data has been changed
	function reportEventChange() {
		renderEvents();
	}



	/* Header Updating
	-----------------------------------------------------------------------------*/


	function updateTitle() {
		header.updateTitle(currentView.title);
	}


	function updateTodayButton() {
		var now = t.getNow();
		if (now.isWithin(currentView.intervalStart, currentView.intervalEnd)) {
			header.disableButton('today');
		}
		else {
			header.enableButton('today');
		}
	}
	


	/* Selection
	-----------------------------------------------------------------------------*/
	

	function select(start, end) {

		start = t.moment(start);
		if (end) {
			end = t.moment(end);
		}
		else if (start.hasTime()) {
			end = start.clone().add(t.defaultTimedEventDuration);
		}
		else {
			end = start.clone().add(t.defaultAllDayEventDuration);
		}

		currentView.select(start, end);
	}
	

	function unselect() { // safe to be called before renderView
		if (currentView) {
			currentView.unselect();
		}
	}
	
	
	
	/* Date
	-----------------------------------------------------------------------------*/
	
	
	function prev() {
		renderView(-1);
	}
	
	
	function next() {
		renderView(1);
	}
	
	
	function prevYear() {
		date.add(-1, 'years');
		renderView();
	}
	
	
	function nextYear() {
		date.add(1, 'years');
		renderView();
	}
	
	
	function today() {
		date = t.getNow();
		renderView();
	}
	
	
	function gotoDate(dateInput) {
		date = t.moment(dateInput);
		renderView();
	}
	
	
	function incrementDate(delta) {
		date.add(moment.duration(delta));
		renderView();
	}


	// Forces navigation to a view for the given date.
	// `viewName` can be a specific view name or a generic one like "week" or "day".
	function zoomTo(newDate, viewName) {
		var viewStr;
		var match;

		if (!viewName || fcViews[viewName] === undefined) { // a general view name, or "auto"
			viewName = viewName || 'day';
			viewStr = header.getViewsWithButtons().join(' '); // space-separated string of all the views in the header

			// try to match a general view name, like "week", against a specific one, like "agendaWeek"
			match = viewStr.match(new RegExp('\\w+' + capitaliseFirstLetter(viewName)));

			// fall back to the day view being used in the header
			if (!match) {
				match = viewStr.match(/\w+Day/);
			}

			viewName = match ? match[0] : 'agendaDay'; // fall back to agendaDay
		}

		date = newDate;
		changeView(viewName);
	}
	
	
	function getDate() {
		return date.clone();
	}



	/* Height "Freezing"
	-----------------------------------------------------------------------------*/


	function freezeContentHeight() {
		content.css({
			width: '100%',
			height: content.height(),
			overflow: 'hidden'
		});
	}


	function unfreezeContentHeight() {
		content.css({
			width: '',
			height: '',
			overflow: ''
		});
	}
	
	
	
	/* Misc
	-----------------------------------------------------------------------------*/
	

	function getCalendar() {
		return t;
	}

	
	function getView() {
		return currentView;
	}
	
	
	function option(name, value) {
		if (value === undefined) {
			return options[name];
		}
		if (name == 'height' || name == 'contentHeight' || name == 'aspectRatio') {
			options[name] = value;
			updateSize(true); // true = allow recalculation of height
		}
	}
	
	
	function trigger(name, thisObj) {
		if (options[name]) {
			return options[name].apply(
				thisObj || _element,
				Array.prototype.slice.call(arguments, 2)
			);
		}
	}

}

;;

/* Top toolbar area with buttons and title
----------------------------------------------------------------------------------------------------------------------*/
// TODO: rename all header-related things to "toolbar"

function Header(calendar, options) {
	var t = this;
	
	// exports
	t.render = render;
	t.destroy = destroy;
	t.updateTitle = updateTitle;
	t.activateButton = activateButton;
	t.deactivateButton = deactivateButton;
	t.disableButton = disableButton;
	t.enableButton = enableButton;
	t.getViewsWithButtons = getViewsWithButtons;
	
	// locals
	var el = $();
	var viewsWithButtons = [];
	var tm;


	function render() {
		var sections = options.header;

		tm = options.theme ? 'ui' : 'fc';

		if (sections) {
			el = $("<div class='fc-toolbar'/>")
				.append(renderSection('left'))
				.append(renderSection('right'))
				.append(renderSection('center'))
				.append('<div class="fc-clear"/>');

			return el;
		}
	}
	
	
	function destroy() {
		el.remove();
	}
	
	
	function renderSection(position) {
		var sectionEl = $('<div class="fc-' + position + '"/>');
		var buttonStr = options.header[position];

		if (buttonStr) {
			$.each(buttonStr.split(' '), function(i) {
				var groupChildren = $();
				var isOnlyButtons = true;
				var groupEl;

				$.each(this.split(','), function(j, buttonName) {
					var buttonClick;
					var themeIcon;
					var normalIcon;
					var defaultText;
					var customText;
					var innerHtml;
					var classes;
					var button;

					if (buttonName == 'title') {
						groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
						isOnlyButtons = false;
					}
					else {
						if (calendar[buttonName]) { // a calendar method
							buttonClick = function() {
								calendar[buttonName]();
							};
						}
						else if (fcViews[buttonName]) { // a view name
							buttonClick = function() {
								calendar.changeView(buttonName);
							};
							viewsWithButtons.push(buttonName);
						}
						if (buttonClick) {

							// smartProperty allows different text per view button (ex: "Agenda Week" vs "Basic Week")
							themeIcon = smartProperty(options.themeButtonIcons, buttonName);
							normalIcon = smartProperty(options.buttonIcons, buttonName);
							defaultText = smartProperty(options.defaultButtonText, buttonName);
							customText = smartProperty(options.buttonText, buttonName);

							if (customText) {
								innerHtml = htmlEscape(customText);
							}
							else if (themeIcon && options.theme) {
								innerHtml = "<span class='ui-icon ui-icon-" + themeIcon + "'></span>";
							}
							else if (normalIcon && !options.theme) {
								innerHtml = "<span class='fc-icon fc-icon-" + normalIcon + "'></span>";
							}
							else {
								innerHtml = htmlEscape(defaultText || buttonName);
							}

							classes = [
								'fc-' + buttonName + '-button',
								tm + '-button',
								tm + '-state-default'
							];

							button = $( // type="button" so that it doesn't submit a form
								'<button type="button" class="' + classes.join(' ') + '">' +
									innerHtml +
								'</button>'
								)
								.click(function() {
									// don't process clicks for disabled buttons
									if (!button.hasClass(tm + '-state-disabled')) {

										buttonClick();

										// after the click action, if the button becomes the "active" tab, or disabled,
										// it should never have a hover class, so remove it now.
										if (
											button.hasClass(tm + '-state-active') ||
											button.hasClass(tm + '-state-disabled')
										) {
											button.removeClass(tm + '-state-hover');
										}
									}
								})
								.mousedown(function() {
									// the *down* effect (mouse pressed in).
									// only on buttons that are not the "active" tab, or disabled
									button
										.not('.' + tm + '-state-active')
										.not('.' + tm + '-state-disabled')
										.addClass(tm + '-state-down');
								})
								.mouseup(function() {
									// undo the *down* effect
									button.removeClass(tm + '-state-down');
								})
								.hover(
									function() {
										// the *hover* effect.
										// only on buttons that are not the "active" tab, or disabled
										button
											.not('.' + tm + '-state-active')
											.not('.' + tm + '-state-disabled')
											.addClass(tm + '-state-hover');
									},
									function() {
										// undo the *hover* effect
										button
											.removeClass(tm + '-state-hover')
											.removeClass(tm + '-state-down'); // if mouseleave happens before mouseup
									}
								);

							groupChildren = groupChildren.add(button);
						}
					}
				});

				if (isOnlyButtons) {
					groupChildren
						.first().addClass(tm + '-corner-left').end()
						.last().addClass(tm + '-corner-right').end();
				}

				if (groupChildren.length > 1) {
					groupEl = $('<div/>');
					if (isOnlyButtons) {
						groupEl.addClass('fc-button-group');
					}
					groupEl.append(groupChildren);
					sectionEl.append(groupEl);
				}
				else {
					sectionEl.append(groupChildren); // 1 or 0 children
				}
			});
		}

		return sectionEl;
	}
	
	
	function updateTitle(text) {
		el.find('h2').text(text);
	}
	
	
	function activateButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.addClass(tm + '-state-active');
	}
	
	
	function deactivateButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.removeClass(tm + '-state-active');
	}
	
	
	function disableButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.attr('disabled', 'disabled')
			.addClass(tm + '-state-disabled');
	}
	
	
	function enableButton(buttonName) {
		el.find('.fc-' + buttonName + '-button')
			.removeAttr('disabled')
			.removeClass(tm + '-state-disabled');
	}


	function getViewsWithButtons() {
		return viewsWithButtons;
	}

}

;;

fc.sourceNormalizers = [];
fc.sourceFetchers = [];

var ajaxDefaults = {
	dataType: 'json',
	cache: false
};

var eventGUID = 1;


function EventManager(options) { // assumed to be a calendar
	var t = this;
	
	
	// exports
	t.isFetchNeeded = isFetchNeeded;
	t.fetchEvents = fetchEvents;
	t.addEventSource = addEventSource;
	t.removeEventSource = removeEventSource;
	t.updateEvent = updateEvent;
	t.renderEvent = renderEvent;
	t.removeEvents = removeEvents;
	t.clientEvents = clientEvents;
	t.mutateEvent = mutateEvent;
	
	
	// imports
	var trigger = t.trigger;
	var getView = t.getView;
	var reportEvents = t.reportEvents;
	var getEventEnd = t.getEventEnd;
	
	
	// locals
	var stickySource = { events: [] };
	var sources = [ stickySource ];
	var rangeStart, rangeEnd;
	var currentFetchID = 0;
	var pendingSourceCnt = 0;
	var loadingLevel = 0;
	var cache = []; // holds events that have already been expanded


	$.each(
		(options.events ? [ options.events ] : []).concat(options.eventSources || []),
		function(i, sourceInput) {
			var source = buildEventSource(sourceInput);
			if (source) {
				sources.push(source);
			}
		}
	);
	
	
	
	/* Fetching
	-----------------------------------------------------------------------------*/
	
	
	function isFetchNeeded(start, end) {
		return !rangeStart || // nothing has been fetched yet?
			// or, a part of the new range is outside of the old range? (after normalizing)
			start.clone().stripZone() < rangeStart.clone().stripZone() ||
			end.clone().stripZone() > rangeEnd.clone().stripZone();
	}
	
	
	function fetchEvents(start, end) {
		rangeStart = start;
		rangeEnd = end;
		cache = [];
		var fetchID = ++currentFetchID;
		var len = sources.length;
		pendingSourceCnt = len;
		for (var i=0; i<len; i++) {
			fetchEventSource(sources[i], fetchID);
		}
	}
	
	
	function fetchEventSource(source, fetchID) {
		_fetchEventSource(source, function(eventInputs) {
			var isArraySource = $.isArray(source.events);
			var i, eventInput;
			var abstractEvent;

			if (fetchID == currentFetchID) {

				if (eventInputs) {
					for (i = 0; i < eventInputs.length; i++) {
						eventInput = eventInputs[i];

						if (isArraySource) { // array sources have already been convert to Event Objects
							abstractEvent = eventInput;
						}
						else {
							abstractEvent = buildEventFromInput(eventInput, source);
						}

						if (abstractEvent) { // not false (an invalid event)
							cache.push.apply(
								cache,
								expandEvent(abstractEvent) // add individual expanded events to the cache
							);
						}
					}
				}

				pendingSourceCnt--;
				if (!pendingSourceCnt) {
					reportEvents(cache);
				}
			}
		});
	}
	
	
	function _fetchEventSource(source, callback) {
		var i;
		var fetchers = fc.sourceFetchers;
		var res;

		for (i=0; i<fetchers.length; i++) {
			res = fetchers[i].call(
				t, // this, the Calendar object
				source,
				rangeStart.clone(),
				rangeEnd.clone(),
				options.timezone,
				callback
			);

			if (res === true) {
				// the fetcher is in charge. made its own async request
				return;
			}
			else if (typeof res == 'object') {
				// the fetcher returned a new source. process it
				_fetchEventSource(res, callback);
				return;
			}
		}

		var events = source.events;
		if (events) {
			if ($.isFunction(events)) {
				pushLoading();
				events.call(
					t, // this, the Calendar object
					rangeStart.clone(),
					rangeEnd.clone(),
					options.timezone,
					function(events) {
						callback(events);
						popLoading();
					}
				);
			}
			else if ($.isArray(events)) {
				callback(events);
			}
			else {
				callback();
			}
		}else{
			var url = source.url;
			if (url) {
				var success = source.success;
				var error = source.error;
				var complete = source.complete;

				// retrieve any outbound GET/POST $.ajax data from the options
				var customData;
				if ($.isFunction(source.data)) {
					// supplied as a function that returns a key/value object
					customData = source.data();
				}
				else {
					// supplied as a straight key/value object
					customData = source.data;
				}

				// use a copy of the custom data so we can modify the parameters
				// and not affect the passed-in object.
				var data = $.extend({}, customData || {});

				var startParam = firstDefined(source.startParam, options.startParam);
				var endParam = firstDefined(source.endParam, options.endParam);
				var timezoneParam = firstDefined(source.timezoneParam, options.timezoneParam);

				if (startParam) {
					data[startParam] = rangeStart.format();
				}
				if (endParam) {
					data[endParam] = rangeEnd.format();
				}
				if (options.timezone && options.timezone != 'local') {
					data[timezoneParam] = options.timezone;
				}

				pushLoading();
				$.ajax($.extend({}, ajaxDefaults, source, {
					data: data,
					success: function(events) {
						events = events || [];
						var res = applyAll(success, this, arguments);
						if ($.isArray(res)) {
							events = res;
						}
						callback(events);
					},
					error: function() {
						applyAll(error, this, arguments);
						callback();
					},
					complete: function() {
						applyAll(complete, this, arguments);
						popLoading();
					}
				}));
			}else{
				callback();
			}
		}
	}
	
	
	
	/* Sources
	-----------------------------------------------------------------------------*/
	

	function addEventSource(sourceInput) {
		var source = buildEventSource(sourceInput);
		if (source) {
			sources.push(source);
			pendingSourceCnt++;
			fetchEventSource(source, currentFetchID); // will eventually call reportEvents
		}
	}


	function buildEventSource(sourceInput) { // will return undefined if invalid source
		var normalizers = fc.sourceNormalizers;
		var source;
		var i;

		if ($.isFunction(sourceInput) || $.isArray(sourceInput)) {
			source = { events: sourceInput };
		}
		else if (typeof sourceInput === 'string') {
			source = { url: sourceInput };
		}
		else if (typeof sourceInput === 'object') {
			source = $.extend({}, sourceInput); // shallow copy
		}

		if (source) {

			// TODO: repeat code, same code for event classNames
			if (source.className) {
				if (typeof source.className === 'string') {
					source.className = source.className.split(/\s+/);
				}
				// otherwise, assumed to be an array
			}
			else {
				source.className = [];
			}

			// for array sources, we convert to standard Event Objects up front
			if ($.isArray(source.events)) {
				source.origArray = source.events; // for removeEventSource
				source.events = $.map(source.events, function(eventInput) {
					return buildEventFromInput(eventInput, source);
				});
			}

			for (i=0; i<normalizers.length; i++) {
				normalizers[i].call(t, source);
			}

			return source;
		}
	}


	function removeEventSource(source) {
		sources = $.grep(sources, function(src) {
			return !isSourcesEqual(src, source);
		});
		// remove all client events from that source
		cache = $.grep(cache, function(e) {
			return !isSourcesEqual(e.source, source);
		});
		reportEvents(cache);
	}


	function isSourcesEqual(source1, source2) {
		return source1 && source2 && getSourcePrimitive(source1) == getSourcePrimitive(source2);
	}


	function getSourcePrimitive(source) {
		return (
			(typeof source === 'object') ? // a normalized event source?
				(source.origArray || source.url || source.events) : // get the primitive
				null
		) ||
		source; // the given argument *is* the primitive
	}
	
	
	
	/* Manipulation
	-----------------------------------------------------------------------------*/


	function updateEvent(event) {

		event.start = t.moment(event.start);
		if (event.end) {
			event.end = t.moment(event.end);
		}

		mutateEvent(event);
		propagateMiscProperties(event);
		reportEvents(cache); // reports event modifications (so we can redraw)
	}


	var miscCopyableProps = [
		'title',
		'url',
		'allDay',
		'className',
		'editable',
		'color',
		'backgroundColor',
		'borderColor',
		'textColor'
	];

	function propagateMiscProperties(event) {
		var i;
		var cachedEvent;
		var j;
		var prop;

		for (i=0; i<cache.length; i++) {
			cachedEvent = cache[i];
			if (cachedEvent._id == event._id && cachedEvent !== event) {
				for (j=0; j<miscCopyableProps.length; j++) {
					prop = miscCopyableProps[j];
					if (event[prop] !== undefined) {
						cachedEvent[prop] = event[prop];
					}
				}
			}
		}
	}

	
	// returns the expanded events that were created
	function renderEvent(eventInput, stick) {
		var abstractEvent = buildEventFromInput(eventInput);
		var events;
		var i, event;

		if (abstractEvent) { // not false (a valid input)
			events = expandEvent(abstractEvent);

			for (i = 0; i < events.length; i++) {
				event = events[i];

				if (!event.source) {
					if (stick) {
						stickySource.events.push(event);
						event.source = stickySource;
					}
					cache.push(event);
				}
			}

			reportEvents(cache);

			return events;
		}

		return [];
	}
	
	
	function removeEvents(filter) {
		var eventID;
		var i;

		if (filter == null) { // null or undefined. remove all events
			filter = function() { return true; }; // will always match
		}
		else if (!$.isFunction(filter)) { // an event ID
			eventID = filter + '';
			filter = function(event) {
				return event._id == eventID;
			};
		}

		// Purge event(s) from our local cache
		cache = $.grep(cache, filter, true); // inverse=true

		// Remove events from array sources.
		// This works because they have been converted to official Event Objects up front.
		// (and as a result, event._id has been calculated).
		for (i=0; i<sources.length; i++) {
			if ($.isArray(sources[i].events)) {
				sources[i].events = $.grep(sources[i].events, filter, true);
			}
		}

		reportEvents(cache);
	}
	
	
	function clientEvents(filter) {
		if ($.isFunction(filter)) {
			return $.grep(cache, filter);
		}
		else if (filter != null) { // not null, not undefined. an event ID
			filter += '';
			return $.grep(cache, function(e) {
				return e._id == filter;
			});
		}
		return cache; // else, return all
	}
	
	
	
	/* Loading State
	-----------------------------------------------------------------------------*/
	
	
	function pushLoading() {
		if (!(loadingLevel++)) {
			trigger('loading', null, true, getView());
		}
	}
	
	
	function popLoading() {
		if (!(--loadingLevel)) {
			trigger('loading', null, false, getView());
		}
	}
	
	
	
	/* Event Normalization
	-----------------------------------------------------------------------------*/


	// Given a raw object with key/value properties, returns an "abstract" Event object.
	// An "abstract" event is an event that, if recurring, will not have been expanded yet.
	// Will return `false` when input is invalid.
	// `source` is optional
	function buildEventFromInput(input, source) {
		var out = {};
		var start, end;
		var allDay;
		var allDayDefault;

		if (options.eventDataTransform) {
			input = options.eventDataTransform(input);
		}
		if (source && source.eventDataTransform) {
			input = source.eventDataTransform(input);
		}

		// Copy all properties over to the resulting object.
		// The special-case properties will be copied over afterwards.
		$.extend(out, input);

		if (source) {
			out.source = source;
		}

		out._id = input._id || (input.id === undefined ? '_fc' + eventGUID++ : input.id + '');

		if (input.className) {
			if (typeof input.className == 'string') {
				out.className = input.className.split(/\s+/);
			}
			else { // assumed to be an array
				out.className = input.className;
			}
		}
		else {
			out.className = [];
		}

		start = input.start || input.date; // "date" is an alias for "start"
		end = input.end;

		// parse as a time (Duration) if applicable
		if (isTimeString(start)) {
			start = moment.duration(start);
		}
		if (isTimeString(end)) {
			end = moment.duration(end);
		}

		if (input.dow || moment.isDuration(start) || moment.isDuration(end)) {

			// the event is "abstract" (recurring) so don't calculate exact start/end dates just yet
			out.start = start ? moment.duration(start) : null; // will be a Duration or null
			out.end = end ? moment.duration(end) : null; // will be a Duration or null
			out._recurring = true; // our internal marker
		}
		else {

			if (start) {
				start = t.moment(start);
				if (!start.isValid()) {
					return false;
				}
			}

			if (end) {
				end = t.moment(end);
				if (!end.isValid()) {
					return false;
				}
			}

			allDay = input.allDay;
			if (allDay === undefined) {
				allDayDefault = firstDefined(
					source ? source.allDayDefault : undefined,
					options.allDayDefault
				);
				if (allDayDefault !== undefined) {
					// use the default
					allDay = allDayDefault;
				}
				else {
					// if a single date has a time, the event should not be all-day
					allDay = !start.hasTime() && (!end || !end.hasTime());
				}
			}

			assignDatesToEvent(start, end, allDay, out);
		}

		return out;
	}


	// Normalizes and assigns the given dates to the given partially-formed event object.
	// Requires an explicit `allDay` boolean parameter.
	// NOTE: mutates the given start/end moments. does not make an internal copy
	function assignDatesToEvent(start, end, allDay, event) {

		// normalize the date based on allDay
		if (allDay) {
			// neither date should have a time
			if (start.hasTime()) {
				start.stripTime();
			}
			if (end && end.hasTime()) {
				end.stripTime();
			}
		}
		else {
			// force a time/zone up the dates
			if (!start.hasTime()) {
				start = t.rezoneDate(start);
			}
			if (end && !end.hasTime()) {
				end = t.rezoneDate(end);
			}
		}

		event.allDay = allDay;
		event.start = start;
		event.end = end || null; // ensure null if falsy

		if (options.forceEventDuration && !event.end) {
			event.end = getEventEnd(event);
		}

		backupEventDates(event);
	}


	// If the given event is a recurring event, break it down into an array of individual instances.
	// If not a recurring event, return an array with the single original event.
	// If given a falsy input (probably because of a failed buildEventFromInput call), returns an empty array.
	function expandEvent(abstractEvent) {
		var events = [];
		var view;
		var _rangeStart = rangeStart;
		var _rangeEnd = rangeEnd;
		var dowHash;
		var dow;
		var i;
		var date;
		var startTime, endTime;
		var start, end;
		var event;

		// hack for when fetchEvents hasn't been called yet (calculating businessHours for example)
		if (!_rangeStart || !_rangeEnd) {
			view = t.getView();
			_rangeStart = view.start;
			_rangeEnd = view.end;
		}

		if (abstractEvent) {
			if (abstractEvent._recurring) {

				// make a boolean hash as to whether the event occurs on each day-of-week
				if ((dow = abstractEvent.dow)) {
					dowHash = {};
					for (i = 0; i < dow.length; i++) {
						dowHash[dow[i]] = true;
					}
				}

				// iterate through every day in the current range
				date = _rangeStart.clone().stripTime(); // holds the date of the current day
				while (date.isBefore(_rangeEnd)) {

					if (!dowHash || dowHash[date.day()]) { // if everyday, or this particular day-of-week

						startTime = abstractEvent.start; // the stored start and end properties are times (Durations)
						endTime = abstractEvent.end; // "
						start = date.clone();
						end = null;

						if (startTime) {
							start = start.time(startTime);
						}
						if (endTime) {
							end = date.clone().time(endTime);
						}

						event = $.extend({}, abstractEvent); // make a copy of the original
						assignDatesToEvent(
							start, end,
							!startTime && !endTime, // allDay?
							event
						);
						events.push(event);
					}

					date.add(1, 'days');
				}
			}
			else {
				events.push(abstractEvent); // return the original event. will be a one-item array
			}
		}

		return events;
	}



	/* Event Modification Math
	-----------------------------------------------------------------------------------------*/


	// Modify the date(s) of an event and make this change propagate to all other events with
	// the same ID (related repeating events).
	//
	// If `newStart`/`newEnd` are not specified, the "new" dates are assumed to be `event.start` and `event.end`.
	// The "old" dates to be compare against are always `event._start` and `event._end` (set by EventManager).
	//
	// Returns an object with delta information and a function to undo all operations.
	//
	function mutateEvent(event, newStart, newEnd) {
		var oldAllDay = event._allDay;
		var oldStart = event._start;
		var oldEnd = event._end;
		var clearEnd = false;
		var newAllDay;
		var dateDelta;
		var durationDelta;
		var undoFunc;

		// if no new dates were passed in, compare against the event's existing dates
		if (!newStart && !newEnd) {
			newStart = event.start;
			newEnd = event.end;
		}

		// NOTE: throughout this function, the initial values of `newStart` and `newEnd` are
		// preserved. These values may be undefined.

		// detect new allDay
		if (event.allDay != oldAllDay) { // if value has changed, use it
			newAllDay = event.allDay;
		}
		else { // otherwise, see if any of the new dates are allDay
			newAllDay = !(newStart || newEnd).hasTime();
		}

		// normalize the new dates based on allDay
		if (newAllDay) {
			if (newStart) {
				newStart = newStart.clone().stripTime();
			}
			if (newEnd) {
				newEnd = newEnd.clone().stripTime();
			}
		}

		// compute dateDelta
		if (newStart) {
			if (newAllDay) {
				dateDelta = dayishDiff(newStart, oldStart.clone().stripTime()); // treat oldStart as allDay
			}
			else {
				dateDelta = dayishDiff(newStart, oldStart);
			}
		}

		if (newAllDay != oldAllDay) {
			// if allDay has changed, always throw away the end
			clearEnd = true;
		}
		else if (newEnd) {
			durationDelta = dayishDiff(
				// new duration
				newEnd || t.getDefaultEventEnd(newAllDay, newStart || oldStart),
				newStart || oldStart
			).subtract(dayishDiff(
				// subtract old duration
				oldEnd || t.getDefaultEventEnd(oldAllDay, oldStart),
				oldStart
			));
		}

		undoFunc = mutateEvents(
			clientEvents(event._id), // get events with this ID
			clearEnd,
			newAllDay,
			dateDelta,
			durationDelta
		);

		return {
			dateDelta: dateDelta,
			durationDelta: durationDelta,
			undo: undoFunc
		};
	}


	// Modifies an array of events in the following ways (operations are in order):
	// - clear the event's `end`
	// - convert the event to allDay
	// - add `dateDelta` to the start and end
	// - add `durationDelta` to the event's duration
	//
	// Returns a function that can be called to undo all the operations.
	//
	function mutateEvents(events, clearEnd, forceAllDay, dateDelta, durationDelta) {
		var isAmbigTimezone = t.getIsAmbigTimezone();
		var undoFunctions = [];

		$.each(events, function(i, event) {
			var oldAllDay = event._allDay;
			var oldStart = event._start;
			var oldEnd = event._end;
			var newAllDay = forceAllDay != null ? forceAllDay : oldAllDay;
			var newStart = oldStart.clone();
			var newEnd = (!clearEnd && oldEnd) ? oldEnd.clone() : null;

			// NOTE: this function is responsible for transforming `newStart` and `newEnd`,
			// which were initialized to the OLD values first. `newEnd` may be null.

			// normlize newStart/newEnd to be consistent with newAllDay
			if (newAllDay) {
				newStart.stripTime();
				if (newEnd) {
					newEnd.stripTime();
				}
			}
			else {
				if (!newStart.hasTime()) {
					newStart = t.rezoneDate(newStart);
				}
				if (newEnd && !newEnd.hasTime()) {
					newEnd = t.rezoneDate(newEnd);
				}
			}

			// ensure we have an end date if necessary
			if (!newEnd && (options.forceEventDuration || +durationDelta)) {
				newEnd = t.getDefaultEventEnd(newAllDay, newStart);
			}

			// translate the dates
			newStart.add(dateDelta);
			if (newEnd) {
				newEnd.add(dateDelta).add(durationDelta);
			}

			// if the dates have changed, and we know it is impossible to recompute the
			// timezone offsets, strip the zone.
			if (isAmbigTimezone) {
				if (+dateDelta || +durationDelta) {
					newStart.stripZone();
					if (newEnd) {
						newEnd.stripZone();
					}
				}
			}

			event.allDay = newAllDay;
			event.start = newStart;
			event.end = newEnd;
			backupEventDates(event);

			undoFunctions.push(function() {
				event.allDay = oldAllDay;
				event.start = oldStart;
				event.end = oldEnd;
				backupEventDates(event);
			});
		});

		return function() {
			for (var i=0; i<undoFunctions.length; i++) {
				undoFunctions[i]();
			}
		};
	}


	/* Business Hours
	-----------------------------------------------------------------------------------------*/

	t.getBusinessHoursEvents = getBusinessHoursEvents;


	// Returns an array of events as to when the business hours occur in the current view.
	// Abuse of our event system :(
	function getBusinessHoursEvents() {
		var optionVal = options.businessHours;
		var defaultVal = {
			className: 'fc-nonbusiness',
			start: '09:00',
			end: '17:00',
			dow: [ 1, 2, 3, 4, 5 ], // monday - friday
			rendering: 'inverse-background'
		};
		var eventInput;

		if (optionVal) {
			if (typeof optionVal === 'object') {
				// option value is an object that can override the default business hours
				eventInput = $.extend({}, defaultVal, optionVal);
			}
			else {
				// option value is `true`. use default business hours
				eventInput = defaultVal;
			}
		}

		if (eventInput) {
			return expandEvent(buildEventFromInput(eventInput));
		}

		return [];
	}


	/* Overlapping / Constraining
	-----------------------------------------------------------------------------------------*/

	t.isEventAllowedInRange = isEventAllowedInRange;
	t.isSelectionAllowedInRange = isSelectionAllowedInRange;
	t.isExternalDragAllowedInRange = isExternalDragAllowedInRange;


	function isEventAllowedInRange(event, start, end) {
		var source = event.source || {};
		var constraint = firstDefined(
			event.constraint,
			source.constraint,
			options.eventConstraint
		);
		var overlap = firstDefined(
			event.overlap,
			source.overlap,
			options.eventOverlap
		);

		return isRangeAllowed(start, end, constraint, overlap, event);
	}


	function isSelectionAllowedInRange(start, end) {
		return isRangeAllowed(
			start,
			end,
			options.selectConstraint,
			options.selectOverlap
		);
	}


	function isExternalDragAllowedInRange(start, end, eventInput) { // eventInput is optional associated event data
		var event;

		if (eventInput) {
			event = expandEvent(buildEventFromInput(eventInput))[0];
			if (event) {
				return isEventAllowedInRange(event, start, end);
			}
		}

		return isSelectionAllowedInRange(start, end); // treat it as a selection
	}


	// Returns true if the given range (caused by an event drop/resize or a selection) is allowed to exist
	// according to the constraint/overlap settings.
	// `event` is not required if checking a selection.
	function isRangeAllowed(start, end, constraint, overlap, event) {
		var constraintEvents;
		var anyContainment;
		var i, otherEvent;
		var otherOverlap;

		// normalize. fyi, we're normalizing in too many places :(
		start = start.clone().stripZone();
		end = end.clone().stripZone();

		// the range must be fully contained by at least one of produced constraint events
		if (constraint != null) {
			constraintEvents = constraintToEvents(constraint);
			anyContainment = false;

			for (i = 0; i < constraintEvents.length; i++) {
				if (eventContainsRange(constraintEvents[i], start, end)) {
					anyContainment = true;
					break;
				}
			}

			if (!anyContainment) {
				return false;
			}
		}

		for (i = 0; i < cache.length; i++) { // loop all events and detect overlap
			otherEvent = cache[i];

			// don't compare the event to itself or other related [repeating] events
			if (event && event._id === otherEvent._id) {
				continue;
			}

			// there needs to be an actual intersection before disallowing anything
			if (eventIntersectsRange(otherEvent, start, end)) {

				// evaluate overlap for the given range and short-circuit if necessary
				if (overlap === false) {
					return false;
				}
				else if (typeof overlap === 'function' && !overlap(otherEvent, event)) {
					return false;
				}

				// if we are computing if the given range is allowable for an event, consider the other event's
				// EventObject-specific or Source-specific `overlap` property
				if (event) {
					otherOverlap = firstDefined(
						otherEvent.overlap,
						(otherEvent.source || {}).overlap
						// we already considered the global `eventOverlap`
					);
					if (otherOverlap === false) {
						return false;
					}
					if (typeof otherOverlap === 'function' && !otherOverlap(event, otherEvent)) {
						return false;
					}
				}
			}
		}

		return true;
	}


	// Given an event input from the API, produces an array of event objects. Possible event inputs:
	// 'businessHours'
	// An event ID (number or string)
	// An object with specific start/end dates or a recurring event (like what businessHours accepts)
	function constraintToEvents(constraintInput) {

		if (constraintInput === 'businessHours') {
			return getBusinessHoursEvents();
		}

		if (typeof constraintInput === 'object') {
			return expandEvent(buildEventFromInput(constraintInput));
		}

		return clientEvents(constraintInput); // probably an ID
	}


	// Is the event's date ranged fully contained by the given range?
	// start/end already assumed to have stripped zones :(
	function eventContainsRange(event, start, end) {
		var eventStart = event.start.clone().stripZone();
		var eventEnd = t.getEventEnd(event).stripZone();

		return start >= eventStart && end <= eventEnd;
	}


	// Does the event's date range intersect with the given range?
	// start/end already assumed to have stripped zones :(
	function eventIntersectsRange(event, start, end) {
		var eventStart = event.start.clone().stripZone();
		var eventEnd = t.getEventEnd(event).stripZone();

		return start < eventEnd && end > eventStart;
	}

}


// updates the "backup" properties, which are preserved in order to compute diffs later on.
function backupEventDates(event) {
	event._allDay = event.allDay;
	event._start = event.start.clone();
	event._end = event.end ? event.end.clone() : null;
}

;;

/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/


// Given the scrollbar widths of some other container, create borders/margins on rowEls in order to match the left
// and right space that was offset by the scrollbars. A 1-pixel border first, then margin beyond that.
function compensateScroll(rowEls, scrollbarWidths) {
	if (scrollbarWidths.left) {
		rowEls.css({
			'border-left-width': 1,
			'margin-left': scrollbarWidths.left - 1
		});
	}
	if (scrollbarWidths.right) {
		rowEls.css({
			'border-right-width': 1,
			'margin-right': scrollbarWidths.right - 1
		});
	}
}


// Undoes compensateScroll and restores all borders/margins
function uncompensateScroll(rowEls) {
	rowEls.css({
		'margin-left': '',
		'margin-right': '',
		'border-left-width': '',
		'border-right-width': ''
	});
}


// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
	$('body').addClass('fc-not-allowed');
}


// Returns the mouse cursor to its original look
function enableCursor() {
	$('body').removeClass('fc-not-allowed');
}


// Given a total available height to fill, have `els` (essentially child rows) expand to accomodate.
// By default, all elements that are shorter than the recommended height are expanded uniformly, not considering
// any other els that are already too tall. if `shouldRedistribute` is on, it considers these tall rows and 
// reduces the available height.
function distributeHeight(els, availableHeight, shouldRedistribute) {

	// *FLOORING NOTE*: we floor in certain places because zoom can give inaccurate floating-point dimensions,
	// and it is better to be shorter than taller, to avoid creating unnecessary scrollbars.

	var minOffset1 = Math.floor(availableHeight / els.length); // for non-last element
	var minOffset2 = Math.floor(availableHeight - minOffset1 * (els.length - 1)); // for last element *FLOORING NOTE*
	var flexEls = []; // elements that are allowed to expand. array of DOM nodes
	var flexOffsets = []; // amount of vertical space it takes up
	var flexHeights = []; // actual css height
	var usedHeight = 0;

	undistributeHeight(els); // give all elements their natural height

	// find elements that are below the recommended height (expandable).
	// important to query for heights in a single first pass (to avoid reflow oscillation).
	els.each(function(i, el) {
		var minOffset = i === els.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = $(el).outerHeight(true);

		if (naturalOffset < minOffset) {
			flexEls.push(el);
			flexOffsets.push(naturalOffset);
			flexHeights.push($(el).height());
		}
		else {
			// this element stretches past recommended height (non-expandable). mark the space as occupied.
			usedHeight += naturalOffset;
		}
	});

	// readjust the recommended height to only consider the height available to non-maxed-out rows.
	if (shouldRedistribute) {
		availableHeight -= usedHeight;
		minOffset1 = Math.floor(availableHeight / flexEls.length);
		minOffset2 = Math.floor(availableHeight - minOffset1 * (flexEls.length - 1)); // *FLOORING NOTE*
	}

	// assign heights to all expandable elements
	$(flexEls).each(function(i, el) {
		var minOffset = i === flexEls.length - 1 ? minOffset2 : minOffset1;
		var naturalOffset = flexOffsets[i];
		var naturalHeight = flexHeights[i];
		var newHeight = minOffset - (naturalOffset - naturalHeight); // subtract the margin/padding

		if (naturalOffset < minOffset) { // we check this again because redistribution might have changed things
			$(el).height(newHeight);
		}
	});
}


// Undoes distrubuteHeight, restoring all els to their natural height
function undistributeHeight(els) {
	els.height('');
}


// Given `els`, a jQuery set of <td> cells, find the cell with the largest natural width and set the widths of all the
// cells to be that width.
// PREREQUISITE: if you want a cell to take up width, it needs to have a single inner element w/ display:inline
function matchCellWidths(els) {
	var maxInnerWidth = 0;

	els.find('> *').each(function(i, innerEl) {
		var innerWidth = $(innerEl).outerWidth();
		if (innerWidth > maxInnerWidth) {
			maxInnerWidth = innerWidth;
		}
	});

	maxInnerWidth++; // sometimes not accurate of width the text needs to stay on one line. insurance

	els.width(maxInnerWidth);

	return maxInnerWidth;
}


// Turns a container element into a scroller if its contents is taller than the allotted height.
// Returns true if the element is now a scroller, false otherwise.
// NOTE: this method is best because it takes weird zooming dimensions into account
function setPotentialScroller(containerEl, height) {
	containerEl.height(height).addClass('fc-scroller');

	// are scrollbars needed?
	if (containerEl[0].scrollHeight - 1 > containerEl[0].clientHeight) { // !!! -1 because IE is often off-by-one :(
		return true;
	}

	unsetScroller(containerEl); // undo
	return false;
}


// Takes an element that might have been a scroller, and turns it back into a normal element.
function unsetScroller(containerEl) {
	containerEl.height('').removeClass('fc-scroller');
}


/* General DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/


// borrowed from https://github.com/jquery/jquery-ui/blob/1.11.0/ui/core.js#L51
function getScrollParent(el) {
	var position = el.css('position'),
		scrollParent = el.parents().filter(function() {
			var parent = $(this);
			return (/(auto|scroll)/).test(
				parent.css('overflow') + parent.css('overflow-y') + parent.css('overflow-x')
			);
		}).eq(0);

	return position === 'fixed' || !scrollParent.length ? $(el[0].ownerDocument || document) : scrollParent;
}


// Given a container element, return an object with the pixel values of the left/right scrollbars.
// Left scrollbars might occur on RTL browsers (IE maybe?) but I have not tested.
// PREREQUISITE: container element must have a single child with display:block
function getScrollbarWidths(container) {
	var containerLeft = container.offset().left;
	var containerRight = containerLeft + container.width();
	var inner = container.children();
	var innerLeft = inner.offset().left;
	var innerRight = innerLeft + inner.outerWidth();

	return {
		left: innerLeft - containerLeft,
		right: containerRight - innerRight
	};
}


// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
	return ev.which == 1 && !ev.ctrlKey;
}


/* FullCalendar-specific Misc Utilities
----------------------------------------------------------------------------------------------------------------------*/


// Creates a basic segment with the intersection of the two ranges. Returns undefined if no intersection.
// Expects all dates to be normalized to the same timezone beforehand.
function intersectionToSeg(subjectStart, subjectEnd, intervalStart, intervalEnd) {
	var segStart, segEnd;
	var isStart, isEnd;

	if (subjectEnd > intervalStart && subjectStart < intervalEnd) { // in bounds at all?

		if (subjectStart >= intervalStart) {
			segStart = subjectStart.clone();
			isStart = true;
		}
		else {
			segStart = intervalStart.clone();
			isStart =  false;
		}

		if (subjectEnd <= intervalEnd) {
			segEnd = subjectEnd.clone();
			isEnd = true;
		}
		else {
			segEnd = intervalEnd.clone();
			isEnd = false;
		}

		return {
			start: segStart,
			end: segEnd,
			isStart: isStart,
			isEnd: isEnd
		};
	}
}


function smartProperty(obj, name) { // get a camel-cased/namespaced property of an object
	obj = obj || {};
	if (obj[name] !== undefined) {
		return obj[name];
	}
	var parts = name.split(/(?=[A-Z])/),
		i = parts.length - 1, res;
	for (; i>=0; i--) {
		res = obj[parts[i].toLowerCase()];
		if (res !== undefined) {
			return res;
		}
	}
	return obj['default'];
}


/* Date Utilities
----------------------------------------------------------------------------------------------------------------------*/

var dayIDs = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];


// Diffs the two moments into a Duration where full-days are recorded first, then the remaining time.
// Moments will have their timezones normalized.
function dayishDiff(a, b) {
	return moment.duration({
		days: a.clone().stripTime().diff(b.clone().stripTime(), 'days'),
		ms: a.time() - b.time()
	});
}


function isNativeDate(input) {
	return  Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}


function dateCompare(a, b) { // works with Moments and native Dates
	return a - b;
}


// Returns a boolean about whether the given input is a time string, like "06:40:00" or "06:00"
function isTimeString(str) {
	return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);
}


/* General Utilities
----------------------------------------------------------------------------------------------------------------------*/

fc.applyAll = applyAll; // export


// Create an object that has the given prototype. Just like Object.create
function createObject(proto) {
	var f = function() {};
	f.prototype = proto;
	return new f();
}


function applyAll(functions, thisObj, args) {
	if ($.isFunction(functions)) {
		functions = [ functions ];
	}
	if (functions) {
		var i;
		var ret;
		for (i=0; i<functions.length; i++) {
			ret = functions[i].apply(thisObj, args) || ret;
		}
		return ret;
	}
}


function firstDefined() {
	for (var i=0; i<arguments.length; i++) {
		if (arguments[i] !== undefined) {
			return arguments[i];
		}
	}
}


function htmlEscape(s) {
	return (s + '').replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/\n/g, '<br />');
}


function stripHtmlEntities(text) {
	return text.replace(/&.*?;/g, '');
}


function capitaliseFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
// https://github.com/jashkenas/underscore/blob/1.6.0/underscore.js#L714
function debounce(func, wait) {
	var timeoutId;
	var args;
	var context;
	var timestamp; // of most recent call
	var later = function() {
		var last = +new Date() - timestamp;
		if (last < wait && last > 0) {
			timeoutId = setTimeout(later, wait - last);
		}
		else {
			timeoutId = null;
			func.apply(context, args);
			if (!timeoutId) {
				context = args = null;
			}
		}
	};

	return function() {
		context = this;
		args = arguments;
		timestamp = +new Date();
		if (!timeoutId) {
			timeoutId = setTimeout(later, wait);
		}
	};
}

;;

var ambigDateOfMonthRegex = /^\s*\d{4}-\d\d$/;
var ambigTimeOrZoneRegex =
	/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;
var newMomentProto = moment.fn; // where we will attach our new methods
var oldMomentProto = $.extend({}, newMomentProto); // copy of original moment methods
var allowValueOptimization;
var setUTCValues; // function defined below
var setLocalValues; // function defined below


// Creating
// -------------------------------------------------------------------------------------------------

// Creates a new moment, similar to the vanilla moment(...) constructor, but with
// extra features (ambiguous time, enhanced formatting). When given an existing moment,
// it will function as a clone (and retain the zone of the moment). Anything else will
// result in a moment in the local zone.
fc.moment = function() {
	return makeMoment(arguments);
};

// Sames as fc.moment, but forces the resulting moment to be in the UTC timezone.
fc.moment.utc = function() {
	var mom = makeMoment(arguments, true);

	// Force it into UTC because makeMoment doesn't guarantee it
	// (if given a pre-existing moment for example)
	if (mom.hasTime()) { // don't give ambiguously-timed moments a UTC zone
		mom.utc();
	}

	return mom;
};

// Same as fc.moment, but when given an ISO8601 string, the timezone offset is preserved.
// ISO8601 strings with no timezone offset will become ambiguously zoned.
fc.moment.parseZone = function() {
	return makeMoment(arguments, true, true);
};

// Builds an enhanced moment from args. When given an existing moment, it clones. When given a
// native Date, or called with no arguments (the current time), the resulting moment will be local.
// Anything else needs to be "parsed" (a string or an array), and will be affected by:
//    parseAsUTC - if there is no zone information, should we parse the input in UTC?
//    parseZone - if there is zone information, should we force the zone of the moment?
function makeMoment(args, parseAsUTC, parseZone) {
	var input = args[0];
	var isSingleString = args.length == 1 && typeof input === 'string';
	var isAmbigTime;
	var isAmbigZone;
	var ambigMatch;
	var mom;

	if (moment.isMoment(input)) {
		mom = moment.apply(null, args); // clone it
		transferAmbigs(input, mom); // the ambig flags weren't transfered with the clone
	}
	else if (isNativeDate(input) || input === undefined) {
		mom = moment.apply(null, args); // will be local
	}
	else { // "parsing" is required
		isAmbigTime = false;
		isAmbigZone = false;

		if (isSingleString) {
			if (ambigDateOfMonthRegex.test(input)) {
				// accept strings like '2014-05', but convert to the first of the month
				input += '-01';
				args = [ input ]; // for when we pass it on to moment's constructor
				isAmbigTime = true;
				isAmbigZone = true;
			}
			else if ((ambigMatch = ambigTimeOrZoneRegex.exec(input))) {
				isAmbigTime = !ambigMatch[5]; // no time part?
				isAmbigZone = true;
			}
		}
		else if ($.isArray(input)) {
			// arrays have no timezone information, so assume ambiguous zone
			isAmbigZone = true;
		}
		// otherwise, probably a string with a format

		if (parseAsUTC) {
			mom = moment.utc.apply(moment, args);
		}
		else {
			mom = moment.apply(null, args);
		}

		if (isAmbigTime) {
			mom._ambigTime = true;
			mom._ambigZone = true; // ambiguous time always means ambiguous zone
		}
		else if (parseZone) { // let's record the inputted zone somehow
			if (isAmbigZone) {
				mom._ambigZone = true;
			}
			else if (isSingleString) {
				mom.zone(input); // if not a valid zone, will assign UTC
			}
		}
	}

	mom._fullCalendar = true; // flag for extended functionality

	return mom;
}


// A clone method that works with the flags related to our enhanced functionality.
// In the future, use moment.momentProperties
newMomentProto.clone = function() {
	var mom = oldMomentProto.clone.apply(this, arguments);

	// these flags weren't transfered with the clone
	transferAmbigs(this, mom);
	if (this._fullCalendar) {
		mom._fullCalendar = true;
	}

	return mom;
};


// Time-of-day
// -------------------------------------------------------------------------------------------------

// GETTER
// Returns a Duration with the hours/minutes/seconds/ms values of the moment.
// If the moment has an ambiguous time, a duration of 00:00 will be returned.
//
// SETTER
// You can supply a Duration, a Moment, or a Duration-like argument.
// When setting the time, and the moment has an ambiguous time, it then becomes unambiguous.
newMomentProto.time = function(time) {

	// Fallback to the original method (if there is one) if this moment wasn't created via FullCalendar.
	// `time` is a generic enough method name where this precaution is necessary to avoid collisions w/ other plugins.
	if (!this._fullCalendar) {
		return oldMomentProto.time.apply(this, arguments);
	}

	if (time == null) { // getter
		return moment.duration({
			hours: this.hours(),
			minutes: this.minutes(),
			seconds: this.seconds(),
			milliseconds: this.milliseconds()
		});
	}
	else { // setter

		this._ambigTime = false; // mark that the moment now has a time

		if (!moment.isDuration(time) && !moment.isMoment(time)) {
			time = moment.duration(time);
		}

		// The day value should cause overflow (so 24 hours becomes 00:00:00 of next day).
		// Only for Duration times, not Moment times.
		var dayHours = 0;
		if (moment.isDuration(time)) {
			dayHours = Math.floor(time.asDays()) * 24;
		}

		// We need to set the individual fields.
		// Can't use startOf('day') then add duration. In case of DST at start of day.
		return this.hours(dayHours + time.hours())
			.minutes(time.minutes())
			.seconds(time.seconds())
			.milliseconds(time.milliseconds());
	}
};

// Converts the moment to UTC, stripping out its time-of-day and timezone offset,
// but preserving its YMD. A moment with a stripped time will display no time
// nor timezone offset when .format() is called.
newMomentProto.stripTime = function() {
	var a = this.toArray(); // year,month,date,hours,minutes,seconds as an array

	this.utc(); // set the internal UTC flag (will clear the ambig flags)
	setUTCValues(this, a.slice(0, 3)); // set the year/month/date. time will be zero

	// Mark the time as ambiguous. This needs to happen after the .utc() call, which calls .zone(),
	// which clears all ambig flags. Same with setUTCValues with moment-timezone.
	this._ambigTime = true;
	this._ambigZone = true; // if ambiguous time, also ambiguous timezone offset

	return this; // for chaining
};

// Returns if the moment has a non-ambiguous time (boolean)
newMomentProto.hasTime = function() {
	return !this._ambigTime;
};


// Timezone
// -------------------------------------------------------------------------------------------------

// Converts the moment to UTC, stripping out its timezone offset, but preserving its
// YMD and time-of-day. A moment with a stripped timezone offset will display no
// timezone offset when .format() is called.
newMomentProto.stripZone = function() {
	var a = this.toArray(); // year,month,date,hours,minutes,seconds as an array
	var wasAmbigTime = this._ambigTime;

	this.utc(); // set the internal UTC flag (will clear the ambig flags)
	setUTCValues(this, a); // will set the year/month/date/hours/minutes/seconds/ms

	if (wasAmbigTime) {
		// the above call to .utc()/.zone() unfortunately clears the ambig flags, so reassign
		this._ambigTime = true;
	}

	// Mark the zone as ambiguous. This needs to happen after the .utc() call, which calls .zone(),
	// which clears all ambig flags. Same with setUTCValues with moment-timezone.
	this._ambigZone = true;

	return this; // for chaining
};

// Returns of the moment has a non-ambiguous timezone offset (boolean)
newMomentProto.hasZone = function() {
	return !this._ambigZone;
};

// this method implicitly marks a zone (will get called upon .utc() and .local())
newMomentProto.zone = function(tzo) {

	if (tzo != null) { // setter
		// these assignments needs to happen before the original zone method is called.
		// I forget why, something to do with a browser crash.
		this._ambigTime = false;
		this._ambigZone = false;
	}

	return oldMomentProto.zone.apply(this, arguments);
};

// this method implicitly marks a zone
newMomentProto.local = function() {
	var a = this.toArray(); // year,month,date,hours,minutes,seconds,ms as an array
	var wasAmbigZone = this._ambigZone;

	oldMomentProto.local.apply(this, arguments); // will clear ambig flags

	if (wasAmbigZone) {
		// If the moment was ambiguously zoned, the date fields were stored as UTC.
		// We want to preserve these, but in local time.
		setLocalValues(this, a);
	}

	return this; // for chaining
};


// Formatting
// -------------------------------------------------------------------------------------------------

newMomentProto.format = function() {
	if (this._fullCalendar && arguments[0]) { // an enhanced moment? and a format string provided?
		return formatDate(this, arguments[0]); // our extended formatting
	}
	if (this._ambigTime) {
		return oldMomentFormat(this, 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(this, 'YYYY-MM-DD[T]HH:mm:ss');
	}
	return oldMomentProto.format.apply(this, arguments);
};

newMomentProto.toISOString = function() {
	if (this._ambigTime) {
		return oldMomentFormat(this, 'YYYY-MM-DD');
	}
	if (this._ambigZone) {
		return oldMomentFormat(this, 'YYYY-MM-DD[T]HH:mm:ss');
	}
	return oldMomentProto.toISOString.apply(this, arguments);
};


// Querying
// -------------------------------------------------------------------------------------------------

// Is the moment within the specified range? `end` is exclusive.
// FYI, this method is not a standard Moment method, so always do our enhanced logic.
newMomentProto.isWithin = function(start, end) {
	var a = commonlyAmbiguate([ this, start, end ]);
	return a[0] >= a[1] && a[0] < a[2];
};

// When isSame is called with units, timezone ambiguity is normalized before the comparison happens.
// If no units specified, the two moments must be identically the same, with matching ambig flags.
newMomentProto.isSame = function(input, units) {
	var a;

	// only do custom logic if this is an enhanced moment
	if (!this._fullCalendar) {
		return oldMomentProto.isSame.apply(this, arguments);
	}

	if (units) {
		a = commonlyAmbiguate([ this, input ], true); // normalize timezones but don't erase times
		return oldMomentProto.isSame.call(a[0], a[1], units);
	}
	else {
		input = fc.moment.parseZone(input); // normalize input
		return oldMomentProto.isSame.call(this, input) &&
			Boolean(this._ambigTime) === Boolean(input._ambigTime) &&
			Boolean(this._ambigZone) === Boolean(input._ambigZone);
	}
};

// Make these query methods work with ambiguous moments
$.each([
	'isBefore',
	'isAfter'
], function(i, methodName) {
	newMomentProto[methodName] = function(input, units) {
		var a;

		// only do custom logic if this is an enhanced moment
		if (!this._fullCalendar) {
			return oldMomentProto[methodName].apply(this, arguments);
		}

		a = commonlyAmbiguate([ this, input ]);
		return oldMomentProto[methodName].call(a[0], a[1], units);
	};
});


// Misc Internals
// -------------------------------------------------------------------------------------------------

// given an array of moment-like inputs, return a parallel array w/ moments similarly ambiguated.
// for example, of one moment has ambig time, but not others, all moments will have their time stripped.
// set `preserveTime` to `true` to keep times, but only normalize zone ambiguity.
function commonlyAmbiguate(inputs, preserveTime) {
	var outputs = [];
	var anyAmbigTime = false;
	var anyAmbigZone = false;
	var i;

	for (i=0; i<inputs.length; i++) {
		outputs.push(fc.moment.parseZone(inputs[i]));
		anyAmbigTime = anyAmbigTime || outputs[i]._ambigTime;
		anyAmbigZone = anyAmbigZone || outputs[i]._ambigZone;
	}

	for (i=0; i<outputs.length; i++) {
		if (anyAmbigTime && !preserveTime) {
			outputs[i].stripTime();
		}
		else if (anyAmbigZone) {
			outputs[i].stripZone();
		}
	}

	return outputs;
}

// Transfers all the flags related to ambiguous time/zone from the `src` moment to the `dest` moment
function transferAmbigs(src, dest) {
	if (src._ambigTime) {
		dest._ambigTime = true;
	}
	else if (dest._ambigTime) {
		dest._ambigTime = false;
	}

	if (src._ambigZone) {
		dest._ambigZone = true;
	}
	else if (dest._ambigZone) {
		dest._ambigZone = false;
	}
}


// Sets the year/month/date/etc values of the moment from the given array.
// Inefficient because it calls each individual setter.
function setMomentValues(mom, a) {
	mom.year(a[0] || 0)
		.month(a[1] || 0)
		.date(a[2] || 0)
		.hours(a[3] || 0)
		.minutes(a[4] || 0)
		.seconds(a[5] || 0)
		.milliseconds(a[6] || 0);
}

// Can we set the moment's internal date directly?
allowValueOptimization = '_d' in moment() && 'updateOffset' in moment;

// Utility function. Accepts a moment and an array of the UTC year/month/date/etc values to set.
// Assumes the given moment is already in UTC mode.
setUTCValues = allowValueOptimization ? function(mom, a) {
	// simlate what moment's accessors do
	mom._d.setTime(Date.UTC.apply(Date, a));
	moment.updateOffset(mom, false); // keepTime=false
} : setMomentValues;

// Utility function. Accepts a moment and an array of the local year/month/date/etc values to set.
// Assumes the given moment is already in local mode.
setLocalValues = allowValueOptimization ? function(mom, a) {
	// simlate what moment's accessors do
	mom._d.setTime(+new Date( // FYI, there is now way to apply an array of args to a constructor
		a[0] || 0,
		a[1] || 0,
		a[2] || 0,
		a[3] || 0,
		a[4] || 0,
		a[5] || 0,
		a[6] || 0
	));
	moment.updateOffset(mom, false); // keepTime=false
} : setMomentValues;

;;

// Single Date Formatting
// -------------------------------------------------------------------------------------------------


// call this if you want Moment's original format method to be used
function oldMomentFormat(mom, formatStr) {
	return oldMomentProto.format.call(mom, formatStr); // oldMomentProto defined in moment-ext.js
}


// Formats `date` with a Moment formatting string, but allow our non-zero areas and
// additional token.
function formatDate(date, formatStr) {
	return formatDateWithChunks(date, getFormatStringChunks(formatStr));
}


function formatDateWithChunks(date, chunks) {
	var s = '';
	var i;

	for (i=0; i<chunks.length; i++) {
		s += formatDateWithChunk(date, chunks[i]);
	}

	return s;
}


// addition formatting tokens we want recognized
var tokenOverrides = {
	t: function(date) { // "a" or "p"
		return oldMomentFormat(date, 'a').charAt(0);
	},
	T: function(date) { // "A" or "P"
		return oldMomentFormat(date, 'A').charAt(0);
	}
};


function formatDateWithChunk(date, chunk) {
	var token;
	var maybeStr;

	if (typeof chunk === 'string') { // a literal string
		return chunk;
	}
	else if ((token = chunk.token)) { // a token, like "YYYY"
		if (tokenOverrides[token]) {
			return tokenOverrides[token](date); // use our custom token
		}
		return oldMomentFormat(date, token);
	}
	else if (chunk.maybe) { // a grouping of other chunks that must be non-zero
		maybeStr = formatDateWithChunks(date, chunk.maybe);
		if (maybeStr.match(/[1-9]/)) {
			return maybeStr;
		}
	}

	return '';
}


// Date Range Formatting
// -------------------------------------------------------------------------------------------------
// TODO: make it work with timezone offset

// Using a formatting string meant for a single date, generate a range string, like
// "Sep 2 - 9 2013", that intelligently inserts a separator where the dates differ.
// If the dates are the same as far as the format string is concerned, just return a single
// rendering of one date, without any separator.
function formatRange(date1, date2, formatStr, separator, isRTL) {
	var localeData;

	date1 = fc.moment.parseZone(date1);
	date2 = fc.moment.parseZone(date2);

	localeData = (date1.localeData || date1.lang).call(date1); // works with moment-pre-2.8

	// Expand localized format strings, like "LL" -> "MMMM D YYYY"
	formatStr = localeData.longDateFormat(formatStr) || formatStr;
	// BTW, this is not important for `formatDate` because it is impossible to put custom tokens
	// or non-zero areas in Moment's localized format strings.

	separator = separator || ' - ';

	return formatRangeWithChunks(
		date1,
		date2,
		getFormatStringChunks(formatStr),
		separator,
		isRTL
	);
}
fc.formatRange = formatRange; // expose


function formatRangeWithChunks(date1, date2, chunks, separator, isRTL) {
	var chunkStr; // the rendering of the chunk
	var leftI;
	var leftStr = '';
	var rightI;
	var rightStr = '';
	var middleI;
	var middleStr1 = '';
	var middleStr2 = '';
	var middleStr = '';

	// Start at the leftmost side of the formatting string and continue until you hit a token
	// that is not the same between dates.
	for (leftI=0; leftI<chunks.length; leftI++) {
		chunkStr = formatSimilarChunk(date1, date2, chunks[leftI]);
		if (chunkStr === false) {
			break;
		}
		leftStr += chunkStr;
	}

	// Similarly, start at the rightmost side of the formatting string and move left
	for (rightI=chunks.length-1; rightI>leftI; rightI--) {
		chunkStr = formatSimilarChunk(date1, date2, chunks[rightI]);
		if (chunkStr === false) {
			break;
		}
		rightStr = chunkStr + rightStr;
	}

	// The area in the middle is different for both of the dates.
	// Collect them distinctly so we can jam them together later.
	for (middleI=leftI; middleI<=rightI; middleI++) {
		middleStr1 += formatDateWithChunk(date1, chunks[middleI]);
		middleStr2 += formatDateWithChunk(date2, chunks[middleI]);
	}

	if (middleStr1 || middleStr2) {
		if (isRTL) {
			middleStr = middleStr2 + separator + middleStr1;
		}
		else {
			middleStr = middleStr1 + separator + middleStr2;
		}
	}

	return leftStr + middleStr + rightStr;
}


var similarUnitMap = {
	Y: 'year',
	M: 'month',
	D: 'day', // day of month
	d: 'day', // day of week
	// prevents a separator between anything time-related...
	A: 'second', // AM/PM
	a: 'second', // am/pm
	T: 'second', // A/P
	t: 'second', // a/p
	H: 'second', // hour (24)
	h: 'second', // hour (12)
	m: 'second', // minute
	s: 'second' // second
};
// TODO: week maybe?


// Given a formatting chunk, and given that both dates are similar in the regard the
// formatting chunk is concerned, format date1 against `chunk`. Otherwise, return `false`.
function formatSimilarChunk(date1, date2, chunk) {
	var token;
	var unit;

	if (typeof chunk === 'string') { // a literal string
		return chunk;
	}
	else if ((token = chunk.token)) {
		unit = similarUnitMap[token.charAt(0)];
		// are the dates the same for this unit of measurement?
		if (unit && date1.isSame(date2, unit)) {
			return oldMomentFormat(date1, token); // would be the same if we used `date2`
			// BTW, don't support custom tokens
		}
	}

	return false; // the chunk is NOT the same for the two dates
	// BTW, don't support splitting on non-zero areas
}


// Chunking Utils
// -------------------------------------------------------------------------------------------------


var formatStringChunkCache = {};


function getFormatStringChunks(formatStr) {
	if (formatStr in formatStringChunkCache) {
		return formatStringChunkCache[formatStr];
	}
	return (formatStringChunkCache[formatStr] = chunkFormatString(formatStr));
}


// Break the formatting string into an array of chunks
function chunkFormatString(formatStr) {
	var chunks = [];
	var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LT|(\w)\4*o?)|([^\w\[\(]+)/g; // TODO: more descrimination
	var match;

	while ((match = chunker.exec(formatStr))) {
		if (match[1]) { // a literal string inside [ ... ]
			chunks.push(match[1]);
		}
		else if (match[2]) { // non-zero formatting inside ( ... )
			chunks.push({ maybe: chunkFormatString(match[2]) });
		}
		else if (match[3]) { // a formatting token
			chunks.push({ token: match[3] });
		}
		else if (match[5]) { // an unenclosed literal string
			chunks.push(match[5]);
		}
	}

	return chunks;
}

;;

/* A rectangular panel that is absolutely positioned over other content
------------------------------------------------------------------------------------------------------------------------
Options:
	- className (string)
	- content (HTML string or jQuery element set)
	- parentEl
	- top
	- left
	- right (the x coord of where the right edge should be. not a "CSS" right)
	- autoHide (boolean)
	- show (callback)
	- hide (callback)
*/

function Popover(options) {
	this.options = options || {};
}


Popover.prototype = {

	isHidden: true,
	options: null,
	el: null, // the container element for the popover. generated by this object
	documentMousedownProxy: null, // document mousedown handler bound to `this`
	margin: 10, // the space required between the popover and the edges of the scroll container


	// Shows the popover on the specified position. Renders it if not already
	show: function() {
		if (this.isHidden) {
			if (!this.el) {
				this.render();
			}
			this.el.show();
			this.position();
			this.isHidden = false;
			this.trigger('show');
		}
	},


	// Hides the popover, through CSS, but does not remove it from the DOM
	hide: function() {
		if (!this.isHidden) {
			this.el.hide();
			this.isHidden = true;
			this.trigger('hide');
		}
	},


	// Creates `this.el` and renders content inside of it
	render: function() {
		var _this = this;
		var options = this.options;

		this.el = $('<div class="fc-popover"/>')
			.addClass(options.className || '')
			.css({
				// position initially to the top left to avoid creating scrollbars
				top: 0,
				left: 0
			})
			.append(options.content)
			.appendTo(options.parentEl);

		// when a click happens on anything inside with a 'fc-close' className, hide the popover
		this.el.on('click', '.fc-close', function() {
			_this.hide();
		});

		if (options.autoHide) {
			$(document).on('mousedown', this.documentMousedownProxy = $.proxy(this, 'documentMousedown'));
		}
	},


	// Triggered when the user clicks *anywhere* in the document, for the autoHide feature
	documentMousedown: function(ev) {
		// only hide the popover if the click happened outside the popover
		if (this.el && !$(ev.target).closest(this.el).length) {
			this.hide();
		}
	},


	// Hides and unregisters any handlers
	destroy: function() {
		this.hide();

		if (this.el) {
			this.el.remove();
			this.el = null;
		}

		$(document).off('mousedown', this.documentMousedownProxy);
	},


	// Positions the popover optimally, using the top/left/right options
	position: function() {
		var options = this.options;
		var origin = this.el.offsetParent().offset();
		var width = this.el.outerWidth();
		var height = this.el.outerHeight();
		var windowEl = $(window);
		var viewportEl = getScrollParent(this.el);
		var viewportTop;
		var viewportLeft;
		var viewportOffset;
		var top; // the "position" (not "offset") values for the popover
		var left; //

		// compute top and left
		top = options.top || 0;
		if (options.left !== undefined) {
			left = options.left;
		}
		else if (options.right !== undefined) {
			left = options.right - width; // derive the left value from the right value
		}
		else {
			left = 0;
		}

		if (viewportEl.is(window) || viewportEl.is(document)) { // normalize getScrollParent's result
			viewportEl = windowEl;
			viewportTop = 0; // the window is always at the top left
			viewportLeft = 0; // (and .offset() won't work if called here)
		}
		else {
			viewportOffset = viewportEl.offset();
			viewportTop = viewportOffset.top;
			viewportLeft = viewportOffset.left;
		}

		// if the window is scrolled, it causes the visible area to be further down
		viewportTop += windowEl.scrollTop();
		viewportLeft += windowEl.scrollLeft();

		// constrain to the view port. if constrained by two edges, give precedence to top/left
		if (options.viewportConstrain !== false) {
			top = Math.min(top, viewportTop + viewportEl.outerHeight() - height - this.margin);
			top = Math.max(top, viewportTop + this.margin);
			left = Math.min(left, viewportLeft + viewportEl.outerWidth() - width - this.margin);
			left = Math.max(left, viewportLeft + this.margin);
		}

		this.el.css({
			top: top - origin.top,
			left: left - origin.left
		});
	},


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	// TODO: better code reuse for this. Repeat code
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}

};

;;

/* A "coordinate map" converts pixel coordinates into an associated cell, which has an associated date
------------------------------------------------------------------------------------------------------------------------
Common interface:

	CoordMap.prototype = {
		build: function() {},
		getCell: function(x, y) {}
	};

*/

/* Coordinate map for a grid component
----------------------------------------------------------------------------------------------------------------------*/

function GridCoordMap(grid) {
	this.grid = grid;
}


GridCoordMap.prototype = {

	grid: null, // reference to the Grid
	rows: null, // the top-to-bottom y coordinates. including the bottom of the last item
	cols: null, // the left-to-right x coordinates. including the right of the last item

	containerEl: null, // container element that all coordinates are constrained to. optionally assigned
	minX: null,
	maxX: null, // exclusive
	minY: null,
	maxY: null, // exclusive


	// Queries the grid for the coordinates of all the cells
	build: function() {
		this.grid.buildCoords(
			this.rows = [],
			this.cols = []
		);
		this.computeBounds();
	},


	// Given a coordinate of the document, gets the associated cell. If no cell is underneath, returns null
	getCell: function(x, y) {
		var cell = null;
		var rows = this.rows;
		var cols = this.cols;
		var r = -1;
		var c = -1;
		var i;

		if (this.inBounds(x, y)) {

			for (i = 0; i < rows.length; i++) {
				if (y >= rows[i][0] && y < rows[i][1]) {
					r = i;
					break;
				}
			}

			for (i = 0; i < cols.length; i++) {
				if (x >= cols[i][0] && x < cols[i][1]) {
					c = i;
					break;
				}
			}

			if (r >= 0 && c >= 0) {
				cell = { row: r, col: c };
				cell.grid = this.grid;
				cell.date = this.grid.getCellDate(cell);
			}
		}

		return cell;
	},


	// If there is a containerEl, compute the bounds into min/max values
	computeBounds: function() {
		var containerOffset;

		if (this.containerEl) {
			containerOffset = this.containerEl.offset();
			this.minX = containerOffset.left;
			this.maxX = containerOffset.left + this.containerEl.outerWidth();
			this.minY = containerOffset.top;
			this.maxY = containerOffset.top + this.containerEl.outerHeight();
		}
	},


	// Determines if the given coordinates are in bounds. If no `containerEl`, always true
	inBounds: function(x, y) {
		if (this.containerEl) {
			return x >= this.minX && x < this.maxX && y >= this.minY && y < this.maxY;
		}
		return true;
	}

};


/* Coordinate map that is a combination of multiple other coordinate maps
----------------------------------------------------------------------------------------------------------------------*/

function ComboCoordMap(coordMaps) {
	this.coordMaps = coordMaps;
}


ComboCoordMap.prototype = {

	coordMaps: null, // an array of CoordMaps


	// Builds all coordMaps
	build: function() {
		var coordMaps = this.coordMaps;
		var i;

		for (i = 0; i < coordMaps.length; i++) {
			coordMaps[i].build();
		}
	},


	// Queries all coordMaps for the cell underneath the given coordinates, returning the first result
	getCell: function(x, y) {
		var coordMaps = this.coordMaps;
		var cell = null;
		var i;

		for (i = 0; i < coordMaps.length && !cell; i++) {
			cell = coordMaps[i].getCell(x, y);
		}

		return cell;
	}

};

;;

/* Tracks mouse movements over a CoordMap and raises events about which cell the mouse is over.
----------------------------------------------------------------------------------------------------------------------*/
// TODO: very useful to have a handler that gets called upon cellOut OR when dragging stops (for cleanup)

function DragListener(coordMap, options) {
	this.coordMap = coordMap;
	this.options = options || {};
}


DragListener.prototype = {

	coordMap: null,
	options: null,

	isListening: false,
	isDragging: false,

	// the cell/date the mouse was over when listening started
	origCell: null,
	origDate: null,

	// the cell/date the mouse is over
	cell: null,
	date: null,

	// coordinates of the initial mousedown
	mouseX0: null,
	mouseY0: null,

	// handler attached to the document, bound to the DragListener's `this`
	mousemoveProxy: null,
	mouseupProxy: null,

	scrollEl: null,
	scrollBounds: null, // { top, bottom, left, right }
	scrollTopVel: null, // pixels per second
	scrollLeftVel: null, // pixels per second
	scrollIntervalId: null, // ID of setTimeout for scrolling animation loop
	scrollHandlerProxy: null, // this-scoped function for handling when scrollEl is scrolled

	scrollSensitivity: 30, // pixels from edge for scrolling to start
	scrollSpeed: 200, // pixels per second, at maximum speed
	scrollIntervalMs: 50, // millisecond wait between scroll increment


	// Call this when the user does a mousedown. Will probably lead to startListening
	mousedown: function(ev) {
		if (isPrimaryMouseButton(ev)) {

			ev.preventDefault(); // prevents native selection in most browsers

			this.startListening(ev);

			// start the drag immediately if there is no minimum distance for a drag start
			if (!this.options.distance) {
				this.startDrag(ev);
			}
		}
	},


	// Call this to start tracking mouse movements
	startListening: function(ev) {
		var scrollParent;
		var cell;

		if (!this.isListening) {

			// grab scroll container and attach handler
			if (ev && this.options.scroll) {
				scrollParent = getScrollParent($(ev.target));
				if (!scrollParent.is(window) && !scrollParent.is(document)) {
					this.scrollEl = scrollParent;

					// scope to `this`, and use `debounce` to make sure rapid calls don't happen
					this.scrollHandlerProxy = debounce($.proxy(this, 'scrollHandler'), 100);
					this.scrollEl.on('scroll', this.scrollHandlerProxy);
				}
			}

			this.computeCoords(); // relies on `scrollEl`

			// get info on the initial cell, date, and coordinates
			if (ev) {
				cell = this.getCell(ev);
				this.origCell = cell;
				this.origDate = cell ? cell.date : null;

				this.mouseX0 = ev.pageX;
				this.mouseY0 = ev.pageY;
			}

			$(document)
				.on('mousemove', this.mousemoveProxy = $.proxy(this, 'mousemove'))
				.on('mouseup', this.mouseupProxy = $.proxy(this, 'mouseup'))
				.on('selectstart', this.preventDefault); // prevents native selection in IE<=8

			this.isListening = true;
			this.trigger('listenStart', ev);
		}
	},


	// Recomputes the drag-critical positions of elements
	computeCoords: function() {
		this.coordMap.build();
		this.computeScrollBounds();
	},


	// Called when the user moves the mouse
	mousemove: function(ev) {
		var minDistance;
		var distanceSq; // current distance from mouseX0/mouseY0, squared

		if (!this.isDragging) { // if not already dragging...
			// then start the drag if the minimum distance criteria is met
			minDistance = this.options.distance || 1;
			distanceSq = Math.pow(ev.pageX - this.mouseX0, 2) + Math.pow(ev.pageY - this.mouseY0, 2);
			if (distanceSq >= minDistance * minDistance) { // use pythagorean theorem
				this.startDrag(ev);
			}
		}

		if (this.isDragging) {
			this.drag(ev); // report a drag, even if this mousemove initiated the drag
		}
	},


	// Call this to initiate a legitimate drag.
	// This function is called internally from this class, but can also be called explicitly from outside
	startDrag: function(ev) {
		var cell;

		if (!this.isListening) { // startDrag must have manually initiated
			this.startListening();
		}

		if (!this.isDragging) {
			this.isDragging = true;
			this.trigger('dragStart', ev);

			// report the initial cell the mouse is over
			cell = this.getCell(ev);
			if (cell) {
				this.cellOver(cell, true);
			}
		}
	},


	// Called while the mouse is being moved and when we know a legitimate drag is taking place
	drag: function(ev) {
		var cell;

		if (this.isDragging) {
			cell = this.getCell(ev);

			if (!isCellsEqual(cell, this.cell)) { // a different cell than before?
				if (this.cell) {
					this.cellOut();
				}
				if (cell) {
					this.cellOver(cell);
				}
			}

			this.dragScroll(ev); // will possibly cause scrolling
		}
	},


	// Called when a the mouse has just moved over a new cell
	cellOver: function(cell) {
		this.cell = cell;
		this.date = cell.date;
		this.trigger('cellOver', cell, cell.date);
	},


	// Called when the mouse has just moved out of a cell
	cellOut: function() {
		if (this.cell) {
			this.trigger('cellOut', this.cell);
			this.cell = null;
			this.date = null;
		}
	},


	// Called when the user does a mouseup
	mouseup: function(ev) {
		this.stopDrag(ev);
		this.stopListening(ev);
	},


	// Called when the drag is over. Will not cause listening to stop however.
	// A concluding 'cellOut' event will NOT be triggered.
	stopDrag: function(ev) {
		if (this.isDragging) {
			this.stopScrolling();
			this.trigger('dragStop', ev);
			this.isDragging = false;
		}
	},


	// Call this to stop listening to the user's mouse events
	stopListening: function(ev) {
		if (this.isListening) {

			// remove the scroll handler if there is a scrollEl
			if (this.scrollEl) {
				this.scrollEl.off('scroll', this.scrollHandlerProxy);
				this.scrollHandlerProxy = null;
			}

			$(document)
				.off('mousemove', this.mousemoveProxy)
				.off('mouseup', this.mouseupProxy)
				.off('selectstart', this.preventDefault);

			this.mousemoveProxy = null;
			this.mouseupProxy = null;

			this.isListening = false;
			this.trigger('listenStop', ev);

			this.origCell = this.cell = null;
			this.origDate = this.date = null;
		}
	},


	// Gets the cell underneath the coordinates for the given mouse event
	getCell: function(ev) {
		return this.coordMap.getCell(ev.pageX, ev.pageY);
	},


	// Triggers a callback. Calls a function in the option hash of the same name.
	// Arguments beyond the first `name` are forwarded on.
	trigger: function(name) {
		if (this.options[name]) {
			this.options[name].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	},


	// Stops a given mouse event from doing it's native browser action. In our case, text selection.
	preventDefault: function(ev) {
		ev.preventDefault();
	},


	/* Scrolling
	------------------------------------------------------------------------------------------------------------------*/


	// Computes and stores the bounding rectangle of scrollEl
	computeScrollBounds: function() {
		var el = this.scrollEl;
		var offset;

		if (el) {
			offset = el.offset();
			this.scrollBounds = {
				top: offset.top,
				left: offset.left,
				bottom: offset.top + el.outerHeight(),
				right: offset.left + el.outerWidth()
			};
		}
	},


	// Called when the dragging is in progress and scrolling should be updated
	dragScroll: function(ev) {
		var sensitivity = this.scrollSensitivity;
		var bounds = this.scrollBounds;
		var topCloseness, bottomCloseness;
		var leftCloseness, rightCloseness;
		var topVel = 0;
		var leftVel = 0;

		if (bounds) { // only scroll if scrollEl exists

			// compute closeness to edges. valid range is from 0.0 - 1.0
			topCloseness = (sensitivity - (ev.pageY - bounds.top)) / sensitivity;
			bottomCloseness = (sensitivity - (bounds.bottom - ev.pageY)) / sensitivity;
			leftCloseness = (sensitivity - (ev.pageX - bounds.left)) / sensitivity;
			rightCloseness = (sensitivity - (bounds.right - ev.pageX)) / sensitivity;

			// translate vertical closeness into velocity.
			// mouse must be completely in bounds for velocity to happen.
			if (topCloseness >= 0 && topCloseness <= 1) {
				topVel = topCloseness * this.scrollSpeed * -1; // negative. for scrolling up
			}
			else if (bottomCloseness >= 0 && bottomCloseness <= 1) {
				topVel = bottomCloseness * this.scrollSpeed;
			}

			// translate horizontal closeness into velocity
			if (leftCloseness >= 0 && leftCloseness <= 1) {
				leftVel = leftCloseness * this.scrollSpeed * -1; // negative. for scrolling left
			}
			else if (rightCloseness >= 0 && rightCloseness <= 1) {
				leftVel = rightCloseness * this.scrollSpeed;
			}
		}

		this.setScrollVel(topVel, leftVel);
	},


	// Sets the speed-of-scrolling for the scrollEl
	setScrollVel: function(topVel, leftVel) {

		this.scrollTopVel = topVel;
		this.scrollLeftVel = leftVel;

		this.constrainScrollVel(); // massages into realistic values

		// if there is non-zero velocity, and an animation loop hasn't already started, then START
		if ((this.scrollTopVel || this.scrollLeftVel) && !this.scrollIntervalId) {
			this.scrollIntervalId = setInterval(
				$.proxy(this, 'scrollIntervalFunc'), // scope to `this`
				this.scrollIntervalMs
			);
		}
	},


	// Forces scrollTopVel and scrollLeftVel to be zero if scrolling has already gone all the way
	constrainScrollVel: function() {
		var el = this.scrollEl;

		if (this.scrollTopVel < 0) { // scrolling up?
			if (el.scrollTop() <= 0) { // already scrolled all the way up?
				this.scrollTopVel = 0;
			}
		}
		else if (this.scrollTopVel > 0) { // scrolling down?
			if (el.scrollTop() + el[0].clientHeight >= el[0].scrollHeight) { // already scrolled all the way down?
				this.scrollTopVel = 0;
			}
		}

		if (this.scrollLeftVel < 0) { // scrolling left?
			if (el.scrollLeft() <= 0) { // already scrolled all the left?
				this.scrollLeftVel = 0;
			}
		}
		else if (this.scrollLeftVel > 0) { // scrolling right?
			if (el.scrollLeft() + el[0].clientWidth >= el[0].scrollWidth) { // already scrolled all the way right?
				this.scrollLeftVel = 0;
			}
		}
	},


	// This function gets called during every iteration of the scrolling animation loop
	scrollIntervalFunc: function() {
		var el = this.scrollEl;
		var frac = this.scrollIntervalMs / 1000; // considering animation frequency, what the vel should be mult'd by

		// change the value of scrollEl's scroll
		if (this.scrollTopVel) {
			el.scrollTop(el.scrollTop() + this.scrollTopVel * frac);
		}
		if (this.scrollLeftVel) {
			el.scrollLeft(el.scrollLeft() + this.scrollLeftVel * frac);
		}

		this.constrainScrollVel(); // since the scroll values changed, recompute the velocities

		// if scrolled all the way, which causes the vels to be zero, stop the animation loop
		if (!this.scrollTopVel && !this.scrollLeftVel) {
			this.stopScrolling();
		}
	},


	// Kills any existing scrolling animation loop
	stopScrolling: function() {
		if (this.scrollIntervalId) {
			clearInterval(this.scrollIntervalId);
			this.scrollIntervalId = null;

			// when all done with scrolling, recompute positions since they probably changed
			this.computeCoords();
		}
	},


	// Get called when the scrollEl is scrolled (NOTE: this is delayed via debounce)
	scrollHandler: function() {
		// recompute all coordinates, but *only* if this is *not* part of our scrolling animation
		if (!this.scrollIntervalId) {
			this.computeCoords();
		}
	}

};


// Returns `true` if the cells are identically equal. `false` otherwise.
// They must have the same row, col, and be from the same grid.
// Two null values will be considered equal, as two "out of the grid" states are the same.
function isCellsEqual(cell1, cell2) {

	if (!cell1 && !cell2) {
		return true;
	}

	if (cell1 && cell2) {
		return cell1.grid === cell2.grid &&
			cell1.row === cell2.row &&
			cell1.col === cell2.col;
	}

	return false;
}

;;

/* Creates a clone of an element and lets it track the mouse as it moves
----------------------------------------------------------------------------------------------------------------------*/

function MouseFollower(sourceEl, options) {
	this.options = options = options || {};
	this.sourceEl = sourceEl;
	this.parentEl = options.parentEl ? $(options.parentEl) : sourceEl.parent(); // default to sourceEl's parent
}


MouseFollower.prototype = {

	options: null,

	sourceEl: null, // the element that will be cloned and made to look like it is dragging
	el: null, // the clone of `sourceEl` that will track the mouse
	parentEl: null, // the element that `el` (the clone) will be attached to

	// the initial position of el, relative to the offset parent. made to match the initial offset of sourceEl
	top0: null,
	left0: null,

	// the initial position of the mouse
	mouseY0: null,
	mouseX0: null,

	// the number of pixels the mouse has moved from its initial position
	topDelta: null,
	leftDelta: null,

	mousemoveProxy: null, // document mousemove handler, bound to the MouseFollower's `this`

	isFollowing: false,
	isHidden: false,
	isAnimating: false, // doing the revert animation?


	// Causes the element to start following the mouse
	start: function(ev) {
		if (!this.isFollowing) {
			this.isFollowing = true;

			this.mouseY0 = ev.pageY;
			this.mouseX0 = ev.pageX;
			this.topDelta = 0;
			this.leftDelta = 0;

			if (!this.isHidden) {
				this.updatePosition();
			}

			$(document).on('mousemove', this.mousemoveProxy = $.proxy(this, 'mousemove'));
		}
	},


	// Causes the element to stop following the mouse. If shouldRevert is true, will animate back to original position.
	// `callback` gets invoked when the animation is complete. If no animation, it is invoked immediately.
	stop: function(shouldRevert, callback) {
		var _this = this;
		var revertDuration = this.options.revertDuration;

		function complete() {
			this.isAnimating = false;
			_this.destroyEl();

			this.top0 = this.left0 = null; // reset state for future updatePosition calls

			if (callback) {
				callback();
			}
		}

		if (this.isFollowing && !this.isAnimating) { // disallow more than one stop animation at a time
			this.isFollowing = false;

			$(document).off('mousemove', this.mousemoveProxy);

			if (shouldRevert && revertDuration && !this.isHidden) { // do a revert animation?
				this.isAnimating = true;
				this.el.animate({
					top: this.top0,
					left: this.left0
				}, {
					duration: revertDuration,
					complete: complete
				});
			}
			else {
				complete();
			}
		}
	},


	// Gets the tracking element. Create it if necessary
	getEl: function() {
		var el = this.el;

		if (!el) {
			this.sourceEl.width(); // hack to force IE8 to compute correct bounding box
			el = this.el = this.sourceEl.clone()
				.css({
					position: 'absolute',
					visibility: '', // in case original element was hidden (commonly through hideEvents())
					display: this.isHidden ? 'none' : '', // for when initially hidden
					margin: 0,
					right: 'auto', // erase and set width instead
					bottom: 'auto', // erase and set height instead
					width: this.sourceEl.width(), // explicit height in case there was a 'right' value
					height: this.sourceEl.height(), // explicit width in case there was a 'bottom' value
					opacity: this.options.opacity || '',
					zIndex: this.options.zIndex
				})
				.appendTo(this.parentEl);
		}

		return el;
	},


	// Removes the tracking element if it has already been created
	destroyEl: function() {
		if (this.el) {
			this.el.remove();
			this.el = null;
		}
	},


	// Update the CSS position of the tracking element
	updatePosition: function() {
		var sourceOffset;
		var origin;

		this.getEl(); // ensure this.el

		// make sure origin info was computed
		if (this.top0 === null) {
			this.sourceEl.width(); // hack to force IE8 to compute correct bounding box
			sourceOffset = this.sourceEl.offset();
			origin = this.el.offsetParent().offset();
			this.top0 = sourceOffset.top - origin.top;
			this.left0 = sourceOffset.left - origin.left;
		}

		this.el.css({
			top: this.top0 + this.topDelta,
			left: this.left0 + this.leftDelta
		});
	},


	// Gets called when the user moves the mouse
	mousemove: function(ev) {
		this.topDelta = ev.pageY - this.mouseY0;
		this.leftDelta = ev.pageX - this.mouseX0;

		if (!this.isHidden) {
			this.updatePosition();
		}
	},


	// Temporarily makes the tracking element invisible. Can be called before following starts
	hide: function() {
		if (!this.isHidden) {
			this.isHidden = true;
			if (this.el) {
				this.el.hide();
			}
		}
	},


	// Show the tracking element after it has been temporarily hidden
	show: function() {
		if (this.isHidden) {
			this.isHidden = false;
			this.updatePosition();
			this.getEl().show();
		}
	}

};

;;

/* A utility class for rendering <tr> rows.
----------------------------------------------------------------------------------------------------------------------*/
// It leverages methods of the subclass and the View to determine custom rendering behavior for each row "type"
// (such as highlight rows, day rows, helper rows, etc).

function RowRenderer(view) {
	this.view = view;
}


RowRenderer.prototype = {

	view: null, // a View object
	cellHtml: '<td/>', // plain default HTML used for a cell when no other is available


	// Renders the HTML for a row, leveraging custom cell-HTML-renderers based on the `rowType`.
	// Also applies the "intro" and "outro" cells, which are specified by the subclass and views.
	// `row` is an optional row number.
	rowHtml: function(rowType, row) {
		var view = this.view;
		var renderCell = this.getHtmlRenderer('cell', rowType);
		var cellHtml = '';
		var col;
		var date;

		row = row || 0;

		for (col = 0; col < view.colCnt; col++) {
			date = view.cellToDate(row, col);
			cellHtml += renderCell(row, col, date);
		}

		cellHtml = this.bookendCells(cellHtml, rowType, row); // apply intro and outro

		return '<tr>' + cellHtml + '</tr>';
	},


	// Applies the "intro" and "outro" HTML to the given cells.
	// Intro means the leftmost cell when the calendar is LTR and the rightmost cell when RTL. Vice-versa for outro.
	// `cells` can be an HTML string of <td>'s or a jQuery <tr> element
	// `row` is an optional row number.
	bookendCells: function(cells, rowType, row) {
		var view = this.view;
		var intro = this.getHtmlRenderer('intro', rowType)(row || 0);
		var outro = this.getHtmlRenderer('outro', rowType)(row || 0);
		var isRTL = view.opt('isRTL');
		var prependHtml = isRTL ? outro : intro;
		var appendHtml = isRTL ? intro : outro;

		if (typeof cells === 'string') {
			return prependHtml + cells + appendHtml;
		}
		else { // a jQuery <tr> element
			return cells.prepend(prependHtml).append(appendHtml);
		}
	},


	// Returns an HTML-rendering function given a specific `rendererName` (like cell, intro, or outro) and a specific
	// `rowType` (like day, eventSkeleton, helperSkeleton), which is optional.
	// If a renderer for the specific rowType doesn't exist, it will fall back to a generic renderer.
	// We will query the View object first for any custom rendering functions, then the methods of the subclass.
	getHtmlRenderer: function(rendererName, rowType) {
		var view = this.view;
		var generalName; // like "cellHtml"
		var specificName; // like "dayCellHtml". based on rowType
		var provider; // either the View or the RowRenderer subclass, whichever provided the method
		var renderer;

		generalName = rendererName + 'Html';
		if (rowType) {
			specificName = rowType + capitaliseFirstLetter(rendererName) + 'Html';
		}

		if (specificName && (renderer = view[specificName])) {
			provider = view;
		}
		else if (specificName && (renderer = this[specificName])) {
			provider = this;
		}
		else if ((renderer = view[generalName])) {
			provider = view;
		}
		else if ((renderer = this[generalName])) {
			provider = this;
		}

		if (typeof renderer === 'function') {
			return function() {
				return renderer.apply(provider, arguments) || ''; // use correct `this` and always return a string
			};
		}

		// the rendered can be a plain string as well. if not specified, always an empty string.
		return function() {
			return renderer || '';
		};
	}

};

;;

/* An abstract class comprised of a "grid" of cells that each represent a specific datetime
----------------------------------------------------------------------------------------------------------------------*/

function Grid(view) {
	RowRenderer.call(this, view); // call the super-constructor
	this.coordMap = new GridCoordMap(this);
	this.elsByFill = {};
}


Grid.prototype = createObject(RowRenderer.prototype); // declare the super-class
$.extend(Grid.prototype, {

	el: null, // the containing element
	coordMap: null, // a GridCoordMap that converts pixel values to datetimes
	cellDuration: null, // a cell's duration. subclasses must assign this ASAP
	elsByFill: null, // a hash of jQuery element sets used for rendering each fill. Keyed by fill name.


	// Renders the grid into the `el` element.
	// Subclasses should override and call this super-method when done.
	render: function() {
		this.bindHandlers();
	},


	// Called when the grid's resources need to be cleaned up
	destroy: function() {
		// subclasses can implement
	},


	/* Coordinates & Cells
	------------------------------------------------------------------------------------------------------------------*/


	// Populates the given empty arrays with the y and x coordinates of the cells
	buildCoords: function(rows, cols) {
		// subclasses must implement
	},


	// Given a cell object, returns the date for that cell
	getCellDate: function(cell) {
		// subclasses must implement
	},


	// Given a cell object, returns the element that represents the cell's whole-day
	getCellDayEl: function(cell) {
		// subclasses must implement
	},


	// Converts a range with an inclusive `start` and an exclusive `end` into an array of segment objects
	rangeToSegs: function(start, end) {
		// subclasses must implement
	},


	/* Handlers
	------------------------------------------------------------------------------------------------------------------*/


	// Attach handlers to `this.el`, using bubbling to listen to all ancestors.
	// We don't need to undo any of this in a "destroy" method, because the view will simply remove `this.el` from the
	// DOM and jQuery will be smart enough to garbage collect the handlers.
	bindHandlers: function() {
		var _this = this;

		this.el.on('mousedown', function(ev) {
			if (
				!$(ev.target).is('.fc-event-container *, .fc-more') && // not an an event element, or "more.." link
				!$(ev.target).closest('.fc-popover').length // not on a popover (like the "more.." events one)
			) {
				_this.dayMousedown(ev);
			}
		});

		this.bindSegHandlers(); // attach event-element-related handlers. in Grid.events.js
	},


	// Process a mousedown on an element that represents a day. For day clicking and selecting.
	dayMousedown: function(ev) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var isSelectable = view.opt('selectable');
		var dates = null; // the inclusive dates of the selection. will be null if no selection
		var start; // the inclusive start of the selection
		var end; // the *exclusive* end of the selection
		var dayEl;

		// this listener tracks a mousedown on a day element, and a subsequent drag.
		// if the drag ends on the same day, it is a 'dayClick'.
		// if 'selectable' is enabled, this listener also detects selections.
		var dragListener = new DragListener(this.coordMap, {
			//distance: 5, // needs more work if we want dayClick to fire correctly
			scroll: view.opt('dragScroll'),
			dragStart: function() {
				view.unselect(); // since we could be rendering a new selection, we want to clear any old one
			},
			cellOver: function(cell, date) {
				if (dragListener.origDate) { // click needs to have started on a cell

					dayEl = _this.getCellDayEl(cell);

					dates = [ date, dragListener.origDate ].sort(dateCompare);
					start = dates[0];
					end = dates[1].clone().add(_this.cellDuration);

					if (isSelectable) {
						if (calendar.isSelectionAllowedInRange(start, end)) { // allowed to select within this range?
							_this.renderSelection(start, end);
						}
						else {
							dates = null; // flag for an invalid selection
							disableCursor();
						}
					}
				}
			},
			cellOut: function(cell, date) {
				dates = null;
				_this.destroySelection();
				enableCursor();
			},
			listenStop: function(ev) {
				if (dates) { // started and ended on a cell?
					if (dates[0].isSame(dates[1])) {
						view.trigger('dayClick', dayEl[0], start, ev);
					}
					if (isSelectable) {
						// the selection will already have been rendered. just report it
						view.reportSelection(start, end, ev);
					}
				}
				enableCursor();
			}
		});

		dragListener.mousedown(ev); // start listening, which will eventually initiate a dragStart
	},


	/* Event Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a event being dragged over the given date(s).
	// `end` can be null, as well as `seg`. See View's documentation on renderDrag for more info.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		// subclasses must implement
	},


	// Unrenders a visual indication of an event being dragged
	destroyDrag: function() {
		// subclasses must implement
	},


	/* Event Resizing
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized.
	// `start` and `end` are the updated dates of the event. `seg` is the original segment object involved in the drag.
	renderResize: function(start, end, seg) {
		// subclasses must implement
	},


	// Unrenders a visual indication of an event being resized.
	destroyResize: function() {
		// subclasses must implement
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock event over the given date(s).
	// `end` can be null, in which case the mock event that is rendered will have a null end time.
	// `sourceSeg` is the internal segment object involved in the drag. If null, something external is dragging.
	renderRangeHelper: function(start, end, sourceSeg) {
		var view = this.view;
		var fakeEvent;

		// compute the end time if forced to do so (this is what EventManager does)
		if (!end && view.opt('forceEventDuration')) {
			end = view.calendar.getDefaultEventEnd(!start.hasTime(), start);
		}

		fakeEvent = sourceSeg ? createObject(sourceSeg.event) : {}; // mask the original event object if possible
		fakeEvent.start = start;
		fakeEvent.end = end;
		fakeEvent.allDay = !(start.hasTime() || (end && end.hasTime())); // freshly compute allDay

		// this extra className will be useful for differentiating real events from mock events in CSS
		fakeEvent.className = (fakeEvent.className || []).concat('fc-helper');

		// if something external is being dragged in, don't render a resizer
		if (!sourceSeg) {
			fakeEvent.editable = false;
		}

		this.renderHelper(fakeEvent, sourceSeg); // do the actual rendering
	},


	// Renders a mock event
	renderHelper: function(event, sourceSeg) {
		// subclasses must implement
	},


	// Unrenders a mock event
	destroyHelper: function() {
		// subclasses must implement
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection. Will highlight by default but can be overridden by subclasses.
	renderSelection: function(start, end) {
		this.renderHighlight(start, end);
	},


	// Unrenders any visual indications of a selection. Will unrender a highlight by default.
	destroySelection: function() {
		this.destroyHighlight();
	},


	/* Highlight
	------------------------------------------------------------------------------------------------------------------*/


	// Renders an emphasis on the given date range. `start` is inclusive. `end` is exclusive.
	renderHighlight: function(start, end) {
		this.renderFill('highlight', this.rangeToSegs(start, end));
	},


	// Unrenders the emphasis on a date range
	destroyHighlight: function() {
		this.destroyFill('highlight');
	},


	// Generates an array of classNames for rendering the highlight. Used by the fill system.
	highlightSegClasses: function() {
		return [ 'fc-highlight' ];
	},


	/* Fill System (highlight, background events, business hours)
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a set of rectangles over the given segments of time.
	// Returns a subset of segs, the segs that were actually rendered.
	// Responsible for populating this.elsByFill
	renderFill: function(type, segs) {
		// subclasses must implement
	},


	// Unrenders a specific type of fill that is currently rendered on the grid
	destroyFill: function(type) {
		var el = this.elsByFill[type];

		if (el) {
			el.remove();
			delete this.elsByFill[type];
		}
	},


	// Renders and assigns an `el` property for each fill segment. Generic enough to work with different types.
	// Only returns segments that successfully rendered.
	// To be harnessed by renderFill (implemented by subclasses).
	// Analagous to renderFgSegEls.
	renderFillSegEls: function(type, segs) {
		var _this = this;
		var segElMethod = this[type + 'SegEl'];
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) {

			// build a large concatenation of segment HTML
			for (i = 0; i < segs.length; i++) {
				html += this.fillSegHtml(type, segs[i]);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = $(node);

				// allow custom filter methods per-type
				if (segElMethod) {
					el = segElMethod.call(_this, seg, el);
				}

				if (el) { // custom filters did not cancel the render
					el = $(el); // allow custom filter to return raw DOM node

					// correct element type? (would be bad if a non-TD were inserted into a table for example)
					if (el.is(_this.fillSegTag)) {
						seg.el = el;
						renderedSegs.push(seg);
					}
				}
			});
		}

		return renderedSegs;
	},


	fillSegTag: 'div', // subclasses can override


	// Builds the HTML needed for one fill segment. Generic enought o work with different types.
	fillSegHtml: function(type, seg) {
		var classesMethod = this[type + 'SegClasses']; // custom hooks per-type
		var stylesMethod = this[type + 'SegStyles']; //
		var classes = classesMethod ? classesMethod.call(this, seg) : [];
		var styles = stylesMethod ? stylesMethod.call(this, seg) : ''; // a semi-colon separated CSS property string

		return '<' + this.fillSegTag +
			(classes.length ? ' class="' + classes.join(' ') + '"' : '') +
			(styles ? ' style="' + styles + '"' : '') +
			' />';
	},


	/* Generic rendering utilities for subclasses
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a day-of-week header row
	headHtml: function() {
		return '' +
			'<div class="fc-row ' + this.view.widgetHeaderClass + '">' +
				'<table>' +
					'<thead>' +
						this.rowHtml('head') + // leverages RowRenderer
					'</thead>' +
				'</table>' +
			'</div>';
	},


	// Used by the `headHtml` method, via RowRenderer, for rendering the HTML of a day-of-week header cell
	headCellHtml: function(row, col, date) {
		var view = this.view;
		var calendar = view.calendar;
		var colFormat = view.opt('columnFormat');

		return '' +
			'<th class="fc-day-header ' + view.widgetHeaderClass + ' fc-' + dayIDs[date.day()] + '">' +
				htmlEscape(calendar.formatDate(date, colFormat)) +
			'</th>';
	},


	// Renders the HTML for a single-day background cell
	bgCellHtml: function(row, col, date) {
		var view = this.view;
		var classes = this.getDayClasses(date);

		classes.unshift('fc-day', view.widgetContentClass);

		return '<td class="' + classes.join(' ') + '" data-date="' + date.format() + '"></td>';
	},


	// Computes HTML classNames for a single-day cell
	getDayClasses: function(date) {
		var view = this.view;
		var today = view.calendar.getNow().stripTime();
		var classes = [ 'fc-' + dayIDs[date.day()] ];

		if (
			view.name === 'month' &&
			date.month() != view.intervalStart.month()
		) {
			classes.push('fc-other-month');
		}

		if (date.isSame(today, 'day')) {
			classes.push(
				'fc-today',
				view.highlightStateClass
			);
		}
		else if (date < today) {
			classes.push('fc-past');
		}
		else {
			classes.push('fc-future');
		}

		return classes;
	}

});

;;

/* Event-rendering and event-interaction methods for the abstract Grid class
----------------------------------------------------------------------------------------------------------------------*/

$.extend(Grid.prototype, {

	mousedOverSeg: null, // the segment object the user's mouse is over. null if over nothing
	isDraggingSeg: false, // is a segment being dragged? boolean
	isResizingSeg: false, // is a segment being resized? boolean
	segs: null, // the event segments currently rendered in the grid


	// Renders the given events onto the grid
	renderEvents: function(events) {
		var segs = this.eventsToSegs(events);
		var bgSegs = [];
		var fgSegs = [];
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			if (isBgEvent(seg.event)) {
				bgSegs.push(seg);
			}
			else {
				fgSegs.push(seg);
			}
		}

		// Render each different type of segment.
		// Each function may return a subset of the segs, segs that were actually rendered.
		bgSegs = this.renderBgSegs(bgSegs) || bgSegs;
		fgSegs = this.renderFgSegs(fgSegs) || fgSegs;

		this.segs = bgSegs.concat(fgSegs);
	},


	// Unrenders all events currently rendered on the grid
	destroyEvents: function() {
		this.triggerSegMouseout(); // trigger an eventMouseout if user's mouse is over an event

		this.destroyFgSegs();
		this.destroyBgSegs();

		this.segs = null;
	},


	// Retrieves all rendered segment objects currently rendered on the grid
	getSegs: function() {
		return this.segs || [];
	},


	/* Foreground Segment Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Renders foreground event segments onto the grid. May return a subset of segs that were rendered.
	renderFgSegs: function(segs) {
		// subclasses must implement
	},


	// Unrenders all currently rendered foreground segments
	destroyFgSegs: function() {
		// subclasses must implement
	},


	// Renders and assigns an `el` property for each foreground event segment.
	// Only returns segments that successfully rendered.
	// A utility that subclasses may use.
	renderFgSegEls: function(segs, disableResizing) {
		var view = this.view;
		var html = '';
		var renderedSegs = [];
		var i;

		if (segs.length) { // don't build an empty html string

			// build a large concatenation of event segment HTML
			for (i = 0; i < segs.length; i++) {
				html += this.fgSegHtml(segs[i], disableResizing);
			}

			// Grab individual elements from the combined HTML string. Use each as the default rendering.
			// Then, compute the 'el' for each segment. An el might be null if the eventRender callback returned false.
			$(html).each(function(i, node) {
				var seg = segs[i];
				var el = view.resolveEventEl(seg.event, $(node));

				if (el) {
					el.data('fc-seg', seg); // used by handlers
					seg.el = el;
					renderedSegs.push(seg);
				}
			});
		}

		return renderedSegs;
	},


	// Generates the HTML for the default rendering of a foreground event segment. Used by renderFgSegEls()
	fgSegHtml: function(seg, disableResizing) {
		// subclasses should implement
	},


	/* Background Segment Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the given background event segments onto the grid.
	// Returns a subset of the segs that were actually rendered.
	renderBgSegs: function(segs) {
		return this.renderFill('bgEvent', segs);
	},


	// Unrenders all the currently rendered background event segments
	destroyBgSegs: function() {
		this.destroyFill('bgEvent');
	},


	// Renders a background event element, given the default rendering. Called by the fill system.
	bgEventSegEl: function(seg, el) {
		return this.view.resolveEventEl(seg.event, el); // will filter through eventRender
	},


	// Generates an array of classNames to be used for the default rendering of a background event.
	// Called by the fill system.
	bgEventSegClasses: function(seg) {
		var event = seg.event;
		var source = event.source || {};

		return [ 'fc-bgevent' ].concat(
			event.className,
			source.className || []
		);
	},


	// Generates a semicolon-separated CSS string to be used for the default rendering of a background event.
	// Called by the fill system.
	// TODO: consolidate with getEventSkinCss?
	bgEventSegStyles: function(seg) {
		var view = this.view;
		var event = seg.event;
		var source = event.source || {};
		var eventColor = event.color;
		var sourceColor = source.color;
		var optionColor = view.opt('eventColor');
		var backgroundColor =
			event.backgroundColor ||
			eventColor ||
			source.backgroundColor ||
			sourceColor ||
			view.opt('eventBackgroundColor') ||
			optionColor;

		if (backgroundColor) {
			return 'background-color:' + backgroundColor;
		}

		return '';
	},


	// Generates an array of classNames to be used for the rendering business hours overlay. Called by the fill system.
	businessHoursSegClasses: function(seg) {
		return [ 'fc-nonbusiness', 'fc-bgevent' ];
	},


	/* Handlers
	------------------------------------------------------------------------------------------------------------------*/


	// Attaches event-element-related handlers to the container element and leverage bubbling
	bindSegHandlers: function() {
		var _this = this;
		var view = this.view;

		$.each(
			{
				mouseenter: function(seg, ev) {
					_this.triggerSegMouseover(seg, ev);
				},
				mouseleave: function(seg, ev) {
					_this.triggerSegMouseout(seg, ev);
				},
				click: function(seg, ev) {
					return view.trigger('eventClick', this, seg.event, ev); // can return `false` to cancel
				},
				mousedown: function(seg, ev) {
					if ($(ev.target).is('.fc-resizer') && view.isEventResizable(seg.event)) {
						_this.segResizeMousedown(seg, ev);
					}
					else if (view.isEventDraggable(seg.event)) {
						_this.segDragMousedown(seg, ev);
					}
				}
			},
			function(name, func) {
				// attach the handler to the container element and only listen for real event elements via bubbling
				_this.el.on(name, '.fc-event-container > *', function(ev) {
					var seg = $(this).data('fc-seg'); // grab segment data. put there by View::renderEvents

					// only call the handlers if there is not a drag/resize in progress
					if (seg && !_this.isDraggingSeg && !_this.isResizingSeg) {
						return func.call(this, seg, ev); // `this` will be the event element
					}
				});
			}
		);
	},


	// Updates internal state and triggers handlers for when an event element is moused over
	triggerSegMouseover: function(seg, ev) {
		if (!this.mousedOverSeg) {
			this.mousedOverSeg = seg;
			this.view.trigger('eventMouseover', seg.el[0], seg.event, ev);
		}
	},


	// Updates internal state and triggers handlers for when an event element is moused out.
	// Can be given no arguments, in which case it will mouseout the segment that was previously moused over.
	triggerSegMouseout: function(seg, ev) {
		ev = ev || {}; // if given no args, make a mock mouse event

		if (this.mousedOverSeg) {
			seg = seg || this.mousedOverSeg; // if given no args, use the currently moused-over segment
			this.mousedOverSeg = null;
			this.view.trigger('eventMouseout', seg.el[0], seg.event, ev);
		}
	},


	/* Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Called when the user does a mousedown on an event, which might lead to dragging.
	// Generic enough to work with any type of Grid.
	segDragMousedown: function(seg, ev) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var el = seg.el;
		var event = seg.event;
		var newStart, newEnd;

		// A clone of the original element that will move with the mouse
		var mouseFollower = new MouseFollower(seg.el, {
			parentEl: view.el,
			opacity: view.opt('dragOpacity'),
			revertDuration: view.opt('dragRevertDuration'),
			zIndex: 2 // one above the .fc-view
		});

		// Tracks mouse movement over the *view's* coordinate map. Allows dragging and dropping between subcomponents
		// of the view.
		var dragListener = new DragListener(view.coordMap, {
			distance: 5,
			scroll: view.opt('dragScroll'),
			listenStart: function(ev) {
				mouseFollower.hide(); // don't show until we know this is a real drag
				mouseFollower.start(ev);
			},
			dragStart: function(ev) {
				_this.triggerSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
				_this.isDraggingSeg = true;
				view.hideEvent(event); // hide all event segments. our mouseFollower will take over
				view.trigger('eventDragStart', el[0], event, ev, {}); // last argument is jqui dummy
			},
			cellOver: function(cell, date) {
				var origDate = seg.cellDate || dragListener.origDate;
				var res = _this.computeDraggedEventDates(seg, origDate, date);
				newStart = res.start;
				newEnd = res.end;

				if (calendar.isEventAllowedInRange(event, newStart, res.visibleEnd)) { // allowed to drop here?
					if (view.renderDrag(newStart, newEnd, seg)) { // have the view render a visual indication
						mouseFollower.hide(); // if the view is already using a mock event "helper", hide our own
					}
					else {
						mouseFollower.show();
					}
				}
				else {
					// have the helper follow the mouse (no snapping) with a warning-style cursor
					newStart = null; // mark an invalid drop date
					mouseFollower.show();
					disableCursor();
				}
			},
			cellOut: function() { // called before mouse moves to a different cell OR moved out of all cells
				newStart = null;
				view.destroyDrag(); // unrender whatever was done in view.renderDrag
				mouseFollower.show(); // show in case we are moving out of all cells
				enableCursor();
			},
			dragStop: function(ev) {
				var hasChanged = newStart && !newStart.isSame(event.start);

				// do revert animation if hasn't changed. calls a callback when finished (whether animation or not)
				mouseFollower.stop(!hasChanged, function() {
					_this.isDraggingSeg = false;
					view.destroyDrag();
					view.showEvent(event);
					view.trigger('eventDragStop', el[0], event, ev, {}); // last argument is jqui dummy

					if (hasChanged) {
						view.eventDrop(el[0], event, newStart, ev); // will rerender all events...
					}
				});

				enableCursor();
			},
			listenStop: function() {
				mouseFollower.stop(); // put in listenStop in case there was a mousedown but the drag never started
			}
		});

		dragListener.mousedown(ev); // start listening, which will eventually lead to a dragStart
	},


	// Given a segment, the dates where a drag began and ended, calculates the Event Object's new start and end dates.
	// Might return a `null` end (even when forceEventDuration is on).
	computeDraggedEventDates: function(seg, dragStartDate, dropDate) {
		var view = this.view;
		var event = seg.event;
		var start = event.start;
		var end = view.calendar.getEventEnd(event);
		var delta;
		var newStart;
		var newEnd;
		var newAllDay;
		var visibleEnd;

		if (dropDate.hasTime() === dragStartDate.hasTime()) {
			delta = dayishDiff(dropDate, dragStartDate);
			newStart = start.clone().add(delta);
			if (event.end === null) { // do we need to compute an end?
				newEnd = null;
			}
			else {
				newEnd = end.clone().add(delta);
			}
			newAllDay = event.allDay; // keep it the same
		}
		else {
			// if switching from day <-> timed, start should be reset to the dropped date, and the end cleared
			newStart = dropDate;
			newEnd = null; // end should be cleared
			newAllDay = !dropDate.hasTime();
		}

		// compute what the end date will appear to be
		visibleEnd = newEnd || view.calendar.getDefaultEventEnd(newAllDay, newStart);

		return { start: newStart, end: newEnd, visibleEnd: visibleEnd };
	},


	/* Resizing
	------------------------------------------------------------------------------------------------------------------*/


	// Called when the user does a mousedown on an event's resizer, which might lead to resizing.
	// Generic enough to work with any type of Grid.
	segResizeMousedown: function(seg, ev) {
		var _this = this;
		var view = this.view;
		var calendar = view.calendar;
		var el = seg.el;
		var event = seg.event;
		var start = event.start;
		var end = view.calendar.getEventEnd(event);
		var newEnd = null;
		var dragListener;

		function destroy() { // resets the rendering to show the original event
			_this.destroyResize();
			view.showEvent(event);
		}

		// Tracks mouse movement over the *grid's* coordinate map
		dragListener = new DragListener(this.coordMap, {
			distance: 5,
			scroll: view.opt('dragScroll'),
			dragStart: function(ev) {
				_this.triggerSegMouseout(seg, ev); // ensure a mouseout on the manipulated event has been reported
				_this.isResizingSeg = true;
				view.trigger('eventResizeStart', el[0], event, ev, {}); // last argument is jqui dummy
			},
			cellOver: function(cell, date) {
				// compute the new end. don't allow it to go before the event's start
				if (date.isBefore(start)) { // allows comparing ambig to non-ambig
					date = start;
				}
				newEnd = date.clone().add(_this.cellDuration); // make it an exclusive end

				if (calendar.isEventAllowedInRange(event, start, newEnd)) { // allowed to be resized here?
					if (newEnd.isSame(end)) {
						newEnd = null; // mark an invalid resize
						destroy();
					}
					else {
						_this.renderResize(start, newEnd, seg);
						view.hideEvent(event);
					}
				}
				else {
					newEnd = null; // mark an invalid resize
					destroy();
					disableCursor();
				}
			},
			cellOut: function() { // called before mouse moves to a different cell OR moved out of all cells
				newEnd = null;
				destroy();
				enableCursor();
			},
			dragStop: function(ev) {
				_this.isResizingSeg = false;
				destroy();
				enableCursor();
				view.trigger('eventResizeStop', el[0], event, ev, {}); // last argument is jqui dummy

				if (newEnd) {
					view.eventResize(el[0], event, newEnd, ev); // will rerender all events...
				}
			}
		});

		dragListener.mousedown(ev); // start listening, which will eventually lead to a dragStart
	},


	/* Rendering Utils
	------------------------------------------------------------------------------------------------------------------*/


	// Generic utility for generating the HTML classNames for an event segment's element
	getSegClasses: function(seg, isDraggable, isResizable) {
		var event = seg.event;
		var classes = [
			'fc-event',
			seg.isStart ? 'fc-start' : 'fc-not-start',
			seg.isEnd ? 'fc-end' : 'fc-not-end'
		].concat(
			event.className,
			event.source ? event.source.className : []
		);

		if (isDraggable) {
			classes.push('fc-draggable');
		}
		if (isResizable) {
			classes.push('fc-resizable');
		}

		return classes;
	},


	// Utility for generating a CSS string with all the event skin-related properties
	getEventSkinCss: function(event) {
		var view = this.view;
		var source = event.source || {};
		var eventColor = event.color;
		var sourceColor = source.color;
		var optionColor = view.opt('eventColor');
		var backgroundColor =
			event.backgroundColor ||
			eventColor ||
			source.backgroundColor ||
			sourceColor ||
			view.opt('eventBackgroundColor') ||
			optionColor;
		var borderColor =
			event.borderColor ||
			eventColor ||
			source.borderColor ||
			sourceColor ||
			view.opt('eventBorderColor') ||
			optionColor;
		var textColor =
			event.textColor ||
			source.textColor ||
			view.opt('eventTextColor');
		var statements = [];
		if (backgroundColor) {
			statements.push('background-color:' + backgroundColor);
		}
		if (borderColor) {
			statements.push('border-color:' + borderColor);
		}
		if (textColor) {
			statements.push('color:' + textColor);
		}
		return statements.join(';');
	},


	/* Converting events -> ranges -> segs
	------------------------------------------------------------------------------------------------------------------*/


	// Converts an array of event objects into an array of event segment objects.
	// A custom `rangeToSegsFunc` may be given for arbitrarily slicing up events.
	eventsToSegs: function(events, rangeToSegsFunc) {
		var eventRanges = this.eventsToRanges(events);
		var segs = [];
		var i;

		for (i = 0; i < eventRanges.length; i++) {
			segs.push.apply(
				segs,
				this.eventRangeToSegs(eventRanges[i], rangeToSegsFunc)
			);
		}

		return segs;
	},


	// Converts an array of events into an array of "range" objects.
	// A "range" object is a plain object with start/end properties denoting the time it covers. Also an event property.
	// For "normal" events, this will be identical to the event's start/end, but for "inverse-background" events,
	// will create an array of ranges that span the time *not* covered by the given event.
	eventsToRanges: function(events) {
		var _this = this;
		var eventsById = groupEventsById(events);
		var ranges = [];

		// group by ID so that related inverse-background events can be rendered together
		$.each(eventsById, function(id, eventGroup) {
			if (eventGroup.length) {
				ranges.push.apply(
					ranges,
					isInverseBgEvent(eventGroup[0]) ?
						_this.eventsToInverseRanges(eventGroup) :
						_this.eventsToNormalRanges(eventGroup)
				);
			}
		});

		return ranges;
	},


	// Converts an array of "normal" events (not inverted rendering) into a parallel array of ranges
	eventsToNormalRanges: function(events) {
		var calendar = this.view.calendar;
		var ranges = [];
		var i, event;
		var eventStart, eventEnd;

		for (i = 0; i < events.length; i++) {
			event = events[i];

			// make copies and normalize by stripping timezone
			eventStart = event.start.clone().stripZone();
			eventEnd = calendar.getEventEnd(event).stripZone();

			ranges.push({
				event: event,
				start: eventStart,
				end: eventEnd,
				eventStartMS: +eventStart,
				eventDurationMS: eventEnd - eventStart
			});
		}

		return ranges;
	},


	// Converts an array of events, with inverse-background rendering, into an array of range objects.
	// The range objects will cover all the time NOT covered by the events.
	eventsToInverseRanges: function(events) {
		var view = this.view;
		var viewStart = view.start.clone().stripZone(); // normalize timezone
		var viewEnd = view.end.clone().stripZone(); // normalize timezone
		var normalRanges = this.eventsToNormalRanges(events); // will give us normalized dates we can use w/o copies
		var inverseRanges = [];
		var event0 = events[0]; // assign this to each range's `.event`
		var start = viewStart; // the end of the previous range. the start of the new range
		var i, normalRange;

		// ranges need to be in order. required for our date-walking algorithm
		normalRanges.sort(compareNormalRanges);

		for (i = 0; i < normalRanges.length; i++) {
			normalRange = normalRanges[i];

			// add the span of time before the event (if there is any)
			if (normalRange.start > start) { // compare millisecond time (skip any ambig logic)
				inverseRanges.push({
					event: event0,
					start: start,
					end: normalRange.start
				});
			}

			start = normalRange.end;
		}

		// add the span of time after the last event (if there is any)
		if (start < viewEnd) { // compare millisecond time (skip any ambig logic)
			inverseRanges.push({
				event: event0,
				start: start,
				end: viewEnd
			});
		}

		return inverseRanges;
	},


	// Slices the given event range into one or more segment objects.
	// A `rangeToSegsFunc` custom slicing function can be given.
	eventRangeToSegs: function(eventRange, rangeToSegsFunc) {
		var segs;
		var i, seg;

		if (rangeToSegsFunc) {
			segs = rangeToSegsFunc(eventRange.start, eventRange.end);
		}
		else {
			segs = this.rangeToSegs(eventRange.start, eventRange.end); // defined by the subclass
		}

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.event = eventRange.event;
			seg.eventStartMS = eventRange.eventStartMS;
			seg.eventDurationMS = eventRange.eventDurationMS;
		}

		return segs;
	}

});


/* Utilities
----------------------------------------------------------------------------------------------------------------------*/


function isBgEvent(event) { // returns true if background OR inverse-background
	var rendering = getEventRendering(event);
	return rendering === 'background' || rendering === 'inverse-background';
}


function isInverseBgEvent(event) {
	return getEventRendering(event) === 'inverse-background';
}


function getEventRendering(event) {
	return firstDefined((event.source || {}).rendering, event.rendering);
}


function groupEventsById(events) {
	var eventsById = {};
	var i, event;

	for (i = 0; i < events.length; i++) {
		event = events[i];
		(eventsById[event._id] || (eventsById[event._id] = [])).push(event);
	}

	return eventsById;
}


// A cmp function for determining which non-inverted "ranges" (see above) happen earlier
function compareNormalRanges(range1, range2) {
	return range1.eventStartMS - range2.eventStartMS; // earlier ranges go first
}


// A cmp function for determining which segments should take visual priority
// DOES NOT WORK ON INVERTED BACKGROUND EVENTS because they have no eventStartMS/eventDurationMS
function compareSegs(seg1, seg2) {
	return seg1.eventStartMS - seg2.eventStartMS || // earlier events go first
		seg2.eventDurationMS - seg1.eventDurationMS || // tie? longer events go first
		seg2.event.allDay - seg1.event.allDay || // tie? put all-day events first (booleans cast to 0/1)
		(seg1.event.title || '').localeCompare(seg2.event.title); // tie? alphabetically by title
}


;;

/* A component that renders a grid of whole-days that runs horizontally. There can be multiple rows, one per week.
----------------------------------------------------------------------------------------------------------------------*/

function DayGrid(view) {
	Grid.call(this, view); // call the super-constructor
}


DayGrid.prototype = createObject(Grid.prototype); // declare the super-class
$.extend(DayGrid.prototype, {

	numbersVisible: false, // should render a row for day/week numbers? manually set by the view
	cellDuration: moment.duration({ days: 1 }), // required for Grid.event.js. Each cell is always a single day
	bottomCoordPadding: 0, // hack for extending the hit area for the last row of the coordinate grid

	rowEls: null, // set of fake row elements
	dayEls: null, // set of whole-day elements comprising the row's background
	helperEls: null, // set of cell skeleton elements for rendering the mock event "helper"


	// Renders the rows and columns into the component's `this.el`, which should already be assigned.
	// isRigid determins whether the individual rows should ignore the contents and be a constant height.
	// Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
	render: function(isRigid) {
		var view = this.view;
		var html = '';
		var row;

		for (row = 0; row < view.rowCnt; row++) {
			html += this.dayRowHtml(row, isRigid);
		}
		this.el.html(html);

		this.rowEls = this.el.find('.fc-row');
		this.dayEls = this.el.find('.fc-day');

		// run all the day cells through the dayRender callback
		this.dayEls.each(function(i, node) {
			var date = view.cellToDate(Math.floor(i / view.colCnt), i % view.colCnt);
			view.trigger('dayRender', null, date, $(node));
		});

		Grid.prototype.render.call(this); // call the super-method
	},


	destroy: function() {
		this.destroySegPopover();
	},


	// Generates the HTML for a single row. `row` is the row number.
	dayRowHtml: function(row, isRigid) {
		var view = this.view;
		var classes = [ 'fc-row', 'fc-week', view.widgetContentClass ];

		if (isRigid) {
			classes.push('fc-rigid');
		}

		return '' +
			'<div class="' + classes.join(' ') + '">' +
				'<div class="fc-bg">' +
					'<table>' +
						this.rowHtml('day', row) + // leverages RowRenderer. calls dayCellHtml()
					'</table>' +
				'</div>' +
				'<div class="fc-content-skeleton">' +
					'<table>' +
						(this.numbersVisible ?
							'<thead>' +
								this.rowHtml('number', row) + // leverages RowRenderer. View will define render method
							'</thead>' :
							''
							) +
					'</table>' +
				'</div>' +
			'</div>';
	},


	// Renders the HTML for a whole-day cell. Will eventually end up in the day-row's background.
	// We go through a 'day' row type instead of just doing a 'bg' row type so that the View can do custom rendering
	// specifically for whole-day rows, whereas a 'bg' might also be used for other purposes (TimeGrid bg for example).
	dayCellHtml: function(row, col, date) {
		return this.bgCellHtml(row, col, date);
	},


	/* Coordinates & Cells
	------------------------------------------------------------------------------------------------------------------*/


	// Populates the empty `rows` and `cols` arrays with coordinates of the cells. For CoordGrid.
	buildCoords: function(rows, cols) {
		var colCnt = this.view.colCnt;
		var e, n, p;

		this.dayEls.slice(0, colCnt).each(function(i, _e) { // iterate the first row of day elements
			e = $(_e);
			n = e.offset().left;
			if (i) {
				p[1] = n;
			}
			p = [ n ];
			cols[i] = p;
		});
		p[1] = n + e.outerWidth();

		this.rowEls.each(function(i, _e) {
			e = $(_e);
			n = e.offset().top;
			if (i) {
				p[1] = n;
			}
			p = [ n ];
			rows[i] = p;
		});
		p[1] = n + e.outerHeight() + this.bottomCoordPadding; // hack to extend hit area of last row
	},


	// Converts a cell to a date
	getCellDate: function(cell) {
		return this.view.cellToDate(cell); // leverages the View's cell system
	},


	// Gets the whole-day element associated with the cell
	getCellDayEl: function(cell) {
		return this.dayEls.eq(cell.row * this.view.colCnt + cell.col);
	},


	// Converts a range with an inclusive `start` and an exclusive `end` into an array of segment objects
	rangeToSegs: function(start, end) {
		return this.view.rangeToSegments(start, end); // leverages the View's cell system
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event hovering over the given date(s).
	// `end` can be null, as well as `seg`. See View's documentation on renderDrag for more info.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		var opacity;

		// always render a highlight underneath
		this.renderHighlight(
			start,
			end || this.view.calendar.getDefaultEventEnd(true, start)
		);

		// if a segment from the same calendar but another component is being dragged, render a helper event
		if (seg && !seg.el.closest(this.el).length) {

			this.renderRangeHelper(start, end, seg);

			opacity = this.view.opt('dragOpacity');
			if (opacity !== undefined) {
				this.helperEls.css('opacity', opacity);
			}

			return true; // a helper has been rendered
		}
	},


	// Unrenders any visual indication of a hovering event
	destroyDrag: function() {
		this.destroyHighlight();
		this.destroyHelper();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderResize: function(start, end, seg) {
		this.renderHighlight(start, end);
		this.renderRangeHelper(start, end, seg);
	},


	// Unrenders a visual indication of an event being resized
	destroyResize: function() {
		this.destroyHighlight();
		this.destroyHelper();
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock "helper" event. `sourceSeg` is the associated internal segment object. It can be null.
	renderHelper: function(event, sourceSeg) {
		var helperNodes = [];
		var segs = this.eventsToSegs([ event ]);
		var rowStructs;

		segs = this.renderFgSegEls(segs); // assigns each seg's el and returns a subset of segs that were rendered
		rowStructs = this.renderSegRows(segs);

		// inject each new event skeleton into each associated row
		this.rowEls.each(function(row, rowNode) {
			var rowEl = $(rowNode); // the .fc-row
			var skeletonEl = $('<div class="fc-helper-skeleton"><table/></div>'); // will be absolutely positioned
			var skeletonTop;

			// If there is an original segment, match the top position. Otherwise, put it at the row's top level
			if (sourceSeg && sourceSeg.row === row) {
				skeletonTop = sourceSeg.el.position().top;
			}
			else {
				skeletonTop = rowEl.find('.fc-content-skeleton tbody').position().top;
			}

			skeletonEl.css('top', skeletonTop)
				.find('table')
					.append(rowStructs[row].tbodyEl);

			rowEl.append(skeletonEl);
			helperNodes.push(skeletonEl[0]);
		});

		this.helperEls = $(helperNodes); // array -> jQuery set
	},


	// Unrenders any visual indication of a mock helper event
	destroyHelper: function() {
		if (this.helperEls) {
			this.helperEls.remove();
			this.helperEls = null;
		}
	},


	/* Fill System (highlight, background events, business hours)
	------------------------------------------------------------------------------------------------------------------*/


	fillSegTag: 'td', // override the default tag name


	// Renders a set of rectangles over the given segments of days.
	// Only returns segments that successfully rendered.
	renderFill: function(type, segs) {
		var nodes = [];
		var i, seg;
		var skeletonEl;

		segs = this.renderFillSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			skeletonEl = this.renderFillRow(type, seg);
			this.rowEls.eq(seg.row).append(skeletonEl);
			nodes.push(skeletonEl[0]);
		}

		this.elsByFill[type] = $(nodes);

		return segs;
	},


	// Generates the HTML needed for one row of a fill. Requires the seg's el to be rendered.
	renderFillRow: function(type, seg) {
		var colCnt = this.view.colCnt;
		var startCol = seg.leftCol;
		var endCol = seg.rightCol + 1;
		var skeletonEl;
		var trEl;

		skeletonEl = $(
			'<div class="fc-' + type.toLowerCase() + '-skeleton">' +
				'<table><tr/></table>' +
			'</div>'
		);
		trEl = skeletonEl.find('tr');

		if (startCol > 0) {
			trEl.append('<td colspan="' + startCol + '"/>');
		}

		trEl.append(
			seg.el.attr('colspan', endCol - startCol)
		);

		if (endCol < colCnt) {
			trEl.append('<td colspan="' + (colCnt - endCol) + '"/>');
		}

		this.bookendCells(trEl, type);

		return skeletonEl;
	}

});

;;

/* Event-rendering methods for the DayGrid class
----------------------------------------------------------------------------------------------------------------------*/

$.extend(DayGrid.prototype, {

	rowStructs: null, // an array of objects, each holding information about a row's foreground event-rendering


	// Unrenders all events currently rendered on the grid
	destroyEvents: function() {
		this.destroySegPopover(); // removes the "more.." events popover
		Grid.prototype.destroyEvents.apply(this, arguments); // calls the super-method
	},


	// Retrieves all rendered segment objects currently rendered on the grid
	getSegs: function() {
		return Grid.prototype.getSegs.call(this) // get the segments from the super-method
			.concat(this.popoverSegs || []); // append the segments from the "more..." popover
	},


	// Renders the given background event segments onto the grid
	renderBgSegs: function(segs) {

		// don't render timed background events
		var allDaySegs = $.grep(segs, function(seg) {
			return seg.event.allDay;
		});

		return Grid.prototype.renderBgSegs.call(this, allDaySegs); // call the super-method
	},


	// Renders the given foreground event segments onto the grid
	renderFgSegs: function(segs) {
		var rowStructs;

		// render an `.el` on each seg
		// returns a subset of the segs. segs that were actually rendered
		segs = this.renderFgSegEls(segs);

		rowStructs = this.rowStructs = this.renderSegRows(segs);

		// append to each row's content skeleton
		this.rowEls.each(function(i, rowNode) {
			$(rowNode).find('.fc-content-skeleton > table').append(
				rowStructs[i].tbodyEl
			);
		});

		return segs; // return only the segs that were actually rendered
	},


	// Unrenders all currently rendered foreground event segments
	destroyFgSegs: function() {
		var rowStructs = this.rowStructs || [];
		var rowStruct;

		while ((rowStruct = rowStructs.pop())) {
			rowStruct.tbodyEl.remove();
		}

		this.rowStructs = null;
	},


	// Uses the given events array to generate <tbody> elements that should be appended to each row's content skeleton.
	// Returns an array of rowStruct objects (see the bottom of `renderSegRow`).
	// PRECONDITION: each segment shoud already have a rendered and assigned `.el`
	renderSegRows: function(segs) {
		var rowStructs = [];
		var segRows;
		var row;

		segRows = this.groupSegRows(segs); // group into nested arrays

		// iterate each row of segment groupings
		for (row = 0; row < segRows.length; row++) {
			rowStructs.push(
				this.renderSegRow(row, segRows[row])
			);
		}

		return rowStructs;
	},


	// Builds the HTML to be used for the default element for an individual segment
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var isRTL = view.opt('isRTL');
		var event = seg.event;
		var isDraggable = view.isEventDraggable(event);
		var isResizable = !disableResizing && event.allDay && seg.isEnd && view.isEventResizable(event);
		var classes = this.getSegClasses(seg, isDraggable, isResizable);
		var skinCss = this.getEventSkinCss(event);
		var timeHtml = '';
		var titleHtml;

		classes.unshift('fc-day-grid-event');

		// Only display a timed events time if it is the starting segment
		if (!event.allDay && seg.isStart) {
			timeHtml = '<span class="fc-time">' + htmlEscape(view.getEventTimeText(event)) + '</span>';
		}

		titleHtml =
			'<span class="fc-title">' +
				(htmlEscape(event.title || '') || '&nbsp;') + // we always want one line of height
			'</span>';
		
		return '<a class="' + classes.join(' ') + '"' +
				(event.url ?
					' href="' + htmlEscape(event.url) + '"' :
					''
					) +
				(skinCss ?
					' style="' + skinCss + '"' :
					''
					) +
			'>' +
				'<div class="fc-content">' +
					(isRTL ?
						titleHtml + ' ' + timeHtml : // put a natural space in between
						timeHtml + ' ' + titleHtml   //
						) +
				'</div>' +
				(isResizable ?
					'<div class="fc-resizer"/>' :
					''
					) +
			'</a>';
	},


	// Given a row # and an array of segments all in the same row, render a <tbody> element, a skeleton that contains
	// the segments. Returns object with a bunch of internal data about how the render was calculated.
	renderSegRow: function(row, rowSegs) {
		var view = this.view;
		var colCnt = view.colCnt;
		var segLevels = this.buildSegLevels(rowSegs); // group into sub-arrays of levels
		var levelCnt = Math.max(1, segLevels.length); // ensure at least one level
		var tbody = $('<tbody/>');
		var segMatrix = []; // lookup for which segments are rendered into which level+col cells
		var cellMatrix = []; // lookup for all <td> elements of the level+col matrix
		var loneCellMatrix = []; // lookup for <td> elements that only take up a single column
		var i, levelSegs;
		var col;
		var tr;
		var j, seg;
		var td;

		// populates empty cells from the current column (`col`) to `endCol`
		function emptyCellsUntil(endCol) {
			while (col < endCol) {
				// try to grab a cell from the level above and extend its rowspan. otherwise, create a fresh cell
				td = (loneCellMatrix[i - 1] || [])[col];
				if (td) {
					td.attr(
						'rowspan',
						parseInt(td.attr('rowspan') || 1, 10) + 1
					);
				}
				else {
					td = $('<td/>');
					tr.append(td);
				}
				cellMatrix[i][col] = td;
				loneCellMatrix[i][col] = td;
				col++;
			}
		}

		for (i = 0; i < levelCnt; i++) { // iterate through all levels
			levelSegs = segLevels[i];
			col = 0;
			tr = $('<tr/>');

			segMatrix.push([]);
			cellMatrix.push([]);
			loneCellMatrix.push([]);

			// levelCnt might be 1 even though there are no actual levels. protect against this.
			// this single empty row is useful for styling.
			if (levelSegs) {
				for (j = 0; j < levelSegs.length; j++) { // iterate through segments in level
					seg = levelSegs[j];

					emptyCellsUntil(seg.leftCol);

					// create a container that occupies or more columns. append the event element.
					td = $('<td class="fc-event-container"/>').append(seg.el);
					if (seg.leftCol != seg.rightCol) {
						td.attr('colspan', seg.rightCol - seg.leftCol + 1);
					}
					else { // a single-column segment
						loneCellMatrix[i][col] = td;
					}

					while (col <= seg.rightCol) {
						cellMatrix[i][col] = td;
						segMatrix[i][col] = seg;
						col++;
					}

					tr.append(td);
				}
			}

			emptyCellsUntil(colCnt); // finish off the row
			this.bookendCells(tr, 'eventSkeleton');
			tbody.append(tr);
		}

		return { // a "rowStruct"
			row: row, // the row number
			tbodyEl: tbody,
			cellMatrix: cellMatrix,
			segMatrix: segMatrix,
			segLevels: segLevels,
			segs: rowSegs
		};
	},


	// Stacks a flat array of segments, which are all assumed to be in the same row, into subarrays of vertical levels.
	buildSegLevels: function(segs) {
		var levels = [];
		var i, seg;
		var j;

		// Give preference to elements with certain criteria, so they have
		// a chance to be closer to the top.
		segs.sort(compareSegs);
		
		for (i = 0; i < segs.length; i++) {
			seg = segs[i];

			// loop through levels, starting with the topmost, until the segment doesn't collide with other segments
			for (j = 0; j < levels.length; j++) {
				if (!isDaySegCollision(seg, levels[j])) {
					break;
				}
			}
			// `j` now holds the desired subrow index
			seg.level = j;

			// create new level array if needed and append segment
			(levels[j] || (levels[j] = [])).push(seg);
		}

		// order segments left-to-right. very important if calendar is RTL
		for (j = 0; j < levels.length; j++) {
			levels[j].sort(compareDaySegCols);
		}

		return levels;
	},


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's row
	groupSegRows: function(segs) {
		var view = this.view;
		var segRows = [];
		var i;

		for (i = 0; i < view.rowCnt; i++) {
			segRows.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segRows[segs[i].row].push(segs[i]);
		}

		return segRows;
	}

});


// Computes whether two segments' columns collide. They are assumed to be in the same row.
function isDaySegCollision(seg, otherSegs) {
	var i, otherSeg;

	for (i = 0; i < otherSegs.length; i++) {
		otherSeg = otherSegs[i];

		if (
			otherSeg.leftCol <= seg.rightCol &&
			otherSeg.rightCol >= seg.leftCol
		) {
			return true;
		}
	}

	return false;
}


// A cmp function for determining the leftmost event
function compareDaySegCols(a, b) {
	return a.leftCol - b.leftCol;
}

;;

/* Methods relate to limiting the number events for a given day on a DayGrid
----------------------------------------------------------------------------------------------------------------------*/
// NOTE: all the segs being passed around in here are foreground segs

$.extend(DayGrid.prototype, {


	segPopover: null, // the Popover that holds events that can't fit in a cell. null when not visible
	popoverSegs: null, // an array of segment objects that the segPopover holds. null when not visible


	destroySegPopover: function() {
		if (this.segPopover) {
			this.segPopover.hide(); // will trigger destruction of `segPopover` and `popoverSegs`
		}
	},


	// Limits the number of "levels" (vertically stacking layers of events) for each row of the grid.
	// `levelLimit` can be false (don't limit), a number, or true (should be computed).
	limitRows: function(levelLimit) {
		var rowStructs = this.rowStructs || [];
		var row; // row #
		var rowLevelLimit;

		for (row = 0; row < rowStructs.length; row++) {
			this.unlimitRow(row);

			if (!levelLimit) {
				rowLevelLimit = false;
			}
			else if (typeof levelLimit === 'number') {
				rowLevelLimit = levelLimit;
			}
			else {
				rowLevelLimit = this.computeRowLevelLimit(row);
			}

			if (rowLevelLimit !== false) {
				this.limitRow(row, rowLevelLimit);
			}
		}
	},


	// Computes the number of levels a row will accomodate without going outside its bounds.
	// Assumes the row is "rigid" (maintains a constant height regardless of what is inside).
	// `row` is the row number.
	computeRowLevelLimit: function(row) {
		var rowEl = this.rowEls.eq(row); // the containing "fake" row div
		var rowHeight = rowEl.height(); // TODO: cache somehow?
		var trEls = this.rowStructs[row].tbodyEl.children();
		var i, trEl;

		// Reveal one level <tr> at a time and stop when we find one out of bounds
		for (i = 0; i < trEls.length; i++) {
			trEl = trEls.eq(i).removeClass('fc-limited'); // get and reveal
			if (trEl.position().top + trEl.outerHeight() > rowHeight) {
				return i;
			}
		}

		return false; // should not limit at all
	},


	// Limits the given grid row to the maximum number of levels and injects "more" links if necessary.
	// `row` is the row number.
	// `levelLimit` is a number for the maximum (inclusive) number of levels allowed.
	limitRow: function(row, levelLimit) {
		var _this = this;
		var view = this.view;
		var rowStruct = this.rowStructs[row];
		var moreNodes = []; // array of "more" <a> links and <td> DOM nodes
		var col = 0; // col #
		var cell;
		var levelSegs; // array of segment objects in the last allowable level, ordered left-to-right
		var cellMatrix; // a matrix (by level, then column) of all <td> jQuery elements in the row
		var limitedNodes; // array of temporarily hidden level <tr> and segment <td> DOM nodes
		var i, seg;
		var segsBelow; // array of segment objects below `seg` in the current `col`
		var totalSegsBelow; // total number of segments below `seg` in any of the columns `seg` occupies
		var colSegsBelow; // array of segment arrays, below seg, one for each column (offset from segs's first column)
		var td, rowspan;
		var segMoreNodes; // array of "more" <td> cells that will stand-in for the current seg's cell
		var j;
		var moreTd, moreWrap, moreLink;

		// Iterates through empty level cells and places "more" links inside if need be
		function emptyCellsUntil(endCol) { // goes from current `col` to `endCol`
			while (col < endCol) {
				cell = { row: row, col: col };
				segsBelow = _this.getCellSegs(cell, levelLimit);
				if (segsBelow.length) {
					td = cellMatrix[levelLimit - 1][col];
					moreLink = _this.renderMoreLink(cell, segsBelow);
					moreWrap = $('<div/>').append(moreLink);
					td.append(moreWrap);
					moreNodes.push(moreWrap[0]);
				}
				col++;
			}
		}

		if (levelLimit && levelLimit < rowStruct.segLevels.length) { // is it actually over the limit?
			levelSegs = rowStruct.segLevels[levelLimit - 1];
			cellMatrix = rowStruct.cellMatrix;

			limitedNodes = rowStruct.tbodyEl.children().slice(levelLimit) // get level <tr> elements past the limit
				.addClass('fc-limited').get(); // hide elements and get a simple DOM-nodes array

			// iterate though segments in the last allowable level
			for (i = 0; i < levelSegs.length; i++) {
				seg = levelSegs[i];
				emptyCellsUntil(seg.leftCol); // process empty cells before the segment

				// determine *all* segments below `seg` that occupy the same columns
				colSegsBelow = [];
				totalSegsBelow = 0;
				while (col <= seg.rightCol) {
					cell = { row: row, col: col };
					segsBelow = this.getCellSegs(cell, levelLimit);
					colSegsBelow.push(segsBelow);
					totalSegsBelow += segsBelow.length;
					col++;
				}

				if (totalSegsBelow) { // do we need to replace this segment with one or many "more" links?
					td = cellMatrix[levelLimit - 1][seg.leftCol]; // the segment's parent cell
					rowspan = td.attr('rowspan') || 1;
					segMoreNodes = [];

					// make a replacement <td> for each column the segment occupies. will be one for each colspan
					for (j = 0; j < colSegsBelow.length; j++) {
						moreTd = $('<td class="fc-more-cell"/>').attr('rowspan', rowspan);
						segsBelow = colSegsBelow[j];
						cell = { row: row, col: seg.leftCol + j };
						moreLink = this.renderMoreLink(cell, [ seg ].concat(segsBelow)); // count seg as hidden too
						moreWrap = $('<div/>').append(moreLink);
						moreTd.append(moreWrap);
						segMoreNodes.push(moreTd[0]);
						moreNodes.push(moreTd[0]);
					}

					td.addClass('fc-limited').after($(segMoreNodes)); // hide original <td> and inject replacements
					limitedNodes.push(td[0]);
				}
			}

			emptyCellsUntil(view.colCnt); // finish off the level
			rowStruct.moreEls = $(moreNodes); // for easy undoing later
			rowStruct.limitedEls = $(limitedNodes); // for easy undoing later
		}
	},


	// Reveals all levels and removes all "more"-related elements for a grid's row.
	// `row` is a row number.
	unlimitRow: function(row) {
		var rowStruct = this.rowStructs[row];

		if (rowStruct.moreEls) {
			rowStruct.moreEls.remove();
			rowStruct.moreEls = null;
		}

		if (rowStruct.limitedEls) {
			rowStruct.limitedEls.removeClass('fc-limited');
			rowStruct.limitedEls = null;
		}
	},


	// Renders an <a> element that represents hidden event element for a cell.
	// Responsible for attaching click handler as well.
	renderMoreLink: function(cell, hiddenSegs) {
		var _this = this;
		var view = this.view;

		return $('<a class="fc-more"/>')
			.text(
				this.getMoreLinkText(hiddenSegs.length)
			)
			.on('click', function(ev) {
				var clickOption = view.opt('eventLimitClick');
				var date = view.cellToDate(cell);
				var moreEl = $(this);
				var dayEl = _this.getCellDayEl(cell);
				var allSegs = _this.getCellSegs(cell);

				// rescope the segments to be within the cell's date
				var reslicedAllSegs = _this.resliceDaySegs(allSegs, date);
				var reslicedHiddenSegs = _this.resliceDaySegs(hiddenSegs, date);

				if (typeof clickOption === 'function') {
					// the returned value can be an atomic option
					clickOption = view.trigger('eventLimitClick', null, {
						date: date,
						dayEl: dayEl,
						moreEl: moreEl,
						segs: reslicedAllSegs,
						hiddenSegs: reslicedHiddenSegs
					}, ev);
				}

				if (clickOption === 'popover') {
					_this.showSegPopover(date, cell, moreEl, reslicedAllSegs);
				}
				else if (typeof clickOption === 'string') { // a view name
					view.calendar.zoomTo(date, clickOption);
				}
			});
	},


	// Reveals the popover that displays all events within a cell
	showSegPopover: function(date, cell, moreLink, segs) {
		var _this = this;
		var view = this.view;
		var moreWrap = moreLink.parent(); // the <div> wrapper around the <a>
		var topEl; // the element we want to match the top coordinate of
		var options;

		if (view.rowCnt == 1) {
			topEl = this.view.el; // will cause the popover to cover any sort of header
		}
		else {
			topEl = this.rowEls.eq(cell.row); // will align with top of row
		}

		options = {
			className: 'fc-more-popover',
			content: this.renderSegPopoverContent(date, segs),
			parentEl: this.el,
			top: topEl.offset().top,
			autoHide: true, // when the user clicks elsewhere, hide the popover
			viewportConstrain: view.opt('popoverViewportConstrain'),
			hide: function() {
				// destroy everything when the popover is hidden
				_this.segPopover.destroy();
				_this.segPopover = null;
				_this.popoverSegs = null;
			}
		};

		// Determine horizontal coordinate.
		// We use the moreWrap instead of the <td> to avoid border confusion.
		if (view.opt('isRTL')) {
			options.right = moreWrap.offset().left + moreWrap.outerWidth() + 1; // +1 to be over cell border
		}
		else {
			options.left = moreWrap.offset().left - 1; // -1 to be over cell border
		}

		this.segPopover = new Popover(options);
		this.segPopover.show();
	},


	// Builds the inner DOM contents of the segment popover
	renderSegPopoverContent: function(date, segs) {
		var view = this.view;
		var isTheme = view.opt('theme');
		var title = date.format(view.opt('dayPopoverFormat'));
		var content = $(
			'<div class="fc-header ' + view.widgetHeaderClass + '">' +
				'<span class="fc-close ' +
					(isTheme ? 'ui-icon ui-icon-closethick' : 'fc-icon fc-icon-x') +
				'"></span>' +
				'<span class="fc-title">' +
					htmlEscape(title) +
				'</span>' +
				'<div class="fc-clear"/>' +
			'</div>' +
			'<div class="fc-body ' + view.widgetContentClass + '">' +
				'<div class="fc-event-container"></div>' +
			'</div>'
		);
		var segContainer = content.find('.fc-event-container');
		var i;

		// render each seg's `el` and only return the visible segs
		segs = this.renderFgSegEls(segs, true); // disableResizing=true
		this.popoverSegs = segs;

		for (i = 0; i < segs.length; i++) {

			// because segments in the popover are not part of a grid coordinate system, provide a hint to any
			// grids that want to do drag-n-drop about which cell it came from
			segs[i].cellDate = date;

			segContainer.append(segs[i].el);
		}

		return content;
	},


	// Given the events within an array of segment objects, reslice them to be in a single day
	resliceDaySegs: function(segs, dayDate) {

		// build an array of the original events
		var events = $.map(segs, function(seg) {
			return seg.event;
		});

		var dayStart = dayDate.clone().stripTime();
		var dayEnd = dayStart.clone().add(1, 'days');

		// slice the events with a custom slicing function
		return this.eventsToSegs(
			events,
			function(rangeStart, rangeEnd) {
				var seg = intersectionToSeg(rangeStart, rangeEnd, dayStart, dayEnd); // if no intersection, undefined
				return seg ? [ seg ] : []; // must return an array of segments
			}
		);
	},


	// Generates the text that should be inside a "more" link, given the number of events it represents
	getMoreLinkText: function(num) {
		var view = this.view;
		var opt = view.opt('eventLimitText');

		if (typeof opt === 'function') {
			return opt(num);
		}
		else {
			return '+' + num + ' ' + opt;
		}
	},


	// Returns segments within a given cell.
	// If `startLevel` is specified, returns only events including and below that level. Otherwise returns all segs.
	getCellSegs: function(cell, startLevel) {
		var segMatrix = this.rowStructs[cell.row].segMatrix;
		var level = startLevel || 0;
		var segs = [];
		var seg;

		while (level < segMatrix.length) {
			seg = segMatrix[level][cell.col];
			if (seg) {
				segs.push(seg);
			}
			level++;
		}

		return segs;
	}

});

;;

/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/

function TimeGrid(view) {
	Grid.call(this, view); // call the super-constructor
}


TimeGrid.prototype = createObject(Grid.prototype); // define the super-class
$.extend(TimeGrid.prototype, {

	slotDuration: null, // duration of a "slot", a distinct time segment on given day, visualized by lines
	snapDuration: null, // granularity of time for dragging and selecting

	minTime: null, // Duration object that denotes the first visible time of any given day
	maxTime: null, // Duration object that denotes the exclusive visible end time of any given day

	dayEls: null, // cells elements in the day-row background
	slatEls: null, // elements running horizontally across all columns

	slatTops: null, // an array of top positions, relative to the container. last item holds bottom of last slot

	helperEl: null, // cell skeleton element for rendering the mock event "helper"

	businessHourSegs: null,


	// Renders the time grid into `this.el`, which should already be assigned.
	// Relies on the view's colCnt. In the future, this component should probably be self-sufficient.
	render: function() {
		this.processOptions();

		this.el.html(this.renderHtml());

		this.dayEls = this.el.find('.fc-day');
		this.slatEls = this.el.find('.fc-slats tr');

		this.computeSlatTops();

		this.renderBusinessHours();

		Grid.prototype.render.call(this); // call the super-method
	},


	renderBusinessHours: function() {
		var events = this.view.calendar.getBusinessHoursEvents();
		this.businessHourSegs = this.renderFill('businessHours', this.eventsToSegs(events), 'bgevent');
	},


	// Renders the basic HTML skeleton for the grid
	renderHtml: function() {
		return '' +
			'<div class="fc-bg">' +
				'<table>' +
					this.rowHtml('slotBg') + // leverages RowRenderer, which will call slotBgCellHtml
				'</table>' +
			'</div>' +
			'<div class="fc-slats">' +
				'<table>' +
					this.slatRowHtml() +
				'</table>' +
			'</div>';
	},


	// Renders the HTML for a vertical background cell behind the slots.
	// This method is distinct from 'bg' because we wanted a new `rowType` so the View could customize the rendering.
	slotBgCellHtml: function(row, col, date) {
		return this.bgCellHtml(row, col, date);
	},


	// Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
	slatRowHtml: function() {
		var view = this.view;
		var calendar = view.calendar;
		var isRTL = view.opt('isRTL');
		var html = '';
		var slotNormal = this.slotDuration.asMinutes() % 15 === 0;
		var slotTime = moment.duration(+this.minTime); // wish there was .clone() for durations
		var slotDate; // will be on the view's first day, but we only care about its time
		var minutes;
		var axisHtml;

		// Calculate the time for each slot
		while (slotTime < this.maxTime) {
			slotDate = view.start.clone().time(slotTime); // will be in UTC but that's good. to avoid DST issues
			minutes = slotDate.minutes();

			axisHtml =
				'<td class="fc-axis fc-time ' + view.widgetContentClass + '" ' + view.axisStyleAttr() + '>' +
					((!slotNormal || !minutes) ? // if irregular slot duration, or on the hour, then display the time
						'<span>' + // for matchCellWidths
							htmlEscape(calendar.formatDate(slotDate, view.opt('axisFormat'))) +
						'</span>' :
						''
						) +
				'</td>';

			html +=
				'<tr ' + (!minutes ? '' : 'class="fc-minor"') + '>' +
					(!isRTL ? axisHtml : '') +
					'<td class="' + view.widgetContentClass + '"/>' +
					(isRTL ? axisHtml : '') +
				"</tr>";

			slotTime.add(this.slotDuration);
		}

		return html;
	},


	// Parses various options into properties of this object
	processOptions: function() {
		var view = this.view;
		var slotDuration = view.opt('slotDuration');
		var snapDuration = view.opt('snapDuration');

		slotDuration = moment.duration(slotDuration);
		snapDuration = snapDuration ? moment.duration(snapDuration) : slotDuration;

		this.slotDuration = slotDuration;
		this.snapDuration = snapDuration;
		this.cellDuration = snapDuration; // important to assign this for Grid.events.js

		this.minTime = moment.duration(view.opt('minTime'));
		this.maxTime = moment.duration(view.opt('maxTime'));
	},


	// Slices up a date range into a segment for each column
	rangeToSegs: function(rangeStart, rangeEnd) {
		var view = this.view;
		var segs = [];
		var seg;
		var col;
		var cellDate;
		var colStart, colEnd;

		// normalize
		rangeStart = rangeStart.clone().stripZone();
		rangeEnd = rangeEnd.clone().stripZone();

		for (col = 0; col < view.colCnt; col++) {
			cellDate = view.cellToDate(0, col); // use the View's cell system for this
			colStart = cellDate.clone().time(this.minTime);
			colEnd = cellDate.clone().time(this.maxTime);
			seg = intersectionToSeg(rangeStart, rangeEnd, colStart, colEnd);
			if (seg) {
				seg.col = col;
				segs.push(seg);
			}
		}

		return segs;
	},


	/* Coordinates
	------------------------------------------------------------------------------------------------------------------*/


	// Called when there is a window resize/zoom and we need to recalculate coordinates for the grid
	resize: function() {
		this.computeSlatTops();
		this.updateSegVerticals();
	},


	// Populates the given empty `rows` and `cols` arrays with offset positions of the "snap" cells.
	// "Snap" cells are different the slots because they might have finer granularity.
	buildCoords: function(rows, cols) {
		var colCnt = this.view.colCnt;
		var originTop = this.el.offset().top;
		var snapTime = moment.duration(+this.minTime);
		var p = null;
		var e, n;

		this.dayEls.slice(0, colCnt).each(function(i, _e) {
			e = $(_e);
			n = e.offset().left;
			if (p) {
				p[1] = n;
			}
			p = [ n ];
			cols[i] = p;
		});
		p[1] = n + e.outerWidth();

		p = null;
		while (snapTime < this.maxTime) {
			n = originTop + this.computeTimeTop(snapTime);
			if (p) {
				p[1] = n;
			}
			p = [ n ];
			rows.push(p);
			snapTime.add(this.snapDuration);
		}
		p[1] = originTop + this.computeTimeTop(snapTime); // the position of the exclusive end
	},


	// Gets the datetime for the given slot cell
	getCellDate: function(cell) {
		var view = this.view;
		var calendar = view.calendar;

		return calendar.rezoneDate( // since we are adding a time, it needs to be in the calendar's timezone
			view.cellToDate(0, cell.col) // View's coord system only accounts for start-of-day for column
				.time(this.minTime + this.snapDuration * cell.row)
		);
	},


	// Gets the element that represents the whole-day the cell resides on
	getCellDayEl: function(cell) {
		return this.dayEls.eq(cell.col);
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given date.
	// A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
	computeDateTop: function(date, startOfDayDate) {
		return this.computeTimeTop(
			moment.duration(
				date.clone().stripZone() - startOfDayDate.clone().stripTime()
			)
		);
	},


	// Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
	computeTimeTop: function(time) {
		var slatCoverage = (time - this.minTime) / this.slotDuration; // floating-point value of # of slots covered
		var slatIndex;
		var slatRemainder;
		var slatTop;
		var slatBottom;

		// constrain. because minTime/maxTime might be customized
		slatCoverage = Math.max(0, slatCoverage);
		slatCoverage = Math.min(this.slatEls.length, slatCoverage);

		slatIndex = Math.floor(slatCoverage); // an integer index of the furthest whole slot
		slatRemainder = slatCoverage - slatIndex;
		slatTop = this.slatTops[slatIndex]; // the top position of the furthest whole slot

		if (slatRemainder) { // time spans part-way into the slot
			slatBottom = this.slatTops[slatIndex + 1];
			return slatTop + (slatBottom - slatTop) * slatRemainder; // part-way between slots
		}
		else {
			return slatTop;
		}
	},


	// Queries each `slatEl` for its position relative to the grid's container and stores it in `slatTops`.
	// Includes the the bottom of the last slat as the last item in the array.
	computeSlatTops: function() {
		var tops = [];
		var top;

		this.slatEls.each(function(i, node) {
			top = $(node).position().top;
			tops.push(top);
		});

		tops.push(top + this.slatEls.last().outerHeight()); // bottom of the last slat

		this.slatTops = tops;
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the specified date(s).
	// `end` and `seg` can be null. See View's documentation on renderDrag for more info.
	renderDrag: function(start, end, seg) {
		var opacity;

		if (seg) { // if there is event information for this drag, render a helper event
			this.renderRangeHelper(start, end, seg);

			opacity = this.view.opt('dragOpacity');
			if (opacity !== undefined) {
				this.helperEl.css('opacity', opacity);
			}

			return true; // signal that a helper has been rendered
		}
		else {
			// otherwise, just render a highlight
			this.renderHighlight(
				start,
				end || this.view.calendar.getDefaultEventEnd(false, start)
			);
		}
	},


	// Unrenders any visual indication of an event being dragged
	destroyDrag: function() {
		this.destroyHelper();
		this.destroyHighlight();
	},


	/* Event Resize Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being resized
	renderResize: function(start, end, seg) {
		this.renderRangeHelper(start, end, seg);
	},


	// Unrenders any visual indication of an event being resized
	destroyResize: function() {
		this.destroyHelper();
	},


	/* Event Helper
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a mock "helper" event. `sourceSeg` is the original segment object and might be null (an external drag)
	renderHelper: function(event, sourceSeg) {
		var segs = this.eventsToSegs([ event ]);
		var tableEl;
		var i, seg;
		var sourceEl;

		segs = this.renderFgSegEls(segs); // assigns each seg's el and returns a subset of segs that were rendered
		tableEl = this.renderSegTable(segs);

		// Try to make the segment that is in the same row as sourceSeg look the same
		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			if (sourceSeg && sourceSeg.col === seg.col) {
				sourceEl = sourceSeg.el;
				seg.el.css({
					left: sourceEl.css('left'),
					right: sourceEl.css('right'),
					'margin-left': sourceEl.css('margin-left'),
					'margin-right': sourceEl.css('margin-right')
				});
			}
		}

		this.helperEl = $('<div class="fc-helper-skeleton"/>')
			.append(tableEl)
				.appendTo(this.el);
	},


	// Unrenders any mock helper event
	destroyHelper: function() {
		if (this.helperEl) {
			this.helperEl.remove();
			this.helperEl = null;
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
	renderSelection: function(start, end) {
		if (this.view.opt('selectHelper')) { // this setting signals that a mock helper event should be rendered
			this.renderRangeHelper(start, end);
		}
		else {
			this.renderHighlight(start, end);
		}
	},


	// Unrenders any visual indication of a selection
	destroySelection: function() {
		this.destroyHelper();
		this.destroyHighlight();
	},


	/* Fill System (highlight, background events, business hours)
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a set of rectangles over the given time segments.
	// Only returns segments that successfully rendered.
	renderFill: function(type, segs, className) {
		var view = this.view;
		var segCols;
		var skeletonEl;
		var trEl;
		var col, colSegs;
		var tdEl;
		var containerEl;
		var dayDate;
		var i, seg;

		if (segs.length) {

			segs = this.renderFillSegEls(type, segs); // assignes `.el` to each seg. returns successfully rendered segs
			segCols = this.groupSegCols(segs); // group into sub-arrays, and assigns 'col' to each seg

			className = className || type.toLowerCase();
			skeletonEl = $(
				'<div class="fc-' + className + '-skeleton">' +
					'<table><tr/></table>' +
				'</div>'
			);
			trEl = skeletonEl.find('tr');

			for (col = 0; col < segCols.length; col++) {
				colSegs = segCols[col];
				tdEl = $('<td/>').appendTo(trEl);

				if (colSegs.length) {
					containerEl = $('<div class="fc-' + className + '-container"/>').appendTo(tdEl);
					dayDate = view.cellToDate(0, col);

					for (i = 0; i < colSegs.length; i++) {
						seg = colSegs[i];
						containerEl.append(
							seg.el.css({
								top: this.computeDateTop(seg.start, dayDate),
								bottom: -this.computeDateTop(seg.end, dayDate) // the y position of the bottom edge
							})
						);
					}
				}
			}

			this.bookendCells(trEl, type);

			this.el.append(skeletonEl);
			this.elsByFill[type] = skeletonEl;
		}

		return segs;
	}

});

;;

/* Event-rendering methods for the TimeGrid class
----------------------------------------------------------------------------------------------------------------------*/

$.extend(TimeGrid.prototype, {

	eventSkeletonEl: null, // has cells with event-containers, which contain absolutely positioned event elements


	// Renders the given foreground event segments onto the grid
	renderFgSegs: function(segs) {
		segs = this.renderFgSegEls(segs); // returns a subset of the segs. segs that were actually rendered

		this.el.append(
			this.eventSkeletonEl = $('<div class="fc-content-skeleton"/>')
				.append(this.renderSegTable(segs))
		);

		return segs; // return only the segs that were actually rendered
	},


	// Unrenders all currently rendered foreground event segments
	destroyFgSegs: function(segs) {
		if (this.eventSkeletonEl) {
			this.eventSkeletonEl.remove();
			this.eventSkeletonEl = null;
		}
	},


	// Renders and returns the <table> portion of the event-skeleton.
	// Returns an object with properties 'tbodyEl' and 'segs'.
	renderSegTable: function(segs) {
		var tableEl = $('<table><tr/></table>');
		var trEl = tableEl.find('tr');
		var segCols;
		var i, seg;
		var col, colSegs;
		var containerEl;

		segCols = this.groupSegCols(segs); // group into sub-arrays, and assigns 'col' to each seg

		this.computeSegVerticals(segs); // compute and assign top/bottom

		for (col = 0; col < segCols.length; col++) { // iterate each column grouping
			colSegs = segCols[col];
			placeSlotSegs(colSegs); // compute horizontal coordinates, z-index's, and reorder the array

			containerEl = $('<div class="fc-event-container"/>');

			// assign positioning CSS and insert into container
			for (i = 0; i < colSegs.length; i++) {
				seg = colSegs[i];
				seg.el.css(this.generateSegPositionCss(seg));

				// if the height is short, add a className for alternate styling
				if (seg.bottom - seg.top < 30) {
					seg.el.addClass('fc-short');
				}

				containerEl.append(seg.el);
			}

			trEl.append($('<td/>').append(containerEl));
		}

		this.bookendCells(trEl, 'eventSkeleton');

		return tableEl;
	},


	// Refreshes the CSS top/bottom coordinates for each segment element. Probably after a window resize/zoom.
	// Repositions business hours segs too, so not just for events. Maybe shouldn't be here.
	updateSegVerticals: function() {
		var allSegs = (this.segs || []).concat(this.businessHourSegs || []);
		var i;

		this.computeSegVerticals(allSegs);

		for (i = 0; i < allSegs.length; i++) {
			allSegs[i].el.css(
				this.generateSegVerticalCss(allSegs[i])
			);
		}
	},


	// For each segment in an array, computes and assigns its top and bottom properties
	computeSegVerticals: function(segs) {
		var i, seg;

		for (i = 0; i < segs.length; i++) {
			seg = segs[i];
			seg.top = this.computeDateTop(seg.start, seg.start);
			seg.bottom = this.computeDateTop(seg.end, seg.start);
		}
	},


	// Renders the HTML for a single event segment's default rendering
	fgSegHtml: function(seg, disableResizing) {
		var view = this.view;
		var event = seg.event;
		var isDraggable = view.isEventDraggable(event);
		var isResizable = !disableResizing && seg.isEnd && view.isEventResizable(event);
		var classes = this.getSegClasses(seg, isDraggable, isResizable);
		var skinCss = this.getEventSkinCss(event);
		var timeText;
		var fullTimeText; // more verbose time text. for the print stylesheet
		var startTimeText; // just the start time text

		classes.unshift('fc-time-grid-event');

		if (view.isMultiDayEvent(event)) { // if the event appears to span more than one day...
			// Don't display time text on segments that run entirely through a day.
			// That would appear as midnight-midnight and would look dumb.
			// Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
			if (seg.isStart || seg.isEnd) {
				timeText = view.getEventTimeText(seg.start, seg.end);
				fullTimeText = view.getEventTimeText(seg.start, seg.end, 'LT');
				startTimeText = view.getEventTimeText(seg.start, null);
			}
		} else {
			// Display the normal time text for the *event's* times
			timeText = view.getEventTimeText(event);
			fullTimeText = view.getEventTimeText(event, 'LT');
			startTimeText = view.getEventTimeText(event.start, null);
		}

		return '<a class="' + classes.join(' ') + '"' +
			(event.url ?
				' href="' + htmlEscape(event.url) + '"' :
				''
				) +
			(skinCss ?
				' style="' + skinCss + '"' :
				''
				) +
			'>' +
				'<div class="fc-content">' +
					(timeText ?
						'<div class="fc-time"' +
						' data-start="' + htmlEscape(startTimeText) + '"' +
						' data-full="' + htmlEscape(fullTimeText) + '"' +
						'>' +
							'<span>' + htmlEscape(timeText) + '</span>' +
						'</div>' :
						''
						) +
					(event.title ?
						'<div class="fc-title">' +
							htmlEscape(event.title) +
						'</div>' :
						''
						) +
				'</div>' +
				'<div class="fc-bg"/>' +
				(isResizable ?
					'<div class="fc-resizer"/>' :
					''
					) +
			'</a>';
	},


	// Generates an object with CSS properties/values that should be applied to an event segment element.
	// Contains important positioning-related properties that should be applied to any event element, customized or not.
	generateSegPositionCss: function(seg) {
		var view = this.view;
		var isRTL = view.opt('isRTL');
		var shouldOverlap = view.opt('slotEventOverlap');
		var backwardCoord = seg.backwardCoord; // the left side if LTR. the right side if RTL. floating-point
		var forwardCoord = seg.forwardCoord; // the right side if LTR. the left side if RTL. floating-point
		var props = this.generateSegVerticalCss(seg); // get top/bottom first
		var left; // amount of space from left edge, a fraction of the total width
		var right; // amount of space from right edge, a fraction of the total width

		if (shouldOverlap) {
			// double the width, but don't go beyond the maximum forward coordinate (1.0)
			forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2);
		}

		if (isRTL) {
			left = 1 - forwardCoord;
			right = backwardCoord;
		}
		else {
			left = backwardCoord;
			right = 1 - forwardCoord;
		}

		props.zIndex = seg.level + 1; // convert from 0-base to 1-based
		props.left = left * 100 + '%';
		props.right = right * 100 + '%';

		if (shouldOverlap && seg.forwardPressure) {
			// add padding to the edge so that forward stacked events don't cover the resizer's icon
			props[isRTL ? 'marginLeft' : 'marginRight'] = 10 * 2; // 10 is a guesstimate of the icon's width 
		}

		return props;
	},


	// Generates an object with CSS properties for the top/bottom coordinates of a segment element
	generateSegVerticalCss: function(seg) {
		return {
			top: seg.top,
			bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
		};
	},


	// Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
	groupSegCols: function(segs) {
		var view = this.view;
		var segCols = [];
		var i;

		for (i = 0; i < view.colCnt; i++) {
			segCols.push([]);
		}

		for (i = 0; i < segs.length; i++) {
			segCols[segs[i].col].push(segs[i]);
		}

		return segCols;
	}

});


// Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
// Also reorders the given array by date!
function placeSlotSegs(segs) {
	var levels;
	var level0;
	var i;

	segs.sort(compareSegs); // order by date
	levels = buildSlotSegLevels(segs);
	computeForwardSlotSegs(levels);

	if ((level0 = levels[0])) {

		for (i = 0; i < level0.length; i++) {
			computeSlotSegPressures(level0[i]);
		}

		for (i = 0; i < level0.length; i++) {
			computeSlotSegCoords(level0[i], 0, 0);
		}
	}
}


// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
function buildSlotSegLevels(segs) {
	var levels = [];
	var i, seg;
	var j;

	for (i=0; i<segs.length; i++) {
		seg = segs[i];

		// go through all the levels and stop on the first level where there are no collisions
		for (j=0; j<levels.length; j++) {
			if (!computeSlotSegCollisions(seg, levels[j]).length) {
				break;
			}
		}

		seg.level = j;

		(levels[j] || (levels[j] = [])).push(seg);
	}

	return levels;
}


// For every segment, figure out the other segments that are in subsequent
// levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
function computeForwardSlotSegs(levels) {
	var i, level;
	var j, seg;
	var k;

	for (i=0; i<levels.length; i++) {
		level = levels[i];

		for (j=0; j<level.length; j++) {
			seg = level[j];

			seg.forwardSegs = [];
			for (k=i+1; k<levels.length; k++) {
				computeSlotSegCollisions(seg, levels[k], seg.forwardSegs);
			}
		}
	}
}


// Figure out which path forward (via seg.forwardSegs) results in the longest path until
// the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
function computeSlotSegPressures(seg) {
	var forwardSegs = seg.forwardSegs;
	var forwardPressure = 0;
	var i, forwardSeg;

	if (seg.forwardPressure === undefined) { // not already computed

		for (i=0; i<forwardSegs.length; i++) {
			forwardSeg = forwardSegs[i];

			// figure out the child's maximum forward path
			computeSlotSegPressures(forwardSeg);

			// either use the existing maximum, or use the child's forward pressure
			// plus one (for the forwardSeg itself)
			forwardPressure = Math.max(
				forwardPressure,
				1 + forwardSeg.forwardPressure
			);
		}

		seg.forwardPressure = forwardPressure;
	}
}


// Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
// from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
// seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
//
// The segment might be part of a "series", which means consecutive segments with the same pressure
// who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
// segments behind this one in the current series, and `seriesBackwardCoord` is the starting
// coordinate of the first segment in the series.
function computeSlotSegCoords(seg, seriesBackwardPressure, seriesBackwardCoord) {
	var forwardSegs = seg.forwardSegs;
	var i;

	if (seg.forwardCoord === undefined) { // not already computed

		if (!forwardSegs.length) {

			// if there are no forward segments, this segment should butt up against the edge
			seg.forwardCoord = 1;
		}
		else {

			// sort highest pressure first
			forwardSegs.sort(compareForwardSlotSegs);

			// this segment's forwardCoord will be calculated from the backwardCoord of the
			// highest-pressure forward segment.
			computeSlotSegCoords(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord);
			seg.forwardCoord = forwardSegs[0].backwardCoord;
		}

		// calculate the backwardCoord from the forwardCoord. consider the series
		seg.backwardCoord = seg.forwardCoord -
			(seg.forwardCoord - seriesBackwardCoord) / // available width for series
			(seriesBackwardPressure + 1); // # of segments in the series

		// use this segment's coordinates to computed the coordinates of the less-pressurized
		// forward segments
		for (i=0; i<forwardSegs.length; i++) {
			computeSlotSegCoords(forwardSegs[i], 0, seg.forwardCoord);
		}
	}
}


// Find all the segments in `otherSegs` that vertically collide with `seg`.
// Append into an optionally-supplied `results` array and return.
function computeSlotSegCollisions(seg, otherSegs, results) {
	results = results || [];

	for (var i=0; i<otherSegs.length; i++) {
		if (isSlotSegCollision(seg, otherSegs[i])) {
			results.push(otherSegs[i]);
		}
	}

	return results;
}


// Do these segments occupy the same vertical space?
function isSlotSegCollision(seg1, seg2) {
	return seg1.bottom > seg2.top && seg1.top < seg2.bottom;
}


// A cmp function for determining which forward segment to rely on more when computing coordinates.
function compareForwardSlotSegs(seg1, seg2) {
	// put higher-pressure first
	return seg2.forwardPressure - seg1.forwardPressure ||
		// put segments that are closer to initial edge first (and favor ones with no coords yet)
		(seg1.backwardCoord || 0) - (seg2.backwardCoord || 0) ||
		// do normal sorting...
		compareSegs(seg1, seg2);
}

;;

/* An abstract class from which other views inherit from
----------------------------------------------------------------------------------------------------------------------*/
// Newer methods should be written as prototype methods, not in the monster `View` function at the bottom.

View.prototype = {

	calendar: null, // owner Calendar object
	coordMap: null, // a CoordMap object for converting pixel regions to dates
	el: null, // the view's containing element. set by Calendar

	// important Moments
	start: null, // the date of the very first cell
	end: null, // the date after the very last cell
	intervalStart: null, // the start of the interval of time the view represents (1st of month for month view)
	intervalEnd: null, // the exclusive end of the interval of time the view represents

	// used for cell-to-date and date-to-cell calculations
	rowCnt: null, // # of weeks
	colCnt: null, // # of days displayed in a week

	isSelected: false, // boolean whether cells are user-selected or not

	// subclasses can optionally use a scroll container
	scrollerEl: null, // the element that will most likely scroll when content is too tall
	scrollTop: null, // cached vertical scroll value

	// classNames styled by jqui themes
	widgetHeaderClass: null,
	widgetContentClass: null,
	highlightStateClass: null,

	// document handlers, bound to `this` object
	documentMousedownProxy: null,
	documentDragStartProxy: null,


	// Serves as a "constructor" to suppliment the monster `View` constructor below
	init: function() {
		var tm = this.opt('theme') ? 'ui' : 'fc';

		this.widgetHeaderClass = tm + '-widget-header';
		this.widgetContentClass = tm + '-widget-content';
		this.highlightStateClass = tm + '-state-highlight';

		// save references to `this`-bound handlers
		this.documentMousedownProxy = $.proxy(this, 'documentMousedown');
		this.documentDragStartProxy = $.proxy(this, 'documentDragStart');
	},


	// Renders the view inside an already-defined `this.el`.
	// Subclasses should override this and then call the super method afterwards.
	render: function() {
		this.updateSize();
		this.trigger('viewRender', this, this, this.el);

		// attach handlers to document. do it here to allow for destroy/rerender
		$(document)
			.on('mousedown', this.documentMousedownProxy)
			.on('dragstart', this.documentDragStartProxy); // jqui drag
	},


	// Clears all view rendering, event elements, and unregisters handlers
	destroy: function() {
		this.unselect();
		this.trigger('viewDestroy', this, this, this.el);
		this.destroyEvents();
		this.el.empty(); // removes inner contents but leaves the element intact

		$(document)
			.off('mousedown', this.documentMousedownProxy)
			.off('dragstart', this.documentDragStartProxy);
	},


	// Used to determine what happens when the users clicks next/prev. Given -1 for prev, 1 for next.
	// Should apply the delta to `date` (a Moment) and return it.
	incrementDate: function(date, delta) {
		// subclasses should implement
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes anything dependant upon sizing of the container element of the grid
	updateSize: function(isResize) {
		if (isResize) {
			this.recordScroll();
		}
		this.updateHeight();
		this.updateWidth();
	},


	// Refreshes the horizontal dimensions of the calendar
	updateWidth: function() {
		// subclasses should implement
	},


	// Refreshes the vertical dimensions of the calendar
	updateHeight: function() {
		var calendar = this.calendar; // we poll the calendar for height information

		this.setHeight(
			calendar.getSuggestedViewHeight(),
			calendar.isHeightAuto()
		);
	},


	// Updates the vertical dimensions of the calendar to the specified height.
	// if `isAuto` is set to true, height becomes merely a suggestion and the view should use its "natural" height.
	setHeight: function(height, isAuto) {
		// subclasses should implement
	},


	// Given the total height of the view, return the number of pixels that should be used for the scroller.
	// Utility for subclasses.
	computeScrollerHeight: function(totalHeight) {
		var both = this.el.add(this.scrollerEl);
		var otherHeight; // cumulative height of everything that is not the scrollerEl in the view (header+borders)

		// fuckin IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
		both.css({
			position: 'relative', // cause a reflow, which will force fresh dimension recalculation
			left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
		});
		otherHeight = this.el.outerHeight() - this.scrollerEl.height(); // grab the dimensions
		both.css({ position: '', left: '' }); // undo hack

		return totalHeight - otherHeight;
	},


	// Called for remembering the current scroll value of the scroller.
	// Should be called before there is a destructive operation (like removing DOM elements) that might inadvertently
	// change the scroll of the container.
	recordScroll: function() {
		if (this.scrollerEl) {
			this.scrollTop = this.scrollerEl.scrollTop();
		}
	},


	// Set the scroll value of the scroller to the previously recorded value.
	// Should be called after we know the view's dimensions have been restored following some type of destructive
	// operation (like temporarily removing DOM elements).
	restoreScroll: function() {
		if (this.scrollTop !== null) {
			this.scrollerEl.scrollTop(this.scrollTop);
		}
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the events onto the view.
	// Should be overriden by subclasses. Subclasses should call the super-method afterwards.
	renderEvents: function(events) {
		this.segEach(function(seg) {
			this.trigger('eventAfterRender', seg.event, seg.event, seg.el);
		});
		this.trigger('eventAfterAllRender');
	},


	// Removes event elements from the view.
	// Should be overridden by subclasses. Should call this super-method FIRST, then subclass DOM destruction.
	destroyEvents: function() {
		this.segEach(function(seg) {
			this.trigger('eventDestroy', seg.event, seg.event, seg.el);
		});
	},


	// Given an event and the default element used for rendering, returns the element that should actually be used.
	// Basically runs events and elements through the eventRender hook.
	resolveEventEl: function(event, el) {
		var custom = this.trigger('eventRender', event, event, el);

		if (custom === false) { // means don't render at all
			el = null;
		}
		else if (custom && custom !== true) {
			el = $(custom);
		}

		return el;
	},


	// Hides all rendered event segments linked to the given event
	showEvent: function(event) {
		this.segEach(function(seg) {
			seg.el.css('visibility', '');
		}, event);
	},


	// Shows all rendered event segments linked to the given event
	hideEvent: function(event) {
		this.segEach(function(seg) {
			seg.el.css('visibility', 'hidden');
		}, event);
	},


	// Iterates through event segments. Goes through all by default.
	// If the optional `event` argument is specified, only iterates through segments linked to that event.
	// The `this` value of the callback function will be the view.
	segEach: function(func, event) {
		var segs = this.getSegs();
		var i;

		for (i = 0; i < segs.length; i++) {
			if (!event || segs[i].event._id === event._id) {
				func.call(this, segs[i]);
			}
		}
	},


	// Retrieves all the rendered segment objects for the view
	getSegs: function() {
		// subclasses must implement
	},


	/* Event Drag Visualization
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event hovering over the specified date.
	// `end` is a Moment and might be null.
	// `seg` might be null. if specified, it is the segment object of the event being dragged.
	//       otherwise, an external event from outside the calendar is being dragged.
	renderDrag: function(start, end, seg) {
		// subclasses should implement
	},


	// Unrenders a visual indication of event hovering
	destroyDrag: function() {
		// subclasses should implement
	},


	// Handler for accepting externally dragged events being dropped in the view.
	// Gets called when jqui's 'dragstart' is fired.
	documentDragStart: function(ev, ui) {
		var _this = this;
		var calendar = this.calendar;
		var eventStart = null; // a null value signals an unsuccessful drag
		var eventEnd = null;
		var visibleEnd = null; // will be calculated event when no eventEnd
		var el;
		var accept;
		var meta;
		var eventProps; // if an object, signals an event should be created upon drop
		var dragListener;

		if (this.opt('droppable')) { // only listen if this setting is on
			el = $(ev.target);

			// Test that the dragged element passes the dropAccept selector or filter function.
			// FYI, the default is "*" (matches all)
			accept = this.opt('dropAccept');
			if ($.isFunction(accept) ? accept.call(el[0], el) : el.is(accept)) {

				meta = getDraggedElMeta(el); // data for possibly creating an event
				eventProps = meta.eventProps;

				// listener that tracks mouse movement over date-associated pixel regions
				dragListener = new DragListener(this.coordMap, {
					cellOver: function(cell, cellDate) {
						eventStart = cellDate;
						eventEnd = meta.duration ? eventStart.clone().add(meta.duration) : null;
						visibleEnd = eventEnd || calendar.getDefaultEventEnd(!eventStart.hasTime(), eventStart);

						// keep the start/end up to date when dragging
						if (eventProps) {
							$.extend(eventProps, { start: eventStart, end: eventEnd });
						}

						if (calendar.isExternalDragAllowedInRange(eventStart, visibleEnd, eventProps)) {
							_this.renderDrag(eventStart, visibleEnd);
						}
						else {
							eventStart = null; // signal unsuccessful
							disableCursor();
						}
					},
					cellOut: function() {
						eventStart = null;
						_this.destroyDrag();
						enableCursor();
					}
				});

				// gets called, only once, when jqui drag is finished
				$(document).one('dragstop', function(ev, ui) {
					var renderedEvents;

					_this.destroyDrag();
					enableCursor();

					if (eventStart) { // element was dropped on a valid date/time cell

						// if dropped on an all-day cell, and element's metadata specified a time, set it
						if (meta.startTime && !eventStart.hasTime()) {
							eventStart.time(meta.startTime);
						}

						// trigger 'drop' regardless of whether element represents an event
						_this.trigger('drop', el[0], eventStart, ev, ui);

						// create an event from the given properties and the latest dates
						if (eventProps) {
							renderedEvents = calendar.renderEvent(eventProps, meta.stick);
							_this.trigger('eventReceive', null, renderedEvents[0]); // signal an external event landed
						}
					}
				});

				dragListener.startDrag(ev); // start listening immediately
			}
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Selects a date range on the view. `start` and `end` are both Moments.
	// `ev` is the native mouse event that begin the interaction.
	select: function(start, end, ev) {
		this.unselect(ev);
		this.renderSelection(start, end);
		this.reportSelection(start, end, ev);
	},


	// Renders a visual indication of the selection
	renderSelection: function(start, end) {
		// subclasses should implement
	},


	// Called when a new selection is made. Updates internal state and triggers handlers.
	reportSelection: function(start, end, ev) {
		this.isSelected = true;
		this.trigger('select', null, start, end, ev);
	},


	// Undoes a selection. updates in the internal state and triggers handlers.
	// `ev` is the native mouse event that began the interaction.
	unselect: function(ev) {
		if (this.isSelected) {
			this.isSelected = false;
			this.destroySelection();
			this.trigger('unselect', null, ev);
		}
	},


	// Unrenders a visual indication of selection
	destroySelection: function() {
		// subclasses should implement
	},


	// Handler for unselecting when the user clicks something and the 'unselectAuto' setting is on
	documentMousedown: function(ev) {
		var ignore;

		// is there a selection, and has the user made a proper left click?
		if (this.isSelected && this.opt('unselectAuto') && isPrimaryMouseButton(ev)) {

			// only unselect if the clicked element is not identical to or inside of an 'unselectCancel' element
			ignore = this.opt('unselectCancel');
			if (!ignore || !$(ev.target).closest(ignore).length) {
				this.unselect(ev);
			}
		}
	}

};


// We are mixing JavaScript OOP design patterns here by putting methods and member variables in the closed scope of the
// constructor. Going forward, methods should be part of the prototype.
function View(calendar) {
	var t = this;
	
	// exports
	t.calendar = calendar;
	t.opt = opt;
	t.trigger = trigger;
	t.isEventDraggable = isEventDraggable;
	t.isEventResizable = isEventResizable;
	t.eventDrop = eventDrop;
	t.eventResize = eventResize;
	
	// imports
	var reportEventChange = calendar.reportEventChange;
	
	// locals
	var options = calendar.options;
	var nextDayThreshold = moment.duration(options.nextDayThreshold);


	t.init(); // the "constructor" that concerns the prototype methods
	
	
	function opt(name) {
		var v = options[name];
		if ($.isPlainObject(v) && !isForcedAtomicOption(name)) {
			return smartProperty(v, t.name);
		}
		return v;
	}

	
	function trigger(name, thisObj) {
		return calendar.trigger.apply(
			calendar,
			[name, thisObj || t].concat(Array.prototype.slice.call(arguments, 2), [t])
		);
	}
	


	/* Event Editable Boolean Calculations
	------------------------------------------------------------------------------*/

	
	function isEventDraggable(event) {
		var source = event.source || {};

		return firstDefined(
			event.startEditable,
			source.startEditable,
			opt('eventStartEditable'),
			event.editable,
			source.editable,
			opt('editable')
		);
	}
	
	
	function isEventResizable(event) {
		var source = event.source || {};

		return firstDefined(
			event.durationEditable,
			source.durationEditable,
			opt('eventDurationEditable'),
			event.editable,
			source.editable,
			opt('editable')
		);
	}
	
	
	
	/* Event Elements
	------------------------------------------------------------------------------*/


	// Compute the text that should be displayed on an event's element.
	// Based off the settings of the view. Possible signatures:
	//   .getEventTimeText(event, formatStr)
	//   .getEventTimeText(startMoment, endMoment, formatStr)
	//   .getEventTimeText(startMoment, null, formatStr)
	// `timeFormat` is used but the `formatStr` argument can be used to override.
	t.getEventTimeText = function(event, formatStr) {
		var start;
		var end;

		if (typeof event === 'object' && typeof formatStr === 'object') {
			// first two arguments are actually moments (or null). shift arguments.
			start = event;
			end = formatStr;
			formatStr = arguments[2];
		}
		else {
			// otherwise, an event object was the first argument
			start = event.start;
			end = event.end;
		}

		formatStr = formatStr || opt('timeFormat');

		if (end && opt('displayEventEnd')) {
			return calendar.formatRange(start, end, formatStr);
		}
		else {
			return calendar.formatDate(start, formatStr);
		}
	};

	
	
	/* Event Modification Reporting
	---------------------------------------------------------------------------------*/

	
	function eventDrop(el, event, newStart, ev) {
		var mutateResult = calendar.mutateEvent(event, newStart, null);

		trigger(
			'eventDrop',
			el,
			event,
			mutateResult.dateDelta,
			function() {
				mutateResult.undo();
				reportEventChange();
			},
			ev,
			{} // jqui dummy
		);

		reportEventChange();
	}


	function eventResize(el, event, newEnd, ev) {
		var mutateResult = calendar.mutateEvent(event, null, newEnd);

		trigger(
			'eventResize',
			el,
			event,
			mutateResult.durationDelta,
			function() {
				mutateResult.undo();
				reportEventChange();
			},
			ev,
			{} // jqui dummy
		);

		reportEventChange();
	}


	// ====================================================================================================
	// Utilities for day "cells"
	// ====================================================================================================
	// The "basic" views are completely made up of day cells.
	// The "agenda" views have day cells at the top "all day" slot.
	// This was the obvious common place to put these utilities, but they should be abstracted out into
	// a more meaningful class (like DayEventRenderer).
	// ====================================================================================================


	// For determining how a given "cell" translates into a "date":
	//
	// 1. Convert the "cell" (row and column) into a "cell offset" (the # of the cell, cronologically from the first).
	//    Keep in mind that column indices are inverted with isRTL. This is taken into account.
	//
	// 2. Convert the "cell offset" to a "day offset" (the # of days since the first visible day in the view).
	//
	// 3. Convert the "day offset" into a "date" (a Moment).
	//
	// The reverse transformation happens when transforming a date into a cell.


	// exports
	t.isHiddenDay = isHiddenDay;
	t.skipHiddenDays = skipHiddenDays;
	t.getCellsPerWeek = getCellsPerWeek;
	t.dateToCell = dateToCell;
	t.dateToDayOffset = dateToDayOffset;
	t.dayOffsetToCellOffset = dayOffsetToCellOffset;
	t.cellOffsetToCell = cellOffsetToCell;
	t.cellToDate = cellToDate;
	t.cellToCellOffset = cellToCellOffset;
	t.cellOffsetToDayOffset = cellOffsetToDayOffset;
	t.dayOffsetToDate = dayOffsetToDate;
	t.rangeToSegments = rangeToSegments;
	t.isMultiDayEvent = isMultiDayEvent;


	// internals
	var hiddenDays = opt('hiddenDays') || []; // array of day-of-week indices that are hidden
	var isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
	var cellsPerWeek;
	var dayToCellMap = []; // hash from dayIndex -> cellIndex, for one week
	var cellToDayMap = []; // hash from cellIndex -> dayIndex, for one week
	var isRTL = opt('isRTL');


	// initialize important internal variables
	(function() {

		if (opt('weekends') === false) {
			hiddenDays.push(0, 6); // 0=sunday, 6=saturday
		}

		// Loop through a hypothetical week and determine which
		// days-of-week are hidden. Record in both hashes (one is the reverse of the other).
		for (var dayIndex=0, cellIndex=0; dayIndex<7; dayIndex++) {
			dayToCellMap[dayIndex] = cellIndex;
			isHiddenDayHash[dayIndex] = $.inArray(dayIndex, hiddenDays) != -1;
			if (!isHiddenDayHash[dayIndex]) {
				cellToDayMap[cellIndex] = dayIndex;
				cellIndex++;
			}
		}

		cellsPerWeek = cellIndex;
		if (!cellsPerWeek) {
			throw 'invalid hiddenDays'; // all days were hidden? bad.
		}

	})();


	// Is the current day hidden?
	// `day` is a day-of-week index (0-6), or a Moment
	function isHiddenDay(day) {
		if (moment.isMoment(day)) {
			day = day.day();
		}
		return isHiddenDayHash[day];
	}


	function getCellsPerWeek() {
		return cellsPerWeek;
	}


	// Incrementing the current day until it is no longer a hidden day, returning a copy.
	// If the initial value of `date` is not a hidden day, don't do anything.
	// Pass `isExclusive` as `true` if you are dealing with an end date.
	// `inc` defaults to `1` (increment one day forward each time)
	function skipHiddenDays(date, inc, isExclusive) {
		var out = date.clone();
		inc = inc || 1;
		while (
			isHiddenDayHash[(out.day() + (isExclusive ? inc : 0) + 7) % 7]
		) {
			out.add(inc, 'days');
		}
		return out;
	}


	//
	// TRANSFORMATIONS: cell -> cell offset -> day offset -> date
	//

	// cell -> date (combines all transformations)
	// Possible arguments:
	// - row, col
	// - { row:#, col: # }
	function cellToDate() {
		var cellOffset = cellToCellOffset.apply(null, arguments);
		var dayOffset = cellOffsetToDayOffset(cellOffset);
		var date = dayOffsetToDate(dayOffset);
		return date;
	}

	// cell -> cell offset
	// Possible arguments:
	// - row, col
	// - { row:#, col:# }
	function cellToCellOffset(row, col) {
		var colCnt = t.colCnt;

		// rtl variables. wish we could pre-populate these. but where?
		var dis = isRTL ? -1 : 1;
		var dit = isRTL ? colCnt - 1 : 0;

		if (typeof row == 'object') {
			col = row.col;
			row = row.row;
		}
		var cellOffset = row * colCnt + (col * dis + dit); // column, adjusted for RTL (dis & dit)

		return cellOffset;
	}

	// cell offset -> day offset
	function cellOffsetToDayOffset(cellOffset) {
		var day0 = t.start.day(); // first date's day of week
		cellOffset += dayToCellMap[day0]; // normlize cellOffset to beginning-of-week
		return Math.floor(cellOffset / cellsPerWeek) * 7 + // # of days from full weeks
			cellToDayMap[ // # of days from partial last week
				(cellOffset % cellsPerWeek + cellsPerWeek) % cellsPerWeek // crazy math to handle negative cellOffsets
			] -
			day0; // adjustment for beginning-of-week normalization
	}

	// day offset -> date
	function dayOffsetToDate(dayOffset) {
		return t.start.clone().add(dayOffset, 'days');
	}


	//
	// TRANSFORMATIONS: date -> day offset -> cell offset -> cell
	//

	// date -> cell (combines all transformations)
	function dateToCell(date) {
		var dayOffset = dateToDayOffset(date);
		var cellOffset = dayOffsetToCellOffset(dayOffset);
		var cell = cellOffsetToCell(cellOffset);
		return cell;
	}

	// date -> day offset
	function dateToDayOffset(date) {
		return date.clone().stripTime().diff(t.start, 'days');
	}

	// day offset -> cell offset
	function dayOffsetToCellOffset(dayOffset) {
		var day0 = t.start.day(); // first date's day of week
		dayOffset += day0; // normalize dayOffset to beginning-of-week
		return Math.floor(dayOffset / 7) * cellsPerWeek + // # of cells from full weeks
			dayToCellMap[ // # of cells from partial last week
				(dayOffset % 7 + 7) % 7 // crazy math to handle negative dayOffsets
			] -
			dayToCellMap[day0]; // adjustment for beginning-of-week normalization
	}

	// cell offset -> cell (object with row & col keys)
	function cellOffsetToCell(cellOffset) {
		var colCnt = t.colCnt;

		// rtl variables. wish we could pre-populate these. but where?
		var dis = isRTL ? -1 : 1;
		var dit = isRTL ? colCnt - 1 : 0;

		var row = Math.floor(cellOffset / colCnt);
		var col = ((cellOffset % colCnt + colCnt) % colCnt) * dis + dit; // column, adjusted for RTL (dis & dit)
		return {
			row: row,
			col: col
		};
	}


	//
	// Converts a date range into an array of segment objects.
	// "Segments" are horizontal stretches of time, sliced up by row.
	// A segment object has the following properties:
	// - row
	// - cols
	// - isStart
	// - isEnd
	//
	function rangeToSegments(start, end) {

		var rowCnt = t.rowCnt;
		var colCnt = t.colCnt;
		var segments = []; // array of segments to return

		// day offset for given date range
		var dayRange = computeDayRange(start, end); // convert to a whole-day range
		var rangeDayOffsetStart = dateToDayOffset(dayRange.start);
		var rangeDayOffsetEnd = dateToDayOffset(dayRange.end); // an exclusive value

		// first and last cell offset for the given date range
		// "last" implies inclusivity
		var rangeCellOffsetFirst = dayOffsetToCellOffset(rangeDayOffsetStart);
		var rangeCellOffsetLast = dayOffsetToCellOffset(rangeDayOffsetEnd) - 1;

		// loop through all the rows in the view
		for (var row=0; row<rowCnt; row++) {

			// first and last cell offset for the row
			var rowCellOffsetFirst = row * colCnt;
			var rowCellOffsetLast = rowCellOffsetFirst + colCnt - 1;

			// get the segment's cell offsets by constraining the range's cell offsets to the bounds of the row
			var segmentCellOffsetFirst = Math.max(rangeCellOffsetFirst, rowCellOffsetFirst);
			var segmentCellOffsetLast = Math.min(rangeCellOffsetLast, rowCellOffsetLast);

			// make sure segment's offsets are valid and in view
			if (segmentCellOffsetFirst <= segmentCellOffsetLast) {

				// translate to cells
				var segmentCellFirst = cellOffsetToCell(segmentCellOffsetFirst);
				var segmentCellLast = cellOffsetToCell(segmentCellOffsetLast);

				// view might be RTL, so order by leftmost column
				var cols = [ segmentCellFirst.col, segmentCellLast.col ].sort();

				// Determine if segment's first/last cell is the beginning/end of the date range.
				// We need to compare "day offset" because "cell offsets" are often ambiguous and
				// can translate to multiple days, and an edge case reveals itself when we the
				// range's first cell is hidden (we don't want isStart to be true).
				var isStart = cellOffsetToDayOffset(segmentCellOffsetFirst) == rangeDayOffsetStart;
				var isEnd = cellOffsetToDayOffset(segmentCellOffsetLast) + 1 == rangeDayOffsetEnd;
				                                                   // +1 for comparing exclusively

				segments.push({
					row: row,
					leftCol: cols[0],
					rightCol: cols[1],
					isStart: isStart,
					isEnd: isEnd
				});
			}
		}

		return segments;
	}


	// Returns the date range of the full days the given range visually appears to occupy.
	// Returns object with properties `start` (moment) and `end` (moment, exclusive end).
	function computeDayRange(start, end) {
		var startDay = start.clone().stripTime(); // the beginning of the day the range starts
		var endDay;
		var endTimeMS;

		if (end) {
			endDay = end.clone().stripTime(); // the beginning of the day the range exclusively ends
			endTimeMS = +end.time(); // # of milliseconds into `endDay`

			// If the end time is actually inclusively part of the next day and is equal to or
			// beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
			// Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
			if (endTimeMS && endTimeMS >= nextDayThreshold) {
				endDay.add(1, 'days');
			}
		}

		// If no end was specified, or if it is within `startDay` but not past nextDayThreshold,
		// assign the default duration of one day.
		if (!end || endDay <= startDay) {
			endDay = startDay.clone().add(1, 'days');
		}

		return { start: startDay, end: endDay };
	}


	// Does the given event visually appear to occupy more than one day?
	function isMultiDayEvent(event) {
		var range = computeDayRange(event.start, event.end);

		return range.end.diff(range.start, 'days') > 1;
	}

}


/* Utils
----------------------------------------------------------------------------------------------------------------------*/

// Require all HTML5 data-* attributes used by FullCalendar to have this prefix.
// A value of '' will query attributes like data-event. A value of 'fc' will query attributes like data-fc-event.
fc.dataAttrPrefix = '';

// Given a jQuery element that might represent a dragged FullCalendar event, returns an intermediate data structure
// to be used for Event Object creation.
// A defined `.eventProps`, even when empty, indicates that an event should be created.
function getDraggedElMeta(el) {
	var prefix = fc.dataAttrPrefix;
	var eventProps; // properties for creating the event, not related to date/time
	var startTime; // a Duration
	var duration;
	var stick;

	if (prefix) { prefix += '-'; }
	eventProps = el.data(prefix + 'event') || null;

	if (eventProps) {
		if (typeof eventProps === 'object') {
			eventProps = $.extend({}, eventProps); // make a copy
		}
		else { // something like 1 or true. still signal event creation
			eventProps = {};
		}

		// pluck special-cased date/time properties
		startTime = eventProps.start;
		if (startTime == null) { startTime = eventProps.time; } // accept 'time' as well
		duration = eventProps.duration;
		stick = eventProps.stick;
		delete eventProps.start;
		delete eventProps.time;
		delete eventProps.duration;
		delete eventProps.stick;
	}

	// fallback to standalone attribute values for each of the date/time properties
	if (startTime == null) { startTime = el.data(prefix + 'start'); }
	if (startTime == null) { startTime = el.data(prefix + 'time'); } // accept 'time' as well
	if (duration == null) { duration = el.data(prefix + 'duration'); }
	if (stick == null) { stick = el.data(prefix + 'stick'); }

	// massage into correct data types
	startTime = startTime != null ? moment.duration(startTime) : null;
	duration = duration != null ? moment.duration(duration) : null;
	stick = Boolean(stick);

	return { eventProps: eventProps, startTime: startTime, duration: duration, stick: stick };
}

;;

/* An abstract class for the "basic" views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a DayGrid subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.

function BasicView(calendar) {
	View.call(this, calendar); // call the super-constructor
	this.dayGrid = new DayGrid(this);
	this.coordMap = this.dayGrid.coordMap; // the view's date-to-cell mapping is identical to the subcomponent's
}


BasicView.prototype = createObject(View.prototype); // define the super-class
$.extend(BasicView.prototype, {

	dayGrid: null, // the main subcomponent that does most of the heavy lifting

	dayNumbersVisible: false, // display day numbers on each day cell?
	weekNumbersVisible: false, // display week numbers along the side?

	weekNumberWidth: null, // width of all the week-number cells running down the side

	headRowEl: null, // the fake row element of the day-of-week header


	// Renders the view into `this.el`, which should already be assigned.
	// rowCnt, colCnt, and dayNumbersVisible have been calculated by a subclass and passed here.
	render: function(rowCnt, colCnt, dayNumbersVisible) {

		// needed for cell-to-date and date-to-cell calculations in View
		this.rowCnt = rowCnt;
		this.colCnt = colCnt;

		this.dayNumbersVisible = dayNumbersVisible;
		this.weekNumbersVisible = this.opt('weekNumbers');
		this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible;

		this.el.addClass('fc-basic-view').html(this.renderHtml());

		this.headRowEl = this.el.find('thead .fc-row');

		this.scrollerEl = this.el.find('.fc-day-grid-container');
		this.dayGrid.coordMap.containerEl = this.scrollerEl; // constrain clicks/etc to the dimensions of the scroller

		this.dayGrid.el = this.el.find('.fc-day-grid');
		this.dayGrid.render(this.hasRigidRows());

		View.prototype.render.call(this); // call the super-method
	},


	// Make subcomponents ready for cleanup
	destroy: function() {
		this.dayGrid.destroy();
		View.prototype.destroy.call(this); // call the super-method
	},


	// Builds the HTML skeleton for the view.
	// The day-grid component will render inside of a container defined by this HTML.
	renderHtml: function() {
		return '' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<td class="' + this.widgetHeaderClass + '">' +
							this.dayGrid.headHtml() + // render the day-of-week headers
						'</td>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +
					'<tr>' +
						'<td class="' + this.widgetContentClass + '">' +
							'<div class="fc-day-grid-container">' +
								'<div class="fc-day-grid"/>' +
							'</div>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates the HTML that will go before the day-of week header cells.
	// Queried by the DayGrid subcomponent when generating rows. Ordering depends on isRTL.
	headIntroHtml: function() {
		if (this.weekNumbersVisible) {
			return '' +
				'<th class="fc-week-number ' + this.widgetHeaderClass + '" ' + this.weekNumberStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						htmlEscape(this.opt('weekNumberTitle')) +
					'</span>' +
				'</th>';
		}
	},


	// Generates the HTML that will go before content-skeleton cells that display the day/week numbers.
	// Queried by the DayGrid subcomponent. Ordering depends on isRTL.
	numberIntroHtml: function(row) {
		if (this.weekNumbersVisible) {
			return '' +
				'<td class="fc-week-number" ' + this.weekNumberStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						this.calendar.calculateWeekNumber(this.cellToDate(row, 0)) +
					'</span>' +
				'</td>';
		}
	},


	// Generates the HTML that goes before the day bg cells for each day-row.
	// Queried by the DayGrid subcomponent. Ordering depends on isRTL.
	dayIntroHtml: function() {
		if (this.weekNumbersVisible) {
			return '<td class="fc-week-number ' + this.widgetContentClass + '" ' +
				this.weekNumberStyleAttr() + '></td>';
		}
	},


	// Generates the HTML that goes before every other type of row generated by DayGrid. Ordering depends on isRTL.
	// Affects helper-skeleton and highlight-skeleton rows.
	introHtml: function() {
		if (this.weekNumbersVisible) {
			return '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + '></td>';
		}
	},


	// Generates the HTML for the <td>s of the "number" row in the DayGrid's content skeleton.
	// The number row will only exist if either day numbers or week numbers are turned on.
	numberCellHtml: function(row, col, date) {
		var classes;

		if (!this.dayNumbersVisible) { // if there are week numbers but not day numbers
			return '<td/>'; //  will create an empty space above events :(
		}

		classes = this.dayGrid.getDayClasses(date);
		classes.unshift('fc-day-number');

		return '' +
			'<td class="' + classes.join(' ') + '" data-date="' + date.format() + '">' +
				date.date() +
			'</td>';
	},


	// Generates an HTML attribute string for setting the width of the week number column, if it is known
	weekNumberStyleAttr: function() {
		if (this.weekNumberWidth !== null) {
			return 'style="width:' + this.weekNumberWidth + 'px"';
		}
		return '';
	},


	// Determines whether each row should have a constant height
	hasRigidRows: function() {
		var eventLimit = this.opt('eventLimit');
		return eventLimit && typeof eventLimit !== 'number';
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/


	// Refreshes the horizontal dimensions of the view
	updateWidth: function() {
		if (this.weekNumbersVisible) {
			// Make sure all week number cells running down the side have the same width.
			// Record the width for cells created later.
			this.weekNumberWidth = matchCellWidths(
				this.el.find('.fc-week-number')
			);
		}
	},


	// Adjusts the vertical dimensions of the view to the specified values
	setHeight: function(totalHeight, isAuto) {
		var eventLimit = this.opt('eventLimit');
		var scrollerHeight;

		// reset all heights to be natural
		unsetScroller(this.scrollerEl);
		uncompensateScroll(this.headRowEl);

		this.dayGrid.destroySegPopover(); // kill the "more" popover if displayed

		// is the event limit a constant level number?
		if (eventLimit && typeof eventLimit === 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels first so the height can redistribute after
		}

		scrollerHeight = this.computeScrollerHeight(totalHeight);
		this.setGridHeight(scrollerHeight, isAuto);

		// is the event limit dynamically calculated?
		if (eventLimit && typeof eventLimit !== 'number') {
			this.dayGrid.limitRows(eventLimit); // limit the levels after the grid's row heights have been set
		}

		if (!isAuto && setPotentialScroller(this.scrollerEl, scrollerHeight)) { // using scrollbars?

			compensateScroll(this.headRowEl, getScrollbarWidths(this.scrollerEl));

			// doing the scrollbar compensation might have created text overflow which created more height. redo
			scrollerHeight = this.computeScrollerHeight(totalHeight);
			this.scrollerEl.height(scrollerHeight);

			this.restoreScroll();
		}
	},


	// Sets the height of just the DayGrid component in this view
	setGridHeight: function(height, isAuto) {
		if (isAuto) {
			undistributeHeight(this.dayGrid.rowEls); // let the rows be their natural height with no expanding
		}
		else {
			distributeHeight(this.dayGrid.rowEls, height, true); // true = compensate for height-hogging rows
		}
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the given events onto the view and populates the segments array
	renderEvents: function(events) {
		this.dayGrid.renderEvents(events);

		this.updateHeight(); // must compensate for events that overflow the row

		View.prototype.renderEvents.call(this, events); // call the super-method
	},


	// Retrieves all segment objects that are rendered in the view
	getSegs: function() {
		return this.dayGrid.getSegs();
	},


	// Unrenders all event elements and clears internal segment data
	destroyEvents: function() {
		View.prototype.destroyEvents.call(this); // do this before dayGrid's segs have been cleared

		this.recordScroll(); // removing events will reduce height and mess with the scroll, so record beforehand
		this.dayGrid.destroyEvents();

		// we DON'T need to call updateHeight() because:
		// A) a renderEvents() call always happens after this, which will eventually call updateHeight()
		// B) in IE8, this causes a flash whenever events are rerendered
	},


	/* Event Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the view.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		return this.dayGrid.renderDrag(start, end, seg);
	},


	// Unrenders the visual indication of an event being dragged over the view
	destroyDrag: function() {
		this.dayGrid.destroyDrag();
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection
	renderSelection: function(start, end) {
		this.dayGrid.renderSelection(start, end);
	},


	// Unrenders a visual indications of a selection
	destroySelection: function() {
		this.dayGrid.destroySelection();
	}

});

;;

/* A month view with day cells running in rows (one-per-week) and columns
----------------------------------------------------------------------------------------------------------------------*/

setDefaults({
	fixedWeekCount: true
});

fcViews.month = MonthView; // register the view

function MonthView(calendar) {
	BasicView.call(this, calendar); // call the super-constructor
}


MonthView.prototype = createObject(BasicView.prototype); // define the super-class
$.extend(MonthView.prototype, {

	name: 'month',


	incrementDate: function(date, delta) {
		return date.clone().stripTime().add(delta, 'months').startOf('month');
	},


	render: function(date) {
		var rowCnt;

		this.intervalStart = date.clone().stripTime().startOf('month');
		this.intervalEnd = this.intervalStart.clone().add(1, 'months');

		this.start = this.intervalStart.clone();
		this.start = this.skipHiddenDays(this.start); // move past the first week if no visible days
		this.start.startOf('week');
		this.start = this.skipHiddenDays(this.start); // move past the first invisible days of the week

		this.end = this.intervalEnd.clone();
		this.end = this.skipHiddenDays(this.end, -1, true); // move in from the last week if no visible days
		this.end.add((7 - this.end.weekday()) % 7, 'days'); // move to end of week if not already
		this.end = this.skipHiddenDays(this.end, -1, true); // move in from the last invisible days of the week

		rowCnt = Math.ceil( // need to ceil in case there are hidden days
			this.end.diff(this.start, 'weeks', true) // returnfloat=true
		);
		if (this.isFixedWeeks()) {
			this.end.add(6 - rowCnt, 'weeks');
			rowCnt = 6;
		}

		this.title = this.calendar.formatDate(this.intervalStart, this.opt('titleFormat'));

		BasicView.prototype.render.call(this, rowCnt, this.getCellsPerWeek(), true); // call the super-method
	},


	// Overrides the default BasicView behavior to have special multi-week auto-height logic
	setGridHeight: function(height, isAuto) {

		isAuto = isAuto || this.opt('weekMode') === 'variable'; // LEGACY: weekMode is deprecated

		// if auto, make the height of each row the height that it would be if there were 6 weeks
		if (isAuto) {
			height *= this.rowCnt / 6;
		}

		distributeHeight(this.dayGrid.rowEls, height, !isAuto); // if auto, don't compensate for height-hogging rows
	},


	isFixedWeeks: function() {
		var weekMode = this.opt('weekMode'); // LEGACY: weekMode is deprecated
		if (weekMode) {
			return weekMode === 'fixed'; // if any other type of weekMode, assume NOT fixed
		}

		return this.opt('fixedWeekCount');
	}

});

;;

/* A week view with simple day cells running horizontally
----------------------------------------------------------------------------------------------------------------------*/
// TODO: a WeekView mixin for calculating dates and titles

fcViews.basicWeek = BasicWeekView; // register this view

function BasicWeekView(calendar) {
	BasicView.call(this, calendar); // call the super-constructor
}


BasicWeekView.prototype = createObject(BasicView.prototype); // define the super-class
$.extend(BasicWeekView.prototype, {

	name: 'basicWeek',


	incrementDate: function(date, delta) {
		return date.clone().stripTime().add(delta, 'weeks').startOf('week');
	},


	render: function(date) {

		this.intervalStart = date.clone().stripTime().startOf('week');
		this.intervalEnd = this.intervalStart.clone().add(1, 'weeks');

		this.start = this.skipHiddenDays(this.intervalStart);
		this.end = this.skipHiddenDays(this.intervalEnd, -1, true);

		this.title = this.calendar.formatRange(
			this.start,
			this.end.clone().subtract(1), // make inclusive by subtracting 1 ms
			this.opt('titleFormat'),
			' \u2014 ' // emphasized dash
		);

		BasicView.prototype.render.call(this, 1, this.getCellsPerWeek(), false); // call the super-method
	}
	
});
;;

/* A view with a single simple day cell
----------------------------------------------------------------------------------------------------------------------*/

fcViews.basicDay = BasicDayView; // register this view

function BasicDayView(calendar) {
	BasicView.call(this, calendar); // call the super-constructor
}


BasicDayView.prototype = createObject(BasicView.prototype); // define the super-class
$.extend(BasicDayView.prototype, {

	name: 'basicDay',


	incrementDate: function(date, delta) {
		var out = date.clone().stripTime().add(delta, 'days');
		out = this.skipHiddenDays(out, delta < 0 ? -1 : 1);
		return out;
	},


	render: function(date) {

		this.start = this.intervalStart = date.clone().stripTime();
		this.end = this.intervalEnd = this.start.clone().add(1, 'days');

		this.title = this.calendar.formatDate(this.start, this.opt('titleFormat'));

		BasicView.prototype.render.call(this, 1, 1, false); // call the super-method
	}

});
;;

/* An abstract class for all agenda-related views. Displays one more columns with time slots running vertically.
----------------------------------------------------------------------------------------------------------------------*/
// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
// Responsible for managing width/height.

setDefaults({
	allDaySlot: true,
	allDayText: 'all-day',

	scrollTime: '06:00:00',

	slotDuration: '00:30:00',

	axisFormat: generateAgendaAxisFormat,
	timeFormat: {
		agenda: generateAgendaTimeFormat
	},

	minTime: '00:00:00',
	maxTime: '24:00:00',
	slotEventOverlap: true
});

var AGENDA_ALL_DAY_EVENT_LIMIT = 5;


function generateAgendaAxisFormat(options, langData) {
	return langData.longDateFormat('LT')
		.replace(':mm', '(:mm)')
		.replace(/(\Wmm)$/, '($1)') // like above, but for foreign langs
		.replace(/\s*a$/i, 'a'); // convert AM/PM/am/pm to lowercase. remove any spaces beforehand
}


function generateAgendaTimeFormat(options, langData) {
	return langData.longDateFormat('LT')
		.replace(/\s*a$/i, ''); // remove trailing AM/PM
}


function AgendaView(calendar) {
	View.call(this, calendar); // call the super-constructor

	this.timeGrid = new TimeGrid(this);

	if (this.opt('allDaySlot')) { // should we display the "all-day" area?
		this.dayGrid = new DayGrid(this); // the all-day subcomponent of this view

		// the coordinate grid will be a combination of both subcomponents' grids
		this.coordMap = new ComboCoordMap([
			this.dayGrid.coordMap,
			this.timeGrid.coordMap
		]);
	}
	else {
		this.coordMap = this.timeGrid.coordMap;
	}
}


AgendaView.prototype = createObject(View.prototype); // define the super-class
$.extend(AgendaView.prototype, {

	timeGrid: null, // the main time-grid subcomponent of this view
	dayGrid: null, // the "all-day" subcomponent. if all-day is turned off, this will be null

	axisWidth: null, // the width of the time axis running down the side

	noScrollRowEls: null, // set of fake row elements that must compensate when scrollerEl has scrollbars

	// when the time-grid isn't tall enough to occupy the given height, we render an <hr> underneath
	bottomRuleEl: null,
	bottomRuleHeight: null,


	/* Rendering
	------------------------------------------------------------------------------------------------------------------*/


	// Renders the view into `this.el`, which has already been assigned.
	// `colCnt` has been calculated by a subclass and passed here.
	render: function(colCnt) {

		// needed for cell-to-date and date-to-cell calculations in View
		this.rowCnt = 1;
		this.colCnt = colCnt;

		this.el.addClass('fc-agenda-view').html(this.renderHtml());

		// the element that wraps the time-grid that will probably scroll
		this.scrollerEl = this.el.find('.fc-time-grid-container');
		this.timeGrid.coordMap.containerEl = this.scrollerEl; // don't accept clicks/etc outside of this

		this.timeGrid.el = this.el.find('.fc-time-grid');
		this.timeGrid.render();

		// the <hr> that sometimes displays under the time-grid
		this.bottomRuleEl = $('<hr class="' + this.widgetHeaderClass + '"/>')
			.appendTo(this.timeGrid.el); // inject it into the time-grid

		if (this.dayGrid) {
			this.dayGrid.el = this.el.find('.fc-day-grid');
			this.dayGrid.render();

			// have the day-grid extend it's coordinate area over the <hr> dividing the two grids
			this.dayGrid.bottomCoordPadding = this.dayGrid.el.next('hr').outerHeight();
		}

		this.noScrollRowEls = this.el.find('.fc-row:not(.fc-scroller *)'); // fake rows not within the scroller

		View.prototype.render.call(this); // call the super-method

		this.resetScroll(); // do this after sizes have been set
	},


	// Make subcomponents ready for cleanup
	destroy: function() {
		this.timeGrid.destroy();
		if (this.dayGrid) {
			this.dayGrid.destroy();
		}
		View.prototype.destroy.call(this); // call the super-method
	},


	// Builds the HTML skeleton for the view.
	// The day-grid and time-grid components will render inside containers defined by this HTML.
	renderHtml: function() {
		return '' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<td class="' + this.widgetHeaderClass + '">' +
							this.timeGrid.headHtml() + // render the day-of-week headers
						'</td>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +
					'<tr>' +
						'<td class="' + this.widgetContentClass + '">' +
							(this.dayGrid ?
								'<div class="fc-day-grid"/>' +
								'<hr class="' + this.widgetHeaderClass + '"/>' :
								''
								) +
							'<div class="fc-time-grid-container">' +
								'<div class="fc-time-grid"/>' +
							'</div>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>';
	},


	// Generates the HTML that will go before the day-of week header cells.
	// Queried by the TimeGrid subcomponent when generating rows. Ordering depends on isRTL.
	headIntroHtml: function() {
		var date;
		var weekNumber;
		var weekTitle;
		var weekText;

		if (this.opt('weekNumbers')) {
			date = this.cellToDate(0, 0);
			weekNumber = this.calendar.calculateWeekNumber(date);
			weekTitle = this.opt('weekNumberTitle');

			if (this.opt('isRTL')) {
				weekText = weekNumber + weekTitle;
			}
			else {
				weekText = weekTitle + weekNumber;
			}

			return '' +
				'<th class="fc-axis fc-week-number ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + '>' +
					'<span>' + // needed for matchCellWidths
						htmlEscape(weekText) +
					'</span>' +
				'</th>';
		}
		else {
			return '<th class="fc-axis ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + '></th>';
		}
	},


	// Generates the HTML that goes before the all-day cells.
	// Queried by the DayGrid subcomponent when generating rows. Ordering depends on isRTL.
	dayIntroHtml: function() {
		return '' +
			'<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + '>' +
				'<span>' + // needed for matchCellWidths
					(this.opt('allDayHtml') || htmlEscape(this.opt('allDayText'))) +
				'</span>' +
			'</td>';
	},


	// Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
	slotBgIntroHtml: function() {
		return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + '></td>';
	},


	// Generates the HTML that goes before all other types of cells.
	// Affects content-skeleton, helper-skeleton, highlight-skeleton for both the time-grid and day-grid.
	// Queried by the TimeGrid and DayGrid subcomponents when generating rows. Ordering depends on isRTL.
	introHtml: function() {
		return '<td class="fc-axis" ' + this.axisStyleAttr() + '></td>';
	},


	// Generates an HTML attribute string for setting the width of the axis, if it is known
	axisStyleAttr: function() {
		if (this.axisWidth !== null) {
			 return 'style="width:' + this.axisWidth + 'px"';
		}
		return '';
	},


	/* Dimensions
	------------------------------------------------------------------------------------------------------------------*/

	updateSize: function(isResize) {
		if (isResize) {
			this.timeGrid.resize();
		}
		View.prototype.updateSize.call(this, isResize);
	},


	// Refreshes the horizontal dimensions of the view
	updateWidth: function() {
		// make all axis cells line up, and record the width so newly created axis cells will have it
		this.axisWidth = matchCellWidths(this.el.find('.fc-axis'));
	},


	// Adjusts the vertical dimensions of the view to the specified values
	setHeight: function(totalHeight, isAuto) {
		var eventLimit;
		var scrollerHeight;

		if (this.bottomRuleHeight === null) {
			// calculate the height of the rule the very first time
			this.bottomRuleHeight = this.bottomRuleEl.outerHeight();
		}
		this.bottomRuleEl.hide(); // .show() will be called later if this <hr> is necessary

		// reset all dimensions back to the original state
		this.scrollerEl.css('overflow', '');
		unsetScroller(this.scrollerEl);
		uncompensateScroll(this.noScrollRowEls);

		// limit number of events in the all-day area
		if (this.dayGrid) {
			this.dayGrid.destroySegPopover(); // kill the "more" popover if displayed

			eventLimit = this.opt('eventLimit');
			if (eventLimit && typeof eventLimit !== 'number') {
				eventLimit = AGENDA_ALL_DAY_EVENT_LIMIT; // make sure "auto" goes to a real number
			}
			if (eventLimit) {
				this.dayGrid.limitRows(eventLimit);
			}
		}

		if (!isAuto) { // should we force dimensions of the scroll container, or let the contents be natural height?

			scrollerHeight = this.computeScrollerHeight(totalHeight);
			if (setPotentialScroller(this.scrollerEl, scrollerHeight)) { // using scrollbars?

				// make the all-day and header rows lines up
				compensateScroll(this.noScrollRowEls, getScrollbarWidths(this.scrollerEl));

				// the scrollbar compensation might have changed text flow, which might affect height, so recalculate
				// and reapply the desired height to the scroller.
				scrollerHeight = this.computeScrollerHeight(totalHeight);
				this.scrollerEl.height(scrollerHeight);

				this.restoreScroll();
			}
			else { // no scrollbars
				// still, force a height and display the bottom rule (marks the end of day)
				this.scrollerEl.height(scrollerHeight).css('overflow', 'hidden'); // in case <hr> goes outside
				this.bottomRuleEl.show();
			}
		}
	},


	// Sets the scroll value of the scroller to the intial pre-configured state prior to allowing the user to change it.
	resetScroll: function() {
		var _this = this;
		var scrollTime = moment.duration(this.opt('scrollTime'));
		var top = this.timeGrid.computeTimeTop(scrollTime);

		// zoom can give weird floating-point values. rather scroll a little bit further
		top = Math.ceil(top);

		if (top) {
			top++; // to overcome top border that slots beyond the first have. looks better
		}

		function scroll() {
			_this.scrollerEl.scrollTop(top);
		}

		scroll();
		setTimeout(scroll, 0); // overrides any previous scroll state made by the browser
	},


	/* Events
	------------------------------------------------------------------------------------------------------------------*/


	// Renders events onto the view and populates the View's segment array
	renderEvents: function(events) {
		var dayEvents = [];
		var timedEvents = [];
		var daySegs = [];
		var timedSegs;
		var i;

		// separate the events into all-day and timed
		for (i = 0; i < events.length; i++) {
			if (events[i].allDay) {
				dayEvents.push(events[i]);
			}
			else {
				timedEvents.push(events[i]);
			}
		}

		// render the events in the subcomponents
		timedSegs = this.timeGrid.renderEvents(timedEvents);
		if (this.dayGrid) {
			daySegs = this.dayGrid.renderEvents(dayEvents);
		}

		// the all-day area is flexible and might have a lot of events, so shift the height
		this.updateHeight();

		View.prototype.renderEvents.call(this, events); // call the super-method
	},


	// Retrieves all segment objects that are rendered in the view
	getSegs: function() {
		return this.timeGrid.getSegs().concat(
			this.dayGrid ? this.dayGrid.getSegs() : []
		);
	},


	// Unrenders all event elements and clears internal segment data
	destroyEvents: function() {
		View.prototype.destroyEvents.call(this); // do this before the grids' segs have been cleared

		// if destroyEvents is being called as part of an event rerender, renderEvents will be called shortly
		// after, so remember what the scroll value was so we can restore it.
		this.recordScroll();

		// destroy the events in the subcomponents
		this.timeGrid.destroyEvents();
		if (this.dayGrid) {
			this.dayGrid.destroyEvents();
		}

		// we DON'T need to call updateHeight() because:
		// A) a renderEvents() call always happens after this, which will eventually call updateHeight()
		// B) in IE8, this causes a flash whenever events are rerendered
	},


	/* Event Dragging
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of an event being dragged over the view.
	// A returned value of `true` signals that a mock "helper" event has been rendered.
	renderDrag: function(start, end, seg) {
		if (start.hasTime()) {
			return this.timeGrid.renderDrag(start, end, seg);
		}
		else if (this.dayGrid) {
			return this.dayGrid.renderDrag(start, end, seg);
		}
	},


	// Unrenders a visual indications of an event being dragged over the view
	destroyDrag: function() {
		this.timeGrid.destroyDrag();
		if (this.dayGrid) {
			this.dayGrid.destroyDrag();
		}
	},


	/* Selection
	------------------------------------------------------------------------------------------------------------------*/


	// Renders a visual indication of a selection
	renderSelection: function(start, end) {
		if (start.hasTime() || end.hasTime()) {
			this.timeGrid.renderSelection(start, end);
		}
		else if (this.dayGrid) {
			this.dayGrid.renderSelection(start, end);
		}
	},


	// Unrenders a visual indications of a selection
	destroySelection: function() {
		this.timeGrid.destroySelection();
		if (this.dayGrid) {
			this.dayGrid.destroySelection();
		}
	}

});

;;

/* A week view with an all-day cell area at the top, and a time grid below
----------------------------------------------------------------------------------------------------------------------*/
// TODO: a WeekView mixin for calculating dates and titles

fcViews.agendaWeek = AgendaWeekView; // register the view

function AgendaWeekView(calendar) {
	AgendaView.call(this, calendar); // call the super-constructor
}


AgendaWeekView.prototype = createObject(AgendaView.prototype); // define the super-class
$.extend(AgendaWeekView.prototype, {

	name: 'agendaWeek',


	incrementDate: function(date, delta) {
		return date.clone().stripTime().add(delta, 'weeks').startOf('week');
	},


	render: function(date) {

		this.intervalStart = date.clone().stripTime().startOf('week');
		this.intervalEnd = this.intervalStart.clone().add(1, 'weeks');

		this.start = this.skipHiddenDays(this.intervalStart);
		this.end = this.skipHiddenDays(this.intervalEnd, -1, true);

		this.title = this.calendar.formatRange(
			this.start,
			this.end.clone().subtract(1), // make inclusive by subtracting 1 ms
			this.opt('titleFormat'),
			' \u2014 ' // emphasized dash
		);

		AgendaView.prototype.render.call(this, this.getCellsPerWeek()); // call the super-method
	}

});

;;

/* A day view with an all-day cell area at the top, and a time grid below
----------------------------------------------------------------------------------------------------------------------*/

fcViews.agendaDay = AgendaDayView; // register the view

function AgendaDayView(calendar) {
	AgendaView.call(this, calendar); // call the super-constructor
}


AgendaDayView.prototype = createObject(AgendaView.prototype); // define the super-class
$.extend(AgendaDayView.prototype, {

	name: 'agendaDay',


	incrementDate: function(date, delta) {
		var out = date.clone().stripTime().add(delta, 'days');
		out = this.skipHiddenDays(out, delta < 0 ? -1 : 1);
		return out;
	},


	render: function(date) {

		this.start = this.intervalStart = date.clone().stripTime();
		this.end = this.intervalEnd = this.start.clone().add(1, 'days');

		this.title = this.calendar.formatDate(this.start, this.opt('titleFormat'));

		AgendaView.prototype.render.call(this, 1); // call the super-method
	}

});

;;

});

(function($) {
	$.extend(cabcq.util, {
		isMobile: function(){
			
		},
		getParameterByName: function(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		urlParameters: function () {

			// This function is anonymous, is executed immediately and 
			// the return value is assigned to QueryString!
			var query_string = {};
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
					// If first entry with this name
				if (typeof query_string[pair[0]] === "undefined") {
					query_string[pair[0]] = pair[1];
					// If second entry with this name
				} else if (typeof query_string[pair[0]] === "string") {
					var arr = [ query_string[pair[0]], pair[1] ];
					query_string[pair[0]] = arr;
					// If third or later entry with this name
				} else {
					query_string[pair[0]].push(pair[1]);
				}
			} 
			return query_string;
		},
		getObjectSize: function(obj){
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		}
	});
})($);

(function(){
	$(document).on("ready", function(){
		// Array of objects in the style below
		var adobeFontConfig = {
			fonts: [
				/*{
					cmps : "jQuery selector", // Component CSS selector that requires Edge font
					font : "font name"  // Name of font according to the Adobe Edge website
				}*/
			]
		}

		// Parse the local Adobe Font Config for any fonts that need a script tag added to the document
		if (adobeFontConfig.fonts.length > 0) {
			for (var i = 0; i < adobeFontConfig.fonts.length; i++) {
				if ($(adobeFontConfig.fonts[i].cmps).length > 0) {
					loadAdobeEdgeFont(adobeFontConfig.fonts[i].font);
				}
			}
		}

		// Call Adobe Edge fonts on a font-by-font basis
		function loadAdobeEdgeFont(font) {
			var awf = document.createElement('script');
		    awf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		      '://use.edgefonts.net/' + font + '.js';
		    awf.type = 'text/javascript';
		    awf.async = 'true';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(awf, s);
		}
	});
})();
$(function(){
	$('.modalLayer').click(function(event){
		event.preventDefault();
		var modalName = $(this).data("modalName");
		var className = $('#' + modalName).data("classname");
		var position = $('#' + modalName).data("position");

		var self = this;

		if(position === "centered"){
			$(this).colorbox({
				html: $("#" + modalName).html(),
				open: true,
				close:"X",
				transition: "none",
				width: $("#" + modalName).parent().parents(".gridUnit > div").outerWidth()
			});
		}else if(position === "current"){
			$(this).colorbox({
				html: $("#" + modalName).html(),
				open: true,
				close:"X",
				fixed: true,
				transition: "none",
				top: $("#" + modalName).parent().position().top + 10,
				left: $("#" + modalName).parent().position().left,
				width: $("#" + modalName).parent().parents(".gridUnit > div").outerWidth()
			});
		}
	});

});
/*!
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.3.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this,
                responsiveSettings, breakpoint;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return '<button type="button" data-role="none">' + (i + 1) + '</button>';
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                fade: false,
                focusOnSelect: false,
                infinite: true,
                lazyLoad: 'ondemand',
                onBeforeChange: null,
                onAfterChange: null,
                onInit: null,
                onReInit: null,
                pauseOnHover: true,
                pauseOnDotsHover: false,
                responsive: null,
                rtl: false,
                slide: 'div',
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                variableWidth: false,
                vertical: false,
                waitForAnimate: true
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentSlide: 0,
                currentLeft: null,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.paused = false;
            _.positionProp = null;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.windowWidth = 0;
            _.windowTimer = null;

            _.options = $.extend({}, _.defaults, settings);

            _.originalSettings = _.options;
            responsiveSettings = _.options.responsive || null;

            if (responsiveSettings && responsiveSettings.length > -1) {
                for (breakpoint in responsiveSettings) {
                    if (responsiveSettings.hasOwnProperty(breakpoint)) {
                        _.breakpoints.push(responsiveSettings[
                            breakpoint].breakpoint);
                        _.breakpointSettings[responsiveSettings[
                            breakpoint].breakpoint] =
                            responsiveSettings[breakpoint].settings;
                    }
                }
                _.breakpoints.sort(function(a, b) {
                    return b - a;
                });
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.init();

        }

        return Slick;

    }());

    Slick.prototype.addSlide = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr("index",index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {}, _ = this;

        if(_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({height: targetHeight},_.options.speed);
        }

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {

                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.asNavFor = function(index) {
        var _ = this, asNavFor = _.options.asNavFor != null ? $(_.options.asNavFor).getSlick() : null;
        if(asNavFor != null) asNavFor.slideHandler(index, true);
    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator,
                _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this;

        if (_.options.infinite === false) {

            if (_.direction === 1) {

                if ((_.currentSlide + 1) === _.slideCount -
                    1) {
                    _.direction = 0;
                }

                _.slideHandler(_.currentSlide + _.options.slidesToScroll);

            } else {

                if ((_.currentSlide - 1 === 0)) {

                    _.direction = 1;

                }

                _.slideHandler(_.currentSlide - _.options.slidesToScroll);

            }

        } else {

            _.slideHandler(_.currentSlide + _.options.slidesToScroll);

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow = $(_.options.prevArrow);
            _.$nextArrow = $(_.options.nextArrow);

            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.appendTo(_.options.appendArrows);
            }

            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.appendTo(_.options.appendArrows);
            }

            if (_.options.infinite !== true) {
                _.$prevArrow.addClass('slick-disabled');
            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dotString;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            dotString = '<ul class="' + _.options.dotsClass + '">';

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
            }

            dotString += '</ul>';

            _.$dots = $(dotString).appendTo(
                _.options.appendDots);

            _.$dots.find('li').first().addClass(
                'slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides = _.$slider.children(_.options.slide +
            ':not(.slick-cloned)').addClass(
            'slick-slide');
        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element).attr("index",index);
        });

        _.$slidesCache = _.$slides;

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true) {
            _.options.slidesToScroll = 1;
            if (_.options.slidesToShow % 2 === 0) {
                _.options.slidesToShow = 3;
            }
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();

        if (_.options.accessibility === true) {
            _.$list.prop('tabIndex', 0);
        }

        _.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.checkResponsive = function() {

        var _ = this,
            breakpoint, targetBreakpoint;

        if (_.originalSettings.responsive && _.originalSettings
            .responsive.length > -1 && _.originalSettings.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if ($(window).width() < _.breakpoints[
                        breakpoint]) {
                        targetBreakpoint = _.breakpoints[
                            breakpoint];
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        _.options = $.extend({}, _.options,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        _.refresh();
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    _.options = $.extend({}, _.options,
                        _.breakpointSettings[
                            targetBreakpoint]);
                    _.refresh();
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = $.extend({}, _.options,
                        _.originalSettings);
                    _.refresh();
                }
            }

        }

    };

    Slick.prototype.changeSlide = function(event) {

        var _ = this,
            $target = $(event.target),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        $target.is('a') && event.preventDefault();

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide  - slideOffset);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $(event.target).parent().index() * _.options.slidesToScroll;
                _.slideHandler(index);

            default:
                return false;
        }

    };

    Slick.prototype.destroy = function() {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        $('.slick-cloned', _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove();
        }
        if (_.$prevArrow) {
            _.$prevArrow.remove();
            _.$nextArrow.remove();
        }
        if (_.$slides.parent().hasClass('slick-track')) {
            _.$slides.unwrap().unwrap();
        }
        _.$slides.removeClass(
            'slick-slide slick-active slick-visible').css('width', '');
        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');

        _.$list.off('.slick');
        $(window).off('.slick-' + _.instanceUid);
        $(document).off('.slick-' + _.instanceUid);

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = "";

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: 1000
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: 1000
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.filterSlides = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.getCurrent = function() {

        var _ = this;

        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this,
            breaker = 0,
            dotCounter = 0,
            dotCount = 0,
            dotLimit;

        dotLimit = _.options.infinite === true ? _.slideCount + _.options.slidesToShow - _.options.slidesToScroll : _.slideCount;

        while (breaker < dotLimit) {
            dotCount++;
            dotCounter += _.options.slidesToScroll;
            breaker = dotCounter + _.options.slidesToShow;
        }

        return dotCount;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            slideWidth,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight();

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    _.slideOffset = ((_.slideCount % _.options.slidesToShow) * _.slideWidth) * -1;
                    verticalOffset = ((_.slideCount % _.options.slidesToShow) * verticalHeight) * -1;
                }
            }
        } else {
            if (_.slideCount % _.options.slidesToShow !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    _.slideOffset = (_.options.slidesToShow * _.slideWidth) - ((_.slideCount % _.options.slidesToShow) * _.slideWidth);
                    verticalOffset = ((_.slideCount % _.options.slidesToShow) * verticalHeight);
                }
            }
        }

        if (_.slideCount <= _.options.slidesToShow){
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if(_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }
            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            if (_.options.centerMode === true) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.init = function() {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.checkResponsive();
        }

        if (_.options.onInit !== null) {
            _.options.onInit.call(this, _);
        }

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', _.autoPlayClear)
                .on('mouseleave.slick', _.autoPlay);
        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        if (_.options.pauseOnHover === true && _.options.autoplay === true) {
            _.$list.on('mouseenter.slick', _.autoPlayClear);
            _.$list.on('mouseleave.slick', _.autoPlay);
        }

        if(_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if(_.options.focusOnSelect === true) {
            $(_.options.slide, _.$slideTrack).on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, function() {
            _.checkResponsive();
            _.setPosition();
        });

        $(window).on('resize.slick.slick-' + _.instanceUid, function() {
            if ($(window).width() !== _.windowWidth) {
                clearTimeout(_.windowDelay);
                _.windowDelay = window.setTimeout(function() {
                    _.windowWidth = $(window).width();
                    _.checkResponsive();
                    _.setPosition();
                }, 50);
            }
        });

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

        if (_.options.autoplay === true) {

            _.autoPlay();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;

        if (event.keyCode === 37) {
            _.changeSlide({
                data: {
                    message: 'previous'
                }
            });
        } else if (event.keyCode === 39) {
            _.changeSlide({
                data: {
                    message: 'next'
                }
            });
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy');

                image
                  .load(function() { image.animate({ opacity: 1 }, 200); })
                  .css({ opacity: 0 })
                  .attr('src', imageSource)
                  .removeAttr('data-lazy')
                  .removeClass('slick-loading');
            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow/2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow/2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow/2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = rangeStart + _.options.slidesToShow;
            if (_.options.fade === true ) {
                if(rangeStart > 0) rangeStart--;
                if(rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

          if (_.slideCount <= _.options.slidesToShow){
              cloneRange = _.$slider.find('.slick-slide')
              loadImages(cloneRange)
          }else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange)
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if (_.options.onAfterChange !== null) {
            _.options.onAfterChange.call(this, _, index);
        }

        _.animating = false;

        _.setPosition();

        _.swipeLeft = null;

        if (_.options.autoplay === true && _.paused === false) {
            _.autoPlay();
        }

    };

    Slick.prototype.progressiveLazyLoad = function() {

        var _ = this,
            imgCount, targetImage;

        imgCount = $('img[data-lazy]').length;

        if (imgCount > 0) {
            targetImage = $('img[data-lazy]', _.$slider).first();
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {
                targetImage.removeAttr('data-lazy');
                _.progressiveLazyLoad();
            })
         .error(function () {
          targetImage.removeAttr('data-lazy');
          _.progressiveLazyLoad();
         });
        }

    };

    Slick.prototype.refresh = function() {

        var _ = this,
            currentSlide = _.currentSlide;

        _.destroy();

        $.extend(_, _.initials);

        _.currentSlide = currentSlide;
        _.init();

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides = _.$slideTrack.children(_.options.slide).addClass(
            'slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.setProps();

        _.setupInfinite();

        _.buildArrows();

        _.updateArrows();

        _.initArrowEvents();

        _.buildDots();

        _.updateDots();

        _.initDotEvents();

        if(_.options.focusOnSelect === true) {
            $(_.options.slide, _.$slideTrack).on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(0);

        _.setPosition();

        if (_.options.onReInit !== null) {
            _.options.onReInit.call(this, _);
        }

    };

    Slick.prototype.removeSlide = function(index, removeBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        _.$slideTrack.children(this.options.slide).eq(index).remove();

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {}, x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? position + 'px' : '0px';
        y = _.positionProp == 'top' ? position + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if(_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.slideWidth = 0;
            _.$slideTrack.children('.slick-slide').each(function(){
                _.slideWidth += Math.ceil($(this).outerWidth(true));
            });
            _.$slideTrack.width(Math.ceil(_.slideWidth) + 1);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            $(element).css({
                position: 'relative',
                left: targetLeft,
                top: 0,
                zIndex: 800,
                opacity: 0
            });
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: 900,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if(_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if(_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = "-o-transform";
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = "-moz-transform";
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = "-webkit-transform";
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = "-ms-transform";
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = "transform";
            _.transitionType = 'transition';
        }
        _.transformsEnabled = (_.animType !== null && _.animType !== false);

    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        _.$slider.find('.slick-slide').removeClass('slick-active').removeClass('slick-center');
        allSlides = _.$slider.find('.slick-slide');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if(_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active');
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active');
                }

                if (index === 0) {
                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
                } else if (index === _.slideCount - 1) {
                    allSlides.eq(_.options.slidesToShow).addClass('slick-center');
                }

            }

            _.$slides.eq(index).addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
                _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active');
            } else if ( allSlides.length <= _.options.slidesToShow ) {
                allSlides.addClass('slick-active');
            } else {
                remainder = _.slideCount%_.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
                if(_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
                    allSlides.slice(indexOffset-(_.options.slidesToShow-remainder), indexOffset + remainder).addClass('slick-active');
                } else {
                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active');
                }
            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true || _.options.vertical === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                    infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('index', slideIndex-_.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('index', slideIndex+_.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;
        var index = parseInt($(event.target).parents('.slick-slide').attr("index"));
        if(!index) index = 0;

        if(_.slideCount <= _.options.slidesToShow){
            return;
        }
        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index,sync) {

        var targetSlide, animSlide, slideLeft, unevenOffset, targetLeft = null,
            _ = this;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return false;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        unevenOffset = _.slideCount % _.options.slidesToScroll !== 0 ? _.options.slidesToScroll : 0;

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > (_.slideCount - _.options.slidesToShow + unevenOffset))) {
            if(_.options.fade === false) {
                targetSlide = _.currentSlide;
                _.animateSlide(slideLeft, function() {
                    _.postSlide(targetSlide);
                });
            }
            return false;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if(_.options.fade === false) {
                targetSlide = _.currentSlide;
                _.animateSlide(slideLeft, function() {
                    _.postSlide(targetSlide);
                });
            }
            return false;
        }

        if (_.options.autoplay === true) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        if (_.options.onBeforeChange !== null && index !== _.currentSlide) {
            _.options.onBeforeChange.call(this, _, _.currentSlide, animSlide);
        }

        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            _.fadeSlide(animSlide, function() {
                _.postSlide(animSlide);
            });
            return false;
        }

        _.animateSlide(targetLeft, function() {
            _.postSlide(animSlide);
        });

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return 'left';
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return 'left';
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return 'right';
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this, slideCount, slidesTraversed, swipeDiff;

        _.dragging = false;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            $(event.target).on('click.slick', function(event) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
                $(event.target).off('click.slick');
            });

            if(_.options.swipeToSlide === true) {
                slidesTraversed = Math.round(_.touchObject.swipeLength / _.slideWidth);
                slideCount = slidesTraversed
            } else {
                slideCount = _.options.slidesToScroll;
            }

            switch (_.swipeDirection()) {
                case 'left':
                    _.slideHandler(_.currentSlide + slideCount);
                    _.touchObject = {};
                    break;

                case 'right':
                    _.slideHandler(_.currentSlide - slideCount);
                    _.touchObject = {};
                    break;
            }
        } else {
            if(_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
           return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
           return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            curLeft, swipeDirection, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        curLeft = _.getLeft(_.currentSlide);

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = _.touchObject.curX > _.touchObject.startX ? 1 : -1;

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + _.touchObject.swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (_.touchObject
                .swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        if (event.target.nodeName === 'IMG') {
            event.preventDefault();
        }

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove();
        }
        if (_.$prevArrow) {
            _.$prevArrow.remove();
            _.$nextArrow.remove();
        }
        _.$slides.removeClass(
            'slick-slide slick-active slick-visible').css('width', '');

    };

    Slick.prototype.updateArrows = function() {

        var _ = this;

        if (_.options.arrows === true && _.options.infinite !==
            true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.removeClass('slick-disabled');
            _.$nextArrow.removeClass('slick-disabled');
            if (_.currentSlide === 0) {
                _.$prevArrow.addClass('slick-disabled');
                _.$nextArrow.removeClass('slick-disabled');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
                _.$nextArrow.addClass('slick-disabled');
                _.$prevArrow.removeClass('slick-disabled');
            }
        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots.find('li').removeClass('slick-active');
            _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');

        }

    };

    $.fn.slick = function(options) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick = new Slick(element, options);

        });
    };

    $.fn.slickAdd = function(slide, slideIndex, addBefore) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.addSlide(slide, slideIndex, addBefore);

        });
    };

    $.fn.slickCurrentSlide = function() {
        var _ = this;
        return _.get(0).slick.getCurrent();
    };

    $.fn.slickFilter = function(filter) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.filterSlides(filter);

        });
    };

    $.fn.slickGoTo = function(slide) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.changeSlide({
                data: {
                    message: 'index',
                    index: parseInt(slide)
                }
            });

        });
    };

    $.fn.slickNext = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.changeSlide({
                data: {
                    message: 'next'
                }
            });

        });
    };

    $.fn.slickPause = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.autoPlayClear();
            element.slick.paused = true;

        });
    };

    $.fn.slickPlay = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.paused = false;
            element.slick.autoPlay();

        });
    };

    $.fn.slickPrev = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.changeSlide({
                data: {
                    message: 'previous'
                }
            });

        });
    };

    $.fn.slickRemove = function(slideIndex, removeBefore) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.removeSlide(slideIndex, removeBefore);

        });
    };

    $.fn.slickGetOption = function(option) {
        var _ = this;
        return _.get(0).slick.options[option];
    };

    $.fn.slickSetOption = function(option, value, refresh) {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.options[option] = value;

            if (refresh === true) {
                element.slick.unload();
                element.slick.reinit();
            }

        });
    };

    $.fn.slickUnfilter = function() {
        var _ = this;
        return _.each(function(index, element) {

            element.slick.unfilterSlides();

        });
    };

    $.fn.unslick = function() {
        var _ = this;
        return _.each(function(index, element) {

          if (element.slick) {
            element.slick.destroy();
          }

        });
    };

    $.fn.getSlick = function() {
        var s = null;
        var _ = this;
        _.each(function(index, element) {
            s = element.slick;
        });

        return s;
    };

}));

(function($) {
    Tc.Module.Aop_article_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {

        },

        after: function() {
            var self = this;
            if (self.$ctx.hasClass("interactiveArchive")) {
                self.$ctx.find(".archiveDropdown > div").on("click", function() {
                	if ($(this).find("select").length > 0) return;
                    $(this).toggleClass("active");
                });
                self.$ctx.find(".archiveDropdown li").on("click", function() {
                    var itemText = $(this).find("span").text();
                    var itemCount = $(this).data("count");
                    var selectedItemClass = "articleTeaserSection" + itemCount;
                    self.$ctx.find(".selectedItem").text(itemText);
                    self.$ctx.find(".articleTeasers").removeClass("active");
                    self.$ctx.find("." + selectedItemClass).addClass("active");
                });
                self.$ctx.find(".archiveDropdown select").on("change", function(x, y){
                    var $selectedOption = $(this).find(":selected");
                    var optionCount = $selectedOption.data("count");
                    var selectedItemClass = "articleTeaserSection" + optionCount;
                    self.$ctx.find(".articleTeasers").removeClass("active");
                    self.$ctx.find("." + selectedItemClass).addClass("active");
                });
            } else if (self.$ctx.hasClass("linkArchive")) {
            	self.$ctx.find(".archiveDropdown").on("click", function() {
                    $(this).toggleClass("active");
                });
                self.$ctx.find(".archiveDropdown select").on("change", function(x, y){
                    var $selectedOption = $(this).find(":selected");
                    var optionCount = $selectedOption.data("count");
                    var $hiddenLinks = self.$ctx.find(".aopArticleHiddenLinks a");
                    var selectedLink = $($hiddenLinks[optionCount]).attr("href");
                    location.href = selectedLink;
                });
            }
        }
    });
})(Tc.$);
(function($) {
    Tc.Module.Aop_hotspot_1 = Tc.Module.AbstractComponent.extend({
        setup: function(callback) {
        	var self = this;
        	var urlHash = window.location.hash;
        	var $hotspotWrapper = this.$ctx.find(".aopHotspotItems");
        	var startItem = 1; // default to 1

        	// Reset startItem when valid deeplink is available
        	if (urlHash.length > 0) {
        		var deeplink = urlHash.slice(1);
        		var $deepLinkHotspot = $hotspotWrapper.find("div[data-id|='" + deeplink + "']");
        		if ($deepLinkHotspot.length > 0) {
        			var startItem = parseInt($deepLinkHotspot.data("count")) + 1;
        		}
        	}

            this.$ctx.find(".aopHotspotSliderItems").movingBoxes({
				startPanel   : startItem,      // start with this panel
				wrap         : false,  // if true, the panel will infinitely loop
				buildNav     : false,   // if true, navigation links will be added
				hashTags	 : false,   // built-in hashTag functionality seems sketchy
				initialized  : function(e, slider, target) {
					// Sync Hotspot and Title with slider startItem on initialization
					self.activateHotspot(target - 1);
					self.activateItemTitle(target - 1);
				},
				beforeAnimation: function(e, slider, target) {
					self.activateHotspot(target - 1);
				},
				completed: function(e, slider, target) {
					self.activateItemTitle(target - 1);
				}
			});
        },
        after: function() {
        	
        	var self = this;
        	// Setup plugin context
        	var pluginObject = this.$ctx.find(".aopHotspotSliderItems").getMovingBoxes();

        	// Bind hotspots to Moving Boxes change event on click
        	this.$ctx.find(".aopHotspotItem").on("click", function(){
        		var count = parseInt($(this).data("count")) + 1;
        		pluginObject.change(count);
        	});

        	// Resize slider and items when component container changes sizes
        	var updateDemensions;
			$(window).resize(function(){
			    clearTimeout(updateDemensions);
			    // only calculate width and update after a timeout
			    updateDemensions = setTimeout(function(){
			    	pluginObject.options.width = $(self.$ctx).width(); // make width of component container div
			    	pluginObject.options.panelWidth = 0.15; // make 15% of wrapper width
			        pluginObject.update(false);
			    }, 200);
			});
        },
        activateHotspot:function(num) {
        	$hotspotWrapper = this.$ctx.find(".aopHotspotItems");
        	// Remove all previous active classes
        	$hotspotWrapper.find(".aopHotspotItem").removeClass("active");
        	// Add active class to the currently selected hotspot
        	$hotspotWrapper.find("div[data-count|='" + num + "']").addClass("active");
        },
        activateItemTitle: function(num){
        	$itemTitleWrapper = this.$ctx.find(".aopHotspotItemTitles");
        	// Remove all previous active classes
        	$itemTitleWrapper.find(".aopHotspotItemTitle").removeClass("active");
        	// Add active class to the currently selected title
        	$itemTitleWrapper.find("div[data-count|='" + num + "']").addClass("active");
        }
    });
})(Tc.$);

(function($) {
	Tc.Module.Aop_recipe_1 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {

		},

		after: function() {
			console.log("--- starting AFTER ---");
			var self = this;
			var $cmp = self.$ctx;

			var defaultSelectValue = $($cmp).find('#dd > ul > li[data-selected="true"]').data('value');
			console.log("value: " + defaultSelectValue);
			$($cmp.find('.aoprSeletedArchive')).html(defaultSelectValue);

			$($cmp.find('.archiveArticle')).each(function() {
				if ($($cmp).find('#dd > ul > li[data-selected="true"]').data('value') === $(this).data('folder')) {
					$(this).show('400');
				}
			});

			$($cmp.find('.aoprSeletedArchive')).click(function() {
				console.log("selectedArchive clicked");
				$($cmp.find('#dd > ul')).toggle();
			});

			$($cmp.find('#dd > ul > li')).click(function() {
				console.log("li clicked");
				var folder = $(this).data('value');
				$($cmp.find('.aoprSeletedArchive')).html(folder);
				
				$($cmp.find('.archiveArticle')).hide('400');
				$($cmp.find('.archiveArticle')).each(function() {
					if (folder === $(this).data('folder')) {
						$(this).show('400');
					}
				});
				$($cmp.find('#dd > ul')).hide();
			});
			console.log("--- ending AFTER ---");
		}
	});
})(Tc.$);
(function($) {
    Tc.Module.Cnt_btn_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {
            
        },

        after: function() {

        }

    });
})(Tc.$);

(function($) {
    Tc.Module.Cnt_catwalk_1 = Tc.Module.AbstractComponent.extend({

        setup: function() {
        	var $cmp = this.$ctx;
            if($cmp.parents(".mobile").length > 0){
                $cmp.find(".catwalkContainer").slick({
                    arrows:false,
                    dots: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }
            else{
                $cmp.find(".catwalkContainer").slick({
                    nextArrow: '<div class="nextArrowContainer">'+
                                    '<span class="nextArrow icon-catwalkRightArrow"></span>'+
                                '</div>',
                    prevArrow:'<div class="prevArrowContainer">'+
                                    '<span class="prevArrow icon-catwalkLeftArrow"></span>'+
                                '</div>',
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                });
            }
        },

        after: function() {
            var $cmp = this.$ctx;

        }

    });
})(Tc.$);

(function($) {
    Tc.Module.Cnt_gallery_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {

        	var self = this;
        	var mod = self.$ctx.context;

        	// get container to append thumbnails to
        	var $thumbs = $(mod).find('.thumbs_inner');

        	// check to make sure gallery_data is provided
        	if (typeof gallery_data == 'undefined'){ return; }

        	// takes json data and created html markup for gallery thumbnails
        	create_thumbnail_html_from_data();

        	function create_thumbnail_html_from_data(){
	        	for (var item in gallery_data){

	        		if (typeof gallery_data[item] != 'object'){ continue;}

	        		var image = gallery_data[item];

	        		// static html for thumbnail item
	        		var thumb_html = '<a href="#" data-thumb="thumb_url" data-full="full_url" data-max="max_size" data-description="img_desc"><div><img src="" alt="img_desc"/><div></div></div></a>';
	        		
	        		if (typeof image.thumbnail_url == 'undefined'){ image.thumbnail_url = image.full_url; }

	        		// replace static html with dynamic values from array
	        		thumb_html = thumb_html.replace('thumb_url', image.thumbnail_url).replace('full_url', image.full_url).replace('max_size', image.max_size);

	        		if (image.description){
		        		thumb_html = thumb_html.replace('img_desc', image.description);
		        	}

	        		// append new html to thumbnail container
	        		$thumbs.append(thumb_html);
	        	}
	        }

	        $(mod).find('.gallery_thumb_cont .gallery_arrow.scroll_left').addClass('disabled');
        },

        after: function() {

        	var self = this;
        	var mod = self.$ctx.context;

        	var thumbs_loaded = 0;

        	// checks if thumnbnails have been added
        	if ( $(mod).find('.thumbs_inner a').length < 1 ){ return; }

        	// define component level variables
        	var selected = {};

        	// click events for gallery arrows
        	setup_gallery_events();
	        
	        // event triggers for next image and next thumbnails
	        function setup_gallery_events(){

	        	// sets up click event for images
	        	$(mod).find('.thumbs_inner a').click( function(e){

	        		e.preventDefault();

	        		var $active = $(this);

	        		// removes previously active image
	        		$(mod).find('.thumbs_inner a').removeClass('active_thumb');

	        		// sets clicked thumbnail to be the new active thumb
	        		$active.addClass('active_thumb');

	        		// sets the main image to the full image url
	        		set_main_image($active);

	        		// sets up the previous and next buttons
	        		selected.previous = $active[0].previousElementSibling;
	        		selected.next = $active[0].nextElementSibling;

	        		update_arrows();

	        		function set_main_image($active){

	        			var $src = $active.attr('data-full');
	        			var $desc = $active.attr('data-description');

	        			$(mod).find('.main_image_cont img').attr('src', $src);
	        			$(mod).find('.photo_caption').html($desc);
	        		}
	     			
	        		function update_arrows(){

			        	if ( selected.previous == null ){
			                $(mod).find('.main_image_cont .gallery_arrow.scroll_left').removeClass('disable').addClass('disable');
			            } else {
			                $(mod).find('.main_image_cont .gallery_arrow.scroll_left').removeClass('disable');
			            }

			            if ( selected.next == null ){
			                $(mod).find('.main_image_cont .gallery_arrow.scroll_right').removeClass('disable').addClass('disable');
			            } else {
			                $(mod).find('.main_image_cont .gallery_arrow.scroll_right').removeClass('disable');
			            }
			        }
	        	});

				// click events for main image arrows
	        	$(mod).find('.main_image_cont .gallery_arrow').click( function(e){

	        		e.preventDefault();

	        		var $arrow = $(this);

	        		if ($arrow.hasClass('scroll_left')){
	        			$(selected.previous).click();
	        		} else {
	        			$(selected.next).click();
	        		}

	        	});

	        	// variables for pagination animation
	        	var $thumbs = $(mod).find('.thumbs_inner');
	        	var $children = $thumbs.children();
				var thumbsWidth = $thumbs.width();

				var overflowWidth = $(mod).find('.gallery_thumbs').width();
				
				var imageWidth = $($children).eq(0).width();
				var maxImagesToScroll = Math.floor(overflowWidth / imageWidth);

				var currImgNum = 0;

	        	// click events for thumb inner arrows
	        	$(mod).find('.gallery_thumb_cont .gallery_arrow').click( function(e){
	        		e.preventDefault();

	        		var $arrow = $(this);

	        		if ($arrow.hasClass('scroll_left')){
	        			scrollLeft();
	        		} else {
	        			scrollRight();
	        		}
	        	});

		        function scrollRight(){
		
					// checks to make sure its not the last image
					if( currImgNum >= $($children).length - maxImagesToScroll ){ return false; }
					
					// gets new current number
					currImgNum = currImgNum + maxImagesToScroll >= $($children).length - maxImagesToScroll ? $($children).length - maxImagesToScroll : currImgNum + maxImagesToScroll;

					// load thumbs if not loaded previously
					if (currImgNum + 10 > thumbs_loaded){
						for( thumbs_loaded; thumbs_loaded < currImgNum + 10; thumbs_loaded++){
							var $thumb = $( $(mod).find('.thumbs_inner a')[thumbs_loaded-1] );
							$thumb.find('img').attr('src', $thumb.attr('data-thumb'));
						}
					}

					// animation
					$(mod).find('.thumbs_inner').animate({
				    	left: -1 * $($children).eq(currImgNum).position().left
				  	}, 800,  function() { // Animation complete.

						if(currImgNum >= $($children).length - maxImagesToScroll){
							$(mod).find('.gallery_thumb_cont .scroll_right').addClass('disabled');
						}else{
							$(mod).find('.gallery_thumb_cont .scroll_right').removeClass('disabled');
						}
						$(mod).find('.gallery_thumb_cont .scroll_left').removeClass('disabled');
				  	});
				}

				function scrollLeft(){

					// checks to make sure its not the first image
					if( currImgNum <= 0 ){ return false; }
					
					// gets new current number
					currImgNum = currImgNum - maxImagesToScroll <= 0 ? 0 : currImgNum - maxImagesToScroll;
					
					// animation
					$(mod).find('.thumbs_inner').animate({
				    	left: -1 * $($children).eq(currImgNum).position().left
				  	}, 800, function() { // Animation complete.

						if( currImgNum <= 0 ){
							$(mod).find('.gallery_thumb_cont .scroll_left').addClass('disabled');
						}else{
							$(mod).find('.gallery_thumb_cont .scroll_left').removeClass('disabled');
						}		
						$(mod).find('.gallery_thumb_cont .scroll_right').removeClass('disabled');
				  	});
				}
	        }

	        // selecting the first gallery item
        	initialize_gallery();

	         // selects first item in list and classes
	        function initialize_gallery(){
	        	$(mod).find('.thumbs_inner a')[0].click();

	        	// initial number of thumbs loaded set to 10
	        	var max_count = 10;

	        	// loads the initial number of thumbs
	        	for( thumbs_loaded; thumbs_loaded <= max_count; thumbs_loaded++){
	        		var $thumb = $( $(mod).find('.thumbs_inner a')[thumbs_loaded] );
	        		$thumb.find('img').attr('src', $thumb.attr('data-thumb'));
	        	}

	        }
        }
    });
})(Tc.$);


(function($) {
    Tc.Module.Cnt_img_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {

        },

        after: function() {

        }

    });
})(Tc.$);

(function($) {
    Tc.Module.Cnt_nav_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {

        },

        after: function() {

        }

    });
})(Tc.$);

(function($) {
	Tc.Module.Dd_banner_1 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {
			$cmp = this.$ctx;

			var productId = $cmp.data("productid");
			var categoryId = $cmp.data("categoryid");
			var bannerType = $cmp.data("bannertype");
			//var sampleJson = $.parseJSON('{"dataset":{"datasetResponse":{"description":"map","type":"map","url":"/services/product/1675088/banners.do","values":{"dollarSale":"N","department":"015","regularLowPrice":"$19.99","imageSet":"http://images.cabelas.com/is/image/cabelas/s7_531371_imageset_01","name":"Eartheasy LifeStraw&reg; Water Filter","dollarOff":null,"brandLogo":null,"soldOut":"N","image":"http://images.cabelas.com/is/image/cabelas/s7_531371_imageset_01","percentSale":"N","bannerTeaser":"Removes practically all waterborne bacteria and protozoan parasites","subdepartment":"151","regularHighPrice":"$19.99","url":"/catalog/product.jsp?productId=1675088&type=product","productId":1675088,"percentOff":null,"sellLowPrice":"$19.99","badges":"","classz":"001","fullSale":"N","partialSale":"N","sellHighPrice":"$19.99","subclass":"002","active":"Y","brand":"Eartheasy","rating":"5.0"}}},"messages":{"description":["Successfully done"],"status":"SUCCESS"},"parameters":[]}');

			var bannerConfig = {
				productId: ((productId) ?  productId : null),
				categoryId: ((categoryId) ?  categoryId : null),
				bannerType: ((bannerType) ? bannerType : null)
				//,sampleJson: ((sampleJson) ? sampleJson : null)
			};
			
			$cmp.cabdb(bannerConfig);

		},

		after: function() {}

	});
})(Tc.$);
(function($) {
    Tc.Module.Oat01_sidenav_1 = Tc.Module.AbstractComponent.extend({

    	setup: function(callback) {

		},

		after: function() {

			//alert('in');

		}
	});
});


$('a.trip_index_link').click( function (){
	var $link = $(this);
	launch_trip_modal($link);
});

function launch_trip_modal($link){

	var species = {};
	var region = {};
	var trip_type = {};

	// labels
	var speciesLabel = $link.attr('data-species-label');
	var regionLabel = $link.attr('data-region-label');
	var trip_typeLabel = $link.attr('data-type-label');
	
	
	// get data from $link attributes
	var page_title = $link.attr('data-page-title');
	var view_trip_label = $link.attr('data-view-trip-label');
	var submit_button_label = $link.attr('data-submit-button-label');
	var href = $link.attr('data-href');

	// labels 
	region.labels = $link.attr('data-region-label');
	species.labels = $link.attr('data-species-label');
	trip_type.labels = $link.attr('data-type-label');
	// options
	species.option = $link.attr('data-species-options');
	region.option = $link.attr('data-region-options');
	trip_type.option = $link.attr('data-type-options');
	// position number
	species.position = $link.attr('data-species-position');
	region.position = $link.attr('data-region-position');
	trip_type.position = $link.attr('data-type-position');
	// default option
	species.defaultoption = $link.attr('data-species-defaultoption');
	region.defaultoption = $link.attr('data-region-defaultoption');
	trip_type.defaultoption = $link.attr('data-type-defaultoption');				

	// create dropdown html
	var dropdown_html = {};
	dropdown_html[species.position] = create_dropdown_html_from_data(species.option, species.labels);
	dropdown_html[region.position] = create_dropdown_html_from_data(region.option, region.labels);
	dropdown_html[trip_type.position] = create_dropdown_html_from_data(trip_type.option, trip_type.labels);

	// function to split apart string to create dropdown html
	function create_dropdown_html_from_data($string, $class){
		var dropdown_html = '<select class="' + $class + '">';

		if ($string == ''){
			return "";
		}

		var item_parts = $string.split(',');

		for( var item in item_parts ){
			if (typeof item_parts[item] == 'string' && item_parts[item] != ''){

				var option = item_parts[item].split(':')[1];
				var option_key = option.split('|')[0];
				var option_value = option.split('|')[1];
				dropdown_html += '<option value="' + option_key + '">' + option_value + '</option>';
			}
		}
		dropdown_html += '</select>';

		return dropdown_html;
	}

	// structure for modal html
	var modal_html = '<div class="trip_index_modal">' +
				        '<h3 class="trip_title">' + page_title + '</h3>' +
				        '<div class="modal_selection">' +
				           '<h5>' + view_trip_label + '</h5>' +
				           '<div class="modal_item">' +
					          '<span class="modalLabel">' + speciesLabel + '</span>' +
					          '<span class="selectBox">' + dropdown_html[1] + '</span>' +
					        '</div>' +
						   
					        '<div class="modal_item">' +
					          '<span class="modalLabel">' + regionLabel + '</span>' +
					          '<span class="selectBox">' + dropdown_html[2] + '</span>' +
					        '</div>' +
					        '<div class="modal_item">' +
					          '<span class="modalLabel">' + trip_typeLabel + '</span>' +
					          '<span class="selectBox">' + dropdown_html[3] + '</span>' +
					        '</div>' +
				           
				        '</div>' +
				        '<div class="submit_btn">' + submit_button_label + '</div>' +
				    '</div>';

	// call colorbox and provide modal_html to insert
	$.colorbox({ html: modal_html });
	$.colorbox.resize({width:"300px", height:"270px"});
	$('#cboxClose').text('X');
	
	// function to get values for redirect URL parameters
    $('#colorbox .submit_btn').click( function (e){

    	e.preventDefault();

    	var region = $('.trip_index_modal select.region :selected').val();
    	var species = $('.trip_index_modal select.species :selected').val();
    	var trip_type = $('.trip_index_modal select.trip_type :selected').val();

    	var new_href = href + '?species=' + species + '&region=' + region + '&trip_type=' + trip_type;
    	window.location.href = new_href;

    });

    $('#colorbox .trip_index_close').click( function (e){
    	$('#cboxClose').click();
    });
}
(function($) {
	Tc.Module.Oat04 = Tc.Module.AbstractComponent.extend({
		setup: function(callback) {

		},
		after: function() {

		}
	});
})(Tc.$);
(function($) {
	Tc.Module.Retail_directions_1 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {

			var locs = [
	        	{
	        		key: '052',
	        		name: 'Anchorage',
	        		address: { address1: '155 W 104th Avenue', address2: '', city: 'Anchorage', region: 'AK', postalcode: '99515', country:''},
	        		point: '61.127414, -149.881443',
	        		phone: '9073413400',
	        		distance: 0,
	        		popup: "<a href=\"javascript:openMap('store_directions_popup.jsp?pageName=052', 'remote');\">Get Directions</a>",
	        		pageurl: 'store_info.jsp?pageName=052'
	        	}
	        ];

	        $(this).find('#myMap').storeMap(locs, 'AoGi0lEYvBrssxxdmWaS8Y0B2fCMOtcjh5vBfJ3fCA3RLEzFDCz48Xkqhcig921v');
	        
		},

		after: function() {

		}

	});
})(Tc.$);

(function($) {
	Tc.Module.Rt_container_1 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {

			/* Pause and Play functionality */
			$(".js-play").click(function() {
				$('.cycle-slideshow').cycle('resume');
				$(".js-play").hide();
				$(".js-pause").show();
			});

			$(".js-pause").click(function(){
				$('.cycle-slideshow').cycle('pause');
				$(".js-pause").hide();
				$(".js-play").show();
			});

			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");
			var trident = ua.indexOf("Trident/");
			var ieVersion = null;
			var tridentVersion = null;

			if (msie > 0) {
				ieVersion = ua.substring(msie + 5, ua.indexOf(".", msie));
				tridentVersion = ua.substring(trident + 8, ua.indexOf(".", trident));
				if ((ieVersion != null && tridentVersion != null)
						&& (
							(ieVersion >= 9 && tridentVersion > 5)
							|| (ieVersion == 8 && tridentVersion > 4)
							|| (ieVersion == 7 && tridentVersion != null)
						)) {
					$(".cycle-pager-wrapper").hide();
				}
			}
			
		},

		after: function() {

		}

	});
})(Tc.$);


(function($) {
    Tc.Module.Tab_nav_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {

            var self = this;

            var $cmp = this.$ctx;

            var $tabFirstLevel = $cmp.find(".tabsFirstLevel");
            var $tabSecondLevel = $cmp.find(".tabsSecondLevel");


            self.detectSelectedItem($tabFirstLevel);
            self.detectSelectedItem($tabSecondLevel);

            self.setupHoverEvents($tabFirstLevel);
            self.setupHoverEvents($tabSecondLevel);

            self.determineSelectedStyle($tabFirstLevel);
            self.determineSelectedStyle($tabSecondLevel);
        },

        after: function() {
            var self = this;
            $(window).on("load", function(){
                self.$ctx.find("li img").each(function(count, value){
                    var selectedImgPath = $(value).data("imageSelected");
                    var hoverImgPath = $(value).data("imageHover");
                    if (selectedImgPath !== "undefined") {
                        var selImg = $("<img>").attr("src", selectedImgPath).addClass("selected");
                        $(value).after(selImg);
                    }
                    if (hoverImgPath !== "undefined") {
                        var hovImg = $("<img>").attr("src", hoverImgPath).addClass("hover");
                        $(value).after(hovImg);
                    }
                });
            });
        },
        detectSelectedItem: function() {
            var self = this;

            // TAB COLOR OVERRIDE: Background, Hover, Selected
            var $cmp = self.$ctx;

            var canonicalUrl = $("link[rel|='canonical']").attr("href");
            // Handle selected tabs by checking canonical URLs and doing a string compare
            if (typeof canonicalUrl !== "undefined") {

                if ($cmp.find(".tabsFirstLevel a[href|='" + canonicalUrl + "']").length > 0) {
                    // loop is explicit to get the list item count
                    $cmp.find(".tabsFirstLevel li a").each(function(count, value) {
                        if ($(value).attr("href") === canonicalUrl) {

                            $(value).parent().addClass("selected");
                            $($cmp.find(".tabsSecondLevel ul")[count]).show();
                        }
                    });
                }

                if ($cmp.find(".tabsSecondLevel a[href|='" + canonicalUrl + "']").length > 0) {
                    // loop is explicit to get the list item count
                    $cmp.find(".tabsSecondLevel ul").each(function(count, value) {
                        if ($(value).find("a[href|='" + canonicalUrl + "']").length > 0) {
                            $(value).show();

                            $(value).find("a[href|='" + canonicalUrl + "']").parent().addClass("selected");
                            $($cmp.find(".tabsFirstLevel li")[count]).addClass("selected");
                        }
                    });
                }
            }
        },
        determineSelectedStyle: function($container) {
            var selectedColor = $container.data("selected");
            var backgroundSelected = $container.data("backgroundSelected");

            // Setting default Selected color CSS
            if (selectedColor.length > 0) {
                $container.find(".selected a > *").css("color", selectedColor);
            } else {
                $container.addClass("selectedDefault");
            }

            // Setting default Background Selected color CSS
            if (backgroundSelected.length > 0) {
                $container.find(".selected").css("background-color", backgroundSelected);
            } else {
                $container.addClass("backgroundSelectedDefault");
            }
        },
        setupHoverEvents: function($container) {
            var hoverColor = $container.data("hover");
            var backgroundHover = $container.data("backgroundHover");
            var $tabAnchors = $container.find("ul > li > a");


            // Setting default Hover color CSS
            if (hoverColor.length > 0) {
                $tabAnchors.each(function() {
                    var firstColor = $(this).css("color");
                    $(this).data("firstColor", firstColor);
                });
                $tabAnchors.on("mouseover", function() {
                    $(this).css("color", hoverColor);
                });
                $tabAnchors.on("mouseout", function() {
                    var firstColor = $(this).data("firstColor");
                    $(this).css("color", firstColor);
                });
            } else {
                $container.addClass("hoverDefault");
            }


            // Setting default Background Hover color CSS
            if (backgroundHover.length > 0) {
                $tabAnchors.each(function() {
                    var firstBackgroundColor = $(this).css("background-color");
                    $(this).data("firstBackgroundColor", firstBackgroundColor);
                });
                $tabAnchors.on("mouseover", function() {
                    $(this).css("background-color", backgroundHover);
                });
                $tabAnchors.on("mouseout", function() {
                    var firstBackgroundColor = $(this).data("firstBackgroundColor");
                    $(this).css("background-color", firstBackgroundColor);
                });
            } else {
                $container.addClass("backgroundHoverDefault");
            }
        }

    });
})(Tc.$);
(function($) {
	Tc.Module.Tab_nav_2 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {
			var $cmp = this.$ctx;
			var $tabContainer = $cmp.find(".tabContainer");
			var activeTab = 1;

			var hash = $(location).attr('hash');
			if (hash !== "") {
				if($cmp.find(hash).length > 0) {
					var $anchors = $cmp.find("a");
					$anchors.each(function(count, value) {
						if ($(value).attr("href") === hash) {
							activeTab = count + 1;
						}
					});
				}
			}

			this.$ctx.tabslet({
				active: activeTab
			});

			this.determineSelectedStyle($tabContainer);
			this.setupHoverEvents($tabContainer);

		},

		after: function() {
            var self = this;
            $(window).on("load", function(){
                self.$ctx.find("li img").each(function(count, value){
                    var selectedImgPath = $(value).data("imageSelected");
                    var hoverImgPath = $(value).data("imageHover");
                    if (selectedImgPath !== "undefined") {
                        var selImg = $("<img>").attr("src", selectedImgPath).addClass("selected");
                        $(value).after(selImg);
                    }
                    if (hoverImgPath !== "undefined") {
                        var hovImg = $("<img>").attr("src", hoverImgPath).addClass("hover");
                        $(value).after(hovImg);
                    }
                });
            });
		},
        determineSelectedStyle: function($container) {
            var selectedColor = $container.data("selected");
            var backgroundSelected = $container.data("backgroundSelected");

            // Setting default Selected color CSS
            if (selectedColor.length > 0) {
                $container.find(".active a > *").css("color", "#" + selectedColor);
            } else {
                $container.addClass("selectedDefault");
            }

            // Setting default Background Selected color CSS
            if (backgroundSelected.length > 0) {
                $container.find(".active a > *").css("background-color", "#" + backgroundSelected);
            } else {
                $container.addClass("backgroundSelectedDefault");
            }
        },
        setupHoverEvents: function($container) {
            var hoverColor = $container.data("hover");
            var backgroundHover = $container.data("backgroundHover");
            var $tabItems = $container.find("li a > *");


            // Setting default Hover color CSS
            if (hoverColor.length > 0) {
                $tabItems.each(function() {
                	if (!$(this).parent().parent().hasClass("active")) {

	                    var firstColor = $(this).css("color");
	                    $(this).parents(".tabContainer").data("firstColor", firstColor);
                	} else {
	                    var firstSelectedColor = $(this).css("color");
	                    $(this).parents(".tabContainer").data("firstSelectedColor", firstSelectedColor);
                	}
                });
                $tabItems.on("mouseover", function() {
                    $(this).css("color", "#" + hoverColor);
                });
                $tabItems.on("mouseout", function() {
                	if (!$(this).parent().parent().hasClass("active")) {
                		
	                    var firstColor = $(this).parents(".tabContainer").data("firstColor");
                    	$(this).css("color", firstColor);
                	} else {
	                    var firstSelectedColor = $(this).parents(".tabContainer").data("firstSelectedColor");
                    	$(this).css("color", firstSelectedColor);
                	}
                });
                $container.on("_after", function(){
                	$container.find("li a > *").each(function() {
	                	if (!$(this).parent().parent().hasClass("active")) {
		
		                    var firstColor = $(this).parents(".tabContainer").data("firstColor");
	                    	$(this).css("color", firstColor);
	                	} else {
		                    var firstSelectedColor = $(this).parents(".tabContainer").data("firstSelectedColor");
	                    	$(this).css("color", firstSelectedColor);
	                	}
                	});
            	});
            } else {
                $container.addClass("hoverDefault");
            }


            // Setting default Background Hover color CSS
            if (backgroundHover.length > 0) {
                $tabItems.each(function() {
                	if (!$(this).parent().parent().hasClass("active")) {
	                    var firstBackgroundColor = $(this).css("background-color");
	                    $(this).parents(".tabContainer").data("firstBackgroundColor", firstBackgroundColor);
                	} else {
	                    var firstBackgroundSelectedColor = $(this).css("background-color");
	                    $(this).parents(".tabContainer").data("firstBackgroundSelectedColor", firstBackgroundSelectedColor);
                	}
                });
                $tabItems.on("mouseover", function() {
                    $(this).css("background-color", "#" + backgroundHover);
                });
                $tabItems.on("mouseout", function() {
                	if (!$(this).parent().parent().hasClass("active")) {
                		
	                    var firstBackgroundColor = $(this).parents(".tabContainer").data("firstBackgroundColor");
                    	$(this).css("background-color", firstBackgroundColor);
                	} else {
	                    var firstBackgroundSelectedColor = $(this).parents(".tabContainer").data("firstBackgroundSelectedColor");
                    	$(this).css("background-color", firstBackgroundSelectedColor);
                	}
                });
                $container.on("_after", function(){
                	$container.find("li a > *").each(function() {
	                	if (!$(this).parent().parent().hasClass("active")) {
		
		                    var firstBackgroundColor = $(this).parents(".tabContainer").data("firstBackgroundColor");
	                    	$(this).css("background-color", firstBackgroundColor);
	                	} else {
		                    var firstBackgroundSelectedColor = $(this).parents(".tabContainer").data("firstBackgroundSelectedColor");
	                    	$(this).css("background-color", firstBackgroundSelectedColor);
	                	}
                	});
            	});
            } else {
                $container.addClass("backgroundHoverDefault");
            }

        }

	});
})(Tc.$);

(function($) {
	Tc.Module.Ts_video_1 = Tc.Module.AbstractComponent.extend({
        setup: function(){
            var self = this;

            var asset = this.$ctx.data("asset");
            var $videoContainer = this.$ctx.find(".tsVideo");
            var containerId = "vid" + asset.replace(/\W/g, '');
            self.videoCount = 1;

            var uniqueId = self.appendId($videoContainer, containerId);

            if (typeof s7viewers !== "object") {
                $("#scene7VideoPlayer").on("load", function(){
                    self.loadVideo(uniqueId, asset);
                });
            } else {
                self.loadVideo(uniqueId, asset);
            }
        },
        appendId: function($videoContainer, containerId){
            var self = this;
            var check = true;
            var uniqueId = "";

            // Should only loop once unless the same video ID is used on the page more than once. Handles that usecase.
            while (check) {
                uniqueId = containerId + "-" + self.videoCount;
                if ($("#" + uniqueId).length === 0) {
                    $videoContainer.attr("id", uniqueId);
                    check = false;
                } else {
                    self.videoCount++
                }
            }
            return uniqueId;
        },
        after: function(){

        },
        loadVideo: function(uniqueId, asset){
            var videoViewer = new s7viewers.VideoViewer();
            videoViewer.setContainerId(uniqueId);
            videoViewer.setParam("serverurl", "http://s7d2.scene7.com/is/image/");
            videoViewer.setParam("contenturl", "http://s7d2.scene7.com/skins/");
            videoViewer.setParam("videoserverurl", "http://s7d2.scene7.com/is/content/");
            videoViewer.setParam("asset", asset);
            videoViewer.setParam("config", "Scene7SharedAssets/Universal_HTML5_Video");
            videoViewer.setParam("emailurl", "http://s7d2.scene7.com/s7/emailFriend");
            videoViewer.init();
        }
	});
})(Tc.$);

(function($) {
	Tc.Module.Vid_playlist_1 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {
			var $cmp = this.$ctx;
			var self = this;
			$cmp.addClass('modvp1_16x9');

			// Build the list of things from the data
			function waitAndFire() {
				if (window.YT === undefined || window.s7viewers === undefined) {
					setTimeout(waitAndFire, 1000);
					return;
				}
				
				$cmp.find('.modvp1_channels > ul > li').click(function() {
					$cmp.find('.modvp1_channels > ul > li').removeClass('selected');
					$(this).addClass('selected');
					self.activateChannel();
				});
				$cmp.find('.modvp1_videoToggle').click(function() {
					self.toggleShowAll();
				});
				var activeList;
				// go through each channel to figure out what it is.
				if ($cmp.find('.modvp1_channels > ul > li.selected').length === 0) {
					$cmp.find('.modvp1_channels > ul > li:eq(0)').addClass('selected');
				}
				self.activateChannel();
				var $firstChannel = $cmp.find('.modvp1_channels > ul > li.selected').first();
				var $firstChannelVideo = $firstChannel.find('ul.modvp1_channelListing > li').first();
				if ($firstChannelVideo.data("videoid") !== undefined) {
					if ($firstChannelVideo.data('videotype') === "s7") {
						self.onLoadS7Video($firstChannelVideo.data('videoid'));
					} else {
						self.onLoadYtVideo($firstChannelVideo.data('videoid'));
					}
				}
				
			}
			
			if (!window['YT']) {
				console.log("JSP: ", "youtube loading");
				var tag = document.createElement('script');
				
				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}
			waitAndFire();
		},

		after: function() {
			var $cmp = this.$ctx;
			var self = this;
			if (!self.isMobile()) {
				self.resizePlaylist();

	        	// Resize playlist area when video container changes size
	        	var updateDemensions;
				$(window).resize(function(){
				    clearTimeout(updateDemensions);
				    // only calculate height and update after a timeout
				    updateDemensions = setTimeout(function(){
				    	self.resizePlaylist();

				    }, 200);
				});
			}
		},

		onLoadYtVideo: function(data) {
			if (this.$ctx.s7videoViewer != null) {
				this.$ctx.s7videoViewer.videoplayer.pause();
				this.$ctx.find('#s7_player').addClass('getRidOfIt');
			}

			if (this.$ctx.player != null) {
				this.$ctx.player.destroy();
				this.$ctx.player = null;
			}

			// If we dont have an anchor, we MUST have something there, make a random one between 1 and 1,000,000.
			if (this.$ctx.find('.modvp1_video').attr('id') === undefined) {
				var newId = "ytvid-" ;
				newId += Math.floor((Math.random()*1000000)+1);
				this.$ctx.find('.modvp1_video').attr('id', newId);
			}
			var video = this.$ctx.find('.modvp1_videoList div[data-videoid="' + data + '"]');
			$(this.$ctx.find('.modvp1_videoTitle_title')).html($(video).data('title'));

			// The YT player always gets a random ID
			
			this.$ctx.find('.modvp1_video').append('<div class="yt_player"></div>');
			var playerID = "ytply-";
			playerID += Math.floor((Math.random() * 1000000) + 1);
			this.$ctx.find(".yt_player").attr('id', playerID);
			
			if (data !== undefined) {
				if (this.$ctx.player != null) {
					this.$ctx.player.loadVideoById(data);
				} else {
					this.$ctx.player = new YT.Player(playerID, {
						videoId: data,
						autoplay: 1,
						modestbranding: 1,
						events: {
							'onReady': function() {
								//TODO: need anything here?
							},
							'onStateChange': function() {
								//TODO: need anything here?
							}
						}
					});
				}
			}
		},


		onLoadS7Video: function(videoId){
			// If we have one, remove the YT player
			var video = this.$ctx.find('.modvp1_channels li.selected .modvp1_channelListing li[data-videoid="' + videoId + '"]');
			
			if (this.$ctx.player != null) {
				this.$ctx.player.destroy();
				this.$ctx.player = null;
			}

			$(this.$ctx.find('.modvp1_videoTitle_title')).html($(video).data('titleoverride'));
			if (this.$ctx.s7videoViewer != null) {
				this.$ctx.find('#s7_player').show().removeClass('getRidOfIt');
				this.$ctx.s7videoViewer.setAsset(videoId);
			} else {
				this.$ctx.find('.modvp1_video').append('<div id="s7_player"></div>');

				this.$ctx.s7videoViewer = new s7viewers.VideoViewer();
				this.$ctx.s7videoViewer.setContainerId('s7_player');
				this.$ctx.s7videoViewer.setParam("serverurl", "http://s7d2.scene7.com/is/image/");
				this.$ctx.s7videoViewer.setParam("contenturl", "http://s7d2.scene7.com/skins/");
				this.$ctx.s7videoViewer.setParam("videoserverurl", "http://s7d2.scene7.com/is/content/");
				this.$ctx.s7videoViewer.setParam("asset", '"' + videoId + '"');
				this.$ctx.s7videoViewer.setParam("config", "Scene7SharedAssets/Universal_HTML5_Video");
				this.$ctx.s7videoViewer.setParam("emailurl", "http://s7d2.scene7.com/s7/emailFriend");
				this.$ctx.s7videoViewer.init();
			}


		},

		activateChannel: function() {
			var $cmp = this.$ctx;
			var self = this;

			var activeList = $cmp.find('.modvp1_channels > ul > li.selected');
			$cmp.find('.modvp1_videoList').empty();

			activeList.each(function(){
				$(this).addClass('selected');
				if ($(this).data('playlistid')) {
					// Its a youtube playlist, build it.
					var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/' + $(this).data('playlistid') + '?v=2&alt=json&callback=?';
					var videoURL= 'http://www.youtube.com/watch?v=';
					$.getJSON(playListURL, function(data) {
						$.each(data.feed.entry, function(i, item) {
							var list_data="";
							var feedTitle = item.title.$t;
							var feedURL = item.link[1].href;
							var fragments = feedURL.split("/");
							var videoID = fragments[fragments.length - 2];
							var url = videoURL + videoID;
							var thumb = "http://img.youtube.com/vi/"+ videoID +"/mqdefault.jpg";
							if (videoID !='videos') {
								list_data += '<div class="ytVideo" data-videoId="' + videoID + '" data-title="' + feedTitle + '">';
								list_data += '<img alt="'+ feedTitle+'" src="'+ thumb +'" />';
								list_data += '<div class="modvp1_playOverlay"></div>';
								list_data += '<div class="modvp1_playTitle">' + feedTitle + '</div>';
								list_data += '</div>';
							}
							$cmp.find('.modvp1_videoList').append(list_data);
							$cmp.find('.modvp1_videoList .ytVideo[data-videoId="' + videoID + '"]').click(function(e) {
								if (!self.isMobile()) {
									e.preventDefault();
								} else {
									window.location.hash = "#modvp1_videoPlayer";
								}
								self.onLoadYtVideo(videoID);
							});
						});
						// Do we have an active video?
						$('.modvp1_videoList > div:first').click();
					});
				} else {
					// Not a youtube playlist, dig deeper
					var videoURL= 'http://www.youtube.com/watch?v=';
					$(this).find('ul.modvp1_channelListing > li').each(function() {
						if ($(this).data('videotype') == 's7') {
							var list_data = '<div class="s7Video" data-videoId="' + $(this).data('videoid') + '">';
								list_data += '<img src="'+ $(this).data('thumbnailoverride') +'" />';
								list_data += '<div class="modvp1_playOverlay"></div>';
								list_data += '<div class="modvp1_playTitle">' + $(this).data('titleoverride') + '</div>';
								list_data += '</div>';
							//self.onLoadS7Video($(this).data('videoid'));
							$cmp.find('.modvp1_videoList').append(list_data);
							$cmp.find('.modvp1_videoList .s7Video[data-videoId="' + $(this).data('videoid') + '"]').click(function(e) {
								if (!self.isMobile()) {
									e.preventDefault();
								}
								self.onLoadS7Video($(this).data('videoid'));
							});
						} else if ($(this).data('videotype') == 'yt') {
							
							//self.onLoadYtVideo($(this).data('videoid'));
							$.get("https://gdata.youtube.com/feeds/api/videos/" + $(this).data('videoid') + "?v=2", function(data) {
								var feedTitle;
								var feedURL;

								var $entity = $(data);
								$entity.find('entry').each(function() {
									feedTitle = $(this).find('title').text();
									$(this).find('link:eq(1)').each(function() {
										feedURL = $(this).attr('href');
									});
								});

								var list_data="";
								var fragments = feedURL.split("/");
								var videoID = fragments[fragments.length - 2];
								var url = videoURL + videoID;
								var thumb = "http://img.youtube.com/vi/"+ videoID +"/mqdefault.jpg";
								if (videoID !='videos') {
									list_data += '<div class="ytVideo" data-videoId="' + videoID + '" data-title="' + feedTitle + '">';
									list_data += '<img alt="'+ feedTitle+'" src="'+ thumb +'" /></div>';
									list_data += '<div class="modvp1_playOverlay"></div>';
									list_data += '<div class="modvp1_playTitle">' + feedTitle + '</div>';
								}
								$cmp.find('.modvp1_videoList').append(list_data);
								$cmp.find('.modvp1_videoList .ytVideo[data-videoId="' + videoID + '"]').click(function(e) {
									if (!self.isMobile()) {
										e.preventDefault();
									} else {
										window.location.hash = "#modvp1_videoPlayer";
									}
									self.onLoadYtVideo(videoID);
								});
							});
						}
					});
					$('.modvp1_videoList > div:first').click();
				}
			});
		},
		activateFirstVideo: function(){

		},
		toggleShowAll: function() {
			var $cmp = this.$ctx;
			var self = this;
			
			if ($($cmp).find('.modvp1_expand').hasClass('visible')) {
				$cmp.find(".modvp1_videoList").height(''); //just to make sure there is no inline from desktop view
				$($cmp).find('.modvp1_expand').removeClass('visible').addClass('hidden');
				$($cmp).find('.modvp1_collapse').removeClass('hidden').addClass('visible');
				$($cmp).find('.modvp1_rightContent').addClass('embiggen');
			} else {

				$cmp.find(".modvp1_videoList").height(''); //just to make sure there is no inline from desktop view
				$($cmp).find('.modvp1_collapse').removeClass('visible').addClass('hidden');
				$($cmp).find('.modvp1_expand').removeClass('hidden').addClass('visible');
				$($cmp).find('.modvp1_rightContent').removeClass('embiggen');
			}
		},

		isMobile: function() {
			return this.$ctx.parents('.mobile').length > 0;
		},

		resizePlaylist: function(){
			var $cmp = this.$ctx;
			var self = this;

			var channelHeight = $cmp.find(".modvp1_channels").height();
			var leftContentHeight = $cmp.find(".modvp1_leftContent").height();
			$cmp.find(".modvp1_videoList").height(leftContentHeight - channelHeight);

		}
	});
})(Tc.$);
(function($) {
	Tc.Module.Vid_scene7_1 = Tc.Module.AbstractComponent.extend({
        setup: function(){
            var self = this;

            var asset = this.$ctx.data("asset");
            var $videoContainer = this.$ctx.find(".vidContainer");
            var containerId = "vid" + asset.replace(/\W/g, '');
            self.videoCount = 1;

            var uniqueId = self.appendId($videoContainer, containerId);

            if (typeof s7viewers !== "object") {
                $("#scene7VideoPlayer").on("load", function(){
                    self.loadVideo(uniqueId, asset);
                });
            } else {
                self.loadVideo(uniqueId, asset);
            }
        },
        appendId: function($videoContainer, containerId){
            var self = this;
            var check = true;
            var uniqueId = "";

            // Should only loop once unless the same video ID is used on the page more than once. Handles that usecase.
            while (check) {
                uniqueId = containerId + "-" + self.videoCount;
                if ($("#" + uniqueId).length === 0) {
                    $videoContainer.attr("id", uniqueId);
                    check = false;
                } else {
                    self.videoCount++
                }
            }
            return uniqueId;
        },
        after: function(){

        },
        loadVideo: function(uniqueId, asset){
            var videoViewer = new s7viewers.VideoViewer();
            videoViewer.setContainerId(uniqueId);
            videoViewer.setParam("serverurl", "http://s7d2.scene7.com/is/image/");
            videoViewer.setParam("contenturl", "http://s7d2.scene7.com/skins/");
            videoViewer.setParam("videoserverurl", "http://s7d2.scene7.com/is/content/");
            videoViewer.setParam("asset", asset);
            videoViewer.setParam("config", "Scene7SharedAssets/Universal_HTML5_Video");
            videoViewer.setParam("emailurl", "http://s7d2.scene7.com/s7/emailFriend");
            if (this.$ctx.data("width") !== "" && this.$ctx.data("width") !== "") {
                videoViewer.setParam("stagesize", this.$ctx.data("width") + "," +  this.$ctx.data("height"));
            } 
            videoViewer.init();
        }

	});
})(Tc.$);

(function($) {
	Tc.Module.Vid_youtube_1 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {
			//Use this.$ctx.find to ensure you effect only the component that just ran, instead of all components on the page
			var $cmp = this.$ctx;
			function waitAndFire() {
				if (window.YT === undefined) {
					setTimeout(waitAndFire, 1000);
					return;
				}
				// do your stuff here... 
				var videoid = $cmp.data('videoid');
				var playlistid = $cmp.data('playlistid');
				
				// If we dont have an anchor, we MUST have something there, make a random one between 1 and 1,000,000.
				if ($cmp.attr('id') === undefined) {
					var newId = "ytvid-" ;
					newId += Math.floor((Math.random()*1000000)+1);
					$cmp.attr('id', newId);
				}
				
				// The YT player always gets a random ID
				var playerID = "ytply-";
				playerID += Math.floor((Math.random() * 1000000) + 1);
				$cmp.find(".yt_player").attr('id', playerID);
				
				if (videoid !== undefined) {
					$cmp.player = new YT.Player(playerID, {
						videoId: videoid,
						autoplay: 1,
						modestbranding: 1,
						events: {
							'onReady': function() {
								console.log('onready');
								//TODO: need anything here?
							},
							'onStateChange': function() {
								console.log('onStateChange');
								//TODO: need anything here?
							}
						}
					});
				} else if (playlistid !== undefined) {
					$.when(
						$.ajax({
							type: 'GET',
							url: '//gdata.youtube.com/feeds/api/playlists/' + playlistid + '?v=2&alt=json&callback=?',
							dataType: 'json'
						})
					).done(function(a1) {
						var playlistArray = [];
						$(a1.feed.entry).each(function() {
							playlistArray.push(this.media$group.yt$videoid.$t);
						});
						//TODO: process the video playlist
						$cmp.player = new YT.Player(playerID, {
							autoplay: 1,
							modestbranding: 1,
							events: {
								'onReady': function() {
									$cmp.player.loadPlaylist(playlistArray);
								}
							}
						});
					});
				} else {
					//TODO: blow it up... 
				}
				// nothing below here
			}
			
			console.log('checking');

			if (!window['YT']) {
				console.log("JSP: ", "youtube loading")
				var tag = document.createElement('script');
				
				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}

			waitAndFire();
		},

		after: function() { }
	});
})(Tc.$);
(function($) {
	Tc.Module.Cwc_relatedproducts = Tc.Module.AbstractComponent.extend({
		setup: function(callback) {
			var $cmp = this.$ctx;
			var self = this;
		},
		after: function() {
			var $cmp = this.$ctx;
			var self = this;
			self.displayProducts(4);
		},
		displayProducts: function(maxCount) {
			var $cmp = this.$ctx;
			var self = this;
			$cmp.find('.itemEntryInner').each(function () {
				self.displayProduct($(this).attr('id'), maxCount);
			});
		},
		displayProduct: function(productId, maxCount) {
			var $cmp = this.$ctx;
			var self = this;
			if ($cmp.find('.itemInformation').length > (maxCount - 1)) {
				$cmp.find("#" + productId).hide();
				return false;
			}
			var url = "/services/product/" + productId + "/banners.do";
			//var url = productId + ".json";

			$.ajax({
				url: url,
				headers: {"Content-Type": "application/json",
					"Accept": "application/json",
					"app-id": "a12599a024104fb050d94a13f2f361d6"},
				async: false
			}).done(function(responseData) {
				var jsonData = responseData;
				var info = jsonData.dataset.datasetResponse.value;

				if ($cmp.find('.itemInformation').length > (maxCount - 1)
					|| info.image == 'http://images.cabelas.com/is/image/cabelas/null'
					|| info.soldOut == 'Y'
					|| jsonData.messages.status != 'SUCCESS'
					|| (typeof info.soldOut === "undefined")) {

					$cmp.find("#" + info.productId).hide();
					return;
				}
				
				if ($cmp.find('.itemInformation').lentgh == (maxCount - 1)) {
					$cmp.find('.itemInformation:visible').last().addClass('lastProduct');
				}

				var dollarOffSavings = Math.floor(info.dollarOff);
				var acmSalePrice = "";
				var acmRegPrice = "";
				var innerSavings = "";

				if (info.sellLowPrice != info.sellHighPrice) {
					acmSalePrice = info.sellLowPrice + ' - ' + info.sellHighPrice;
				} else {
					acmSalePrice = info.sellLowPrice;
				}

				if (info.regularLowPrice != info.regularHighPrice) {
					acmRegPrice = info.regularLowPrice + ' - ' + info.regularHighPrice;
				} else {
					acmRegPrice = info.regularLowPrice;
				};

				if (info.fullSale == 'Y' && dollarOffSavings > 0) {
					innerSavings = 'You Save $' + dollarOffSavings;
				}

				var ratings = jsonData.dataset.datasetResponse.value.rating;
				ratings = ratings != null ? ratings.replace('.', '_') : "";

				var response = "<div class='itemInformation'>";
				response += "<div class='prodImg'>";
				response += "<a  class='productLink' href='" + info.url
					+ "' target='_blank'><img border='0' src='" + info.image
					+ "?hei=127&amp;wid=127' alt='" + info.name
					+ "' title='" + info.name
					+ "'></a>";
				response += "</div>";
				response += "<div>";
				response += "<div class='itemStuff'>";
				response += "<div class='innerStuff'>";
				response += "<a class='proName productLink' href='" + info.url + "' target='_blank'>" + info.name + "</a>";
				response += "</div></div></div>";
				response += "<div class='itemPromo'>";
				response += "<div>" + acmSalePrice + "</div></div>";
				response += "<div class='itemPricing'>" + (info.fullSale == 'N' ? "" : "<div class='innerPricing'>" + acmRegPrice + "</div>") + "</div>";
				response += "<div class='itemSavings'><div class='innerSavings'>" + innerSavings + "</div></div>";
				if (jsonData.dataset.datasetResponse.value.rating != null && parseInt(jsonData.dataset.datasetResponse.value.rating) >= 3) {
					response += "<div class='cpr'><img src='//reviews.cabelas.com/8815/" + ratings + "/5/rating.gif'></div>";
				}
				response += "</div>";

				$cmp.find("#" + info.productId).html(response);
				
			}).fail(function() {
				console.log("service call did not succeed");
			});
		}
	});
})(Tc.$);

(function($) {
    Tc.Module.Deal_category_1 = Tc.Module.AbstractComponent.extend({
		setup: function(callback) {
    	    var self = this;
        	var mod = self.$ctx.context;

        	if ( $('.mobile').length > 0 ){
                set_category_content_width();
            }

            function set_category_content_width(){
                var $width = $(mod).parent().width();
                $width = $width - 70 - 80 - 30;

                $(mod).find('.categoryDetails').width($width);
            }
        },

        after: function(callback){


        }
    });
})(Tc.$);
(function($) {
    Tc.Module.Deal_product_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {
            var self = this;
        	var mod = self.$ctx.context;
            
            var product_id = $(mod).find('.product_id').attr('data-id');

            if ( $('.mobile').length > 0 ){
                set_product_content_width();
            }

            function set_product_content_width(){
                var $width = $(mod).parent().width();

                $width = $width - 70 - 80 - 30;

                $(mod).find('.productDetails').width($width);
            }

            // helper functions
            function format_price(price){

                if (price.indexOf('span') != -1 || $('.mobile').length > 0){ return price; }

                var html = '';
                if ( price.indexOf('-') == -1 ){

                    var price_parts = price.split('.');
                    html = price_parts[0] + '<super>' + price_parts[1] + '</super>';
                } else {

                    var price_parts = price.split('-');
                    var price_one = price_parts[0].split('.');
                    var price_two = price_parts[1].split('.');

                    html = price_one[0] + '<super>' + price_one[1].replace(' ','') + '</super>' + '<span> - ' + price_two[0] + '<super>' + price_two[1].replace(' ','') + '</super></span>';
                }
                return html;
            }
            
            init_price_format();
            function init_price_format(){
                var $prices = $(mod).find('.productPrice p');

                $prices.each( function(){
                    var $this = $(this);
                    $this.attr('data-default-price', $this.html());
                    $this.html( format_price( $this.html()) );
                });
            }

            set_up_product_link();
            function set_up_product_link(){

                var $productName = $(mod).find('.productName');
                $productName.each( function(){
                    setup_product_link($(this)); 
                });

                var $productImg = $(mod).find('.productImage');
                $productImg.each( function(){
                    setup_product_link($(this));
                });

                function setup_product_link($element){
                    $element.click( function(){
                        window.location.href = window.location.origin + '/catalog/product.jsp?productId=' + product_id + '&type=product';
                    });
                }
            }
        },

        after: function() {
            var self = this;
            var $cmp = self.$ctx;
        	var mod = $cmp.context;
            
            var product_id = $(mod).find('.product_id').attr('data-id');
            var product_type = $(mod).find('.product_id').attr('data-type');
            var product_variant = $(mod).find('.product_id').attr('data-variant-id');

            $cmp.find(".productShare").on("click", function(){
                $(this).find(".shareItems").toggle();
            });

            // Setup Share
            var $shareEl = $cmp.find(".shareItems");

            if ($shareEl.data("title") !== "" && $shareEl.data("productid") !== "" && $shareEl.data("url") !== "") {
                var productTitle = $cmp.find(".shareItems").data("title");
                var encodedProductTitle = encodeURI(productTitle);
                var productId = $cmp.find(".shareItems").data("productid");
                var encodedProductId = encodeURI(productId);
                var canonicalUrl = $cmp.find(".shareItems").data("url");
                var encodedCanonicalUrl = encodeURI(canonicalUrl);

                var twitterAnchor = '<a href="http://twitter.com/intent/tweet?text=' + encodedProductTitle + '%20' + encodedCanonicalUrl + '%23' + productId + '" target="_blank"></a>';
                var facebookAnchor = '<a href="http://www.facebook.com/share.php?u=' + encodedCanonicalUrl + '%23' + productId + 't=' + encodedProductTitle + '" target="_blank"></a>';
                var emailAnchor = '<a href="mailto:?subject=' + encodedProductTitle + '&body=' + encodedProductTitle + '%20' + encodedCanonicalUrl + '%23' + productId + '"></a>'
                $cmp.find(".emailShare").append(emailAnchor);
                $cmp.find(".facebookShare").append(facebookAnchor);
                $cmp.find(".twitterShare").append(twitterAnchor);
            } else {
                $cmp.find(".productShare").hide();
            }

            // helper functions
            function format_price(price){

                if (price.indexOf('span') != -1 || $('.mobile').length > 0){ return price; }

                var html = '';
                if ( price.indexOf('-') == -1 ){

                    var price_parts = price.split('.');
                    html = price_parts[0] + '<super>' + price_parts[1] + '</super>';
                } else {

                    var price_parts = price.split('-');
                    var price_one = price_parts[0].split('.');
                    var price_two = price_parts[1].split('.');

                    html = price_one[0] + '<super>' + price_one[1].replace(' ','') + '</super>' + '<span> - ' + price_two[0] + '<super>' + price_two[1].replace(' ','') + '</super></span>';
                }
                return html;
            }

            if (product_type == 'chart'){

                var chart_url = '';

                $(mod).find('.buttonAddToCart').click( function(e){
                        e.preventDefault();
                        chart_url = window.location.origin + '/catalog/product_chart_popup.jsp?productId=' + product_id;
                        $.colorbox({ 
                                href: chart_url,
                                width: '745px',
                                height: 'auto',
                                className: 'dealProduct-modal'
                        });

                        $('#colorbox.dealProduct-modal #cboxClose').addClass('icon-modalCloseButton');
                });
                
                $(mod).find('.buttonAddToWish').click( function(e){
                        e.preventDefault();
                        chart_url = window.location.origin + '/catalog/product_chart_popup.jsp?productId=' + product_id;
                        $.colorbox({ 
                                href: chart_url,
                                width: '745px',
                                height: 'auto',
                                className: 'dealProduct-modal'
                        });

                        $('#colorbox.dealProduct-modal #cboxClose').addClass('icon-modalCloseButton');
                });
                
            } else if ( typeof product_variant != 'undefined' && product_variant != '') {

                 $(mod).find('.js-selectedInput').attr('value', product_variant);
            } else {

                var optionObject = {};
                
                if (typeof variantMaps == 'undefined'){ return; }
                
                function create_dropdown_json(){

                    if (typeof variantMaps[product_id] == 'object'){

                        for ( var variant in variantMaps[product_id] ){

                            if ( typeof variantMaps[product_id][variant] != 'object' ){ return; }
                            
                            var id = variantMaps[product_id][variant].id;
                            var values = variantMaps[product_id][variant].values;
                            var labels = variantMaps[product_id][variant].labels;
                            var price = variantMaps[product_id][variant].price;
                            var stock= variantMaps[product_id][variant].stock;
                            
                            var count = 0;
                            var productConfig = {};
                            var maxLength = values.length;
                            var tempObject = {};

                            for (var x = 0; x < maxLength;x++){
                                if (x==0){

                                    if (typeof values[x] != 'undefined'){
                                        if ( typeof optionObject[values[x]] == 'undefined' ){
                                            optionObject[values[x]] = {};
                                        }

                                        optionObject[values[x]].label = labels[x];

                                        tempObject = optionObject[values[x]];
                                    }
                                } else if (x == maxLength-1){

                                    if ( typeof tempObject.next_options == 'undefined' ){
                                        tempObject.next_options = {};
                                    }

                                    if ( typeof tempObject.next_options[values[x]] == 'undefined' ){
                                        tempObject.next_options[values[x]] = {};
                                    }

                                    tempObject.next_options[values[x]].label = labels[x];
                                    tempObject.next_options[values[x]].price = price;
                                    tempObject.next_options[values[x]].stock = stock;
                                    tempObject.next_options[values[x]].id = id;

                                } else {
                                    if ( typeof tempObject.next_options == 'undefined' ){
                                        tempObject.next_options = {};
                                    }

                                    if ( typeof tempObject.next_options[values[x]] == 'undefined' ){
                                        tempObject.next_options[values[x]] = {};
                                    }

                                    tempObject.next_options[values[x]].label = labels[x];

                                    tempObject = tempObject.next_options[values[x]];
                                }
                            }
                        }
                    }
                }
            
                create_dropdown_json();
                
                function form_setup(){

                    function trigger_error($form){
                        $form.find('.errorMessage').addClass('active');
                    }

                    function clear_error($form){
                        $form.find('.errorMessage').removeClass('active');
                    }

                    function form_validation($form){

                        var error = false;
                        var $entries = $form.find('.entry');

                        $entries.each( function (){
                            var $this= $(this);

                            if ( $this.find('option:selected').val() == '' || $this.find('option:selected').val() == 'Select' || typeof $this.find('option:selected').val() == 'undefined'){
                                error = true;
                            }
                        });

                        if (error){
                            trigger_error($form);
                        } else {
                            clear_error($form);    
                        }
                    }

                    $(mod).find('.buttonAddToCart').click( function (e){
                        e.preventDefault();

                        var $this = $(this);
                        var $container = $this.parent();
                        var $form = $container.parent();

                        form_validation($form);
                        
                        if ( $form.find('.errorMessage.active').length <= 0 ){
                            $container.find('.btnAddToCart').click();
                        }
                    });

                    $(mod).find('.buttonAddToWish').click( function(e){
                        e.preventDefault();

                        var $this = $(this);
                        var $container = $this.parent();
                        var $form = $container.parent();

                        form_validation($form);

                        if ( $form.find('.errorMessage.active').length <= 0 ){
                            $container.find('.btnAddToWishlist ').click();
                        }
                    });
                }
                form_setup();

                function create_styled_select(){
                    var $select = $(mod).find('select');
                    var count = 0;


                    if ( $('.mobile').length > 0 ){
                        return;
                    }

                    $select.each( function(){
                        var $this = $(this);

                        $this.hide();

                        $this.attr('data-id', count);

                        var new_html = '<div class="selectMenu" data-id="' + count + '">'
                                        + '<div class="selectSelected">'
                                            + '<p class="selectedText">' + $this.find('option:selected').text() + '</p>'
                                            + '<img class="selectArrow" src="http://mahzedahrbakery.com/static/main/images/select-arrow.png"/>'
                                        + '</div>'
                                        + '<ul class="selectList">'
                                        + '</ul>'
                                     + '</div>';
                        count++;

                        $this.after(new_html);

                        var $selectMenu = $this.parent().find('.selectMenu');
                        var $selectSelected = $selectMenu.find('.selectSelected');
                        var $selectText = $this.parent().find('.selectedText');
                        var $selectList = $this.parent().find('.selectList');

                        var $option = $this.find('option');

                        $option.each( function(){
                            var $html = '<li data-value="' + $(this).val() + '">' + $(this).text() + "</li>";
                            $selectList.append($html);
                        });

                        $selectSelected.click( function(){
                            $selectMenu.addClass('active');

                            $(this).hover( function(){}, 
                                function(){

                                    check_hover();

                                    function check_hover(){
                                        $(window).one('mouseover', function(e){

                                            if ( ! $selectMenu.hasClass('active') ){ return; }

                                            if ( $(e.target).closest('.selectMenu').length > 0 || $(e.target).hasClass('selectMenu') ){
                                                setTimeout( function(){
                                                    check_hover();    
                                                }, 50);
                                            } else {
                                                $selectMenu.removeClass('active');
                                            }

                                        });
                                    }
                                }
                            );
                        });

                        $selectList.find('li').click( function (){

                            $selectMenu.removeClass('active');

                            var value = $(this).attr('data-value');
                            if (typeof value == 'undefined'){
                                value = '';
                            }

                            var text = $(this).text();

                            $selectText.html(text);

                            $this.val( value );
                            $this.parent().change();
                        });
                    });
                }

                create_styled_select();

                // dropdown event
                $(mod).find('.entry').change( function (){

                    var $this = $(this);

                    var selected_num = 0;
                    var selected_options = {};

                    check_for_previous($this);

                    function check_for_previous($elm){

                        selected_options[selected_num] = $elm;
                        selected_num++;

                        var prev = $elm.context.previousElementSibling;

                        if (prev != null){
                            check_for_previous($(prev));
                        }
                    }

                    function obj_size(obj){
                        var size = 0, key;
                        for (key in obj) {
                            if (obj.hasOwnProperty(key)) size++;
                        }
                        return size;
                    }

                    // var selected_length = cabcq.util.getObjectSize(selected_options);
                    var selected_length = obj_size(selected_options);

                    var variant_selector = optionObject;
                    find_options();

                    function find_options(){

                        for ( var x = (selected_length -1); x >= 0; x-- ){

                            var option_code = selected_options[x].find('option:selected').val();
                            if (option_code == '' || option_code == 'Select'){
                                variant_selector = 'undefined';
                                return;
                            }

                            if ( x == (selected_length-1) ){

                                variant_selector = variant_selector[option_code];
                            } else {

                                variant_selector = variant_selector.next_options;
                                variant_selector = variant_selector[option_code];
                            }
                        }
                    }

                    function set_default_price($parent){

                        var price = $parent.find('.productPrice p');
                        price.html( format_price( price.attr('data-default-price')) );
                    }
                    
                    function populate_next_dropdown(){

                        var next_option = $this.context.nextElementSibling;

                        if ( next_option != null ){

                            var $select = $(next_option).find('select');
                            var new_options = '<option value="Select">Select</option>';

                            if (typeof variant_selector == 'undefined' || variant_selector == 'undefined'){
                                new_options = '<option value="Select">Select</option>';
                            } else {

                                for (var i in variant_selector.next_options){

                                    var code = i;
                                    var label = variant_selector.next_options[i].label;

                                    new_options += '<option value="' + code + '">' + label + '</option>';
                                }
                            }

                            $select.html(new_options);

                            function clear_next_dropdown(entry){

                                var empty_option = '<option value="Select">Select</option>';
                                var next_entry = $(entry).context.nextElementSibling;

                                if (next_entry != null){

                                    $(next_entry).find('select').html(empty_option);

                                    update_style_select_div(next_entry);
                                    clear_next_dropdown(next_entry);
                                }
                            }
                            clear_next_dropdown(next_option);

                            set_default_price($this.closest('.modDeal_product_1').find('.productForm'));
                            $(mod).find('.js-selectedInput').attr('value','');
                            $(mod).find('.productStock').removeClass('active');
                            update_style_select_div(next_option);

                        }else{

                            var $selected = $this.find('select option:selected');
                            if ($selected.val() != 'Select'){
                                populate_variant_details(variant_selector);
                            } else {
                                set_default_price($this.closest('.modDeal_product_1').find('.productForm'));
                                $(mod).find('.js-selectedInput').attr('value','');
                                $(mod).find('.productStock').removeClass('active');
                            }
                        }
                    }
                    
                    populate_next_dropdown();
                });
    
                function update_style_select_div(entry){

                    if ( $('.mobile').length > 0 ){ return; }

                    var $entry = $(entry);

                    var $select = $entry.find('select');
                    var $selected_text = $entry.find('option:selected').text();
                    var $options = $entry.find('option');
                    var $selectList = $entry.find('.selectList');
                    var $selectMenu = $entry.find('.selectMenu');
                    var $selectText = $entry.find('.selectedText');

                    $selectText.text( $selected_text );
                    var new_html = '';

                    $options.each( function(){
                        var value = $(this).attr('value');

                        if (typeof value == 'undefined'){
                            value = '';
                        }
                        var text = $(this).text();

                        new_html += '<li data-value="' + value + '">' + text + '</li>';
                    });

                    $selectList.html( new_html );

                    $selectList.find('li').click( function (){

                        $selectMenu.removeClass('active');

                        var value = $(this).attr('data-value');
                        if (typeof value == 'undefined' || value == ''){
                            value = 'Select';
                        }
                        var text = $(this).text();

                        $selectText.html(text);

                        $select.val( value );

                        $entry.change();
                    });
                }

                function populate_variant_details(variant_selector){

                    var stock_status_map = {
                        'I' : 'In Stock',
                        'G' : 'Limited Stock',
                        'O' : 'Out of Stock'
                    }
                    
                    var price =  '$' + variant_selector.price;
                    var stock = stock_status_map[variant_selector.stock];
                    var variant_id = variant_selector.id;

                    $(mod).find('.productPrice p').html(format_price(price));
                    
                    if (stock != 'In Stock'){
                        $(mod).find('.stockState').html(stock);
                        $(mod).find('.productStock').addClass('active');
                        $(mod).find('.errorMessage').removeClass('active');
                    }

                    $(mod).find('.js-selectedInput').attr('value', variant_id);
                }
            }   
        }
    });
})(Tc.$);
(function($) {
	Tc.Module.Footer_1 = Tc.Module.AbstractComponent.extend({
        setup: function(){
            var $cmp = this.$ctx;

            if (typeof commonDataLayer !== "undefined" && typeof commonDataLayer.tm_cabelas_support_id !== "undefined") {
                $cmp.find(".footerCabId").text(commonDataLayer.tm_cabelas_support_id);
            } else {
                $cmp.find(".footerCabContainer").css("visibility", "hidden");
            }
            var linkClicked = false;


            $cmp.find(".footerCabSupContentLink").click(function (){
                $cmp.find(".footerCabContent").hide(function(){
                    linkClicked = false;

                });
                return false;
            });


            $(".footerCabLink a").click(function(){
                if(!linkClicked ){

                    $cmp.find(".footerCabContent").removeClass("footerCabContentDisabled");
                    $cmp.find(".footerCabContent").show( function (){
                        linkClicked = true;
                    });
                } else {
                    $cmp.find(".footerCabContent").hide( function (){
                        linkClicked = false;
                    });
                }
                return false;
            });
        },
        after: function(){

        }
	});
})(Tc.$);

(function($) {
	Tc.Module.Nosp_leftNav_wrapper = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {
			var $cmp = this.$ctx;
			
			if ($cmp.hasClass('topCategories')) {
				$cmp.find('li').each(function(index) {
					var modIndex = index % 4;
					if (modIndex == 0) {
						$(this).find("a").addClass('topCatOne');
					} else if (modIndex == 1) {
						$(this).find("a").addClass('topCatTwo');
					} else if (modIndex == 2) {
						$(this).find("a").addClass('topCatThree');
					} else if (modIndex == 3) {
						$(this).find("a").addClass('topCatFour');
					}
				});
			}

		},
		after: function() { }
	});
})(Tc.$);

(function($) {
	Tc.Module.Nosp_saleproduct_1 = Tc.Module.AbstractComponent.extend({

		setup: function(callback) {
			var $cmp = this.$ctx;
			var that = this;
			console.log('started');
			
			$($cmp).find('.saleGoogleSafeImage').click(function(){
				$('.saleGoogleSafeImage').hide();
				$('.notGoogleSafeNavEntry').show();
			});

			if ($($cmp).hasClass('manual')) {
				return;
			}

			var productId = $cmp.data('productid');
			var linkOverride = $cmp.data('linkoverride');
			var mainImageModel = $cmp.data('mainimagemodel');
			var imageURL = $cmp.data('imageurl');
			var titleOverride = $cmp.data('titleoverride');
			var title = $cmp.data('title');
			var imageOverride = $cmp.data('imageoverride');
			var priceOverride = $cmp.data('priceoverride');
			var sellingPrice = $cmp.data('sellingprice');
			var wasPrice = $cmp.data('wasprice');
			var savings = $cmp.data('savings');
			var serviceHost = $cmp.data('servicehost');
			var manualURL = $cmp.data('manualurl');
			
			var url = serviceHost + "/services/product/" + productId + "/banners.do";
			//var url = "/content/dam/assets/" + productId + ".json";

			$.ajax({
				url: url,
				headers: {"Content-Type": "application/json",
					"Accept": "application/json",
					"app-id": "a12599a024104fb050d94a13f2f361d6"},
				async: false
			}).done(function(responseData) {
				var jsonData = responseData;
				var info = jsonData.dataset.datasetResponse.value;

				if (info.image == 'http://images.cabelas.com/is/image/cabelas/null' || info.soldOut == 'Y' || info.active == 'N'
					|| jsonData.messages.status != 'SUCCESS' || (typeof info.soldOut === "undefined")) {

					$cmp.hide();
					return;
				}

				var dollarOffSavings = Math.floor(info.dollarOff);
				var acmSalePrice = "";
				var acmRegPrice = "";
				var innerSavings = "";

				if (info.sellLowPrice != info.sellHighPrice) {
					acmSalePrice = info.sellLowPrice + ' - ' + info.sellHighPrice;
				} else {
					acmSalePrice = info.sellLowPrice;
				}

				if (info.regularLowPrice != info.regularHighPrice) {
					acmRegPrice = info.regularLowPrice + ' - ' + info.regularHighPrice;
				} else {
					acmRegPrice = info.regularLowPrice;
				}

				if (info.fullSale == 'Y' && dollarOffSavings > 0) {
					innerSavings = 'You Save $' + dollarOffSavings;
				}

				var ratings = jsonData.dataset.datasetResponse.value.rating;
				ratings = ratings != null ? ratings.replace('.', '_') : "";

				if (info.image.indexOf("images.cabelas.com") > -1 && !(info.image.indexOf("hei=") > -1 || info.image.indexOf("wid=") > -1)) {
					if (!info.image.indexOf("?") > -1) {
						info.image += '?';
					}
					info.image += "&hei=127&wid=127";
				}
				if (!linkOverride) {
					$cmp.find('a').attr('href', info.url);
				}
				if ((typeof mainImageModel === 'undefined' || mainImageModel !== 'true') && imageURL === '') {
					$cmp.find('.saleProductItemImage').attr('src', info.image);
				}
				if (!titleOverride) {
					$cmp.find('.productName').html(info.name);
				}
				if (sellingPrice === '') {
					$cmp.find('.itemPromotion').html(acmSalePrice);
				}
				
				if (wasPrice === '') {
					$cmp.find('.itemPricing').html(acmRegPrice);
					if (acmSalePrice === acmRegPrice) {
						$cmp.find('.itemPricing').hide();
					}
					
				}
				
				if (savings === '') {
					$cmp.find('.itemSavings').html(innerSavings);
				}
			
			}).fail(function() {
				console.log("service call did not succeed");
				$cmp.hide();
			});
			
		},
		after: function() {
		}
	});
})(Tc.$);

(function($) {
    Tc.Module.Retail_cal_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {
        	
        },

        after: function() {

        	var self = this;
        	var mod = self.$ctx.context;
        	var $mod = $(mod);

        	if (typeof eventsList == 'undefined'){ return; }

        	if ( $('.mobile').length > 0 ){
        		build_mobile();
        	} else {
        		build_desktop();
        	}

        	function build_desktop(){
        		init_lens_toggle();
        		build_agenda();
        		build_calendar();
        	}

        	function build_mobile(){
        		// build_agenda();
        	}

        	function init_lens_toggle(){

        		var $agenda_lens = $mod.find('.agenda_lens');
        		var $calendar_lens = $mod.find('.calendar_lens')
        		var $agenda = $mod.find('.agenda');
        		var $calendar = $mod.find('.calendar');

    			$agenda_lens.click( function (){
    				$calendar_lens.removeClass('active');
    				$calendar.removeClass('active');
    				$agenda_lens.addClass('active');
    				$agenda.addClass('active');
    			});

    			$calendar_lens.click( function (){
    				$agenda_lens.removeClass('active');
    				$agenda.removeClass('active');
    				$calendar_lens.addClass('active');
    				$calendar.addClass('active');
    			});
        	}

        	function build_agenda(){

        	}

        	function build_calendar(){

	        	$mod.find('#calendar').fullCalendar({
				    events: eventsList,
					eventClick: function(calEvent, jsEvent, view) {

						clear_previous_slideout();

						function clear_previous_slideout(){
							$mod.find('.eventSlideOut').remove();
						}

						var target = jsEvent.target;
						var row = $(target).closest('.fc-row');

						$(row).after('<div class="eventSlideOut"><div class="eventSlideOutHeader"></div><div class="eventSlideOutContent"></div></div>');

						var event_id = calEvent.id;

						var event_details = $('.eventContent[data-id="' + event_id  + '"').html();
						
						var title = calEvent.title;
						var week_day = calEvent.start.format('dddd');
						var day_date = calEvent.start.format('MM/DD/YYYY');
				        var start_time_hour = calEvent.start.format('h a');
				        var end_time_hour = calEvent.end.format('h a');

				        var time_hour = start_time_hour;

				        if (start_time_hour != end_time_hour){
				        	time_hour = start_time_hour + ' - ' + end_time_hour;
				        }

				        var event_header_html = '<div class="event_header">' +
				        							'<h4 class="event_title">' + title + '</h4>' +
				        							'<p>' + week_day + ', ' + day_date + '</p>' +
				        							'<p>' + time_hour + '</p>' +
				        							'<div class="event_close"></div>' +
				        						'</div>';

				        $mod.find('.eventSlideOutContent').append(event_header_html + event_details);

				    }
				});

	        	restructure_calendar_html();
				function restructure_calendar_html(){

					$mod.find('.fc-toolbar').before( $mod.find('.fc-view-container') );
					$mod.find('.fc-left h2').appendTo($mod.find('.fc-center'));
					$mod.find('.fc-center h2').before( $mod.find('.fc-prev-button') );
					$mod.find('.fc-center h2').after( $mod.find('.fc-next-button') );
					$mod.find('.fc-today-button').hide();
				}
        	}
        	
        }
    });
})(Tc.$);



(function($) {
	Tc.Module.St03_deal_index = Tc.Module.AbstractComponent.extend({
        setup: function(){
        	var self = this;
        	self.itemsPerPage = 3;
        	self.$container = self.$ctx.find(".resultsContainer");
        	self.productArray = [];
			self.$modDeal_product_1 = self.$container.find('>*');
			self.$modDeal_product_1.each(function(){
				self.productArray.push($(this));
			});
			self.paginate(self.productArray);
        },
        after: function(){
        	var self = this;
        	var $cmp = self.$ctx;

        	$cmp.find(".nextButton").on("click", function(){
        		self.activePage = self.activePage + 1;
        		self.pushProducts(self.activePage);
        	});

        	$cmp.find(".previousButton").on("click", function(){
        		self.activePage = self.activePage - 1;
        		self.pushProducts(self.activePage);
        	});

        	$cmp.find(".sortDropdown").on("change", function(){

        		self.sortBy(this.value);
        	});

        	$cmp.find(".perPageDropdown").on("change", function(){
        		self.itemsPerPage = this.value;
				self.pushProducts(self.activePage);
        	});

        },
        paginate: function(arrayToSort){
        	var self = this;
        	var $cmp = self.$ctx;

        	var numPages = Math.round((self.productArray.length)/self.itemsPerPage);
			var x;
			$cmp.find('.pageNumberContainer').empty();
			for(i=0;i<numPages;i++){
				self.pageNumber = 1+i;

				$cmp.find('.pageNumberContainer').append('<a href="#" class="pageNumber" value="' + self.pageNumber + '">' + self.pageNumber + '</a>');
				x=i;
			}
			$cmp.find(".pageNumber").off("click");
			$cmp.find(".pageNumber").on("click", function(){
				self.activePage = parseInt($(this).attr("value"));

				self.pushProducts(self.activePage);

			});
			function updateControls(){
				$cmp.find('.pageNumberContainer>a[value="' + self.activePage + '"]').addClass('activePage');
				console.log(self.activePage)
				if(self.activePage=== 1){
					console.log("yeah?")
					$cmp.find('.previousButton').hide();
				}
				if(numPages>1 && self.activePage !==1){
					$cmp.find('.previousButton').show();
					$cmp.find('.nextButton').show();
				}else{
					$cmp.find('.nextButton').show();
				}
				if(self.activePage>=numPages){
					$cmp.find('.nextButton').hide();
				}
			}
			updateControls();
		},
		displayItems:function (items){
			var self = this;
			self.itemsPerPage = items;
			self.pushProducts();
		},
		pushProducts: function(pageNumber){
			var self = this;
			if(pageNumber===0 || pageNumber===undefined){
				pageNumber=1;
			}
			self.activePage = pageNumber;

			var init = (pageNumber*self.itemsPerPage) - self.itemsPerPage;
			var end = (pageNumber*self.itemsPerPage);
			var newArray = self.productArray.slice(init,end);
			self.$container.empty();

			self.$container.append(newArray);
			self.paginate(newArray);
		},
		sortBy: function (attr){
			var self = this;
			var LowHi;
			var HiLow;
			if(attr==='LowPrice'||attr==='AllProducts'){
				LowHi = true;
				HiLow = false;
			}else{
				HiLow = true;
				LowHi = false;
			}
			var sortedArray = self.$modDeal_product_1.sort(function (a, b) {
				if (LowHi===true){
			    	return a.getAttribute('data-' + attr) - b.getAttribute('data-' + attr);
			    }else{
			    	return  b.getAttribute('data-' + attr) - a.getAttribute('data-' + attr);
			    }
			});
			self.productArray = [];
			self.productArray = sortedArray.slice(0);
			self.pushProducts();
		}
	});
})(Tc.$);
(function($) {
    Tc.Module.Header_1 = Tc.Module.AbstractComponent.extend({

        setup: function(callback) {
        	
        	// sets dropdown to be open on home page
        	if ( $('body').hasClass('homeBody') ){
				$('.shopDropdown').addClass('home');
			}

			// extract data layer and populate html
			if (typeof commonDataLayer != 'undefined'){
				
				$('.numberOfItems p').html(commonDataLayer.tm_cart_items_count);
				if (commonDataLayer.tm_cart_items_count != '0'){
					$('.dollarAmount p').html('$' + commonDataLayer.tm_cart_items_subtotal);
					$('.cartCheckout a').attr('href', '/checkout/begin_checkout.jsp');
				} else {
					$('.dollarAmount p').html('');
				}

				if (commonDataLayer.tm_Login_Ind == '1'){
					$('.headerAccount').addClass('active');
					$('.headerAccount .yourAccountText').html('Hi ' + commonDataLayer.tm_cust_first_name + '!');
				}
			}
        },

        after: function() {
        	// function for opening flyouts with dropdown links
			$('.shopDropdownContainer .shopDropdown a').hover( 
				function(){
					var $this = $(this);
					var id = $this.attr('data-flyout-id');

					$('.shopFlyoutSection > div').hide().removeClass('active');
					$('div[data-flyout-id=' + id + ']').show().addClass('active');

					calc_padding_for_footer( $('div[data-flyout-id=' + id + ']') );
				},
				function (){

					var $this = $(this);
					var id = $this.attr('data-flyout-id');
					
					check_hover();

					function check_hover(){
						$(window).one('mouseover', function(e){

							if ( ! $('div[data-flyout-id=' + id + ']').hasClass('active') ){
								return;
							}

							if ( $(e.target).hasClass('modNav_shop_flyout_1')  || $(e.target).closest('.modNav_shop_flyout_1').length > 0 || $(e.target).hasClass('shopDropdown') || $(e.target).closest('shopDropdown').length > 0 || $(e.target) == $this ){
								check_hover();
							} else {
								$('.shopFlyoutSection > div').hide().removeClass('active');
							}

						});
					}
				}
			);

			function calc_padding_for_footer($flyout){

        		var $parent = $flyout.parent();
        		var $footer = $flyout.find('.shopFlyoutFooter');

	        	$parent.addClass('active');

	        	var remaining_width = $footer.width();
	        	var $imgs = $footer.find('img');

	        	$imgs.each( function(){
	        		remaining_width = remaining_width - $(this).width();
	        	});

	        	$parent.removeClass('active');

	        	var padding = ( remaining_width / ( $imgs.length * 2 )) - 2;
	        
	        	$footer.find('li').css('padding-left', padding + 'px').css('padding-right', padding + 'px');
        	}


        	$('#searchKeywordButton').click( function(e){

        		e.preventDefault();

        		var keyword = $("#searchKeyword").val();
        		keyword = keyword.replace('%','%25').replace(/ /g,'+');

        		var new_href = "/catalog/search.cmd?form_state=searchForm&N=0&fsch=true&Ntk=AllProducts&Ntt="+keyword+"&x=10&y=6&WTz_l=Header%3BSearch-All+Products";

        		window.location.href = new_href;
        	});
        }
    });
})(Tc.$);
