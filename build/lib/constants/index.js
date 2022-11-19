"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soundMetaData = exports.errors = exports.testState = exports.initialState = void 0;
exports.initialState = {
    DURATION: 1500,
    PATH: "./audio/audio.mp3",
};
exports.testState = {
    DURATION: 1500,
    PATH: "TestPath",
    ERRORS: null
};
exports.errors = {
    OPENFILE: "Cant open file. Path is not corret"
};
exports.soundMetaData = {
    VIN32: "[console]::beep(300,400)",
    DARVIN: "",
    LINUX: "",
    UNIX: ""
};
