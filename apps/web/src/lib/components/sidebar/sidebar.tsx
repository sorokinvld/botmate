import {
	Box,
	Flex,
	HStack,
	IconButton,
	Image,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react';
import { RiGithubFill } from 'react-icons/ri';
import {
	HiHome,
	HiBell,
	HiCog,
	HiChartBar,
	HiLightningBolt,
	HiAnnotation,
	HiShoppingCart,
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
		href: '/broadcast',
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
		label: 'Marketplace',
		icon: <HiShoppingCart />,
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

			<Box>
				<Text fontSize={12} color='#a1a1a1'>
					Telegram
				</Text>

				<Stack mt={4} spacing={1}>
					<SidebarItem
						label='Channels'
						icon={<RiGithubFill />}
						href={'/github'}
					/>
					<SidebarItem
						label='Groups'
						icon={<RiGithubFill />}
						href={'/github'}
					/>
					<SidebarItem label='Users' icon={<RiGithubFill />} href={'/github'} />
				</Stack>
			</Box>
		</Flex>
	);
}

export { Sidebar };
