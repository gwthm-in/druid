"use strict";var moment=require("moment-timezone");var chronoshift_1=require("chronoshift");var general_1=require("../general/general");var FORMAT_ISOISH="YYYY-MM-DD[T]HH:mm:ss";var FORMAT_WITH_YEAR="MMM D, YYYY";var FORMAT_WITHOUT_YEAR="MMM D";function formatTimeOfDay(r){return r.minutes()?r.format("h:mma"):r.format("ha")}function isCurrentYear(r,e){var t=moment.tz(new Date,e.toString());return t.year()===r}(function(r){r[r["ALWAYS"]=0]="ALWAYS";r[r["NEVER"]=1]="NEVER";r[r["IF_DIFF"]=2]="IF_DIFF"})(exports.DisplayYear||(exports.DisplayYear={}));var DisplayYear=exports.DisplayYear;function getEndWallTimeInclusive(r,e){return moment.tz(exclusiveToInclusiveEnd(r),e.toString())}exports.getEndWallTimeInclusive=getEndWallTimeInclusive;function exclusiveToInclusiveEnd(r){return new Date(r.valueOf()-1)}exports.exclusiveToInclusiveEnd=exclusiveToInclusiveEnd;function formatTimeRange(r,e,t){var a=r.start,n=r.end;var o=moment.tz(a,e.toString());var i=moment.tz(n,e.toString());var s=getEndWallTimeInclusive(n,e);var u=true;var f;if(o.year()!==s.year()){f=[o.format(FORMAT_WITH_YEAR),s.format(FORMAT_WITH_YEAR)].join(" - ")}else{u=t===DisplayYear.ALWAYS||t===DisplayYear.IF_DIFF&&!isCurrentYear(s.year(),e);var m=u?FORMAT_WITH_YEAR:FORMAT_WITHOUT_YEAR;if(o.month()!==s.month()||o.date()!==s.date()){f=[o.format(FORMAT_WITHOUT_YEAR),s.format(m)].join(" - ")}else{f=o.format(m)}}if(o.hours()||o.minutes()||i.hours()||i.minutes()){f+=u?" ":", ";var l=formatTimeOfDay(o).toLowerCase();var h=formatTimeOfDay(i).toLowerCase();if(l===h){f+=l}else{if(l.substr(-2)===h.substr(-2)){l=l.substr(0,l.length-2)}f+=[l,h].join("-")}}return f}exports.formatTimeRange=formatTimeRange;function monthToWeeks(r,e){var t=[];var a=chronoshift_1.month.shift(r,e,1);var n=[];var o=chronoshift_1.day.floor(r,e);while(o<a){var i=moment.tz(o,e.toString());if(i.day()===moment.localeData().firstDayOfWeek()&&n.length>0){t.push(n);n=[]}n.push(o);o=chronoshift_1.day.shift(o,e,1)}if(n.length>0)t.push(n);return t}exports.monthToWeeks=monthToWeeks;function prependDays(r,e,t){for(var a=0;a<t;a++){var n=e[0];var o=chronoshift_1.day.shift(n,r,-1);e.unshift(o)}return e}exports.prependDays=prependDays;function appendDays(r,e,t){for(var a=0;a<t;a++){var n=e[e.length-1];var o=chronoshift_1.day.shift(n,r,1);e.push(o)}return e}exports.appendDays=appendDays;function shiftOneDay(r,e){return chronoshift_1.day.shift(r,e,1)}exports.shiftOneDay=shiftOneDay;function datesEqual(r,e){if(!Boolean(r)===Boolean(e))return false;if(r===e)return true;return r.valueOf()===e.valueOf()}exports.datesEqual=datesEqual;function getWallTimeDay(r,e){return moment.tz(r,e.toString()).date()}exports.getWallTimeDay=getWallTimeDay;function getWallTimeMonthWithYear(r,e){return moment.tz(r,e.toString()).format("MMMM YYYY")}exports.getWallTimeMonthWithYear=getWallTimeMonthWithYear;function wallTimeInclusiveEndEqual(r,e,t){if(!Boolean(r)===Boolean(e))return false;if(r===e)return true;var a=getEndWallTimeInclusive(r,t);var n=getEndWallTimeInclusive(e,t);return a.valueOf()===n.valueOf()}exports.wallTimeInclusiveEndEqual=wallTimeInclusiveEndEqual;function getWallTimeString(r,e,t,a){var n=moment.tz(r,e.toString()).format(FORMAT_ISOISH);if(t){return n.replace("T",a||", ")}return n.replace(/:\d\d/,"").split("T")[0]}exports.getWallTimeString=getWallTimeString;function formatTimeBasedOnGranularity(r,e,t){var a=moment.tz(r.start,t.toString());var n=e.toJS();var o=n.substring(n.length-1);switch(o){case"S":return a.format("MMM D, hh:mm:ss");case"M":var i=n.substring(0,2);return i==="PT"?a.format("MMM D, h:mma"):a.format("MMM, YYYY");case"H":return a.format("MMM D YYYY, ha");case"D":return a.format("MMM D, YYYY");case"W":return""+formatTimeRange(r,t,DisplayYear.ALWAYS);default:return a.format(FORMAT_ISOISH)}}exports.formatTimeBasedOnGranularity=formatTimeBasedOnGranularity;function isBoundaryTick(r){return general_1.hasOwnProperty(r,"boundary")}exports.isBoundaryTick=isBoundaryTick;function formatAxisBasedOnRange(r,e,t){var a=moment.tz(r,t.toString());var n=e.end.valueOf()-e.start.valueOf();if(n<6*chronoshift_1.hour.canonicalLength){if(a.minute()===0)return a.format("hA");return a.format("hh:mm")}else if(n<3*chronoshift_1.day.canonicalLength){if(a.hour()===0)return{value:a.format("hA"),boundary:a.format("MMM DD")};return a.format("hA")}else if(n<6*chronoshift_1.day.canonicalLength){if(a.hour()===0)return a.format("MMM DD");return a.format("hh:mm")}else if(n<20*chronoshift_1.day.canonicalLength){if(a.date()===0)return{value:a.format("ddd DD"),boundary:a.format("MMMM")};return a.format("ddd DD")}else if(n<95*chronoshift_1.day.canonicalLength){return a.format("MMM DD")}else if(n<2*chronoshift_1.year.canonicalLength){if(a.month()===0)return{value:a.format("MMMM"),boundary:a.format("YYYY")};return a.format("MMM")}return a.format("MMM YYYY")}exports.formatAxisBasedOnRange=formatAxisBasedOnRange;function formatGranularity(r){return r.replace(/^PT?/,"")}exports.formatGranularity=formatGranularity;