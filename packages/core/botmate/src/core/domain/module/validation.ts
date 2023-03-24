'use strict';

import { yup } from '@botmate/utils';

const botmateServerSchema = yup
	.object()
	.shape({
		bootstrap: yup.mixed().isFunction(),
		destroy: yup.mixed().isFunction(),
		register: yup.mixed().isFunction(),
		config: yup.object(),
	})
	.noUnknown();

const validateModule = (data) => {
	return botmateServerSchema.validateSync(data, {
		strict: true,
		abortEarly: false,
	});
};

export { validateModule };
