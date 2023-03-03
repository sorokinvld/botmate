import { Badge, Box, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type ModerationItemProps = {
	title: string;
	icon: React.ReactNode;
	description: string;
	href?: string;
	badge?: string;
};
function ModerationItem({
	title,
	icon,
	description,
	href,
	badge,
}: ModerationItemProps) {
	const r = useRouter();

	return (
		<Box
			p={4}
			borderWidth='1px'
			rounded='xl'
			bg='#1d1e2b'
			cursor='pointer'
			draggable={false}
			_hover={{
				shadow: 'xl',
			}}
			_active={{
				transform: 'scale(0.98)',
			}}
			transition='all 0.2s ease-in-out'
			onClick={() => (href ? r.push(href) : null)}
			userSelect='none'
		>
			<Box fontSize={32}>{icon}</Box>
			<HStack>
				<Heading size='md' mt={4}>
					{title}
				</Heading>
				{/* <Spacer /> */}
				{badge ? <Badge>{badge}</Badge> : null}
			</HStack>
			<Text mt={2} opacity={0.8} noOfLines={2}>
				{description}
			</Text>
		</Box>
	);
}

export { ModerationItem };