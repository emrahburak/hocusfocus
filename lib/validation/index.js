const Cons = require('../constants');
const FU = require('../f-utils');
const Trace = require('../trace');

const path = require('path');
const fs = require('fs');

// Arguments Null Check
const isPath = obj => {
	let path = obj.path ? obj.path : -1;
	return { ...obj, path };
};

// Regex
const isAlpaNum = str =>
	// after than isAlpaNum isBlockTime need the String value
	str.match(/^[0-9][0-9]+[hm]$|^[0-9]+[h][0-9]+[m]$/)
		? String(FU.pipe(str, splitter))
		: str;

const isBlockTime = str =>
	str.match(/^[0-9]+[hm]\/\d+[hm]\/\d+$/) ? FU.pipe(str, splitter) : str;

const isNum = str => str.match(/^[0-9]+$/) && str;

// Converters
const convertMinuteToSecond = val => {
	return parseInt(val) * 60;
};

const convertHourToSecond = val => {
	return parseInt(val) * 3600;
};

const splitter = val => {
	console.log('first', val);
	console.log('speated val', [...val]);
	let [duration, hour, minute, numbOfRepetetions] = [0, 0, 0, 1];
	val = [...val].includes('/') ? val.replace('/', '') : val;
	console.log('val=> ', val);
	//split before 'h'
	hour =
		[...val].includes('h') &&
		convertHourToSecond(val.slice(0, [...val].indexOf('h')));

	console.log(hour);
	//split before 'm'
	minute =
		[...val].includes('m') &&
		([...val].includes('h')
			? convertMinuteToSecond(
					val.slice([...val].indexOf('h') + 1, [...val].indexOf('m'))
			  )
			: convertMinuteToSecond(val.slice(0, [...val].indexOf('m'))));

	// xxh/xxm/{numbOfRepetetions} get last number
	numbOfRepetetions =
		[...val].includes('/') && val.slice([...val].indexOf('/') + 1);

	console.log('repetetion', numbOfRepetetions);

	duration += (hour || minute) && hour + minute;
	return duration;
};


// Parameters control
const isDuration = obj => {
	let duration = obj.duration ? String(obj.duration) : -1;
	return { ...obj, duration };
};

const durationParser = obj => {
	console.log('duration parser', obj);
	let duration = FU.Maybe.of(obj.duration)
		.map(isAlpaNum)
		.map(isBlockTime)
		.map(isNum)
		.orElse(1500)
		.join();

	// isAlpaNum(obj.duration) || isBlockTime(obj.duration)
	// 	? FU.pipe(obj.duration, blockSplitter, splitter)
	// 	: isNum(obj.duration)
	// 	? obj.duration
	// 	: 1500;
	return { ...obj, duration };
};

// File path Check
const pathResolver = obj => {
	let result = path.resolve(String(obj['path']));
	return { ...obj, path: result };
};

const afterPathResolver = obj => {
	try {
		let error = fs.statSync(obj['path']).isFile()
			? Cons.errors.OPENFILE
			: -1;
	} catch (e) {
		return { ...obj, errors: [e.message] };
	}
	return { ...obj };
};

const orDefaultPath = obj => {
	if (!obj['errors']) return { ...obj };
	return pathResolver({ ...obj, path: Cons.initialState.PATH });
};

module.exports = {
	orDefaultPath,
	afterPathResolver,
	pathResolver,
	durationParser,
	isDuration,
	isPath
};
