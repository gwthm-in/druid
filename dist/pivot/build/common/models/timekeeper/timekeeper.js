"use strict";var __extends=this&&this.__extends||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a];function i(){this.constructor=e}e.prototype=t===null?Object.create(t):(i.prototype=t.prototype,new i)};var immutable_class_1=require("immutable-class");var immutable_class_2=require("immutable-class");var time_tag_1=require("../time-tag/time-tag");var Timekeeper=function(e){__extends(t,e);function t(t){e.call(this,t)}t.isTimekeeper=function(e){return e instanceof t};t.globalNow=function(){return new Date};t.fromJS=function(e){return new t(immutable_class_1.BaseImmutable.jsToValue(t.PROPERTIES,e))};t.prototype.now=function(){return this.nowOverride||t.globalNow()};t.prototype.getTime=function(e){var t=immutable_class_2.NamedArray.findByName(this.timeTags,e);if(!t||t.special==="realtime")return this.now();return t.time||this.now()};t.prototype.updateTime=function(e,a){var i=this.valueOf();var r=immutable_class_2.NamedArray.findByName(i.timeTags,e);if(!r)return this;i.timeTags=immutable_class_2.NamedArray.overrideByName(i.timeTags,r.changeTime(a,this.now()));return new t(i)};t.prototype.touch=function(e){var a=this.valueOf();var i=immutable_class_2.NamedArray.findByName(a.timeTags,e);if(!i)return this;a.timeTags=immutable_class_2.NamedArray.overrideByName(a.timeTags,i.touch(this.now()));return new t(a)};t.prototype.addTimeTagFor=function(e){var a=this.valueOf();a.timeTags=immutable_class_2.NamedArray.overrideByName(a.timeTags,new time_tag_1.TimeTag({name:e}));return new t(a)};t.prototype.removeTimeTagFor=function(e){return this.changeTimeTags(immutable_class_2.NamedArray.deleteByName(this.timeTags,e))};t.PROPERTIES=[{name:"timeTags",type:immutable_class_1.PropertyType.ARRAY,immutableClassArray:time_tag_1.TimeTag},{name:"nowOverride",type:immutable_class_1.PropertyType.DATE,defaultValue:null}];return t}(immutable_class_1.BaseImmutable);exports.Timekeeper=Timekeeper;immutable_class_1.BaseImmutable.finalize(Timekeeper);Timekeeper.EMPTY=new Timekeeper({timeTags:[]});