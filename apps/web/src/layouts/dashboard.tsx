import { Box, Flex, Heading, HStack } from '@chakra-ui/react';
import { Sidebar } from '@/lib/components/sidebar';

type DashboardLayoutProps = {
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
};
function DashboardLayout({ title, children, action }: DashboardLayoutProps) {
	console.log('action', action);
	const borderColor = '#60606077';
	return (
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
				>
					<Heading size='md'>{title}</Heading>
					<Box>{action}</Box>
				</HStack>
				<Box p={4}>{children}</Box>
			</Box>
		</Flex>
	);
}

export { DashboardLayout };
