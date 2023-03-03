import {
	Box,
	Flex,
	Heading,
	HStack,
	IconButton,
	Spacer,
} from '@chakra-ui/react';
import { Sidebar } from '@/lib/components/sidebar';
import Head from 'next/head';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';

type DashboardLayoutProps = {
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	goBack?: boolean;
};
function DashboardLayout({
	title,
	children,
	action,
	goBack,
}: DashboardLayoutProps) {
	const r = useRouter();
	const borderColor = '#60606077';

	return (
		<>
			<Head>
				<title>{title + ' | BotMate'}</title>
			</Head>
			<Flex h='100vh' overflow='hidden'>
				<Box
					w='72'
					borderRightWidth='1px'
					borderRightColor={borderColor}
					overflow='auto'
				>
					<Sidebar />
				</Box>

				<Flex flexGrow={1} flexDirection='column'>
					<HStack
						p={4}
						w='full'
						spacing={6}
						borderBottomWidth='1px'
						borderBottomColor={borderColor}
						height='60px'
					>
						<HStack spacing={4}>
							{goBack ? (
								<IconButton
									onClick={r.back}
									aria-label='go-back'
									icon={<HiArrowLeft />}
								></IconButton>
							) : null}
							<Heading size='md'>{title}</Heading>
						</HStack>
						{action}
					</HStack>

					<Box flexGrow={1} p={4} overflow='auto'>
						{children}
					</Box>
				</Flex>
			</Flex>
		</>
	);
}

export { DashboardLayout };
