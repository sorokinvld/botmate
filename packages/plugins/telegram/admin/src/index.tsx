import { IBotMateApp } from '@botmate/types/admin';

export default {
  register(app: IBotMateApp) {
    app.addPlatform({
      id: 'telegram',
      bot: {
        fields: [
          {
            name: 'token',
            label: 'Token',
            type: 'text',
          },
        ],
      },
    });
  },
};
