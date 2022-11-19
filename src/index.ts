import * as Service from './lib/service';
import * as Event from './lib/event'
import * as Cons  from './lib/constants';

const {Command} = require("commander");
const Print = require("one-line-print");
const sound = require("sound-play");
const keypress = require("keypress");
const events = require("events");


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

Service.run(options)
  .then((res) => sound.play(res))
  .then(() => Print.newLine("Done"))
.catch((err) => console.log(err.message));


//runtime
keypress(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", function (ch, key) {
  if (key) {
    if (key.ctrl && key.name === "c") {
      Print.newLine("quitting...");
      process.exit();
    }
    if (key.name === "space") {
      Event.publisher(Cons.commands.EMIT_COUNTER);
    }
  }
});


// console.log("DEVELOPMENT");

// console.log(os.platform());