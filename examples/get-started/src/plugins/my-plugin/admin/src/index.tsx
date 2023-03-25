import React from 'react';

export default {
  register(app) {
    console.log('registering my plugin');
    app.addMenuLink({
      name: 'My Plugin',
      to: '/my-plugin',
      Component: () => <div>My Plugin using TSX</div>,
    });
  },
};
