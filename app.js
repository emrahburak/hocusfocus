const sound = require("sound-play");
const commander = require("commander");
const Print = require("one-line-print");

const path = require("path");
const fs = require("fs");

const audioPath = "./audio/audio.mp3";
const defaultDuration = 5000;

// basic plain
commander
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  //   .option('-f, --flag', 'Detects if the flag is present.')
  .option("-d, --duration <value>", "set time interval")
  .option("-p, --path <value>", "Overwriting value.")
  .parse(process.argv);

const options = commander.opts();

const absoloutePath = options.path ? options.path : audioPath;
const duration = options.duration ? options.duration : defaultDuration;

// chek some rules


let minutes = Math.floor(duration % (1000 * 60 * 60) / (1000 * 60));

async function setLog (countNumb) {
  let n = countNumb / 1000;
  Print.newLine("Pomodoro");
  Print.newLine(`${minutes}`);
  let counter = await setInterval(() => {

    //one line Print
    Print.line(`${n}`);

    n = n - 1;
    if (n <= 0) {
      clearInterval(counter);
      return true;

    }
  }, 1000);
}

function run(file) {
  let myFile = path.resolve(file);
  var stats = fs.statSync(myFile).isFile();
  try {
    if (stats) {
      setLog(duration).then(res => res && sound.play(myFile));
    }
  } catch (error) {
    return new Error("Can't open file. Path is not correct");
  }
}

run(absoloutePath);

// var ProgressBar = require('progress');

// var bar = new ProgressBar('on focus [:bar]: :percent', { total: 10 });

// var timer = setInterval(function () {
//   bar.width = 80;
//   bar.tick(-1);
//   if (bar.complete) {
//     console.log('\ncomplete\n');
//     clearInterval(timer);
//   }
// }, 1000);
