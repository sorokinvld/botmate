import {
  Box,
  Text,
  HStack,
  Avatar,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useUser } from '@hooks';
import { useRouter } from 'next/router';

type ProfileSidebarProps = {};
function ProfileSidebar({}: ProfileSidebarProps) {
  const r = useRouter();
  const user = useUser();
  const profileBg = useColorModeValue('secondary.light', 'secondary.dark');

  return (
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
      <Avatar draggable={false} src={user.avatar} />
      <Box>
        <Heading fontSize={12} noOfLines={1}>
          {user.name}
        </Heading>
        <Text fontSize="sm" opacity={0.8}>
          {user.email}
        </Text>
      </Box>
    </HStack>
  );
}

export { ProfileSidebar };
