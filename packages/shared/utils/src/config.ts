import { get, trim } from 'lodash';
import { getCommonPath } from './string-formatting';

interface Config {
  get(key: string): any;
}

interface ConfigUrls {
  serverUrl: string;
  adminUrl: string;
  adminPath: string;
}

export const getConfigUrls = (config: Config, forAdminBuild = false): ConfigUrls => {
  const serverConfig = config.get('server');
  const adminConfig = config.get('admin');

  // Defines serverUrl value
  let serverUrl = get(serverConfig, 'url', '') as string;
  serverUrl = trim(serverUrl, '/ ');
  if (typeof serverUrl !== 'string') {
    throw new Error('Invalid server url config. Make sure the url is a string.');
  }
  if (serverUrl.startsWith('http')) {
    try {
      serverUrl = trim(new URL(serverConfig.url).toString(), '/');
    } catch (e) {
      throw new Error(
        'Invalid server url config. Make sure the url defined in server.js is valid.'
      );
    }
  } else if (serverUrl !== '') {
    serverUrl = `/${serverUrl}`;
  }

  // Defines adminUrl value
  let adminUrl = get(adminConfig, 'url', '') as string;
  adminUrl = trim(adminUrl, '/ ');
  if (typeof adminUrl !== 'string') {
    throw new Error('Invalid admin url config. Make sure the url is a non-empty string.');
  }
  if (adminUrl.startsWith('http')) {
    try {
      adminUrl = trim(new URL(adminUrl).toString(), '/');
    } catch (e) {
      throw new Error('Invalid admin url config. Make sure the url defined in server.js is valid.');
    }
  } else {
    adminUrl = `${serverUrl}/${adminUrl}`;
  }

  // Defines adminPath value
  let adminPath = adminUrl;
  if (
    serverUrl.startsWith('http') &&
    adminUrl.startsWith('http') &&
    new URL(adminUrl).origin === new URL(serverUrl).origin &&
    !forAdminBuild
  ) {
    adminPath = adminUrl.replace(getCommonPath(serverUrl, adminUrl), '');
    adminPath = `/${trim(adminPath, '/')}`;
  } else if (adminUrl.startsWith('http')) {
    adminPath = new URL(adminUrl).pathname;
  }

  return {
    serverUrl,
    adminUrl,
    adminPath,
  };
};

type GetAbsoluteUrlFn = (config: Config, forAdminBuild?: boolean) => string;

const getAbsoluteUrl = (adminOrServer: 'admin' | 'server'): GetAbsoluteUrlFn => {
  return (config: Config, forAdminBuild = false): string => {
    const { serverUrl, adminUrl } = getConfigUrls(config, forAdminBuild);
    const url = adminOrServer === 'server' ? serverUrl : adminUrl;

    if (url.startsWith('http')) {
      return url;
    }

    const hostname =
      config.get('environment') === 'development' &&
      ['127.0.0.1', '0.0.0.0'].includes(config.get('server.host'))
        ? 'localhost'
        : config.get('server.host');

    return `http://${hostname}:${config.get('server.port')}${url}`;
  };
};

export const getAbsoluteAdminUrl = getAbsoluteUrl('admin');
export const getAbsoluteServerUrl = getAbsoluteUrl('server');
