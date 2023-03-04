import { Box, Heading, HStack, Spacer, Text } from '@chakra-ui/react';

type SettingsOptionProps = {
	label: string;
	description: string;
	action?: React.ReactNode;
};
function SettingsOption({ label, description, action }: SettingsOptionProps) {
	return (
		<HStack alignItems='flex-start'>
			<Box>
				<Heading size='sm'>{label}</Heading>
				<Text mt={1} opacity={0.8} fontSize={13}>
					{description}
				</Text>
			</Box>
			<Spacer />
			{action}
		</HStack>
	);
}

export { SettingsOption };
