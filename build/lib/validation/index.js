"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatform = exports.isRealFilePath = exports.isDuration = exports.isPath = exports.IsPath = void 0;
const constants_1 = require("../constants");
const path = require("path");
const os = require("os");
const fs = require("fs");
const IsPath = (obj) => {
    let file = path.resolve(obj.path);
};
exports.IsPath = IsPath;
const isPath = (obj) => {
    let path = obj.path ? obj.path : undefined;
    return Object.assign(Object.assign({}, obj), { path });
};
exports.isPath = isPath;
const isDuration = (obj) => {
    let duration = obj.duration ? obj.duration : undefined;
    return Object.assign(Object.assign({}, obj), { duration });
};
exports.isDuration = isDuration;
const isRealFilePath = (obj) => {
    let myFile = path.resolve(String(obj["path"]));
    var stats = fs.statSync(myFile).isFile();
    if (!stats) {
        return Object.assign(Object.assign({}, obj), { error: constants_1.errors.OPENFILE });
    }
    return obj;
};
exports.isRealFilePath = isRealFilePath;
const getPlatform = () => {
    return os.platform;
};
exports.getPlatform = getPlatform;
