import React from 'react';
import { Stack } from '@chakra-ui/react';
import { DashboardLayout } from '@layouts';
import { SettingsLayout } from '@layouts';

function Accounts() {
  return <Stack spacing={6}></Stack>;
}

Accounts.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Accounts" noPadding noOverflow>
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default Accounts;
