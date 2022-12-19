const meow = require('meow');
const meowHelp = require('cli-meow-help');
const Cons = require('../lib/constants');

const path = require('path');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	time: {
		type: `string`,
		default: Cons.initialState.DURATION,
		alias: `t`,
		desc: `Set the time you need. [h|hm|m]`
	},
	path: {
		type: `string`,
		default: Cons.initialState.PATH,
		alias: `p`,
		desc: `Custom file path to beep sound`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `hocusfocus`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
