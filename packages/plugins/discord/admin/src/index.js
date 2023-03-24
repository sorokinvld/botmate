import React from 'react';

export default {
	register(app) {
		app.addMenuLink({
			to: '/discord',
			label: 'Teglegram',
			Component: () => <div>Wow!! Discord Plugin</div>,
		});
	},
};
