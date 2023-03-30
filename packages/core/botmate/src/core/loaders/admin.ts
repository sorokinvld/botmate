import _ from 'lodash';

export default (botmate) => {
  botmate.admin = require('@botmate/admin/botmate-server.js');

  botmate.container.get('services').add(`admin::`, botmate.admin.services);
  botmate.container.get('controllers').add(`admin::`, botmate.admin.controllers);
  // botmate.container.get('policies').add(`admin::`, botmate.admin.policies);
  // botmate.container.get('middlewares').add(`admin::`, botmate.admin.middlewares);

  const userAdminConfig = botmate.config.get('admin');
  botmate.container.get('config').set('admin', _.merge(botmate.admin.config, userAdminConfig));
};
