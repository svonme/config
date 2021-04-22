"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var config_1 = __importDefault(require("./config"));
var config = function (configName) {
    var app = new config_1["default"](configName);
    var data = app.getConfig();
    return data;
};
exports["default"] = config;
