#!/usr/bin/env node

const sound = require("sound-play");
const commander = require("commander");
const Print = require("one-line-print");

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
const duration = options.duration ? options.duration : defaultDuration;
// console.log(duration);


// utils
// convert seconds to time format
const toTime = function* (secs) {
  yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

//only generator functions
const iteration = (iteretor, val, fn) => {
  return iteretor(val, fn).next().value;
};


//for test
// const testCallback = function (value) {
//   console.log("this is", value);
// };


// function provider
const queue = [];


// load function to function provider
const load = (fn, arg) => {
  queue.push([fn, arg]);
};


// dump and run  functions  from function provider
const dump = () => {
  while (queue.length) {
    let [fn, arg] = queue.shift();
    fn(arg);
  }
};


// counter and timer
const counter = function (n_duration, callback) {
  let countdownTimer = setInterval(() => {
    let getTime = iteration(toTime, n_duration);
    Print.line(`${getTime}`);
    n_duration--;
    if (n_duration < 0) {
      clearInterval(countdownTimer);
      callback();
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
      load(resolve, myFile);

      // start countdown
      counter(time_s, dump);
      } else {
      let result = new Error("Cant open file. Path is not corret");
      reject(result);
    }
  });
};

run(absoloutePath, duration)
  .then((res) => sound.play(res))
  .then(() => Print.newLine("Done"))
  .catch((err) => console.log(err.message));

// run(absoloutePath);
