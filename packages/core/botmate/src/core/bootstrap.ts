'use strict';

import { getConfigUrls } from '@botmate/utils';
import fse from 'fs-extra';

export default async function ({ botmate }) {
  botmate.config.port = botmate.config.get('server.port') || botmate.config.port;
  botmate.config.host = botmate.config.get('server.host') || botmate.config.host;

  const { serverUrl, adminUrl, adminPath } = getConfigUrls(botmate.config);

  botmate.config.server = botmate.config.server || {};
  botmate.config.server.url = serverUrl;
  botmate.config.admin.url = adminUrl;
  botmate.config.admin.path = adminPath;

  // check if we should serve admin panel
  const shouldServeAdmin = botmate.config.get(
    'admin.serveAdminPanel',
    botmate.config.get('serveAdminPanel')
  );

  if (!shouldServeAdmin) {
    botmate.config.serveAdminPanel = false;
  }

  // ensure public repository exists
  if (!(await fse.pathExists(botmate.dirs.static.public))) {
    throw new Error(
      `The public folder (${botmate.dirs.static.public}) doesn't exist or is not accessible. Please make sure it exists.`
    );
  }
}
