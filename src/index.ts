import { counter,isPaused } from './utils/counter';
import {Maybe} from './utils';
// import { toTime, load, dump, iteration } from "./utils/index";
import {payload,dump} from './utils/provider';
const sound = require("sound-play");
const {Command} = require("commander");
const Print = require("one-line-print");
const keypress = require("keypress");
const R = require('ramda');


const path = require("path");
const fs = require("fs");
const os = require("os");
const spawn = require('child_process').spawn;

const audioPath = "./audio/audio.mp3";
const defaultDuration = 5;

const program = new Command();
// basic plain
program
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  //   .option('-f, --flag', 'Detects if the flag is present.')
  .option("-d, --duration <value>", "set time interval",5)
  .option("-p, --path <value>", "Overwriting value.","path/subPath")

program.parse(process.argv);

const options = program.opts();



const maybeStatus = Maybe.of(options);

console.log(maybeStatus);

// chek some rules
const absoloutePath = options.path ? options.path : audioPath;
const duration: number = options.duration ? options.duration : defaultDuration;





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
      payload(resolve, myFile);

      // start countdown
      counter(time_s, dump);
    } else {
      let result = new Error("Cant open file. Path is not corret");
      reject(result);
    }
  });
};

//runtime
keypress(process.stdin);
// process.stdin.setRawMode(true);

var spaceCliked = isPaused
process.stdin.on("keypress", function (ch, key) {
  if (key) {
    if (key.ctrl && key.name === "c") {
      Print.newLine("quitting...");
      process.exit();
    }
    if (key.name === "space") {
      spaceCliked = !spaceCliked;
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
