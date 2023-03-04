import { SidebarItem } from '@/libs/components/sidebar';
import { Flex, Box, Text, Stack } from '@chakra-ui/react';
import {
  HiAdjustments,
  HiBeaker,
  HiColorSwatch,
  HiGlobeAlt,
  HiLink,
  HiServer,
  HiSwitchVertical,
  HiUser,
} from 'react-icons/hi';

import {
  HiCake,
  HiFilter,
  HiLightningBolt,
  HiShieldCheck,
  HiStop,
} from 'react-icons/hi';

const ModerationsList = [
  {
    label: 'Filters',
    icon: <HiFilter />,
    description: 'Filter messages based on keywords, links, and more.',
    href: '/moderations/filters',
    match: /\/moderations\/filters/,
  },
  {
    label: 'Anti Spam',
    icon: <HiStop />,
    description: 'Enable anti-spam to prevent spam messages from being sent.',
    href: '/moderations/anti-spam',
    badge: 'beta',
    match: /\/moderations\/anti-spam/,
  },
  {
    label: 'Administators',
    icon: <HiShieldCheck />,
    description: 'View and manage adminstrators of your chat.',
    href: '/moderations/admins',
    match: /\/moderations\/admins/,
  },
  {
    label: 'Actions Runner',
    icon: <HiLightningBolt />,
    description: 'Run actions based on the given conditions.',
    href: '/moderations/actions',
    match: /\/moderations\/actions/,
  },
  {
    label: 'Federation',
    icon: <HiGlobeAlt />,
    description: 'Manage federation settings for your chat.',
    href: '/moderations/federation',
    match: /\/moderations\/federation/,
  },
];

type ModerationsLayoutProps = {
  children: React.ReactNode;
};
function ModerationsLayout({ children }: ModerationsLayoutProps) {
  return (
    <Flex h="full" flexGrow={1} overflow="auto">
      <Stack w="60" h="full" borderRightWidth="1px" p={4}>
        {ModerationsList.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </Stack>

      <Box flexGrow={1} p={4} overflow="auto" maxW="6xl">
        {children}
      </Box>
    </Flex>
  );
}

export { ModerationsLayout };
