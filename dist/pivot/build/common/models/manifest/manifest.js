"use strict";var index_1=require("../index");var Suitability=function(){function t(t,e){this.score=t;if(e)this.cantHandleCombine=e}t.MAX=new t(10);return t}();exports.Suitability=Suitability;var SplitSuggestion=function(){function t(){}t.fromTitleAndSplits=function(t,e){return{description:t,adjustment:{splits:e}}};t.fromTitleAndSplit=function(e,n){return t.fromTitleAndSplits(e,index_1.Splits.fromSplitCombine(n))};return t}();exports.SplitSuggestion=SplitSuggestion;var Resolve=function(){function t(t,e,n){if(n===void 0){n=null}this.state=t;this.message=e;this.resolutions=n}t.rejectDimensions=function(e,n){return new t(t.CANT_HANDLE_DIMENSION,e,n)};t.rejectCombines=function(e,n){return new t(t.CANT_HANDLE_COMBINE,e,n)};t.proceedWithDimensions=function(){return new t(t.PROCEED_WITH_DIMENSIONS)};t.prototype.toString=function(){return""+this.state};t.prototype.valueOf=function(){return this.state};t.prototype.proceedWithDimensions=function(){return this.state===t.PROCEED_WITH_DIMENSIONS};t.prototype.rejectedDimensions=function(){return this.state===t.CANT_HANDLE_DIMENSION};t.prototype.rejectedCombines=function(){return this.state===t.CANT_HANDLE_COMBINE};t.CANT_HANDLE_DIMENSION=-2;t.PROCEED_WITH_DIMENSIONS=0;t.CANT_HANDLE_COMBINE=-1;return t}();exports.Resolve=Resolve;var Manifest=function(){function t(){this.measureModeNeed="any"}t.isTotals=function(t){return t.name==="totals"};t.prototype.summon=function(t,e,n,i,o){return null};t.prototype.getEffectiveSplits=function(t){return t};t.prototype.getEffectiveColors=function(t,e,n){return null};return t}();exports.Manifest=Manifest;