"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOption = exports.pipe = void 0;
const Valid = __importStar(require("../validation"));
const R = require('ramda');
const compose = R.compose;
const path = R.path;
const prop = R.prop;
const pipe = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);
exports.pipe = pipe;
var Maybe = function (val) {
    this.__value = val;
};
Maybe["of"] = function (val) {
    return new Maybe(val);
};
Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
};
Maybe.prototype.map = function (fn) {
    if (this.isNothing()) {
        return Maybe["of"](null);
    }
    return Maybe["of"](fn(this.__value));
};
Maybe.prototype.join = function () {
    return this.__value;
};
Maybe.prototype.orElse = function (argv) {
    if (this.isNothing()) {
        return Maybe["of"](argv);
    }
    return this;
};
function getOption(opt) {
    return Maybe["of"](opt)
        .map(Valid.isPath)
        .map(Valid.isDuration)
        .join();
}
exports.getOption = getOption;
