import React, { useEffect } from 'react';
import {
  Conversation,
  UpdateConversationDto,
  useConversationsControllerUpdateConversationMutation,
  useLazyConversationsControllerFindConversationQuery,
} from '@api';
import { Loader } from '@atoms';
import {
  Divider,
  GridItem,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { ConversationEntry } from '@components';
import { DashboardLayout } from '@layouts';
import { useRouter } from 'next/router';
import { HiPlus } from 'react-icons/hi';

function CommandEdit() {
  const r = useRouter();
  const cnvId = parseInt(r.query.id as string);

  const [fetch, { data, isLoading }] =
    useLazyConversationsControllerFindConversationQuery();

  const [updateConversation, { isLoading: isUpdating }] =
    useConversationsControllerUpdateConversationMutation();

  useEffect(() => {
    if (cnvId) {
      fetch({ id: cnvId });
    }
  }, [fetch, cnvId]);

  if (isLoading) {
    return <Loader text="loading conversation data..." />;
  }

  return (
    <SimpleGrid
      columns={10}
      h="full"
      overflow={{ base: 'scroll', lg: 'hidden' }}
    >
      <GridItem colSpan={{ base: 10, lg: 7 }} borderRightWidth="1px" p={4}>
        <ConversationEntry
          isLoading={isUpdating}
          initialData={data as Conversation}
          onDone={(data) => {
            const x = data as UpdateConversationDto;
            console.log('x', x);

            updateConversation({
              id: cnvId,
              updateConversationDto: x,
            }).then(() => {});
          }}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 10, lg: 3 }}
        overflow={{ base: 'visible', lg: 'auto' }}
      >
        <HStack p={4}>
          <Heading size="md">Variables</Heading>
          <Spacer />
          <IconButton
            aria-label="add variable"
            variant="ghost"
            fontSize={16}
            icon={<HiPlus />}
          />
        </HStack>
        <Divider />

        <Stack p={4}></Stack>
      </GridItem>
    </SimpleGrid>
  );
}

CommandEdit.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Edit Conversation"
    goBack
    noPadding
    action={
      <>
        <Spacer />
      </>
    }
  >
    {page}
  </DashboardLayout>
);

export default CommandEdit;
