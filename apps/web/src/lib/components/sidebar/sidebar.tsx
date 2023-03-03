import {
	Divider,
	Flex,
	HStack,
	IconButton,
	Image,
	Spacer,
	Stack,
} from '@chakra-ui/react';
import {
	HiHome,
	HiBell,
	HiCog,
	HiChartBar,
	HiLightningBolt,
	HiAnnotation,
	HiPuzzle,
	HiRss,
	HiUsers,
	HiShieldCheck,
} from 'react-icons/hi';
import { Search } from './search';
import { SidebarItem } from './sidebar-item';

// generate sidebar items
const sidebarItems = [
	{
		label: 'Dashboard',
		icon: <HiHome />,
		href: '/',
	},
	{
		label: 'Commands',
		icon: <HiAnnotation />,
		href: '/commands',
	},
	{
		label: 'Analytics',
		icon: <HiChartBar />,
		href: '/analytics',
	},
	{
		label: 'Notifications',
		icon: <HiBell />,
		href: '/notifications',
	},
	{
		label: 'Action Builder',
		icon: <HiLightningBolt />,
		href: '/builder',
	},
	{
		label: 'Moderations',
		icon: <HiShieldCheck />,
		href: '/moderations',
	},
	{
		label: 'Marketplace',
		icon: <HiPuzzle />,
		href: '/marketplace',
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
				<Spacer />
				<IconButton
					size='md'
					aria-label='settings'
					icon={<HiCog size={18} />}
				/>
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

			<Divider />

			<Stack>
				<SidebarItem label='Groups' icon={<HiUsers />} href={'/groups'} />
				<SidebarItem label='Channels' icon={<HiRss />} href={'/channels'} />
			</Stack>
		</Flex>
	);
}

export { Sidebar };
