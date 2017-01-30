"use strict";var path=require("path");var fs=require("fs-promise");var plywood_1=require("plywood");var parser_1=require("../../../common/utils/parser/parser");function getFileData(e){return fs.readFile(e,"utf-8").then(function(r){try{return parser_1.parseData(r,path.extname(e))}catch(r){throw new Error("could not parse '"+e+"': "+r.message)}}).then(function(e){if(e.length&&e[0]["time"]){e.forEach(function(e){e["time"]=new Date(e["time"])})}return e})}exports.getFileData=getFileData;function noop(){}var FileManager=function(){function e(e){this.logger=e.logger;this.verbose=Boolean(e.verbose);this.anchorPath=e.anchorPath;this.uri=e.uri;this.subsetExpression=e.subsetExpression;this.derivedAttributes=e.derivedAttributes||{};this.verbose=Boolean(e.verbose)}e.prototype.loadDataset=function(){var e=this;var r=this,t=r.logger,a=r.anchorPath,o=r.uri;var i=path.resolve(a,o);t.log("Loading file "+i);return getFileData(i).then(function(r){var a=e,o=a.derivedAttributes,s=a.subsetExpression;t.log("Loaded file "+i+" (rows = "+r.length+")");var n=plywood_1.Dataset.fromJS(r).hide();for(var u in o){var l=o[u];n=n.apply(u,l)}if(s){n=n.filter(s)}e.dataset=n;return n},function(e){t.error("Failed to load file "+i+" because: "+e.message);throw e})};e.prototype.destroy=function(){};return e}();exports.FileManager=FileManager;