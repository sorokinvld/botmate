import { SidebarItem } from '@/lib/components/sidebar';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { HiFilter, HiStop } from 'react-icons/hi';

const items = [
	{
		label: 'Filters',
		href: '/moderations',
		icon: <HiFilter />,
		match: /^\/moderations$/,
	},
	{
		label: 'Anti-spam',
		href: '/moderations/anti-spam',
		icon: <HiStop />,
		match: /^\/moderations\/anti-spam$/,
	},
];

type ModerationsLayoutProps = {
	children: React.ReactNode;
};
function ModerationsLayout({ children }: ModerationsLayoutProps) {
	return (
		<Flex flex={1} flexDirection='row'>
			<Stack
				w='52'
				borderRightWidth='1px'
				borderRightColor='#60606077'
				height='xl'
				p={4}
			>
				{items.map((item) => (
					<SidebarItem
						key={item.label}
						label={item.label}
						href={item.href}
						icon={item.icon}
						match={item.match}
					/>
				))}
			</Stack>
			<Box flex='1' p={4}>
				{children}
			</Box>
		</Flex>
	);
}

export { ModerationsLayout };
