import { BotMateLogo } from '@components';
import { useActiveBot } from '@hooks';
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  HiHome,
  HiCog,
  HiChartBar,
  HiAnnotation,
  HiPuzzle,
  HiShieldCheck,
  HiOutlineBell,
} from 'react-icons/hi';
import { SidebarItem } from './sidebar-item';
import { ProfileSidebar } from '@atoms';

// todo: get values from constants
const sidebarItems = [
  {
    label: 'Dashboard',
    icon: <HiHome />,
    href: '/',
    match: /^\/$/,
  },
  {
    label: 'Commands',
    icon: <HiAnnotation />,
    href: '/commands',
    match: /^\/commands/,
  },
  {
    label: 'Analytics',
    icon: <HiChartBar />,
    href: '/analytics',
    match: /^\/analytics/,
  },
  {
    label: 'Moderations',
    icon: <HiShieldCheck />,
    href: '/moderations/filters',
    match: /^\/moderations/,
  },
  {
    label: 'Marketplace',
    icon: <HiPuzzle />,
    href: '/marketplace',
    match: /^\/marketplace/,
  },
  {
    label: 'Settings',
    icon: <HiCog />,
    href: '/settings/appearence',
    match: /^\/settings/,
  },
];

type SidebarProps = {
  //
};
function AppSidebar({}: SidebarProps) {
  const activeBot = useActiveBot();

  return (
    <Flex flexDirection="column" p={4} gap={6} h="100vh" overflow="auto">
      <Box>
        <HStack width="full">
          <BotMateLogo height="25px" width="25px" />
          <Spacer />
          <IconButton
            size="md"
            aria-label="notifications"
            variant="outline"
            icon={<HiOutlineBell size={14} />}
          />
        </HStack>
        <HStack>
          <Box mt={4}>
            <Heading size="sm">{activeBot.first_name}</Heading>
            <Text opacity={0.8} fontSize={12}>
              {activeBot.id}
            </Text>
          </Box>
          <Spacer />
        </HStack>
      </Box>

      <Stack>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            match={item.match}
          />
        ))}
      </Stack>

      <Spacer />

      {/* 
					todo: make this a component
				*/}
      <ProfileSidebar />
    </Flex>
  );
}

export { AppSidebar };
