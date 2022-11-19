"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.publisher = exports.listener_test = void 0;
const events = require("events");
var eventEmmitter = new events.EventEmitter();
eventEmmitter.setMaxListeners(0);
const listener_test = function () {
    console.log("listener executed");
};
exports.listener_test = listener_test;
function publisher(message) {
    return eventEmmitter.emit(message);
}
exports.publisher = publisher;
function consumer(message, callback) {
    return eventEmmitter.addListener(message, callback);
}
exports.consumer = consumer;
