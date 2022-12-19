const events = require('events');

var eventEmmitter = new events.EventEmitter();

eventEmmitter.setMaxListeners(0);

const listener_test = function () {
	console.log('listener executed');
};

function publisher(message) {
	return eventEmmitter.emit(message);
}

function consumer(message, callback) {
	return eventEmmitter.addListener(message, callback);
}

module.exports = {
	listener_test,
	publisher,
	consumer
};
