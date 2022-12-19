const FU = require('../f-utils');
const FQ = require('../f-queue');
const Valid = require('../validation');
const Counter = require('../counter');
const Cons = require('../constants');

const Print = require('one-line-print');

function withArguments(opt) {
	return FU.Maybe['of'](opt).map(Valid.isPath).map(Valid.isDuration).join();
}

function afterArguments(obj) {
	return FU.Maybe['of'](obj)
		.map(Valid.durationParser)
		.map(Valid.pathResolver)
		.map(Valid.afterPathResolver)
		.map(Valid.orDefaultPath)
		.join();
}

const compose = obj => {
	return FU.pipe(obj, withArguments, afterArguments);
};

// action run
const run = obj => {
	return new Promise(resolve => {
		// check path & file
		let result = compose(obj);

		Print.newLine(Cons.topic.TIME_TITLE);

		//   // before countdown result payload
		FQ.loadQueue(resolve, result['path']);

		//   // start countdown
		Counter.countDown(result['duration'], FQ.dumpQueue);
	});
};

module.exports = {
	run,
	compose
	// withArguments,
	// afterArguments
};
