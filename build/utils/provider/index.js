"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dump = exports.payload = void 0;
// function provider
const queue = [];
// load function to function provider
const payload = (fn, arg) => {
    return queue.push([fn, arg]);
};
exports.payload = payload;
// dump and run  functions  from function provider
const dump = () => {
    while (queue.length) {
        let [fn, arg] = queue.shift();
        fn(arg);
    }
};
exports.dump = dump;
