"use strict";var __extends=this&&this.__extends||function(e,t){for(var i in t)if(t.hasOwnProperty(i))e[i]=t[i];function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)};var index_1=require("../../models/index");var manifest_1=require("../../models/manifest/manifest");var HeatmapManifest=function(e){__extends(t,e);function t(){e.apply(this,arguments);this.name="heatmap";this.title="Heatmap"}t.prototype.canHandleSplitDimensions=function(e,t,i,n){if(t.length===2)return manifest_1.Resolve.proceedWithDimensions();var s=e.getSplitableDimensions().slice(0,2);var r=function(e){return index_1.SplitCombine.fromDimensionAndFilterAndMeasure(e,i,n)};if(s.length!==2){return manifest_1.Resolve.rejectDimensions("Not enough dimensions in this cube for a heat map",[])}if(!t.length){return manifest_1.Resolve.rejectDimensions("The heat map requires two splits",[manifest_1.SplitSuggestion.fromTitleAndSplits("splitting on "+s.map(function(e){return e.title}).join(", "),new index_1.Splits(s.map(r)))])}else if(t.length===1){var a=t[0];var o=e.getSplitableDimensions().find(function(e){return!e.equals(a)});if(!o)throw new Error;return manifest_1.Resolve.rejectDimensions("The heat map requires two splits",[manifest_1.SplitSuggestion.fromTitleAndSplits("adding a split on "+o.title,new index_1.Splits([r(a),r(o)]))])}else{return manifest_1.Resolve.rejectDimensions("Too many splits on the heat map",[manifest_1.SplitSuggestion.fromTitleAndSplits("removing all but the first two splits",new index_1.Splits(s.map(r)))])}};t.prototype.getEffectiveSplits=function(e){var t=false;var i=new index_1.Splits(e.splitCombines.map(function(e){if(!e.limitAction){t=true;return e.changeLimit(25)}return e}));return t?i:e};t.prototype.getSuitability=function(e,t,i,n){return new manifest_1.Suitability(3)};return t}(manifest_1.Manifest);exports.HeatmapManifest=HeatmapManifest;exports.HEATMAP_MANIFEST=new HeatmapManifest;