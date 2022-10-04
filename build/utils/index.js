"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dump = exports.load = exports.iteration = exports.toTime = exports.flagDurationValidator = exports.flagPathValidator = exports.trace = exports.pipe = void 0;
const sound = require("sound-play");
const path = require("path");
const fs = require("fs");
const os = require("os");
const spawn = require("child_process").spawn;
// utils
//for test
// const testCallback = function (value) {
//   console.log("this is", value);
// };
// composeItems
const pipe = (...fns) => (x) => fns.reduce((y, fn) => fn(y), x);
exports.pipe = pipe;
const trace = (label) => (value) => {
    console.log(`${Object.assign({}, value)}`);
    return Object.assign({}, value);
};
exports.trace = trace;
const dataProvider = (data, name) => (value) => {
    value[name] = data;
    return Object.assign({}, value);
};
const isNothing = (value) => {
    if (value !== null || value != undefined) {
        return value;
    }
    return null;
};
const flagPathValidator = (obj) => {
    let path = obj.path ? obj.path : null;
    return dataProvider(path, 'path');
};
exports.flagPathValidator = flagPathValidator;
const flagDurationValidator = (obj) => {
    let duration = obj.duration ? obj.duration : null;
    return dataProvider(duration, 'duration');
};
exports.flagDurationValidator = flagDurationValidator;
// convert seconds to time format
const toTime = function* (secs) {
    yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};
exports.toTime = toTime;
//only generator functions
const iteration = (iteretor, val) => {
    return iteretor(val).next().value;
};
exports.iteration = iteration;
// function provider
const queue = [];
// load function to function provider
const load = (fn, arg) => {
    return queue.push([fn, arg]);
};
exports.load = load;
// dump and run  functions  from function provider
const dump = () => {
    while (queue.length) {
        let [fn, arg] = queue.shift();
        fn(arg);
    }
};
exports.dump = dump;
