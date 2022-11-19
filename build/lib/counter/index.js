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
exports.countDown = exports.pause = exports.iteration = exports.toTime = void 0;
const Cons = __importStar(require("../constants"));
const Event = __importStar(require("../event"));
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
var isPaused = false;
function pause() {
    isPaused = !isPaused;
    return isPaused;
}
exports.pause = pause;
Event.consumer(Cons.commands.EMIT_COUNTER, pause);
const countDown = function (n_duration, callback) {
    let countdownTimer = setInterval(() => {
        if (isPaused === false) {
            let getTime = (0, exports.iteration)(exports.toTime, n_duration);
            Print.line(`${getTime}`);
            n_duration--;
            if (n_duration < 0) {
                return [clearInterval(countdownTimer), callback()];
            }
        }
    }, 1000);
};
exports.countDown = countDown;
