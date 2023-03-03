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
	HiUser,
} from 'react-icons/hi';
import { Search } from './search';
import { SidebarItem } from './sidebar-item';

const sidebarItems = [
	{
		label: 'Dashboard',
		icon: <HiHome />,
		href: '/',
		match: /^\/$/,
	},
	{
		label: 'Commands',
		icon: <HiAnnotation />,
		href: '/commands',
		match: /^\/commands/,
	},
	{
		label: 'Analytics',
		icon: <HiChartBar />,
		href: '/analytics',
		match: /^\/analytics/,
	},
	{
		label: 'Notifications',
		icon: <HiBell />,
		href: '/notifications',
		match: /^\/notifications/,
	},
	{
		label: 'Action Builder',
		icon: <HiLightningBolt />,
		href: '/builder',
		match: /^\/builder/,
	},
	{
		label: 'Moderations',
		icon: <HiShieldCheck />,
		href: '/moderations',
		match: /^\/moderations/,
	},
	{
		label: 'Marketplace',
		icon: <HiPuzzle />,
		href: '/marketplace',
		match: /^\/marketplace/,
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
				<Link href='/settings'>
					<IconButton
						size='md'
						aria-label='settings'
						icon={<HiCog size={18} />}
					/>
				</Link>
			</HStack>

			<Search />

			<Stack>
				{sidebarItems.map((item) => (
					<SidebarItem
						key={item.label}
						label={item.label}
						icon={item.icon}
						href={item.href}
						match={item.match}
					/>
				))}
			</Stack>

			<Divider />

			<Stack>
				<SidebarItem
					label='Help and Support'
					icon={<HiUser />}
					href={'/help-support'}
					match={/^\/help-support/}
				/>
				<SidebarItem
					label='News and Updates'
					icon={<HiRss />}
					href={'/news-updates'}
					match={/^\/news-updates/}
				/>
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
