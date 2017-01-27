"use strict";var __extends=this&&this.__extends||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a];function i(){this.constructor=e}e.prototype=t===null?Object.create(t):(i.prototype=t.prototype,new i)};var immutable_class_1=require("immutable-class");var TimeTag=function(e){__extends(t,e);function t(t){e.call(this,t);if(this.time&&!this.updated)this.updated=this.time}t.isTimeTag=function(e){return e instanceof t};t.fromJS=function(e){return new t(immutable_class_1.BaseImmutable.jsToValue(t.PROPERTIES,e))};t.prototype.changeTime=function(e,a){var i=this.valueOf();i.time=e;i.updated=a;return new t(i)};t.prototype.touch=function(e){var a=this.valueOf();a.updated=e;return new t(a)};t.PROPERTIES=[{name:"name"},{name:"time",type:immutable_class_1.PropertyType.DATE,defaultValue:null},{name:"updated",type:immutable_class_1.PropertyType.DATE,defaultValue:null},{name:"spacial",defaultValue:null}];return t}(immutable_class_1.BaseImmutable);exports.TimeTag=TimeTag;immutable_class_1.BaseImmutable.finalize(TimeTag);