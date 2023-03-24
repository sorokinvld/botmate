import React from 'react';

export default {
	register(app) {
		app.addMenuLink({
			to: '/telegram',
			label: 'Teglegram',
			Component: () => <div>Wow!! Telegram Plugin</div>,
		});
	},
};
