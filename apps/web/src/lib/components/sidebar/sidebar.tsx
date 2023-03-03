import { Flex, HStack, Image, Stack } from '@chakra-ui/react';
import {
	RiDashboardLine,
	RiCommandLine,
	RiNotification2Line,
} from 'react-icons/ri';
import { Search } from './search';
import { SidebarItem } from './sidebar-item';

// generate sidebar items
const sidebarItems = [
	{
		label: 'Dashboard',
		icon: <RiDashboardLine />,
		href: '/',
	},
	{
		label: 'Commands',
		icon: <RiCommandLine />,
		href: '/commands',
	},
	{
		label: 'Notifications',
		icon: <RiNotification2Line />,
		href: '/notifications',
	},
];

type SidebarProps = {
	//
};
function Sidebar({}: SidebarProps) {
	return (
		<Flex flexDirection='column' p={4} gap={6}>
			<HStack width='full'>
				<Image opacity={0.8} boxSize='8' src='/assets/botmate-logo.png' />
			</HStack>

			<Search />

			<Stack>
				{sidebarItems.map((item) => (
					<SidebarItem
						key={item.label}
						label={item.label}
						icon={item.icon}
						href={item.href}
					/>
				))}
			</Stack>
		</Flex>
	);
}

export { Sidebar };
