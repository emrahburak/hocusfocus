const Print = require('one-line-print');
const Cons = require('../constants');
const sound = require('sound-play');
const shell = require('shelljs');

const playOnLinux = filePath => {
	let command = `play ${filePath} >/dev/null 2>&1`;
	shell.exec(command);
};

const soundPlayer = res => {
	const { osType, path } = res;
	return osType !== Cons.osType.LINUX ? sound.play(path) : playOnLinux(path);
};

module.exports = {
	soundPlayer
};
