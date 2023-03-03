import { Box, Flex, Heading, HStack, Spacer } from '@chakra-ui/react';
import { Sidebar } from '@/lib/components/sidebar';
import Head from 'next/head';

type DashboardLayoutProps = {
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
};
function DashboardLayout({ title, children, action }: DashboardLayoutProps) {
	const borderColor = '#60606077';

	return (
		<>
			<Head>
				<title>{title} | BotMate</title>
			</Head>
			<Flex h='100vh' overflow='auto'>
				<Box w='72' borderRightWidth='1px' borderRightColor={borderColor}>
					<Sidebar />
				</Box>
				<Box flexGrow={1}>
					<HStack
						p={4}
						spacing={6}
						borderBottomWidth='1px'
						borderBottomColor={borderColor}
						height='60px'
					>
						<Heading size='md'>{title}</Heading>
						{action}
					</HStack>

					<Box p={4}>{children}</Box>
				</Box>
			</Flex>
		</>
	);
}

export { DashboardLayout };
