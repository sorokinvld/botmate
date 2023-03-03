import { Box, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react';

type StatsProps = {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	label?: string;
};
function Stats({ title, value, icon, label }: StatsProps) {
	return (
		<Box p={4} bg='#1d1e2b' rounded='lg' borderWidth='1px'>
			<HStack alignItems='flex-start'>
				<Stack>
					<Text size='md'>{title}</Text>
					<Heading>{value}</Heading>
				</Stack>
				<Spacer />
				<Box rounded='xl' fontSize='6xl'>
					{icon}
				</Box>
			</HStack>
			<Text mt={2} fontSize={12} opacity={0.8}>
				{label}
			</Text>
		</Box>
	);
}

export { Stats };
