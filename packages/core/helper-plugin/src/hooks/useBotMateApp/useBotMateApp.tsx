import { useContext } from 'react';
import { botMateAppContext } from '../../contexts/BotMateApp';

export const useBotMateApp = () => {
	const context = useContext(botMateAppContext);
	return context;
};
