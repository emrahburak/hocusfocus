"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPath = exports.optionValidatorDuration = exports.optionValidatorPath = exports.trace = exports.pipe = void 0;
const sound = require("sound-play");
const path = require("path");
const fs = require("fs");
const os = require("os");
const spawn = require("child_process").spawn;
const pipe = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);
exports.pipe = pipe;
const trace = (label) => (value) => {
    console.log(`${label}: ${Object.assign({}, value)}`);
    return Object.assign({}, value);
};
exports.trace = trace;
const optionValidatorPath = (obj) => {
    let path = obj.path ? obj.path : null;
    return Object.assign(Object.assign({}, obj), { path });
};
exports.optionValidatorPath = optionValidatorPath;
const optionValidatorDuration = (obj) => {
    let duration = obj.duration ? obj.duration : null;
    return Object.assign(Object.assign({}, obj), { duration });
};
exports.optionValidatorDuration = optionValidatorDuration;
const IsPath = (obj) => { let file = path.resolve(obj.path); };
exports.IsPath = IsPath;
var Maybe = function (val) {
    this.__value = val;
};
Maybe["of"] = function (val) {
    return new Maybe(val);
};
const getProp = function (name) {
    return name;
};
Maybe.prototype.isNothing = function (fn) {
    return (this.__value === null || fn(this.__value) === undefined);
};
Maybe.prototype.map = function (fn) {
    if (this.isNothing(fn)) {
        return Maybe["of"](null);
    }
    return Maybe["of"](fn(this.__value));
};
function getMyStatus(obj) {
    return Maybe["of"](obj)
        .getProp('path')
        .map();
}
