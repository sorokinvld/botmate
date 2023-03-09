import React from 'react';
import { DashboardLayout } from '@layouts';
import { Box, Divider, Spacer, Stack } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import {
  ChatSelector,
  FilterMessageTypes,
  FiltersAdvanced,
  FiltersBlacklistWords,
  FilterServiceMessages,
} from '@features/moderation';

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
  <ModerationsLayout title="Filters">{page}</ModerationsLayout>
);

export default Filters;
