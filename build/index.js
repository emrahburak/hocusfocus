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
const service_1 = require("./lib/service");
const Counter = __importStar(require("./lib/counter"));
const Cons = __importStar(require("./lib/constants"));
const { Command } = require("commander");
const Print = require("one-line-print");
const keypress = require("keypress");
const os = require("os");
const program = new Command();
// basic plain
program
    .version("1.0.0", "-v, --version")
    .usage("[OPTIONS]...")
    .option("-d, --duration <value>", "set time interval", Cons.initialState.DURATION)
    .option("-p, --path <value>", "Overwriting value.", Cons.initialState.PATH);
program.parse(process.argv);
const options = program.opts();
(0, service_1.cap)(options);
//runtime
keypress(process.stdin);
// process.stdin.setRawMode(true);
var spaceCliked = Counter.isPaused;
process.stdin.on("keypress", function (ch, key) {
    if (key) {
        if (key.ctrl && key.name === "c") {
            Print.newLine("quitting...");
            process.exit();
        }
        if (key.name === "space") {
            spaceCliked = !spaceCliked;
            Counter.isPaused && console.log("\t ---paused---\n");
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
