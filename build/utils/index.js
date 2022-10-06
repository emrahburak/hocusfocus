"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dump = exports.load = exports.iteration = exports.toTime = exports.IsPath = exports.optionValidatorDuration = exports.optionValidatorPath = exports.trace = exports.pipe = void 0;
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
