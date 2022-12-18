#!/usr/bin/env node

/**
 * hocus
 * CLI Based Pomodoro Timer
 *
 * @author emrahburak <www.github.com/emrahburak>
 */

const {soundPlayer} = require('./lib/player');

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const path = require('path');

const filePath = path.join(__dirname,'./audio/beep.wav')



const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

//Dev Mode
// process.env.NODE_ENV = Cons.mode.PROD;
// const isDev = process.env.NODE_ENV !== Cons.mode.PROD;



(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	if(input.includes("focus")){
		soundPlayer(filePath).then(() => console.log("done"));
	}



	debug && log(flags);
})();
