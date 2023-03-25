import { IBotMateApp } from '@botmate/types/admin';

export default {
  register(app: IBotMateApp) {
    app.addPlatform({
      id: 'discord',
      bot: {
        fields: [
          {
            name: 'clientId',
            label: 'Client ID',
            type: 'text',
          },
          {
            name: 'clientSecret',
            label: 'Client Secret',
            type: 'text',
          },
        ],
      },
    });
  },
};
