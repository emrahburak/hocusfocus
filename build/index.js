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
// import { toTime, load, dump, iteration } from "./utils/index";
const sound = require("sound-play");
const commander = require("commander");
const Print = require("one-line-print");
const keypress = require("keypress");
const path = require("path");
const fs = require("fs");
const os = require("os");
const spawn = require('child_process').spawn;
const utils = __importStar(require("./utils"));
const audioPath = "./audio/audio.mp3";
const defaultDuration = 5;
// basic plain
commander
    .version("1.0.0", "-v, --version")
    .usage("[OPTIONS]...")
    //   .option('-f, --flag', 'Detects if the flag is present.')
    .option("-d, --duration <value>", "set time interval")
    .option("-p, --path <value>", "Overwriting value.")
    .parse(process.argv);
const options = commander.opts();
const myResult = utils.pipe(utils.flagPathValidator, utils.flagDurationValidator);
const result = myResult(commander.opts());
console.log(result);
// chek some rules
const absoloutePath = options.path ? options.path : audioPath;
const duration = options.duration ? options.duration : defaultDuration;
let isPaused = false;
// counter and timer
const counter = function (n_duration, callback) {
    let countdownTimer = setInterval(() => {
        if (!isPaused) {
            let getTime = utils.iteration(utils.toTime, n_duration);
            Print.line(`${getTime}`);
            n_duration--;
            if (n_duration < 0) {
                return [clearInterval(countdownTimer), callback()];
            }
        }
    }, 1000);
};
// action run
const run = (file, time_s) => {
    return new Promise((resolve, reject) => {
        // check path & file
        let myFile = path.resolve(file);
        var stats = fs.statSync(myFile).isFile();
        if (stats) {
            Print.newLine("Pomodoro");
            //before countdown result payload
            // load(testCallback, "testCallback");
            utils.load(resolve, myFile);
            // start countdown
            counter(time_s, utils.dump);
        }
        else {
            let result = new Error("Cant open file. Path is not corret");
            reject(result);
        }
    });
};
//runtime
keypress(process.stdin);
// process.stdin.setRawMode(true);
process.stdin.on("keypress", function (ch, key) {
    if (key) {
        if (key.ctrl && key.name === "c") {
            Print.newLine("quitting...");
            process.exit();
        }
        if (key.name === "space") {
            isPaused = !isPaused;
            isPaused && console.log("\t ---paused---\n");
        }
    }
});
console.log(os.platform());
// run(absoloutePath, duration)
//   .then((res) => sound.play(res))
//   .then(() => Print.newLine("Done"))
//   .then(null,err => console.log(err.message))
// .catch((err) => console.log(err.message));
console.log("DEVELOPMENT");
