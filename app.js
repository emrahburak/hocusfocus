const sound = require("sound-play");
const commander = require("commander");

const path = require("path");
const fs = require("fs");
const { time } = require("console");

const audioPath = "./audio/audio.mp3";
const defaultDuration = 5000;

// basic plain
commander
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  //   .option('-f, --flag', 'Detects if the flag is present.')
  .option("-d, --duration <value>", "set time interval", defaultDuration)
  .option("-p, --path <value>", "Overwriting value.")
  .parse(process.argv);

const options = commander.opts();

const absoloutePath = options.path ? options.path : audioPath;
const duration = options.duration;

// chek some rules
// const flag = (options.flag ? 'Flag is present.' : 'Flag is not present.');

// const filePath = path.join(__dirname,`${options.path}`);

let run = (file) => {
  let myFile = path.resolve(file);
  var stats = fs.statSync(myFile).isFile();
  try {
    if (stats) {
      return sound.play(myFile).then(() => console.log("Done"));
    }
  } catch (error) {
    return new Error("Can't open file. Path is not correct");
  }
};

let timer = () => {
  let n = duration / 1000;
  while (n >= 0) {
    setInterval(() => {
      console.log(n);
    }, 1000);
    n = n - 1;
  }
};

timer();

// run(absoloutePath)
