import React from 'react';
import { IBotMateApp } from '@botmate/types/admin';
import { AppHeader } from '@botmate/ui';
import { FaTelegramPlane } from 'react-icons/fa';

export default {
  register(app: IBotMateApp) {
    app.addPlatform({
      id: 'telegram',
      label: 'Telegram',
      icon: <FaTelegramPlane />,
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
