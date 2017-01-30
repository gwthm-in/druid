"use strict";var crypto=require("crypto");var Q=require("q");var nike_hercules_1=require("@implydata/nike-hercules");var general_1=require("../../../common/utils/general/general");function getDefaultCookie(){var e=2592e6;var t=new Date;t.setMonth(t.getMonth()+1);return{maxAge:e,expires:t}}var USED={token:"#used#",cookie:getDefaultCookie()};var TokenManager=function(){function e(e,t){this.inviteStore=nike_hercules_1.storeFactory(e);this.logger=t.logger}e.makeToken=function(){return{token:crypto.randomBytes(15).toString("hex"),cookie:getDefaultCookie()}};e.prototype.setUsed=function(e){this.setToken(e,USED)};e.prototype.isUsed=function(e){return this.getTokenValue(e).then(function(e){return e===USED.token})};e.prototype.setToken=function(e,t){var r=this.logger;var o=Q.defer();r.log("Setting token for '"+e+"'");this.inviteStore.set(e,t,function(e,t){if(e){o.reject(e)}else{o.resolve(null)}});return o.promise};e.prototype.getTokenValue=function(e){var t=this.logger;var r=Q.defer();t.log("Getting token for '"+e+"'");this.inviteStore.get(e,function(e,t){if(e||!general_1.hasOwnProperty(t,"token")){r.reject({message:"invalid token"})}else{r.resolve(t.token)}});return r.promise};e.prototype.processToken=function(e,t){var r=this;var o=this.logger;o.log("Processing token for '"+e+"'");return this.getTokenValue(e).then(function(e){if(e!==t){throw new Error("invalid token")}}).then(function(){return r.setUsed(e)})};return e}();exports.TokenManager=TokenManager;