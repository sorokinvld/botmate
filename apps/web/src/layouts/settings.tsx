import { SidebarItem } from '@components';
import {
  Flex,
  Box,
  Stack,
  Heading,
  Drawer,
  DrawerContent,
  useDisclosure,
  HStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import {
  HiAdjustments,
  HiBeaker,
  HiColorSwatch,
  HiLink,
  HiServer,
  HiSwitchVertical,
  HiUser,
} from 'react-icons/hi';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const SettingsItems = [
  {
    label: 'Appearence',
    href: '/settings/appearence',
    icon: <HiColorSwatch />,
    match: /^\/settings\/appearence/,
  },
  {
    label: 'Accounts',
    href: '/settings/accounts',
    icon: <HiUser />,
    match: /^\/settings\/accounts/,
  },
  {
    label: 'Management',
    href: '/settings/management',
    icon: <HiAdjustments />,
    match: /^\/settings\/management/,
  },
  {
    label: 'Integrations',
    href: '/settings/integrations',
    icon: <HiLink />,
    match: /^\/settings\/integrations/,
  },
  {
    label: 'Webhooks',
    href: '/settings/webhooks',
    icon: <HiServer />,
    match: /^\/settings\/webhooks/,
  },
  {
    label: 'Experimental',
    href: '/settings/experimental',
    icon: <HiBeaker />,
    match: /^\/settings\/experimental/,
  },
  {
    label: 'Import / Export',
    href: '/settings/import-export',
    icon: <HiSwitchVertical />,
    match: /^\/settings\/import-export/,
  },
];

const SettingsSidebar = () => (
  <Stack spacing={6}>
    <Stack>
      <Stack>
        {SettingsItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </Stack>
    </Stack>
  </Stack>
);

type SettingsLayoutProps = {
  children: React.ReactNode;
};
// TOOD: Make this layout common, so it can be used in other pages (like, Moderation)
function SettingsLayout({ children }: SettingsLayoutProps) {
  const r = useRouter();
  const drawer = useDisclosure();
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  return (
    <>
      <Flex flex={1} overflow="hidden" h="100%">
        <Stack
          w="72"
          overflow="hidden"
          p={4}
          borderRightWidth="1px"
          spacing={6}
          display={{ base: 'none', lg: 'block' }}
        >
          <SettingsSidebar />
        </Stack>

        <Box
          flex={1}
          overflow="auto"
          maxW="7xl"
          m="auto"
          h="full"
          display={{ base: 'block', lg: 'none' }}
        >
          <HStack py={4} px={4} overflowX="auto" w={screenWidth}>
            {SettingsItems.map((item) => {
              const isActive = item.match.test(r.pathname);
              return (
                <Link href={item.href} key={item.href}>
                  <HStack
                    p={2}
                    rounded="lg"
                    bg={isActive ? 'brand.dark' : 'transparent'}
                  >
                    <Box>{item.icon}</Box>
                    <Text whiteSpace="nowrap">{item.label}</Text>
                  </HStack>
                </Link>
              );
            })}
          </HStack>

          <Divider />

          <Box p={4}>{children}</Box>
        </Box>

        <Box
          flex={1}
          overflow="auto"
          maxW="7xl"
          m="auto"
          h="full"
          display={{ base: 'none', lg: 'block' }}
          p={4}
        >
          {children}
        </Box>

        <Drawer
          isOpen={drawer.isOpen}
          placement="left"
          onClose={drawer.onClose}
        >
          <DrawerContent p={4} shadow="base">
            <Heading mb={6} size="md">
              Settings
            </Heading>
            <SettingsSidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
}

export { SettingsLayout };
