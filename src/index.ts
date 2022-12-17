import * as Service from "./lib/service";
import * as Event from "./lib/event";
import * as Cons from "./lib/constants";

const { Command } = require("commander");
const Print = require("one-line-print");
const sound = require("sound-play");
const keypress = require("keypress");

//Dev Mode
process.env.NODE_ENV = Cons.mode.PROD;
const isDev = process.env.NODE_ENV !== Cons.mode.PROD;

const program = new Command();
// basic plain
program
  .version("1.0.0", "-v, --version")
  .usage("[OPTIONS]...")
  .option(
    "-d, --duration <value>",
    "set time interval",
    Cons.testState.DURATION
  )
  .option("-p, --path <value>", "Overwriting value.", Cons.initialState.PATH);

program.parse(process.argv);

const options = program.opts();

Service.run(options)
  .then((res) => sound.play(res))
  .then(() => Print.newLine("Done"))
  .then(() => process.exit());
// .catch((err) => console.log(err.message));

//runtime
keypress(process.stdin);

!isDev ? process.stdin.setRawMode(true) : console.log(process.env.NODE_ENV);

let isPaused = false;
process.stdin.on("keypress", function (ch, key) {
  if (key) {
    if (key.ctrl && key.name === "c") {
      Print.newLine("quitting...");
      process.exit();
    }
    if (key.name === "space") {
      isPaused = !isPaused;
      Event.publisher(Cons.commands.EMIT_COUNTER);
      isPaused && Print.newLine("\t--paused--");
    }
  }
});
