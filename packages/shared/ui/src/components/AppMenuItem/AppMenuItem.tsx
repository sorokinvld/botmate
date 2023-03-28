import { Box, HStack, Text } from '@chakra-ui/react';

type AppMenuItemProps = {
  isActive?: boolean;
  isMobile?: boolean;
  iconsOnly?: boolean;
  icon: React.ReactNode;
  label: string;
};
function AppMenuItem({ isActive, isMobile, iconsOnly, icon, label }: AppMenuItemProps) {
  return (
    <HStack
      py={1.5}
      px={2}
      color={isActive ? 'brand.400' : 'gray.400'}
      bg={isActive ? 'secondary' : 'transparent'}
      fontWeight={'500'}
      rounded="md"
    >
      <Box fontSize={isMobile ? '2xl' : 'xl'}>{icon}</Box>
      {!iconsOnly && <Text>{label}</Text>}
    </HStack>
  );
}

export { AppMenuItem };
