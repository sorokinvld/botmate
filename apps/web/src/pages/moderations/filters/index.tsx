import React, { useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { useActiveBot, useActiveChat } from '@hooks';

function Filters() {
  const form = useForm();
  const values = form.watch();
  const activeBot = useActiveBot();
  const activeChat = useActiveChat();

  useEffect(() => {
    console.log('updating...');
    // saveModeration({
    //   saveModDto: {
    //     botId: activeBot.id,
    //     chatId: activeChat.id,
    //     type: 'filters',
    //     value: values,
    //   },
    // });
  }, [values]);

  return (
    <Box maxW="6xl" m="auto">
      <Stack spacing={6}>
        <FilterMessageTypes />
        <Divider />
        <FilterServiceMessages form={form} />
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
