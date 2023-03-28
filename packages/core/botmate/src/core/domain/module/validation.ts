'use strict';

import { yup } from '@botmate/utils';

const botmateServerSchema = yup
  .object()
  .shape({
    config: yup.object(),
    register: yup.mixed().isFunction(),
    bootstrap: yup.mixed().isFunction(),
    destroy: yup.mixed().isFunction(),
    services: yup.object(),
  })
  .noUnknown();

const validateModule = (data) => {
  return botmateServerSchema.validateSync(data, {
    strict: true,
    abortEarly: false,
  });
};

export { validateModule };
