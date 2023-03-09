import { SidebarItem } from '@components';
import {
  Flex,
  Box,
  Stack,
  Heading,
  HStack,
  IconButton,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HiAdjustments,
  HiBeaker,
  HiChevronLeft,
  HiColorSwatch,
  HiLink,
  HiMenuAlt2,
  HiServer,
  HiSwitchVertical,
  HiUser,
} from 'react-icons/hi';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DashboardLayout } from './dashboard';

const SettingsSidebar = () => (
  <Stack spacing={6}>
    <Stack>
      <Stack>
        <SidebarItem
          label="Appearence"
          href="/settings/appearence"
          icon={<HiColorSwatch />}
          match={/^\/settings\/appearence/}
        />
        <SidebarItem
          label="Accounts"
          href="/settings/accounts"
          icon={<HiUser />}
          match={/^\/settings\/accounts/}
        />
        <SidebarItem
          label="Management"
          href="/settings/management"
          icon={<HiAdjustments />}
          match={/^\/settings\/management/}
        />
        <SidebarItem
          label="Integrations"
          href="/settings/integrations"
          icon={<HiLink />}
          match={/^\/settings\/integrations/}
        />
        <SidebarItem
          label="Webhooks"
          href="/settings/webhooks"
          icon={<HiServer />}
          match={/^\/settings\/webhooks/}
        />
        <SidebarItem
          label="Experimental"
          href="/settings/experimental"
          icon={<HiBeaker />}
          match={/^\/settings\/experimental/}
        />
        <SidebarItem
          label="Import / Export"
          href="/settings/import-export"
          icon={<HiSwitchVertical />}
          match={/^\/settings\/import-export/}
        />
      </Stack>
    </Stack>
  </Stack>
);

type SettingsLayoutProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};
// TOOD: Make this layout common, so it can be used in other pages (like, Moderation)
function SettingsLayout({ children, title, description }: SettingsLayoutProps) {
  const r = useRouter();
  const drawer = useDisclosure();

  return (
    <>
      <Box display={{ base: 'none', lg: 'block' }}>
        <DashboardLayout noPadding title="Settings">
          <Flex h="full" flexGrow={1} overflow="auto" gap={4}>
            <Stack w="72" h="full" borderRightWidth="1px" p={4} spacing={6}>
              <SettingsSidebar />
            </Stack>

            <Box flexGrow={1} p={4} overflow="auto">
              {children}
            </Box>
          </Flex>
        </DashboardLayout>
      </Box>

      <Box display={{ base: 'block', lg: 'none' }}>
        <Flex h="100vh" overflow="hidden">
          <Head>
            <title>{title}</title>
          </Head>

          <Stack
            w="72"
            borderRightWidth="1px"
            p={4}
            spacing={6}
            display={{ base: 'none', lg: 'flex' }}
          >
            <HStack>
              <IconButton
                onClick={r.back}
                aria-label="back"
                variant="ghost"
                fontSize={16}
                icon={<HiChevronLeft />}
              />
              <Heading size="md">Settings</Heading>
            </HStack>

            <SettingsSidebar />
          </Stack>

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
                Settings
              </Heading>
              <SettingsSidebar />
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    </>
  );
}

export { SettingsLayout };
