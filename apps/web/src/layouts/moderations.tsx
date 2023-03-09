import { SidebarItem } from '@components';
import { Flex, Box, Stack, HStack, Divider, Text } from '@chakra-ui/react';
import { HiGlobeAlt, HiPlay, HiSpeakerphone, HiUsers } from 'react-icons/hi';

import {
  HiFilter,
  HiLightningBolt,
  HiShieldCheck,
  HiStop,
} from 'react-icons/hi';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
};
function ModerationsLayout({ children }: ModerationsLayoutProps) {
  const r = useRouter();
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  return (
    <Flex flex={1} overflow="hidden" h="100%">
      <Stack
        w="72"
        overflow="hidden"
        p={4}
        borderRightWidth="1px"
        spacing={6}
        display={{ base: 'none', lg: 'block' }}
      >
        {ModerationsList.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
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
          {ModerationsList.map((item) => {
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

        <Box p={4} overflow="auto">
          {children}
        </Box>
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
    </Flex>
  );
}

export { ModerationsLayout };
