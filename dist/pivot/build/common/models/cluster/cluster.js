"use strict";var __extends=this&&this.__extends||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a];function s(){this.constructor=e}e.prototype=t===null?Object.create(t):(s.prototype=t.prototype,new s)};var immutable_class_1=require("immutable-class");var general_1=require("../../utils/general/general");function ensureNotNative(e){if(e==="native"){throw new Error("can not be 'native'")}}var Cluster=function(e){__extends(t,e);function t(t){e.call(this,t);if(!this.title)this.title=this.name;switch(this.type){case"druid":this.database=null;this.user=null;this.password=null;break;case"mysql":case"postgres":this.introspectionStrategy=null;this.requestDecorator=null;this.decoratorOptions=null;break}}t.isCluster=function(e){return e instanceof t};t.fromJS=function(e){if(!e.host&&(e.druidHost||e.brokerHost)){e.host=e.druidHost||e.brokerHost}if(typeof e.timeout==="string"){e.timeout=parseInt(e.timeout,10)}return new t(immutable_class_1.BaseImmutable.jsToValue(t.PROPERTIES,e))};t.prototype.toClientCluster=function(){return new t({name:this.name,type:this.type})};t.prototype.shouldScanSources=function(){return this.getSourceListScan()==="auto"};t.prototype.guessName=function(){return general_1.makeUrlSafeName(this.type+"-cluster")};t.prototype.guessTitle=function(){return"My "+this.type+" cluster"};t.TYPE_VALUES=["druid","mysql","postgres"];t.DEFAULT_TIMEOUT=4e4;t.DEFAULT_SOURCE_LIST_SCAN="auto";t.SOURCE_LIST_SCAN_VALUES=["disable","auto"];t.DEFAULT_INTROSPECTION_STRATEGY="segment-metadata-fallback";t.PROPERTIES=[{name:"name",validate:[general_1.verifyUrlSafeName,ensureNotNative]},{name:"type",possibleValues:t.TYPE_VALUES},{name:"host",defaultValue:null},{name:"title",defaultValue:""},{name:"version",defaultValue:null},{name:"timeout",defaultValue:t.DEFAULT_TIMEOUT},{name:"sourceListScan",defaultValue:t.DEFAULT_SOURCE_LIST_SCAN,possibleValues:t.SOURCE_LIST_SCAN_VALUES},{name:"introspectionStrategy",defaultValue:t.DEFAULT_INTROSPECTION_STRATEGY},{name:"requestDecorator",defaultValue:null},{name:"decoratorOptions",defaultValue:null},{name:"database",defaultValue:null},{name:"user",defaultValue:null},{name:"password",defaultValue:null}];return t}(immutable_class_1.BaseImmutable);exports.Cluster=Cluster;immutable_class_1.BaseImmutable.finalize(Cluster);