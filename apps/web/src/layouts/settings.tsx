import { SidebarItem } from '@/libs/components/sidebar';
import { Flex, Box, Text, Stack } from '@chakra-ui/react';
import {
  HiAdjustments,
  HiBeaker,
  HiColorSwatch,
  HiLink,
  HiServer,
  HiSwitchVertical,
  HiUser,
} from 'react-icons/hi';

type SettingsLayoutProps = {
  children: React.ReactNode;
};
function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Flex h="full" flexGrow={1} overflow="auto">
      <Stack w="60" h="full" borderRightWidth="1px" p={4} spacing={6}>
        <Stack>
          <Text opacity={0.7} fontSize={12}>
            General
          </Text>

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
          </Stack>
        </Stack>

        <Stack>
          <Text opacity={0.7} fontSize={12}>
            Advanced
          </Text>

          <Stack>
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

      <Box flexGrow={1} p={4} overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}

export { SettingsLayout };
