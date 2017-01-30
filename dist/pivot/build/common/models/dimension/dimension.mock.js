"use strict";var dimension_1=require("./dimension");var DimensionMock=function(){function e(){}Object.defineProperty(e,"COUNTRY_STRING_JS",{get:function(){return{name:"country",title:"important countries",type:"STRING"}},enumerable:true,configurable:true});Object.defineProperty(e,"COUNTRY_URL_JS",{get:function(){return{name:"country",title:"important countries",type:"STRING",url:"https://www.country.com/%s"}},enumerable:true,configurable:true});Object.defineProperty(e,"TIME_JS",{get:function(){return{name:"time",title:"time",type:"TIME",url:"http://www.time.com/%s"}},enumerable:true,configurable:true});Object.defineProperty(e,"NUMBER_JS",{get:function(){return{name:"numeric",title:"Numeric",type:"NUMBER"}},enumerable:true,configurable:true});Object.defineProperty(e,"LANGUAGE_JS",{get:function(){return{name:"language",title:"Language"}},enumerable:true,configurable:true});Object.defineProperty(e,"TWITTER_HANDLE_JS",{get:function(){return{name:"twitterHandle",title:"Twitter Handle"}},enumerable:true,configurable:true});e.countryString=function(){return dimension_1.Dimension.fromJS(e.COUNTRY_STRING_JS)};e.language=function(){return dimension_1.Dimension.fromJS(e.LANGUAGE_JS)};e.countryURL=function(){return dimension_1.Dimension.fromJS(e.COUNTRY_URL_JS)};e.time=function(){return dimension_1.Dimension.fromJS(e.TIME_JS)};e.number=function(){return dimension_1.Dimension.fromJS(e.NUMBER_JS)};e.twitterHandle=function(){return dimension_1.Dimension.fromJS(e.TWITTER_HANDLE_JS)};return e}();exports.DimensionMock=DimensionMock;