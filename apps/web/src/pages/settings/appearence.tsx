import React from 'react';
import { RadioButton } from '@atoms';
import { SettingsOption } from '@atoms';
import { Select, Stack, useColorMode } from '@chakra-ui/react';
import { DashboardLayout } from '@layouts';
import { SettingsLayout } from '@layouts';

function General() {
  const { colorMode, setColorMode } = useColorMode();

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
    </Stack>
  );
}

General.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Settings • Appearence" noPadding>
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default General;
