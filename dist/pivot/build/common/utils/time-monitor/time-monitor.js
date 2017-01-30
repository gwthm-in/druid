"use strict";var Q=require("q");var chronoshift_1=require("chronoshift");var timekeeper_1=require("../../models/timekeeper/timekeeper");var TimeMonitor=function(){function e(e){this.doingChecks=false;this.logger=e;this.checks={};this.regularCheckInterval=6e4;this.timekeeper=timekeeper_1.Timekeeper.EMPTY;var t=setInterval(this.doChecks.bind(this),1e3);if(t.unref)t.unref();this.doChecks()}e.prototype.addCheck=function(e,t){this.checks[e]=t;this.timekeeper=this.timekeeper.addTimeTagFor(e);return this.doCheck(e)};e.prototype.removeCheck=function(e){delete this.checks[e];this.timekeeper=this.timekeeper.removeTimeTagFor(e)};e.prototype.doCheck=function(e){var t=this;var r=this.logger;var i=this.checks[e];if(!i)return Q(null);return i().then(function(i){if(!chronoshift_1.isDate(i))throw new Error("got a non-date value from update "+i);r.log("Got the latest time for '"+e+"' ("+i.toISOString()+")");t.timekeeper=t.timekeeper.updateTime(e,i)}).catch(function(i){r.error("Error getting time for '"+e+"': "+i.message);t.timekeeper=t.timekeeper.touch(e)})};e.prototype.doChecks=function(){var e=this;var t=this,r=t.doingChecks,i=t.timekeeper,o=t.regularCheckInterval;if(r)return;var h=i.now().valueOf();var n=this.timekeeper.timeTags;this.doingChecks=true;var s=[];for(var a=0,c=n;a<c.length;a++){var k=c[a];if(!k.time||h-k.updated.valueOf()>o){s.push(this.doCheck(k.name))}}Q.allSettled(s).then(function(){e.doingChecks=false})};return e}();exports.TimeMonitor=TimeMonitor;