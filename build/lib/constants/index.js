"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = exports.errors = exports.testState = exports.initialState = void 0;
exports.initialState = {
    DURATION: 1500,
    PATH: "./audio/beep.wav",
};
exports.testState = {
    DURATION: "15m",
    PATH: "",
    ERRORS: null
};
exports.errors = {
    OPENFILE: "Cant open file. Path is not corret"
};
// export const soundMetaData = {
//   VIN32:"[console]::beep(800,400);[console]::beep(800,400);[console]::beep(800,1000);",
//   DARVIN:"",
//   LINUX: "",
//   UNIX:""
// }
exports.commands = {
    EMIT_COUNTER: "EMIT_COUNTER"
};
