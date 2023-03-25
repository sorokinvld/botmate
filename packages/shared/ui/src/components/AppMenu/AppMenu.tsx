import { Box, Flex, HStack, Stack, Text, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { BotMateLogo } from '../Logo';

export type AppMenuItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
  match: RegExp;
  onClick?: () => void;
};
type AppMenuProps = {
  items: AppMenuItem[];
  iconsOnly?: boolean;
};
function AppMenu({ items, iconsOnly = false }: AppMenuProps) {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });
  const location = useLocation();

  const TooltipWrapper = iconsOnly ? Tooltip : Box;

  return (
    <>
      <HStack px={4} pb={2}>
        <BotMateLogo color="gray.200" height="30px" width="30px" />
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
                onClick={item.onClick}
                color={isActive ? 'brand.400' : 'gray.400'}
                bg={isActive ? 'secondary' : 'transparent'}
              >
                <Box fontSize={isMobile ? '2xl' : 'xl'}>{item.icon}</Box>
                {!iconsOnly && <Text fontSize="sm">{item.label}</Text>}
              </HStack>
            </TooltipWrapper>
          </Link>
        );
      })}
    </>
  );
}

export { AppMenu };
