import { Select } from '@chakra-ui/react';

type ChatSelectorProps = {
	// children: React.ReactNode;
};
function ChatSelector(props: ChatSelectorProps) {
	return (
		<Select w='52'>
			<option>BotMate Chat</option>
		</Select>
	);
}

export { ChatSelector };
