import {
  Badge,
  Box,
  Heading,
  HStack,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

// todo: move this to ui folder

type ModerationItemProps = {
  title: string;
  icon: React.ReactNode;
  description: string;
  href?: string;
  badge?: string;
};
function ModerationItem({
  title,
  icon,
  description,
  href,
  badge,
}: ModerationItemProps) {
  const r = useRouter();
  const bg = useColorModeValue('secondary.light', 'secondary.dark');
  const { colorMode } = useColorMode();

  return (
    <Box
      p={4}
      borderWidth="1px"
      rounded="md"
      bg={bg}
      cursor="pointer"
      draggable={false}
      _hover={{
        shadow: colorMode === 'dark' ? 'xl' : 'base',
      }}
      _active={{
        transform: 'scale(0.98)',
      }}
      transition="all 0.2s ease-in-out"
      onClick={() => (href ? r.push(href) : null)}
      userSelect="none"
    >
      <Box fontSize={32}>{icon}</Box>
      <HStack>
        <Heading size="md" mt={4}>
          {title}
        </Heading>
        {/* <Spacer /> */}
        {badge ? <Badge>{badge}</Badge> : null}
      </HStack>
      <Text mt={2} opacity={0.8} noOfLines={2}>
        {description}
      </Text>
    </Box>
  );
}

export { ModerationItem };
