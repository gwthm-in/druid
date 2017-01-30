"use strict";var __extends=this&&this.__extends||function(e,t){for(var i in t)if(t.hasOwnProperty(i))e[i]=t[i];function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)};var immutable_class_1=require("immutable-class");var chronoshift_1=require("chronoshift");var plywood_1=require("plywood");var granularity_1=require("../granularity/granularity");var timekeeper_1=require("../timekeeper/timekeeper");var SplitCombine=function(e){__extends(t,e);function t(t){e.call(this,t);this.dimension=t.dimension;if(!this.dimension)throw new Error("must have dimension name");if(!this.sortAction)throw new Error("must have sort action")}t.isSplitCombine=function(e){return e instanceof t};t.fromDimensionAndFilterAndMeasure=function(e,i,n){return new t({dimension:e.name,bucketAction:e.canAutoBucket()?t.calculateBucketGivenFilter(i,e):null,sortAction:t.calculateSortOn(e,n),limitAction:null})};t.fromJS=function(e,i){if(!i)throw new Error("must have context for split");if(typeof e==="string"){var n=immutable_class_1.NamedArray.findByName(i.dimensions,e);if(!n)throw new Error("can not find dimension "+e);return new t({dimension:n.name,bucketAction:null,sortAction:t.calculateSortOn(n,i.measure),limitAction:null})}var o=immutable_class_1.BaseImmutable.jsToValue(t.PROPERTIES,e);if(!e.dimension&&e.expression){var r=plywood_1.Expression.fromJS(e.expression);if(!r)throw new Error("Must have dimension or expression for split");if(r instanceof plywood_1.RefExpression){var s=immutable_class_1.NamedArray.findByName(i.dimensions,r.name);if(!s)throw new Error("Could not find dimension for "+JSON.stringify(e));e.dimension=s.name}else{throw new Error("can not figure out complex split: "+r)}}var a=e.dimension;o.dimension=a;if(e.bucketAction)o.bucketAction=plywood_1.Expression.fromJS(e.bucketAction);o.sortAction=e.sortAction?plywood_1.SortExpression.fromJS(e.sortAction):t.calculateSortOn(immutable_class_1.NamedArray.findByName(i.dimensions,a),i.measure);if(e.limitAction)o.limitAction=plywood_1.LimitExpression.fromJS(e.limitAction);return new t(o)};t.calculateBucketGivenFilter=function(e,t){var i=e.getSpecificFilter(timekeeper_1.Timekeeper.globalNow(),timekeeper_1.Timekeeper.globalNow(),chronoshift_1.Timezone.UTC);if(!t||!t.isBucketable())return null;var n=t.bucketedBy,o=t.granularities;var r=t.getKind();var s=i.getLiteralSet(t.name);var a=s?s.extent():null;if(a){return granularity_1.getBestGranularityForRange(a,false,n,o)}else{return granularity_1.getDefaultGranularityForKind(r,n,o)}};t.calculateSortOn=function(e,t){if(e.isContinuous()){return plywood_1.Expression._.sort(plywood_1.$(e.name),plywood_1.SortExpression.ASCENDING)}else if(e.getKind()==="boolean"){return plywood_1.Expression._.sort(plywood_1.$(e.name),plywood_1.SortExpression.DESCENDING)}else{return plywood_1.Expression._.sort(plywood_1.$(t),plywood_1.SortExpression.DESCENDING)}};t.prototype.equalsByName=function(e){var i=this.dimension;return t.isSplitCombine(e)&&i===e.dimension};t.prototype.equalsWithoutCombine=function(e){return this.equalsByName(e)&&(this.bucketAction?this.bucketAction.equals(e.bucketAction):!Boolean(e.bucketAction))&&Boolean(this.sortAction)===Boolean(e.sortAction)};t.prototype.isSortOnSelfAscending=function(){var e=this.sortAction;return this.isSortOnSelf()&&e.direction===plywood_1.SortExpression.ASCENDING};t.prototype.toSplitExpression=function(){var e=this,t=e.dimension,i=e.bucketAction;if(!i)return plywood_1.$(t);return plywood_1.$(t).performAction(i)};t.prototype.toKey=function(){return this.dimension};t.prototype.isSortOnSelf=function(){var e=this,t=e.dimension,i=e.sortAction;return i.refName()===t};t.prototype.getNormalizedSortAction=function(){var e=this.sortAction;if(this.isSortOnSelf()){return e.changeExpression(plywood_1.$(t.SORT_ON_DIMENSION_PLACEHOLDER))}return e};t.prototype.changeSortActionFromNormalized=function(e){if(e.refName()===t.SORT_ON_DIMENSION_PLACEHOLDER){var i=this.dimension;e=e.changeExpression(plywood_1.$(i))}return this.changeSortAction(e)};t.prototype.changeLimit=function(e){var t=e===null?null:plywood_1.Expression._.limit(e);return this.changeLimitAction(t)};t.prototype.timezoneDependant=function(){var e=this.bucketAction;if(!e)return false;return e.needsEnvironment()};t.prototype.getDimension=function(e){return immutable_class_1.NamedArray.findByName(e,this.dimension)};t.prototype.getTitle=function(e){var t=this.getDimension(e);return(t?t.title:"?")+this.getBucketTitle()};t.prototype.getBucketTitle=function(){var e=this.bucketAction;if(e instanceof plywood_1.TimeBucketExpression){return" ("+e.duration.getDescription(true)+")"}else if(e instanceof plywood_1.NumberBucketExpression){return" (by "+e.size+")"}return""};t.prototype.isBucketed=function(){return this.bucketAction!=null};t.prototype.isBucketable=function(e){return this.getDimension(e).isBucketable()};t.prototype.addBucketGivenFilter=function(e,i){var n=this.getDimension(i);var o=t.calculateBucketGivenFilter(e,n);return this.changeBucketAction(o)};t.SORT_ON_DIMENSION_PLACEHOLDER="__PIVOT_SORT_ON_DIMENSIONS__";t.EFFECTIVE_NO_LIMIT=plywood_1.Expression._.limit(1e4);t.PROPERTIES=[{name:"dimension"},{name:"sortAction",immutableClass:plywood_1.SortExpression},{name:"bucketAction",immutableClass:plywood_1.Expression,defaultValue:null},{name:"limitAction",immutableClass:plywood_1.LimitExpression,defaultValue:null}];return t}(immutable_class_1.BaseImmutable);exports.SplitCombine=SplitCombine;immutable_class_1.BaseImmutable.finalize(SplitCombine);