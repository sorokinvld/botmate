import {
	Avatar,
	Box,
	Divider,
	Flex,
	Heading,
	HStack,
	IconButton,
	Image,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react';
import Link from 'next/link';
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
		<Flex flexDirection='column' p={4} gap={6} h='100vh' overflow='auto'>
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

			<Spacer />

			<Link href='/profile'>
				<HStack
					p={4}
					borderWidth='1px'
					rounded='xl'
					bg='#1d1e2b'
					cursor='pointer'
					userSelect='none'
					_hover={{
						transform: 'translateY(-5px)',
						shadow: 'lg',
					}}
					transition='all 0.4s ease-in-out'
				>
					<Avatar draggable={false} src='https://bit.ly/code-beast' />
					<Box>
						<Heading fontSize={12}>Monawwar Abdullah</Heading>
						<Text fontSize='sm' opacity={0.8}>
							@xencodes
						</Text>
					</Box>
				</HStack>
			</Link>
		</Flex>
	);
}

export { Sidebar };
