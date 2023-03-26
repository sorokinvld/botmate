import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { IBotMateApp } from '@botmate/types/admin';

export default {
  register(app: IBotMateApp) {
    app.addPlatform({
      id: 'discord',
      label: 'Discord',
      icon: <FaDiscord />,
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
