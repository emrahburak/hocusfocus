"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counter = exports.isPaused = exports.iteration = exports.toTime = void 0;
const Print = require("one-line-print");
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
exports.isPaused = false;
// counter and timer
const counter = function (n_duration, callback) {
    let countdownTimer = setInterval(() => {
        if (!exports.isPaused) {
            let getTime = (0, exports.iteration)(exports.toTime, n_duration);
            Print.line(`${getTime}`);
            n_duration--;
            if (n_duration < 0) {
                return [clearInterval(countdownTimer), callback()];
            }
        }
    }, 1000);
};
exports.counter = counter;
