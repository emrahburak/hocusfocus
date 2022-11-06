"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDuration = exports.isPath = exports.IsPath = void 0;
const path = require("path");
const IsPath = (obj) => { let file = path.resolve(obj.path); };
exports.IsPath = IsPath;
const isPath = (obj) => {
    let path = obj.path ? obj.path : null;
    return Object.assign(Object.assign({}, obj), { path });
};
exports.isPath = isPath;
const isDuration = (obj) => {
    let duration = obj.duration ? obj.duration : null;
    return Object.assign(Object.assign({}, obj), { duration });
};
exports.isDuration = isDuration;
