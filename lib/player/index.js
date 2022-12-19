const sound = require('sound-play');

const soundPlayer = filePath => {
	return sound.play(filePath);
};

module.exports = {
	soundPlayer
};
