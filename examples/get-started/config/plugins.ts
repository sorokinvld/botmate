'use strict';

export default () => {
  return {
    myplugin: {
      enabled: true,
      resolve: `./src/plugins/my-plugin`, // From the root of the project
      config: {
        testConf: 3,
      },
    },
    tghelloworld: {
      enabled: true,
      resolve: `./src/plugins/telegram-hello-world`,
      config: {},
    },
  };
};
