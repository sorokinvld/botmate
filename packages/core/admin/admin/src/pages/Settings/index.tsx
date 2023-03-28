import { AppHeader, AppMenuItem, Box, Container, Flex, Heading, Stack, Text } from '@botmate/ui';
import { TbCopyright, TbPaint, TbUser } from 'react-icons/tb';
import { Route, Routes } from 'react-router-dom';
import SettingsGeneralPage from './general';

function SettingsPage() {
  return (
    <>
      <AppHeader title="Settings" />

      <Flex flex={1}>
        <Box w="230px" h="full" bg="surface" borderRightWidth="1px" p={2} py={4}>
          <Stack>
            <Text fontSize={12} color="GrayText">
              APP SETTINGS
            </Text>
            <AppMenuItem label="General" icon={<TbPaint />} isActive /> ¯
          </Stack>
        </Box>

        <Box flex={1} overflow="auto">
          <Routes>
            <Route index Component={SettingsGeneralPage} />
          </Routes>
        </Box>
      </Flex>
    </>
  );
}

export default SettingsPage;
