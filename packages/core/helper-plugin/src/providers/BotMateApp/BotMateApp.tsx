import React from 'react';
import { botMateAppContext } from '../../contexts/BotMateApp';

type BotMateAppProps = {
	children?: React.ReactNode;
	plugins: any[];
	menu: any[];
};
function BotMateAppProvider({ children, plugins, menu }: BotMateAppProps) {
	return (
		<botMateAppContext.Provider
			value={{
				plugins,
				menu,
			}}
		>
			{children}
		</botMateAppContext.Provider>
	);
}

export { BotMateAppProvider };
