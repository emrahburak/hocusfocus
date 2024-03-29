#!/usr/bin/env node

/**
 * hocus
 * CLI Based Pomodoro Timer
 *
 * @author emrahburak <www.github.com/emrahburak>
 *
 *
 */

const { soundPlayer } = require('./lib/player');
const Service = require('./lib/service');
const Cons = require('./lib/constants');
const Event = require('./lib/event');

const Print = require('one-line-print');
const keypress = require('keypress');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

//We enable production or development mode in the code below.
process.env.NODE_ENV = Cons.mode.PROD;
const isDev = process.env.NODE_ENV !== Cons.mode.PROD;

// The service layer; validates the input,
// counts down teh time entered by the user,
// returns wtih sound ,
// exits the script

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	const options = {
		duration: flags.time,
		path: flags.path
	};

	await Service.run(options)
		.then(res => soundPlayer(res))
		.then(() => Print.newLine(`Done, ${Cons.topic.DONE}`))
		.then(() => process.exit());

	debug && log(flags);
})();

//In the code below , we pause or quit the script according
// to the keyboard inputs at runtime
keypress(process.stdin);

!isDev ? process.stdin.setRawMode(true) : console.log(process.env.NODE_ENV);

let isPaused = false;
process.stdin.on('keypress', function (ch, key) {
	if (key) {
		if (key.ctrl && key.name === 'c') {
			Print.newLine('quitting...');
			process.exit();
		}
		if (key.name === 'space') {
			isPaused = !isPaused;
			Event.publisher(Cons.commands.EMIT_COUNTER);
			isPaused && Print.newLine('\t--paused--');
		}
	}
});
