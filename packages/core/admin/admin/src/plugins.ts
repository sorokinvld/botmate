// To override this file create a plugins-dev.js one and copy the content of the plugin.js one.
// When starting the app the script will copy the plugins-dev.js into this one instead.
import telegram from '../../../../plugins/telegram/admin/src';

const plugins = {
  telegram: telegram,
};

export default plugins;
