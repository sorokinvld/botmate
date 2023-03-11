import React from 'react';
import { RadioButton } from '@atoms';
import { SettingsOption } from '@atoms';
import { Center, Select, Stack, useColorMode } from '@chakra-ui/react';
import { DashboardLayout } from '@layouts';
import { SettingsLayout } from '@layouts';
import { useBotMateControllerGetVersionQuery } from '@api';

function General() {
  const { colorMode, setColorMode } = useColorMode();
  const { data: version } = useBotMateControllerGetVersionQuery();

  return (
    <Stack spacing={6}>
      <SettingsOption
        label="Color Scheme"
        description="Change the color scheme of the dashboard."
        action={
          <RadioButton
            activeIndex={
              colorMode === 'light' ? 0 : colorMode === 'dark' ? 1 : 2
            }
            onChange={(value) => {
              setColorMode(value.toLowerCase());
            }}
            options={[
              {
                label: 'Light',
                value: 'light',
              },
              {
                label: 'Dark',
                value: 'dark',
              },
              {
                label: 'System',
                value: 'system',
              },
            ]}
          />
        }
      />

      <SettingsOption
        label="Language"
        description="Change the language of the dashboard."
        action={
          <Select w="52">
            <option>English</option>
          </Select>
        }
      />

      <Center mt={4} opacity={0.7}>
        BotMate v{version?.version}
      </Center>
    </Stack>
  );
}

General.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="General" noPadding noOverflow>
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default General;
