const os = require('os');
const Cons = require('../constants');
const FU = require('../f-utils');

const path = require('path');
const fs = require('fs');

// Arguments Null Check
const isPath = obj => {
	let path = obj.path ? obj.path : -1;
	return { ...obj, path };
};

// Regex
const isAlpaNum = str => str.match(/^[0-9]+[hm]$|^[0-9]+[h][0-9]+[m]$/) && true;

const isNum = str => str.match(/^[0-9]+$/) && true;

// Converters
const convertMinuteToSecond = val => {
	return parseInt(val) * 60;
};

const convertHourToSecond = val => {
	return parseInt(val) * 3600;
};

const splitter = val => {
	let [duration, hour, minute] = [0, 0, 0];
	//split before 'h'
	hour = [...val].includes('h')
		? convertHourToSecond(val.slice(0, [...val].indexOf('h')))
		: 0;

	//split before 'm'
	minute =
		[...val].includes('m') &&
		(hour
			? convertMinuteToSecond(
					val.slice([...val].indexOf('h') + 1, [...val].indexOf('m'))
			  )
			: convertMinuteToSecond(val.slice(0, [...val].indexOf('m'))));

	duration += (hour || minute) && hour + minute;
	return duration;
};

// Parameters control
const isDuration = obj => {
	let duration = obj.duration ? String(obj.duration) : -1;
	return { ...obj, duration };
};

const durationParser = obj => {
	let duration = isAlpaNum(obj.duration)
		? FU.pipe(obj.duration, splitter)
		: isNum(obj.duration)
		? obj.duration
		: 1500;
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

const addOsType = obj => {
	let getOs = os.platform();
	return { ...obj, osType: getOs };
};

module.exports = {
	orDefaultPath,
	afterPathResolver,
	pathResolver,
	durationParser,
	isDuration,
	isPath,
	addOsType
};
