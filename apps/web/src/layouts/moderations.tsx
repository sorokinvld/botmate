import { SidebarItem } from '@/libs/components/sidebar';
import { Flex, Box, Text, Stack } from '@chakra-ui/react';
import {
  HiAdjustments,
  HiBeaker,
  HiColorSwatch,
  HiGlobeAlt,
  HiLink,
  HiPlay,
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
    href: '/moderations/filters',
    match: /\/moderations\/filters/,
  },
  {
    label: 'Anti Spam',
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
    href: '/moderations/federation',
    match: /\/moderations\/federation/,
  },
  {
    label: 'Federation',
    icon: <HiGlobeAlt />,
    href: '/moderations/federation',
    match: /\/moderations\/federation/,
  },
];

type ModerationsLayoutProps = {
  children: React.ReactNode;
};
function ModerationsLayout({ children }: ModerationsLayoutProps) {
  return (
    <Flex h="full" flex={1} overflow="hidden">
      <Stack w="60" h="full" borderRightWidth="1px" p={4} overflow="auto">
        {ModerationsList.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </Stack>

      <Box flex={1} p={4} overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}

export { ModerationsLayout };
