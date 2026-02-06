const { expect } = require('chai');
const sinon = require('sinon');
const Config = require('../lib/config');

describe('CLI Integration (-C flag)', () => {
	let consoleLogStub, processExitStub;

	beforeEach(() => {
		// Stub console.log and process.exit to capture CLI behavior
		consoleLogStub = sinon.stub(console, 'log');
		processExitStub = sinon.stub(process, 'exit');
	});

	afterEach(() => {
		sinon.restore();
		// Clear require cache for index.js to re-run it in different test states if needed
		delete require.cache[require.resolve('../index.js')];
	});

	it('should print the config path and exit when --config flag is present', async () => {
		// Mock the 'cli' module that index.js imports to simulate flags
		const cli = require('../utils/cli');
		sinon.stub(cli, 'flags').value({ config: true });

		// Trigger index.js execution
		// Note: index.js is an IIFE, so requiring it executes it
		require('../index.js');

		// We need a small delay because index.js has an async block
		await new Promise(resolve => setTimeout(resolve, 50));

		expect(consoleLogStub.calledWith(sinon.match(Config.getConfigPath()))).to.be.true;
		expect(processExitStub.calledWith(0)).to.be.true;
	});
});
