const Cons = require('../constants');
const Event = require('../event');

const Print = require('one-line-print');

// function type

// convert seconds to time format
const toTime = function* (secs) {
	yield new Date(Math.abs(secs) * 1000).toISOString().substr(11, 8);
};

//only generator functions
const iteration = (iteretor, val) => {
	return iteretor(val).next().value;
};

var isPaused = false;

function pause() {
	isPaused = !isPaused;
	return isPaused;
}

Event.consumer(Cons.commands.EMIT_COUNTER, pause);
const countDown = function (n_duration, callback) {
	let countdownTimer = setInterval(() => {
		if (isPaused === false) {
			let getTime = iteration(toTime, n_duration);
			Print.line(`${getTime}`);
			n_duration--;
			if (n_duration < 0) {
				return [clearInterval(countdownTimer), callback()];
			}
		}
	}, 1000);
};

module.exports = {
	countDown,
	pause,
	iteration,
	toTime
};
