import {
  Box,
  Text,
  HStack,
  Avatar,
  Heading,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useActiveBot, useUser } from '@hooks';
import { useRouter } from 'next/router';
import { BotSelector } from 'src/components/bot-selector';

type ProfileSidebarProps = {};
function ProfileSidebar({}: ProfileSidebarProps) {
  const r = useRouter();
  const bot = useActiveBot();
  const profileBg = useColorModeValue('secondary.light', 'secondary.dark');
  const d = useDisclosure();

  return (
    <>
      <HStack
        p={4}
        borderWidth="1px"
        rounded="xl"
        bg={profileBg}
        cursor="pointer"
        userSelect="none"
        onClick={d.onOpen}
      >
        <Avatar
          draggable={false}
          src={`http://localhost:8080/api/download/photo/${bot.id}.jpg`}
        />
        <Box>
          <Heading fontSize={12} noOfLines={1}>
            {bot.first_name}
          </Heading>
          <Text fontSize="sm" opacity={0.8}>
            {bot.id}
          </Text>
        </Box>
      </HStack>
      <BotSelector {...d} />
    </>
  );
}

export { ProfileSidebar };
