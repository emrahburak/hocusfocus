const sound = require("sound-play");
const commander = require("commander");
const Print = require("one-line-print");
const keypress = require('keypress')

const path = require("path");
const fs = require("fs");

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

// utils

// function type
interface IGenerator {
  (secs: any): IterableIterator<string>;
}
// convert seconds to time format
const toTime: IGenerator = function* (secs: any): IterableIterator<string> {
  yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

//only generator functions
const iteration = (iteretor: IGenerator, val: any) => {
  return iteretor(val).next().value;
};

//for test
// const testCallback = function (value) {
//   console.log("this is", value);
// };

// function provider

const queue: any[] = [];

interface ILoadable {
  (fn: Function, arg: String): number;
}
// load function to function provider
const load: ILoadable = (fn: Function, arg: String): number => {
  return queue.push([fn, arg]);
};

// dump and run  functions  from function provider
const dump: Function = () => {
  while (queue.length) {
    let [fn, arg] = queue.shift();
    fn(arg);
  }
};

let isPaused: Boolean = false;

interface ICounter {
  (duration: number, callback: Function): any;
}
// counter and timer
const counter: ICounter = function (n_duration: number, callback: Function) {
  let countdownTimer: any = setInterval(() => {
    if (!isPaused) {
      let getTime = iteration(toTime, n_duration);
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
      load(resolve, myFile);

      // start countdown
      counter(time_s, dump);
    } else {
      let result = new Error("Cant open file. Path is not corret");
      reject(result);
    }
  });
};


//runtime
keypress(process.stdin)
process.stdin.setRawMode(true);

process.stdin.on('keypress',function(ch,key){
  if(key){
    if(key.ctrl && key.name === 'c'){
      Print.newLine("quitting...");
      process.exit();
    }
    if(key.name === 'space'){
      isPaused = !isPaused;
      isPaused && console.log("\t ---paused---\n");
    }
  }
});




run(absoloutePath, duration)
  .then((res) => sound.play(res))
  .then(() => Print.newLine("Done"))
  .then(null,err => console.log(err.message))
  // .catch((err) => console.log(err.message));


// console.log("DEVELOPMENT");
