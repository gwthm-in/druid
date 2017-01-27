"use strict";var split_combine_1=require("./split-combine");var data_cube_mock_1=require("../data-cube/data-cube.mock");var dimensions=data_cube_mock_1.DataCubeMock.wiki().getSplitableDimensions();var splitContext={dimensions:dimensions,measure:"count"};var SplitCombineMock=function(){function e(){}Object.defineProperty(e,"TIME_ONE_HOUR_JS",{get:function(){return{dimension:"time",sortAction:{op:"sort",direction:"ascending",expression:{op:"ref",name:"time"}},limitAction:{op:"limit",value:2},bucketAction:{op:"timeBucket",duration:"PT1H"}}},enumerable:true,configurable:true});Object.defineProperty(e,"TIME_ONE_HOUR_JS_DELTA_SORT",{get:function(){return{dimension:"time",sortAction:{op:"sort",direction:"ascending",expression:{op:"ref",name:"delta"}},limitAction:{op:"limit",value:2},bucketAction:{op:"timeBucket",duration:"PT1H"}}},enumerable:true,configurable:true});Object.defineProperty(e,"TIME_ONE_DAY_JS",{get:function(){return{dimension:"time",sortAction:{op:"sort",direction:"ascending",expression:{op:"ref",name:"time"}},limitAction:{op:"limit",value:2},bucketAction:{op:"timeBucket",duration:"P1D"}}},enumerable:true,configurable:true});Object.defineProperty(e,"TIME_NO_BUCKET_JS",{get:function(){return{dimension:"time",sortAction:{op:"sort",direction:"ascending",expression:{op:"ref",name:"time"}},limitAction:{op:"limit",value:2}}},enumerable:true,configurable:true});Object.defineProperty(e,"LANGUAGE_JS",{get:function(){return{dimension:"language",sortAction:{op:"sort",direction:"descending",expression:{name:"count",op:"ref"}}}},enumerable:true,configurable:true});Object.defineProperty(e,"NUMBER_JS",{get:function(){return{dimension:"number"}},enumerable:true,configurable:true});Object.defineProperty(e,"CHANNEL_JS",{get:function(){return{dimension:"channel"}},enumerable:true,configurable:true});Object.defineProperty(e,"BASIC_TIME_JS",{get:function(){return{dimension:"time",sortAction:{op:"sort",direction:"ascending",expression:{name:"time",op:"ref"}}}},enumerable:true,configurable:true});e.language=function(){return split_combine_1.SplitCombine.fromJS(e.LANGUAGE_JS,splitContext)};e.time=function(){return split_combine_1.SplitCombine.fromJS(e.TIME_ONE_HOUR_JS,splitContext)};return e}();exports.SplitCombineMock=SplitCombineMock;