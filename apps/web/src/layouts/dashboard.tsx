import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  HiArrowLeft,
  HiChevronLeft,
  HiMenuAlt1,
  HiMenuAlt2,
  HiMenuAlt3,
} from 'react-icons/hi';
import { AppSidebar } from '@components';
import { useBotControllerGetBotsQuery } from '@api';
import { BotsProvider } from '@providers';

type DashboardLayoutProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  goBack?: boolean;
  noPadding?: boolean;
  noOverflow?: boolean;
};
function DashboardLayout({
  title,
  children,
  action,
  goBack,
  noPadding,
  noOverflow,
}: DashboardLayoutProps) {
  const r = useRouter();
  const drawer = useDisclosure();
  const { data: bots } = useBotControllerGetBotsQuery();
  const isDesktopView = useBreakpointValue({ base: false, md: true });

  if (bots?.length === 0) {
    r.push('/setup');
    return null;
  }

  return (
    <BotsProvider>
      <Head>
        <title>{title + ' | BotMate'}</title>
      </Head>
      <Flex h="100vh" overflow="hidden">
        {isDesktopView ? (
          <Box
            display={{}}
            w="72"
            minW="60"
            borderRightWidth="1px"
            overflow="auto"
          >
            <AppSidebar />
          </Box>
        ) : null}

        <Flex flex={1} flexDirection="column">
          <HStack
            p={4}
            w="full"
            spacing={6}
            borderBottomWidth="1px"
            height="60px"
          >
            <HStack spacing={4}>
              {!isDesktopView ? (
                <IconButton
                  variant="ghost"
                  aria-label="menu"
                  fontSize={18}
                  icon={<HiMenuAlt1 />}
                  onClick={drawer.onOpen}
                />
              ) : null}
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
                    variant="ghost"
                    onClick={r.back}
                    aria-label="go-back"
                    icon={<HiChevronLeft />}
                    fontSize={20}
                  />
                </motion.div>
              ) : null}
              <Heading size="md">{title}</Heading>
            </HStack>
            {action}
          </HStack>

          <Box
            flexGrow={1}
            p={noPadding ? 0 : 4}
            // overflow={noOverflow ? 'hidden' : 'auto'}
            overflow={'auto'}
          >
            {children}
          </Box>
        </Flex>
      </Flex>

      <Drawer isOpen={drawer.isOpen} placement="left" onClose={drawer.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <AppSidebar />
        </DrawerContent>
      </Drawer>
    </BotsProvider>
  );
}

export { DashboardLayout };
