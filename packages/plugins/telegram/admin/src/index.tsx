import React from 'react';
import { IBotMateApp } from '@botmate/types/admin';
import { AppHeader } from '@botmate/ui';
import { FaTelegramPlane } from 'react-icons/fa';

export default {
  register(app: IBotMateApp) {
    app.addMenuLink({
      to: '/telegram',
      label: 'Telegram',
      icon: <FaTelegramPlane />,
      match: /^\/telegram/,
      Component: () => (
        <>
          <AppHeader title="Telegram" />
        </>
      ),
    });
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
