const FU = require('../f-utils');
const FQ = require('../f-queue');
const Valid = require('../validation');
const Counter = require('../counter');
const Cons = require('../constants');
const Config = require('../config');

const Print = require('one-line-print');

// Using Maybe monad, null check is done,
// by adding 'orDefaults' function to the end of the monad,
// we prevent the process from crashing.

function withArguments(opt) {
	return FU.Maybe['of'](opt).map(Valid.isPath).map(Valid.isDuration).join();
}

function afterArguments(obj) {
	return FU.Maybe['of'](obj)
		.map(Valid.durationParser)
		.map(Valid.pathResolver)
		.map(Valid.afterPathResolver)
		.map(Valid.addOsType)
		.map(Valid.orDefaultPath)
		.join();
}

// The compose function contains a function called pipe,
//  which basically performs the reduce operation.

const compose = obj => {
	return FU.pipe(obj, withArguments, afterArguments);
};

// The 'run' function is similar to "Facade pattern".
// It is en api that abstracts back processes.
const run = obj => {
	const config = Config.getConfig();

	// Merge CLI options with config file settings
	// CLI flags have priority
	const options = {
		duration: obj.duration || config.duration,
		path: obj.path || config.path
	};

	return new Promise(resolve => {
		// check path & file
		let result = compose(options);

		Print.newLine(
			`${Cons.topic.TIME_TITLE}\n${Cons.topic.KEY_SPACE_INFO} ${Cons.topic.KEY_CONTROLC_INFO}\n`
		);

		//   // before countdown result payload
		// FQ.loadQueue(resolve, result['path']);
		FQ.loadQueue(resolve, result);

		//   // start countdown
		Counter.countDown(result['duration'], FQ.dumpQueue);
	});
};

module.exports = {
	run
};
