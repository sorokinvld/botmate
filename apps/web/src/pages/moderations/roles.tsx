import React from 'react';
import { DashboardLayout } from '@layouts';
import { Box, Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import { ChatSelector } from '@features/moderation';

function Roles() {
  return <Box maxW="6xl" m="auto"></Box>;
}

Roles.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Roles"
    noPadding
    action={
      <>
        <Spacer />
        <ChatSelector />
      </>
    }
  >
    <ModerationsLayout>{page}</ModerationsLayout>
  </DashboardLayout>
);

export default Roles;