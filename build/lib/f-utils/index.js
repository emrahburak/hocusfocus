"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = exports.pipe = void 0;
const R = require('ramda');
const compose = R.compose;
const path = R.path;
const prop = R.prop;
const pipe = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);
exports.pipe = pipe;
const Maybe = function (val) {
    this.__value = val;
};
exports.Maybe = Maybe;
exports.Maybe["of"] = function (val) {
    return new exports.Maybe(val);
};
exports.Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
};
exports.Maybe.prototype.map = function (fn) {
    if (this.isNothing()) {
        return exports.Maybe["of"](null);
    }
    return exports.Maybe["of"](fn(this.__value));
};
exports.Maybe.prototype.join = function () {
    return this.__value;
};
exports.Maybe.prototype.orElse = function (argv) {
    if (this.isNothing()) {
        return exports.Maybe["of"](argv);
    }
    return this;
};
