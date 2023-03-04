import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  HiHome,
  HiCog,
  HiChartBar,
  HiAnnotation,
  HiPuzzle,
  HiRss,
  HiShieldCheck,
  HiUser,
  HiOutlineBell,
} from 'react-icons/hi';
import { Search } from './search';
import { SidebarItem } from './sidebar-item';

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
function Sidebar({}: SidebarProps) {
  const r = useRouter();
  const { colorMode } = useColorMode();
  const profileBg = useColorModeValue('secondary.light', 'secondary.dark');

  return (
    <Flex flexDirection="column" p={4} gap={6} h="100vh" overflow="auto">
      <HStack width="full">
        <Image
          opacity={0.8}
          boxSize="8"
          src={`/assets/botmate-logo-${colorMode}.svg`}
        />
        <Spacer />
        <IconButton
          size="md"
          aria-label="notifications"
          variant="outline"
          icon={<HiOutlineBell size={14} />}
        />
      </HStack>

      <Search />

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

      <Divider />

      <Stack>
        <SidebarItem
          label="Help and Support"
          icon={<HiUser />}
          href={'/help-support'}
          match={/^\/help-support/}
        />
        <SidebarItem
          label="News and Updates"
          icon={<HiRss />}
          href={'/news-updates'}
          match={/^\/news-updates/}
        />
      </Stack>

      <Spacer />

      {/* 
					todo: make this a component
				*/}
      <HStack
        p={4}
        borderWidth="1px"
        rounded="xl"
        bg={profileBg}
        cursor="pointer"
        userSelect="none"
        _hover={{
          transform: 'translateY(-5px)',
          shadow: 'lg',
        }}
        transition="all 0.4s ease-in-out"
        onClick={() => r.push('/profile')}
      >
        <Avatar draggable={false} src="https://bit.ly/code-beast" />
        <Box>
          <Heading fontSize={12} noOfLines={1}>
            Monawwar Abdullah
          </Heading>
          <Text fontSize="sm" opacity={0.8}>
            @xencodes
          </Text>
        </Box>
      </HStack>
    </Flex>
  );
}

export { Sidebar };
