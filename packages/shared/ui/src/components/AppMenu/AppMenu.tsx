import { Box, Heading, HStack, Stack, Text, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { MenuLink } from '@botmate/types/admin';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { BotMateLogo } from '../Logo';
import { AppMenuItem } from '../AppMenuItem';

export type AppMenuItem = MenuLink;
type AppMenuProps = {
  header: React.ReactNode;
  items: AppMenuItem[];
  iconsOnly?: boolean;
};
function AppMenu({ header, items, iconsOnly = false }: AppMenuProps) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const params = useParams();
  const location = useLocation();

  const TooltipWrapper = iconsOnly ? Tooltip : Box;

  return (
    <Box bg="surface" flex={1} borderRightWidth="1px">
      {header}

      <Stack spacing={1}>
        {items.map((item, index) => {
          let path = item.to;
          const isActive = item.match.test(location.pathname);

          for (const key in params) {
            path = path.replace(`:${key}`, params[key] as string);
          }

          return (
            <Link
              key={index}
              to={path}
              style={{
                cursor: 'default',
              }}
            >
              <TooltipWrapper label={item.label} placement="right" px={2}>
                <AppMenuItem
                  isActive={isActive}
                  isMobile={isMobile}
                  iconsOnly={iconsOnly}
                  icon={item.icon}
                  label={item.label}
                />
              </TooltipWrapper>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}

export { AppMenu };
