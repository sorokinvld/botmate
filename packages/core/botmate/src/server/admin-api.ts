'use strict';

import { createAPI } from './api';

const createAdminAPI = (botmate: BotMate.BotMateInstance) => {
  const opts = {
    prefix: '', // '/admin';
    type: 'admin',
  };

  return createAPI(botmate, opts);
};

export { createAdminAPI };
