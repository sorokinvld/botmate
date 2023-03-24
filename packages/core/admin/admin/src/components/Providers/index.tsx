import React from 'react';
import { BotMateAppProvider } from '@botmate/helper-plugin';
import { BotMateUIProvider } from '@botmate/ui';

function Providers({ menu, plugins = [], children }) {
	return (
		<BotMateAppProvider menu={menu} plugins={[]}>
			<BotMateUIProvider>{children}</BotMateUIProvider>
		</BotMateAppProvider>
	);
}

export default Providers;
