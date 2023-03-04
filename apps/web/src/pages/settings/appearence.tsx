import React from 'react';
import { RadioButton } from '@/libs/ui';
import { SettingsOption } from '@/libs/ui/settings';
import { Select, Stack } from '@chakra-ui/react';
import { DashboardLayout } from '@/layouts/dashboard';
import { SettingsLayout } from '@/layouts/settings';

function General() {
  return (
    <Stack spacing={6}>
      <SettingsOption
        label="Color Scheme"
        description="Change the color scheme of the dashboard."
        action={<RadioButton options={['Light', 'Dark', 'System']} />}
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
  <DashboardLayout title="Settings / Appearence" noPadding>
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default General;
