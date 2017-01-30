"use strict";var country_alpha2_1=require("./country-alpha2");var country_alpha3_1=require("./country-alpha3");var country_unm49_1=require("./country-unm49");exports.ENCODINGS=["ISO 3166-1 Alpha-2","ISO 3166-1 Alpha-3","UN M49"];exports.CODES_BY_ENCODING={"ISO 3166-1 Alpha-2":country_alpha2_1.COUNTRY_ALPHA2,"ISO 3166-1 Alpha-3":country_alpha3_1.COUNTRY_ALPHA3,"UN M49":country_unm49_1.COUNTRY_UNM49};function getCodes(r){if(exports.ENCODINGS.indexOf(r)===-1)throw new Error("Unknown encoding: "+r);return exports.CODES_BY_ENCODING[r]}exports.getCodes=getCodes;