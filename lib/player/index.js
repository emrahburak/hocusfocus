const Print = require('one-line-print');
const Cons = require('../constants');
const sound = require('sound-play');
var player = require('play-sound')(opts = {})
const shell = require('shelljs');

const playOnLinux = filePath => {
	// let command = `play ${filePath} >/dev/null 2>&1`;
	// shell.exec(command);
	player.play(filePath,function(err){
		if (err) throw err;
	})
};

const soundPlayer = res => {
	const { osType, path } = res;
	return osType !== Cons.osType.LINUX ? sound.play(path) : playOnLinux(path);
};

module.exports = {
	soundPlayer
};
