"use strict";
exports.__esModule = true;
exports.includes = function (value, key) {
    if (value && value.includes) {
        return value.includes(key);
    }
    if (value && value.indexOf) {
        if (value.indexOf(key) >= 0) {
            return true;
        }
    }
    return false;
};
exports.omit = function (data, keys) {
    var obj = {};
    for (var key in data) {
        if (exports.includes(keys, key)) {
            continue;
        }
        obj[key] = data[key];
    }
    return obj;
};
