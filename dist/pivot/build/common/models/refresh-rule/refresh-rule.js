"use strict";var check;var RefreshRule=function(){function e(t){var r=t.rule;if(r!==e.FIXED&&r!==e.QUERY&&r!==e.REALTIME){throw new Error("rule must be on of: "+e.FIXED+", "+e.QUERY+", or "+e.REALTIME)}this.rule=r;this.time=t.time}e.isRefreshRule=function(t){return t instanceof e};e.query=function(){return new e({rule:e.QUERY})};e.fromJS=function(t){var r={rule:t.rule};if(t.time){r.time=new Date(t.time)}return new e(r)};e.prototype.valueOf=function(){var e={rule:this.rule};if(this.time){e.time=this.time}return e};e.prototype.toJS=function(){var e={rule:this.rule};if(this.time){e.time=this.time}return e};e.prototype.toJSON=function(){return this.toJS()};e.prototype.toString=function(){return"[RefreshRule: "+this.rule+"]"};e.prototype.equals=function(t){return e.isRefreshRule(t)&&this.rule===t.rule&&(!this.time||this.time.valueOf()===t.time.valueOf())};e.prototype.isFixed=function(){return this.rule===e.FIXED};e.prototype.isQuery=function(){return this.rule===e.QUERY};e.prototype.isRealtime=function(){return this.rule===e.REALTIME};e.FIXED="fixed";e.QUERY="query";e.REALTIME="realtime";return e}();exports.RefreshRule=RefreshRule;check=RefreshRule;