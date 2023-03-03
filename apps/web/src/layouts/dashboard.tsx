import { Box, Flex, Heading } from '@chakra-ui/react';
import { Sidebar } from '@/lib/components/sidebar';

type DashboardLayoutProps = {
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
};
function DashboardLayout({ title, children }: DashboardLayoutProps) {
	const borderColor = '#60606077';
	return (
		<Flex h='100vh' overflow='auto'>
			<Box w='72' borderRightWidth='1px' borderRightColor={borderColor}>
				<Sidebar />
			</Box>
			<Box flexGrow={1}>
				<Box p={4} borderBottomWidth='1px' borderBottomColor={borderColor}>
					<Heading size='md'>{title}</Heading>
				</Box>
				<Box p={4}>{children}</Box>
			</Box>
		</Flex>
	);
}

export { DashboardLayout };
