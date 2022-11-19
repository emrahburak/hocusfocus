"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpQueue = exports.loadQueue = void 0;
// function provider
const queue = [];
// load function to function provider
const loadQueue = (fn, arg) => {
    return queue.push([fn, arg]);
};
exports.loadQueue = loadQueue;
// dump and run  functions  from function provider
const dumpQueue = () => {
    while (queue.length) {
        let [fn, arg] = queue.shift();
        fn(arg);
    }
};
exports.dumpQueue = dumpQueue;
