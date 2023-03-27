import React from 'react';
import {
  Box,
  Divider,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import { RiMoonLine, RiSunFill, RiSunLine } from 'react-icons/ri';
import { MenuLink } from '@botmate/types/admin';
import { Link, useLocation } from 'react-router-dom';
import { BotMateLogo } from '../Logo';

export type AppMenuItem = MenuLink;
type AppMenuProps = {
  items: AppMenuItem[];
  iconsOnly?: boolean;
};
function AppMenu({ items, iconsOnly = false }: AppMenuProps) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const { toggleColorMode, colorMode } = useColorMode();
  const location = useLocation();
  const TooltipWrapper = iconsOnly ? Tooltip : Box;

  return (
    <Box bg="surface" py={4} flex={1} borderWidth="1px" rounded="lg">
      <HStack px={4} pb={4}>
        <Box bg="brand.400" p={2} rounded="md">
          <BotMateLogo color="white" height="25px" width="25px" />
        </Box>

        <Box>
          <Heading size="sm">BotMate</Heading>
          <Text color="GrayText">v0.0.1-prerelease.24</Text>
        </Box>
      </HStack>

      {items.map((item, index) => {
        const isActive = location.pathname === item.to;

        return (
          <Link
            key={index}
            to={item.to}
            style={{
              cursor: 'default',
            }}
          >
            <TooltipWrapper label={item.label} placement="right" px={2}>
              <HStack
                py={2}
                px={2}
                color={isActive ? 'brand.400' : 'gray.400'}
                bg={isActive ? 'secondary' : 'transparent'}
                fontWeight={'bold'}
                rounded="md"
              >
                <Box fontSize={isMobile ? '2xl' : 'xl'}>{item.icon}</Box>
                {!iconsOnly && <Text fontSize="sm">{item.label}</Text>}
              </HStack>
            </TooltipWrapper>
          </Link>
        );
      })}
    </Box>
  );
}

export { AppMenu };
