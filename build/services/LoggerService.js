"use strict";var Sentry=_interopRequireWildcard(require("@sentry/minimal"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={};if(null!=a){var d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}}return c["default"]=a,b&&b.set(a,c),c}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var getCurrentDateTime=function(){return new Date().toUTCString()},LoggerService=function(){function a(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,a);var c={logger:"lesgo-logger",meta:{},transports:[]},d=_objectSpread({},c,{logger:b.logger||c.logger,meta:_objectSpread({},c.meta,{},b.defaultMeta||{}),transports:b.transports||[]});this.logger=d.logger,this.meta=d.meta,this.transports=d.transports,this.getCreatedAt=d.getCreatedAt,this.logLevels={error:0,warn:1,info:2,debug:3}}return _createClass(a,[{key:"log",value:function log(a,b){var c=this,d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};if(void 0===a||!Object.keys(this.logLevels).includes(a))throw new Error("Invalid level provided in log()");var e=this.structureLogMessage(a,b,d);this.transports.map(function(b){return c["".concat(b.logType,"Logger")](a,e)})}},{key:"error",value:function error(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this.log("error",a,b)}},{key:"warn",value:function warn(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this.log("warn",a,b)}},{key:"info",value:function info(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this.log("info",a,b)}},{key:"debug",value:function debug(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this.log("debug",a,b)}},{key:"addMeta",value:function addMeta(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.meta=_objectSpread({},this.meta,{},a)}},{key:"consoleLogger",value:function consoleLogger(a,b){if(!this.checkIsLogRequired("console",a))return null;var c=this.refineMessagePerTransport("console",b);return console[a](JSON.stringify(c))}},{key:"sentryLogger",value:function sentryLogger(a,b){if(!this.checkIsLogRequired("sentry",a))return null;var c=this.refineMessagePerTransport("sentry",b);return Sentry.withScope(function(a){return a.setExtras(c.extra),a.setTags(c.tags),"error"===c.level||"fatal"===c.level?Sentry.captureException(new Error(c.message)):Sentry.captureMessage(c.message,c.level)}),Sentry.configureScope(function(a){a.clear()})}},{key:"checkIsLogRequired",value:function checkIsLogRequired(a,b){var c=this.getTransportByName(a).level;return!(this.logLevels[c]<this.logLevels[b])}},{key:"structureLogMessage",value:function structureLogMessage(a,b,c){var d={level:a,message:b,logger:this.logger,extra:_objectSpread({},this.meta,{},c)};return d}},{key:"refineMessagePerTransport",value:function refineMessagePerTransport(a,b){var c=this.getTransportByName(a),d=_objectSpread({},b);return void 0!==c.config&&(void 0!==c.config.meta&&(d.extra=_objectSpread({},d.extra,{},c.config.meta)),void 0!==c.config.tags&&(d.tags=c.config.tags),void 0!==d.tags&&void 0!==d.extra.tags&&(d.tags=_objectSpread({},d.tags,{},d.extra.tags),delete d.extra.tags),c.config.getCreatedAt&&(d.created=getCurrentDateTime())),d}},{key:"getTransportByName",value:function getTransportByName(a){return this.transports.find(function(b){return b.logType===a})}}]),a}();exports["default"]=LoggerService;