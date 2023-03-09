import { SidebarItem } from '@components';
import {
  Flex,
  Box,
  Stack,
  Drawer,
  useDisclosure,
  DrawerContent,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  HiChevronLeft,
  HiGlobeAlt,
  HiMenuAlt2,
  HiPlay,
  HiSpeakerphone,
  HiUsers,
} from 'react-icons/hi';

import {
  HiFilter,
  HiLightningBolt,
  HiShieldCheck,
  HiStop,
} from 'react-icons/hi';
import { DashboardLayout } from './dashboard';
import { useRouter } from 'next/router';

const ModerationsList = [
  {
    label: 'Filters',
    icon: <HiFilter />,
    href: '/moderations/filters',
    match: /\/moderations\/filters/,
  },
  {
    label: 'Roles',
    icon: <HiUsers />,
    href: '/moderations/roles',
    match: /\/moderations\/roles/,
  },
  {
    label: 'Anti-spam',
    icon: <HiStop />,
    href: '/moderations/anti-spam',
    badge: 'beta',
    match: /\/moderations\/anti-spam/,
  },
  {
    label: 'Administators',
    icon: <HiShieldCheck />,
    href: '/moderations/admins',
    match: /\/moderations\/admins/,
  },
  {
    label: 'Actions Runner',
    icon: <HiLightningBolt />,
    href: '/moderations/actions',
    match: /\/moderations\/actions/,
  },
  {
    label: 'Entertainment',
    icon: <HiPlay />,
    href: '/moderations/entertainment',
    match: /\/moderations\/entertainment/,
  },
  {
    label: 'Federation',
    icon: <HiGlobeAlt />,
    href: '/moderations/federation',
    match: /\/moderations\/federation/,
  },
  {
    label: 'Announcement',
    icon: <HiSpeakerphone />,
    href: '/moderations/announcement',
    match: /\/moderations\/announcement/,
  },
];

type ModerationsLayoutProps = {
  children: React.ReactNode;
  title?: string;
};
function ModerationsLayout({ children, title }: ModerationsLayoutProps) {
  const r = useRouter();
  const drawer = useDisclosure();

  return (
    <>
      {/* 
      NOTE: This is a workaround for the Layout issue for the moment. It has performance issues.
    */}
      <Box display={{ base: 'none', lg: 'block' }}>
        <DashboardLayout noPadding title="Settings">
          <Flex h="full" flexGrow={1} overflow="auto" gap={4}>
            <Stack w="72" h="full" borderRightWidth="1px" p={4}>
              {ModerationsList.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </Stack>

            <Box flexGrow={1} p={4} overflow="auto">
              {children}
            </Box>
          </Flex>
        </DashboardLayout>
      </Box>

      <Box display={{ base: 'block', lg: 'none' }}>
        <Flex h="full" flex={1} overflow="hidden">
          <Box h="100vh" flex={1} overflow="auto">
            <Box borderBottomWidth="1px" px={4}>
              <HStack height="60px">
                <IconButton
                  onClick={drawer.onOpen}
                  aria-label="back"
                  variant="ghost"
                  fontSize={16}
                  icon={<HiMenuAlt2 />}
                  display={{ base: 'flex', lg: 'none' }}
                />
                <IconButton
                  onClick={r.back}
                  aria-label="back"
                  variant="ghost"
                  fontSize={14}
                  icon={<HiChevronLeft />}
                  display={{ base: 'flex', lg: 'none' }}
                />
                <Heading size="md">{title}</Heading>
              </HStack>
            </Box>
            <Box flex={1} maxW="7xl" m="auto" py={6} px={{ base: 6, lg: 0 }}>
              {children}
            </Box>
          </Box>

          <Drawer
            isOpen={drawer.isOpen}
            placement="left"
            onClose={drawer.onClose}
          >
            {/* <DrawerOverlay /> */}
            <DrawerContent p={4} shadow="base">
              <Heading mb={6} size="md">
                Moderations
              </Heading>

              <Stack>
                {ModerationsList.map((item) => (
                  <SidebarItem key={item.label} {...item} />
                ))}
              </Stack>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    </>
  );
}

export { ModerationsLayout };
