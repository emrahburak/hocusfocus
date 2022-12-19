const path = require('path');

const initialState = {
	DURATION: '25m',
	PATH: path.join(__dirname, '../../audio/beep.wav')
};

const testState = {
	DURATION: '5',
	PATH: '',
	ERRORS: null
};

const errors = {
	OPENFILE: 'Cant open file. Path is not corret'
};

const commands = {
	EMIT_COUNTER: 'EMIT_COUNTER'
};

const mode = {
	PROD: 'production',
	DEV: 'development'
};

const topic = {
	TIME_TITLE: 'Focus on your task.',
	KEY_SPACE_INFO: `[space] to pause.`,
	KEY_CONTROLC_INFO: `[ctrl+c] to quit.`
};

module.exports = {
	initialState,
	testState,
	errors,
	commands,
	mode,
	topic
};
