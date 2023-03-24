'use strict';

import _ from 'lodash';
import { validateModule } from './validation';

const uidToPath = (uid: string) => uid.replace('::', '.');

const defaultModule = {
	config: {},
};

const createModule = (namespace, rawModule, botmate) => {
	_.defaults(rawModule, defaultModule);

	try {
		validateModule(rawModule);
	} catch (e) {
		throw new Error(
			`botmate-server.js is invalid for '${namespace}'.\n${e.errors.join('\n')}`
		);
	}

	const called: any = {};

	return {
		async bootstrap() {
			if (called.bootstrap) {
				throw new Error(`Bootstrap for ${namespace} has already been called`);
			}
			called.bootstrap = true;
			await (rawModule.bootstrap && rawModule.bootstrap({ botmate }));
		},
		async register() {
			if (called.register) {
				throw new Error(`Register for ${namespace} has already been called`);
			}
			called.register = true;
			await (rawModule.register && rawModule.register({ botmate }));
		},
		async destroy() {
			if (called.destroy) {
				throw new Error(`Destroy for ${namespace} has already been called`);
			}
			called.destroy = true;
			await (rawModule.destroy && rawModule.destroy({ botmate }));
		},
		load() {
			botmate.container
				.get('config')
				.set(uidToPath(namespace), rawModule.config);
		},
		config(path, defaultValue) {
			return botmate.container
				.get('config')
				.get(`${uidToPath(namespace)}.${path}`, defaultValue);
		},
	};
};

export { createModule };
