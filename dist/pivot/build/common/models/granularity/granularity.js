"use strict";var immutable_class_1=require("immutable-class");var plywood_1=require("plywood");var chronoshift_1=require("chronoshift");var general_1=require("../../../common/utils/general/general");var MENU_LENGTH=5;function makeCheckpoint(e,r){function t(r,t){return r>e||t>e}return{returnValue:granularityFromJS(r),check:t}}function makeNumberBuckets(e,r,t){var n=[];var i=Math.log(e)/Math.LN10;var a=general_1.getNumberOfWholeDigits(e);while(n.length<=r){if(!t){var u=general_1.toSignificantDigits(5*Math.pow(10,i-1),a);n.push(granularityFromJS(u))}if(n.length>=r)break;var o=general_1.toSignificantDigits(Math.pow(10,i),a);n.push(granularityFromJS(o));i++}return n}function days(e){return e*chronoshift_1.day.canonicalLength}function hours(e){return e*chronoshift_1.hour.canonicalLength}function minutes(e){return e*chronoshift_1.minute.canonicalLength}function years(e){return e*chronoshift_1.year.canonicalLength}var TimeHelper=function(){function e(){}e.dimensionKind="time";e.minGranularity=granularityFromJS("PT1M");e.defaultGranularity=granularityFromJS("P1D");e.supportedGranularities=function(){return["PT1S","PT1M","PT5M","PT15M","PT1H","PT6H","PT8H","PT12H","P1D","P1W","P1M","P3M","P6M","P1Y","P2Y"].map(granularityFromJS)};e.checkers=[makeCheckpoint(days(95),"P1W"),makeCheckpoint(days(8),"P1D"),makeCheckpoint(hours(8),"PT1H"),makeCheckpoint(hours(3),"PT5M")];e.coarseCheckers=[makeCheckpoint(years(2),"P6M"),makeCheckpoint(days(95),"P1M"),makeCheckpoint(days(20),"P1W"),makeCheckpoint(days(6),"P1D"),makeCheckpoint(days(2),"PT12H"),makeCheckpoint(hours(23),"PT6H"),makeCheckpoint(hours(3),"PT1H"),makeCheckpoint(minutes(30),"PT5M")];e.defaultGranularities=e.checkers.map(function(e){return e.returnValue}).concat(e.minGranularity).reverse();e.coarseGranularities=e.coarseCheckers.map(function(e){return e.returnValue}).concat(e.minGranularity).reverse();e.get={bucketSize:function(e){return e.duration.getCanonicalLength()},bucketUnit:function(e){return e.duration},fromBucketUnit:function(e){return plywood_1.Expression._.timeBucket(e)},startValue:function(e){return e.start.valueOf()},endValue:function(e){return e.end.valueOf()},toString:function(e){return e.duration.toString()},lineChartTicks:function(e,r){var t=e.start,n=e.end;var i=getBestBucketUnitForRange(e,true);return i.materialize(t,n,r)},newBucketSize:function(e,r){return plywood_1.Expression._.timeBucket(r.duration,e.timezone)}};return e}();exports.TimeHelper=TimeHelper;var NumberHelper=function(){function e(){}e.dimensionKind="number";e.minGranularity=granularityFromJS(1);e.defaultGranularity=granularityFromJS(10);e.checkers=[makeCheckpoint(5e3,1e3),makeCheckpoint(500,100),makeCheckpoint(100,10),makeCheckpoint(1,1),makeCheckpoint(.1,.1)];e.defaultGranularities=e.checkers.map(function(e){return granularityFromJS(e.returnValue)}).reverse();e.coarseGranularities=null;e.coarseCheckers=[makeCheckpoint(5e5,5e4),makeCheckpoint(5e4,1e4),makeCheckpoint(5e3,5e3),makeCheckpoint(1e3,1e3),makeCheckpoint(100,100),makeCheckpoint(10,10),makeCheckpoint(1,1),makeCheckpoint(.1,.1)];e.supportedGranularities=function(e){return makeNumberBuckets(getBucketSize(e),10)};e.get={bucketSize:function(e){return e.size},bucketUnit:function(e){return e.size},fromBucketUnit:function(e){return plywood_1.Expression._.numberBucket(e,0)},startValue:function(e){return e.start},endValue:function(e){return e.end},toString:function(e){return e.size.toString()},lineChartTicks:function(e,r){var t=e,n=t.start,i=t.end;var a=getBestBucketUnitForRange(e,true);var u=[];var o=Math.round(n*a)/a;while(o<=i){u.push(o);o+=a}return u},newBucketSize:function(e,r){return plywood_1.Expression._.numberBucket(r.size,e.offset)}};return e}();exports.NumberHelper=NumberHelper;function getHelper(){return{kind:function(e){return e==="time"?TimeHelper:NumberHelper},bucketUnit:function(e){return e instanceof chronoshift_1.Duration?TimeHelper:NumberHelper},range:function(e){return e instanceof plywood_1.TimeRange?TimeHelper:NumberHelper},granularity:function(e){return e instanceof plywood_1.TimeBucketExpression?TimeHelper:NumberHelper}}}var getBucketSize=function(e){return getHelper().granularity(e).get.bucketSize(e)};var getBucketUnit=function(e){return getHelper().granularity(e).get.bucketUnit(e)};var bucketUnitToGranularity=function(e){return getHelper().bucketUnit(e).get.fromBucketUnit(e)};var startValue=function(e){return getHelper().range(e).get.startValue(e)};var endValue=function(e){return getHelper().range(e).get.endValue(e)};function findBestMatch(e,r){var t=general_1.findExactIndex(e,r,getBucketSize);if(t!==-1){return e[t]}var n=general_1.findFirstBiggerIndex(e,r,getBucketSize);if(n!==-1){return e[n]}return e[general_1.findMaxValueIndex(e,getBucketSize)]}function generateGranularitySet(e,r,t){var n=general_1.findFirstBiggerIndex(e,r,getBucketSize);var i=e.slice(n,n+MENU_LENGTH);if(general_1.findExactIndex(i,r,getBucketSize)===-1){i=[r].concat(i.slice(0,i.length-1))}return i}function granularityFromJS(e){if(typeof e==="number")return plywood_1.Expression._.numberBucket(e);if(typeof e==="string")return plywood_1.Expression._.timeBucket(e);if(typeof e==="object"){if(!general_1.hasOwnProperty(e,"action")&&!general_1.hasOwnProperty(e,"op")){throw new Error("could not recognize object as action")}return plywood_1.Expression.fromJS(e)}throw new Error("input should be of type number, string, or expression")}exports.granularityFromJS=granularityFromJS;function granularityToString(e){if(!e)return"none";return getHelper().granularity(e).get.toString(e)}exports.granularityToString=granularityToString;function granularityEquals(e,r){return immutable_class_1.immutableEqual(e,r)}exports.granularityEquals=granularityEquals;function granularityToJS(e){var r=e.toJS();if(r.op==="timeBucket"){if(Object.keys(r).length===2)return r.duration}if(r.op==="numberBucket"){if(Object.keys(r).length===2)return r.size}return r}exports.granularityToJS=granularityToJS;function updateBucketSize(e,r){if(!r)return null;if(!e)return r;return getHelper().granularity(e).get.newBucketSize(e,r)}exports.updateBucketSize=updateBucketSize;function getGranularities(e,r,t,n){var i=getHelper().kind(e);var a=i.defaultGranularities,u=i.coarseGranularities;if(!r){return t&&u?u:a}var o=i.supportedGranularities(r);return generateGranularitySet(o,r,n)}exports.getGranularities=getGranularities;function getDefaultGranularityForKind(e,r,t){if(r)return r;if(t)return t[2];return getHelper().kind(e).defaultGranularity}exports.getDefaultGranularityForKind=getDefaultGranularityForKind;function getBestGranularityForRange(e,r,t,n){return bucketUnitToGranularity(getBestBucketUnitForRange(e,r,t,n))}exports.getBestGranularityForRange=getBestGranularityForRange;function getBestBucketUnitForRange(e,r,t,n){var i=Math.abs(endValue(e)-startValue(e));var a=getHelper().range(e);var u=t?getBucketSize(t):0;var o=r&&a.coarseCheckers?a.coarseCheckers:a.checkers;for(var c=0;c<o.length;c++){var l=o[c],s=l.returnValue,g=l.check;if(g(i,u)){if(t){var k=n||getGranularities(a.dimensionKind,t);var f=general_1.findBiggerClosestToIdeal(k,t,s,getBucketSize);if(f===null)return getBucketUnit(a.defaultGranularity);return getBucketUnit(f)}else{if(!n)return getBucketUnit(s);return getBucketUnit(findBestMatch(n,s))}}}var p=n?n[general_1.findMinValueIndex(n,getBucketSize)]:a.minGranularity;var m=u>getBucketSize(p)?t:p;return getBucketUnit(m)}exports.getBestBucketUnitForRange=getBestBucketUnitForRange;function getLineChartTicks(e,r){return getHelper().range(e).get.lineChartTicks(e,r)}exports.getLineChartTicks=getLineChartTicks;