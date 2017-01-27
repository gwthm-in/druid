"use strict";var __extends=this&&this.__extends||function(t,e){for(var r in e)if(e.hasOwnProperty(r))t[r]=e[r];function n(){this.constructor=t}t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)};var Q=require("q");var fs=require("fs-promise");var yaml=require("js-yaml");var events_1=require("events");var index_1=require("../../../common/manifests/index");var index_2=require("../../../common/models/index");var yaml_helper_1=require("../../../common/utils/yaml-helper/yaml-helper");function readSettingsFactory(t,e){return function(){return Q(fs.readFile(t,"utf-8").catch(function(t){if(t.code!=="ENOENT")throw t;return""}).then(function(t){switch(e){case"json-pretty":case"json":return JSON.parse(t||"{}");case"yaml":return yaml.safeLoad(t);default:throw new Error("unsupported format '"+e+"'")}}).then(function(t){return index_2.AppSettings.fromJS(t,{visualizations:index_1.MANIFESTS})}))}}function writeSettingsFactory(t,e){return function(r){return Q.fcall(function(){switch(e){case"json-pretty":return JSON.stringify(r,null,2);case"json":return JSON.stringify(r);case"yaml":return yaml_helper_1.appSettingsToYAML(r,false);default:throw new Error("unsupported format '"+e+"'")}}).then(function(e){return fs.writeFile(t,e)})}}var SettingsStore=function(t){__extends(e,t);function e(e){if(e===void 0){e=false}t.call(this);this.needsAutoLoader=e}e.fromTransient=function(t,r){if(r===void 0){r=true}var n=new e(true);n.readSettings=function(){if(n.autoLoader){return n.autoLoader(t)}else{return Q(t)}};if(r){n.hasUpdateOnLoad=function(){return Q(true)}}return n};e.fromReadOnlyFile=function(t,r){var n=new e;n.readSettings=readSettingsFactory(t,r);return n};e.fromWritableFile=function(t,r){var n=new e;n.readSettings=readSettingsFactory(t,r);n.writeSettings=writeSettingsFactory(t,r);return n};e.fromStateStore=function(t){var r=new e;function n(t){return index_2.AppSettings.fromJS(JSON.parse(t||"{}"),{visualizations:index_1.MANIFESTS})}r.readSettings=function(){return Q(t.readState().then(n))};r.writeSettings=function(e){return Q.fcall(function(){return JSON.stringify(e)}).then(function(r){return t.writeState(e.getVersion(),r)})};t.on("update",function(t){r.emit("update",n(t))});return r};return e}(events_1.EventEmitter);exports.SettingsStore=SettingsStore;