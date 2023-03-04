import { Box, Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import { Sidebar } from '@/libs/components/sidebar';
import Head from 'next/head';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

type DashboardLayoutProps = {
	title: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	goBack?: boolean;
	noPadding?: boolean;
};
function DashboardLayout({
	title,
	children,
	action,
	goBack,
	noPadding,
}: DashboardLayoutProps) {
	const r = useRouter();

	return (
		<>
			<Head>
				<title>{title + ' | BotMate'}</title>
			</Head>
			<Flex h='100vh' overflow='hidden'>
				<Box w='80' borderRightWidth='1px' overflow='auto'>
					<Sidebar />
				</Box>

				<Flex w='full' flexDirection='column'>
					<HStack
						p={4}
						w='full'
						spacing={6}
						borderBottomWidth='1px'
						height='60px'
					>
						<HStack spacing={4}>
							{goBack ? (
								<motion.div
									initial={{ x: -50, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: 50, opacity: 0 }}
									transition={{
										type: 'spring',
										stiffness: 260,
										damping: 20,
									}}
								>
									<IconButton
										onClick={r.back}
										aria-label='go-back'
										icon={<HiArrowLeft />}
									/>
								</motion.div>
							) : null}
							<Heading size='md'>{title}</Heading>
						</HStack>
						{action}
					</HStack>

					<Box flexGrow={1} p={noPadding ? 0 : 4} overflow='auto'>
						{children}
					</Box>
				</Flex>
			</Flex>
		</>
	);
}

export { DashboardLayout };
