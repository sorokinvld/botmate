import React from 'react';
import { IBotMateApp } from '@botmate/types/admin';

export default {
  register(app: IBotMateApp) {
    app.addMenuLink({
      to: '/telegram',
      label: 'Teglegram',
      Component: () => <div>Wow!! Telegram Plugin X</div>,
    });
  },
};
