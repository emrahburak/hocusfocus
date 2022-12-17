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
exports.orDefaultPath = exports.afterPathResolver = exports.pathResolver = exports.durationParserMinute = exports.isDuration = exports.isPath = void 0;
const Cons = __importStar(require("../constants"));
const FU = __importStar(require("../f-utils"));
const path = require("path");
const os = require("os");
const fs = require("fs");
// Arguments Null Check
const isPath = (obj) => {
    let path = obj.path ? obj.path : -1;
    return Object.assign(Object.assign({}, obj), { path });
};
exports.isPath = isPath;
// Regex
const isAlpaNum = (str) => str.match(/^[0-9]+[a-z]$/) && true;
const isNum = (str) => str.match(/^[0-9]+$/) && true;
// Converters
const convertMinuteToSecond = (val) => {
    return parseInt(val) * 60;
};
const splitterM = val => {
    return val.split("m")[0];
};
// Parameters control
const isDuration = (obj) => {
    let duration = obj.duration ? String(obj.duration) : -1;
    return Object.assign(Object.assign({}, obj), { duration });
};
exports.isDuration = isDuration;
const durationParserMinute = (obj) => {
    let duration = isAlpaNum(obj.duration)
        ? FU.pipe(obj.duration, splitterM, convertMinuteToSecond)
        : obj.duration;
    return Object.assign(Object.assign({}, obj), { duration });
};
exports.durationParserMinute = durationParserMinute;
// File path Check
const pathResolver = (obj) => {
    let result = path.resolve(String(obj["path"]));
    return Object.assign(Object.assign({}, obj), { path: result });
};
exports.pathResolver = pathResolver;
const afterPathResolver = (obj) => {
    try {
        let error = fs.statSync(obj["path"]).isFile() ? Cons.errors.OPENFILE : -1;
    }
    catch (e) {
        return Object.assign(Object.assign({}, obj), { errors: [e.message] });
    }
    return Object.assign({}, obj);
};
exports.afterPathResolver = afterPathResolver;
const orDefaultPath = (obj) => {
    if (!obj["errors"])
        return Object.assign({}, obj);
    return (0, exports.pathResolver)(Object.assign(Object.assign({}, obj), { path: Cons.initialState.PATH }));
};
exports.orDefaultPath = orDefaultPath;
// Os Check
// const getPlatform:Function = () => {
//   return os.platform() ? os.platform() : -1;
// }
// export const addOsPlatform: Function = (obj) => {
//   return {...obj,platform:getPlatform()}
// };
