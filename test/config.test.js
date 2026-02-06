const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../lib/config');
const Cons = require('../lib/constants');

describe('Config Module', () => {
	let existsSyncStub, mkdirSyncStub, writeFileSyncStub, readFileSyncStub;

	beforeEach(() => {
		// Mock file system to avoid side effects in home directory
		existsSyncStub = sinon.stub(fs, 'existsSync');
		mkdirSyncStub = sinon.stub(fs, 'mkdirSync');
		writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
		readFileSyncStub = sinon.stub(fs, 'readFileSync');
	});

	afterEach(() => {
		sinon.restore();
	});

	it('should return the correct config path', () => {
		const configPath = Config.getConfigPath();
		expect(configPath).to.contain('.hocusfocus');
		expect(configPath).to.contain('hocusfocus.json');
	});

	it('should create directory and default config if not exists', () => {
		existsSyncStub.returns(false); // Neither dir nor file exists
		readFileSyncStub.returns(JSON.stringify({ duration: '25m', path: 'default' }));

		Config.getConfig();

		expect(mkdirSyncStub.calledOnce).to.be.true;
		expect(writeFileSyncStub.calledOnce).to.be.true;
		
		const [filePath, content] = writeFileSyncStub.getCall(0).args;
		expect(filePath).to.contain('hocusfocus.json');
		const savedConfig = JSON.parse(content);
		expect(savedConfig.duration).to.equal(Cons.initialState.DURATION);
	});

	it('should return parsed config if file exists', () => {
		existsSyncStub.returns(true); // Directory and file exist
		const mockConfig = { duration: '15m', path: '/test/path' };
		readFileSyncStub.returns(JSON.stringify(mockConfig));

		const result = Config.getConfig();

		expect(result).to.deep.equal(mockConfig);
		expect(mkdirSyncStub.called).to.be.false;
		expect(writeFileSyncStub.called).to.be.false;
	});
});
