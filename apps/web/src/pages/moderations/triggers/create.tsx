import { Box, GridItem, SimpleGrid, Spacer, Stack } from '@chakra-ui/react';
import { ChatSelector, CreateTrigger } from '@features/moderation';
import { DashboardLayout, ModerationsLayout } from '@layouts';
import React from 'react';

function TriggerCreate() {
  return (
    <Box h="full">
      <CreateTrigger />
    </Box>
  );
}

TriggerCreate.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Create Trigger"
    noPadding
    goBack
    action={
      <>
        <Spacer />
        <ChatSelector />
      </>
    }
  >
    <ModerationsLayout onlyIcons noPadding>
      {page}
    </ModerationsLayout>
  </DashboardLayout>
);
export default TriggerCreate;
