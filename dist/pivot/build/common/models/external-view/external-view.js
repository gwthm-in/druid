"use strict";var check;var ExternalView=function(){function t(t){var e=t.title,n=t.linkGenerator;if(!e)throw new Error("External view must have title");if(typeof n!=="string")throw new Error("Must provide link generator function");this.title=e;this.linkGenerator=n;var r=null;try{r=new Function("dataCube","dataSource","timezone","filter","splits",n)}catch(t){throw new Error("Error constructing link generator function: "+t.message)}this.linkGeneratorFn=function(t,i,o,a){try{return r(t,t,i,o,a)}catch(t){console.warn("Error with custom link generating function '"+e+"': "+t.message+" ["+n+"]");return null}};this.sameWindow=Boolean(t.sameWindow)}t.isExternalView=function(e){return e instanceof t};t.fromJS=function(e){var n=e;return new t({title:n.title,linkGenerator:n.linkGenerator,linkGeneratorFn:n.linkGeneratorFn,sameWindow:n.sameWindow})};t.prototype.toJS=function(){var t={title:this.title,linkGenerator:this.linkGenerator};if(this.sameWindow===true)t.sameWindow=true;return t};t.prototype.valueOf=function(){var t={title:this.title,linkGenerator:this.linkGenerator};if(this.sameWindow===true)t.sameWindow=true;return t};t.prototype.toJSON=function(){return this.toJS()};t.prototype.equals=function(e){return t.isExternalView(e)&&this.title===e.title&&this.linkGenerator===e.linkGenerator&&this.sameWindow===e.sameWindow};t.prototype.toString=function(){return this.title+": "+this.linkGenerator};return t}();exports.ExternalView=ExternalView;check=ExternalView;