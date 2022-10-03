import { toTime, load, dump, iteration } from "./utils/index";
const sound = require("sound-play");
const commander = require("commander");
const Print = require("one-line-print");
const keypress = require("keypress");

const path = require("path");
const fs = require("fs");
const os = require("os");

import * as utils from "./utils";
const audioPath = "./audio/audio.mp3";
const defaultDuration = 1500;

// basic plain
commander
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  //   .option('-f, --flag', 'Detects if the flag is present.')
  .option("-d, --duration <value>", "set time interval")
  .option("-p, --path <value>", "Overwriting value.")
  .parse(process.argv);

const options = commander.opts();

// chek some rules
const absoloutePath = options.path ? options.path : audioPath;
const duration: number = options.duration ? options.duration : defaultDuration;
// console.log(duration);

let isPaused: Boolean = false;

interface ICounter {
  (duration: number, callback: Function): any;
}
// counter and timer
const counter: ICounter = function (n_duration: number, callback: Function) {
  let countdownTimer: any = setInterval(() => {
    if (!isPaused) {
      let getTime = utils.iteration(toTime, n_duration);
      Print.line(`${getTime}`);
      n_duration--;
      if (n_duration < 0) {
        return [clearInterval(countdownTimer), callback()];
      }
    }
  }, 1000);
};

interface IRunable {
  (file: string, time: number): PromiseLike<any>;
}

// action run
const run: IRunable = (file: string, time_s: number) => {
  return new Promise((resolve, reject) => {
    // check path & file
    let myFile: string = path.resolve(file);
    var stats: boolean = fs.statSync(myFile).isFile();

    if (stats) {
      Print.newLine("Pomodoro");

      //before countdown result payload
      // load(testCallback, "testCallback");
      utils.load(resolve, myFile);

      // start countdown
      counter(time_s, utils.dump);
    } else {
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
