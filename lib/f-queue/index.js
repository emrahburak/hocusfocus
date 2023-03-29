// function provider
const queue = [];

// load function to function provider
const loadQueue = (fn, arg) => {
	return queue.push([fn, arg]);
};

// dump and run  functions  from function provider
const dumpQueue = () => {
	while (queue.length) {
		let [fn, arg] = queue.shift();
		fn(arg);
	}
};

module.exports = {
	loadQueue,
	dumpQueue
};
