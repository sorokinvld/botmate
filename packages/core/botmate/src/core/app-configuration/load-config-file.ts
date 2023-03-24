'use strict';

import path from 'path';
import fs from 'fs';
import { templateConfiguration, env, importDefault } from '@botmate/utils';

const loadJsFile = (file: string) => {
	try {
		const jsModule = importDefault(file);

		// call if function
		if (typeof jsModule === 'function') {
			return jsModule({ env });
		}

		return jsModule;
	} catch (error) {
		throw new Error(`Could not load js config file ${file}: ${error.message}`);
	}
};

const loadJSONFile = (file) => {
	try {
		return templateConfiguration(JSON.parse(fs.readFileSync(file, 'utf-8')));
	} catch (error) {
		throw new Error(
			`Could not load json config file ${file}: ${error.message}`
		);
	}
};

const loadFile = (file) => {
	const ext = path.extname(file);

	switch (ext) {
		case '.js':
			return loadJsFile(file);
		case '.json':
			return loadJSONFile(file);
		default:
			return {};
	}
};

export default loadFile;
