"use strict";var __extends=this&&this.__extends||function(e,t){for(var i in t)if(t.hasOwnProperty(i))e[i]=t[i];function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)};var index_1=require("../../models/index");var manifest_1=require("../../models/manifest/manifest");var TableManifest=function(e){__extends(t,e);function t(){e.apply(this,arguments);this.name="table";this.title="Table"}t.prototype.canHandleSplitDimensions=function(e,t,i,n){if(!t.length){var r=e.getSplitableDimensions().filter(function(e){return e.getKind()==="string"}).slice(0,2);var s=function(e){return index_1.SplitCombine.fromDimensionAndFilterAndMeasure(e,i,n)};return manifest_1.Resolve.rejectDimensions("The Table requires at least one split",r.map(function(e){return manifest_1.SplitSuggestion.fromTitleAndSplit("Add a split on "+e.title,s(e))}))}return manifest_1.Resolve.proceedWithDimensions()};t.prototype.getSuitability=function(e,t,i,n){var r=t.splitCombines.some(function(e){return!e.limitAction});var s=4;if(!r){s+=2}if(n){s+=1}return new index_1.Suitability(s)};t.prototype.getEffectiveSplits=function(e){var t=false;var i=new index_1.Splits(e.splitCombines.map(function(e,i){if(!e.limitAction){t=true;return e.changeLimit(i?5:50)}return e}));return t?i:e};return t}(manifest_1.Manifest);exports.TableManifest=TableManifest;exports.TABLE_MANIFEST=new TableManifest;