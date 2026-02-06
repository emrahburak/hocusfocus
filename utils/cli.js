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
		alias: `t`,
		desc: `Set the time. [1h30m, 25m, 1500] (Default: config value or 25m)`
	},
	path: {
		type: `string`,
		alias: `p`,
		desc: `Custom beep sound path. (Default: config value or beep.wav)`
	},
	config: {
		type: `boolean`,
		alias: `C`,
		desc: `Open the configuration file directory`
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
