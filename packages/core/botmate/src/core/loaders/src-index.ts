'use strict';

import { resolve } from 'path';
import { statSync, existsSync } from 'fs';
import { importDefault, yup } from '@botmate/utils';

const srcSchema = yup
  .object()
  .shape({
    bootstrap: yup.mixed().isFunction(),
    register: yup.mixed().isFunction(),
    destroy: yup.mixed().isFunction(),
  })
  .noUnknown();

const validateSrcIndex = (srcIndex: string) => {
  return srcSchema.validateSync(srcIndex, { strict: true, abortEarly: false });
};

export default (botmate: BotMate.BotMateInstance) => {
  if (!existsSync(botmate.dirs.dist.src)) {
    return;
  }

  const pathToSrcIndex = resolve(botmate.dirs.dist.src, 'index.js');
  if (!existsSync(pathToSrcIndex) || statSync(pathToSrcIndex).isDirectory()) {
    return {};
  }

  const srcIndex = importDefault(pathToSrcIndex);

  try {
    validateSrcIndex(srcIndex);
  } catch (e) {
    botmate.stopWithError({
      message: `Invalid file \`./src/index.js\`: ${e.message}`,
    });
  }

  return srcIndex;
};
