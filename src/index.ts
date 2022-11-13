import {service,getArguments,getPayload,cap} from './lib/service';
import * as Counter from './lib/counter';
import * as Cons  from './lib/constants';

const {Command} = require("commander");
const Print = require("one-line-print");
const keypress = require("keypress");


const os = require("os");


const program = new Command();
// basic plain
program
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  .option("-d, --duration <value>", "set time interval",Cons.initialState.DURATION)
  .option("-p, --path <value>", "Overwriting value.",Cons.initialState.PATH)

program.parse(process.argv);

const options = program.opts()


cap(options)






;

//runtime
keypress(process.stdin);
// process.stdin.setRawMode(true);

var spaceCliked = Counter.isPaused
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
