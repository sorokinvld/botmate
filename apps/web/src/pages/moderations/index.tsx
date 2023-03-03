import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import {
	chakra,
	Box,
	GridItem,
	SimpleGrid,
	Spacer,
	Text,
} from '@chakra-ui/react';
import { ChatSelector, ModerationItem } from '@/lib/components/moderation';
import {
	HiBadgeCheck,
	HiCake,
	HiFilter,
	HiLightningBolt,
	HiShieldCheck,
	HiStop,
} from 'react-icons/hi';
import { motion } from 'framer-motion';

const ModerationsList = [
	{
		title: 'Filters',
		icon: <HiFilter />,
		description: 'Filter messages based on keywords, links, and more.',
		href: '/moderations/filters',
	},
	{
		title: 'Anti Spam',
		icon: <HiStop />,
		description: 'Enable anti-spam to prevent spam messages from being sent.',
		href: '/moderations/anti-spam',
		badge: 'beta',
	},
	{
		title: 'Admins',
		icon: <HiShieldCheck />,
		description: 'View and manage adminstrators of your chat.',
		href: '/moderations/admins',
	},
	{
		title: 'Actions Runner',
		icon: <HiLightningBolt />,
		description: 'Run actions based on the given conditions.',
		href: '/moderations/actions',
	},
	{
		title: 'More Coming!!',
		icon: <HiCake />,
		description: 'More features are coming soon. Stay tuned!',
	},
];

function Moderations() {
	return (
		<Box>
			<SimpleGrid columns={10}>
				<GridItem colSpan={{ base: 10, lg: 7 }}>
					<Text mb={4} opacity={0.8}>
						<chakra.span fontWeight='bold'>Note:</chakra.span> Make sure that
						the bot is an admin of your chat before using any of the above
						features.
					</Text>
					<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
						{ModerationsList.map((item, index) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								// todo: create shared library to store transition values (and other contants)
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 20,
									delay: index * 0.1,
								}}
							>
								<ModerationItem {...item} />
							</motion.div>
						))}
					</SimpleGrid>
				</GridItem>
			</SimpleGrid>
		</Box>
	);
}

Moderations.getLayout = (page: React.ReactElement) => (
	<DashboardLayout
		title='Moderations'
		action={
			<>
				<Spacer />
				<ChatSelector />
			</>
		}
	>
		{page}
	</DashboardLayout>
);

export default Moderations;
