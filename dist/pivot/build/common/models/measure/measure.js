"use strict";var __extends=this&&this.__extends||function(e,t){for(var a in t)if(t.hasOwnProperty(a))e[a]=t[a];function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)};var immutable_class_1=require("immutable-class");var numeral=require("numeral");var plywood_1=require("plywood");var general_1=require("../../utils/general/general");function formatFnFactory(e){return function(t){if(isNaN(t)||!isFinite(t))return"-";return numeral(t).format(e)}}var Measure=function(e){__extends(t,e);function t(t){e.call(this,t);this.title=this.title||general_1.makeTitle(this.name);this.expression=plywood_1.Expression.parse(this.formula);this.formatFn=formatFnFactory(this.getFormat())}t.isMeasure=function(e){return e instanceof t};t.getMeasure=function(e,t){if(!t)return null;return immutable_class_1.NamedArray.findByNameCI(e,t)};t.measuresFromDimension=function(e){var a=e.name,r=e.special;var n=plywood_1.$("main");var i=plywood_1.$(a);if(r){if(r==="unique"||r==="theta"){return[new t({name:general_1.makeUrlSafeName("cd_"+a),title:general_1.makeTitle(a),formula:n.countDistinct(i).toString()})]}else if(r==="histogram"){return[new t({name:general_1.makeUrlSafeName(a+"_p98"),formula:n.quantile(i,.98).toString()})]}}var o=n.sum(i);var u=e.maker;var s="sum";if(u){s=u.op;switch(u.op){case"min":o=n.min(i);break;case"max":o=n.max(i);break}}return[new t({name:general_1.makeUrlSafeName(s+"_"+a),title:s==="sum"?general_1.makeTitle(a):null,formula:o.toString()})]};t.fromJS=function(e){if(!e.formula){var a=e.expression;e.formula=typeof a==="string"?a:plywood_1.$("main").sum(plywood_1.$(e.name)).toString()}return new t(immutable_class_1.BaseImmutable.jsToValue(t.PROPERTIES,e))};t.prototype.toApplyAction=function(){var e=this,t=e.name,a=e.expression;return plywood_1.Expression._.apply(t,a)};t.prototype.formatDatum=function(e){return this.formatFn(e[this.name])};t.prototype.getTitleWithUnits=function(){if(this.units){return this.title+" ("+this.units+")"}else{return this.title}};t.prototype.usesDimension=function(e){return this.expression.some(function(t,a,r,n){if(n>0&&t instanceof plywood_1.RefExpression){return t.name===e}else{return null}})};t.prototype.guessName=function(){return general_1.makeNameFromFormula(this.formula)};t.prototype.guessTitle=function(){return general_1.makeTitle(this.name)};t.DEFAULT_FORMAT="0,0.0 a";t.INTEGER_FORMAT="0,0 a";t.PROPERTIES=[{name:"name",validate:general_1.verifyUrlSafeName},{name:"title",defaultValue:null},{name:"units",defaultValue:null},{name:"formula"},{name:"format",defaultValue:t.DEFAULT_FORMAT}];return t}(immutable_class_1.BaseImmutable);exports.Measure=Measure;immutable_class_1.BaseImmutable.finalize(Measure);Measure.SIMPLE_COUNT=new Measure({name:"default_count",title:"Default Count",formula:"$main.count()"});