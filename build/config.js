"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var argv = require('@fengqiaogang/argv');
var merge = require('webpack-merge').merge;
var _ = __importStar(require("./lodash"));
function isExists(src) {
    try {
        var exists = fs.existsSync(src);
        if (exists) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
}
function ReadFile(src) {
    if (isExists(src)) {
        var content = fs.readFileSync(src);
        if (content) {
            try {
                return JSON.parse(content);
            }
            catch (error) {
            }
        }
    }
    return {};
}
var Config = (function () {
    function Config(configName) {
        if (configName === void 0) { configName = 'config.json'; }
        this.configName = configName;
    }
    Config.prototype.getProjectDir = function (dir) {
        if (isExists(dir)) {
            var stat = fs.statSync(dir);
            if (stat.isFile()) {
                return dir;
            }
            var src = path.join(dir, this.configName);
            if (isExists(src)) {
                return src;
            }
        }
        var value = path.join(dir, '..');
        if (dir !== value) {
            return this.getProjectDir(value);
        }
        return void 0;
    };
    Config.prototype.getProjectConfig = function () {
        return this.getProjectDir(__dirname);
    };
    Config.prototype.readConfig = function (configSrc) {
        var data = ReadFile(configSrc);
        var json = _.omit(data, ['import']);
        if (data["import"]) {
            var src = '';
            if (path.isAbsolute(data["import"])) {
                src = path.normalize(data["import"]);
            }
            else {
                src = path.normalize(path.join(configSrc, '..', data["import"]));
            }
            var value = this.readConfig(src);
            return merge({}, value, json);
        }
        return json;
    };
    Config.prototype.getConfig = function () {
        var src = this.getProjectConfig();
        var data = this.readConfig(src);
        return merge({}, data, argv);
    };
    return Config;
}());
exports["default"] = Config;
