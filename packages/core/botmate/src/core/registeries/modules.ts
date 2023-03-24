'use strict';

import { pickBy, has } from 'lodash/fp';
import { createModule } from '../domain/module';

const modulesRegistry = (botmate) => {
	const modules: {
		[namespace: string]: any;
	} = {};

	return {
		get(namespace) {
			return modules[namespace];
		},
		getAll(prefix = '') {
			return pickBy((_, namespace) => namespace.startsWith(prefix))(modules);
		},
		add(namespace, rawModule) {
			if (has(namespace, modules)) {
				throw new Error(`Module ${namespace} has already been registered.`);
			}

			modules[namespace] = createModule(namespace, rawModule, botmate);
			modules[namespace].load();

			return modules[namespace];
		},
		async bootstrap() {
			for (const mod of Object.values(modules)) {
				await mod.bootstrap();
			}
		},
		async register() {
			for (const mod of Object.values(modules)) {
				await mod.register();
			}
		},
		async destroy() {
			for (const mod of Object.values(modules)) {
				await mod.destroy();
			}
		},
	};
};

export default modulesRegistry;
