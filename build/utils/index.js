"use strict";
// utils
Object.defineProperty(exports, "__esModule", { value: true });
exports.dump = exports.load = exports.iteration = exports.toTime = void 0;
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
//for test
// const testCallback = function (value) {
//   console.log("this is", value);
// };
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
