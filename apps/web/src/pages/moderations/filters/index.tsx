import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import { Box, Divider, Spacer, Stack } from '@chakra-ui/react';
import { ModerationsLayout } from '@/layouts/moderations';
import {
  ChatSelector,
  FilterMessageTypes,
  FiltersAdvanced,
  FiltersBlacklistWords,
  FilterServiceMessages,
} from '@/libs/components/moderation';

function Filters() {
  return (
    <Box maxW="6xl" m="auto">
      <Stack spacing={6}>
        <FilterMessageTypes />
        <Divider />
        <FilterServiceMessages />
        <Divider />
        <FiltersBlacklistWords />
        <Divider />
        <FiltersAdvanced />
      </Stack>
    </Box>
  );
}

Filters.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Filters"
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

export default Filters;
