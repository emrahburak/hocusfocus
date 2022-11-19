"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trace = void 0;
const trace = (label) => (value) => {
    console.log(`${label}: ${Object.assign({}, value)}`);
    return value;
};
exports.trace = trace;
