const fs = require('fs');
const path = require('path');
const os = require('os');
const Cons = require('../constants');

const CONFIG_DIR = path.join(os.homedir(), '.hocusfocus');
const CONFIG_FILE_NAME = 'hocusfocus.json';
const CONFIG_PATH = path.join(CONFIG_DIR, CONFIG_FILE_NAME);

/**
 * Initializes the configuration file with default metadata if it doesn't exist.
 */
const initConfig = () => {
	if (!fs.existsSync(CONFIG_DIR)) {
		fs.mkdirSync(CONFIG_DIR, { recursive: true });
	}

	if (!fs.existsSync(CONFIG_PATH)) {
		const defaultConfig = {
			duration: Cons.initialState.DURATION,
			path: Cons.initialState.PATH,
			metadata: {
				createdAt: new Date().toISOString(),
				version: require('../../package.json').version
			}
		};
		fs.writeFileSync(
			CONFIG_PATH,
			JSON.stringify(defaultConfig, null, 2),
			'utf-8'
		);
		console.log(`\n [INIT] Configuration initialized at: ${CONFIG_PATH}\n`);
	}
};

/**
 * Gets the configuration strictly from the file.
 * Always calls initConfig first to ensure the file exists.
 */
const getConfig = () => {
	try {
		initConfig(); // Ensure file exists
		const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');
		return JSON.parse(configData);
	} catch (error) {
		// Fallback only if file is corrupted
		return {
			duration: Cons.initialState.DURATION,
			path: Cons.initialState.PATH
		};
	}
};

const getConfigPath = () => CONFIG_PATH;

module.exports = {
	getConfig,
	getConfigPath
};