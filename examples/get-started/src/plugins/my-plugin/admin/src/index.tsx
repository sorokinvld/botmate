import React from 'react';
import { IBotMateApp } from '@botmate/types/admin';

export default {
  register(app: IBotMateApp) {
    app.addMenuLink({
      label: 'My Plugin',
      to: '/my-plugin',
      Component: () => <div>My Plugin using X</div>,
    });
  },
};
