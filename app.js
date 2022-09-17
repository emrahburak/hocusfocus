const sound = require("sound-play");
const commander = require("commander");
const Print = require("one-line-print");

const path = require("path");
const fs = require("fs");
const { callbackify } = require("util");

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
const duration = options.duration ? options.duration : defaultDuration;
// console.log(duration);

// convert seconds to time format

// const toTime = (secs) => {
//   const sign = secs < 0;
//   const hhmmss = new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
//   return sign ? '-' + hhmmss: hhmmss;
// };

// utils
const toTime = function* (secs) {
  yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

const iteration = (iteretor, val) => {
  return iteretor(val).next().value;
};

const result = function(){
  return false;
};

console.log(result());

const counter = function* (n) {
  let timer = yield setInterval(() => {
    let getTime = iteration(toTime, n);
    // let getTime = toTime(n).next().value;
    Print.line(`${getTime}`);
    n = n - 1;
    if (n < 0) {
      clearInterval(counter);

    }
  }, 1000);
};


// action
const myRun = (file, time_s) => {
  return new Promise((resolve, reject) => {
    // check path & file
    let myFile = path.resolve(file);
    var stats = fs.statSync(myFile).isFile();

    if (stats) {
      Print.newLine("Pomodoro");
      let n = time_s;

      // start countdown
      let result = iteration(counter,n);

      if(!result){
        resolve(myFile);
      }
      
      // let counter = setInterval(() => {
      //   let getTime = toTime(n);
      //   Print.line(`${getTime}`);
      //   n = n - 1;
      //   if (n < 0) {
      //     resolve(myFile)
      //     clearInterval(counter)
      //   }
      // },1000);
    } else {
      let result = new Error("Cant open file. Path is not corret");
      reject(result);
    }
  });
};

myRun(absoloutePath, duration)
  .then((res) => sound.play(res))
  .then(() => Print.newLine("Done"))
  .catch((err) => console.log(err.message));

// run(absoloutePath);
