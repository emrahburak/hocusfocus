const events = require('events');

var eventEmmitter = new events.EventEmitter();

eventEmmitter.setMaxListeners(0);

export const listener_test = function () {
	console.log('listener executed');
};

export function publisher(message) {
	return eventEmmitter.emit(message);
}

export function consumer(message, callback) {
	return eventEmmitter.addListener(message, callback);
}
