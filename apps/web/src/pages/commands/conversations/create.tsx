import {
  Conversation,
  useConversationsControllerCreateConversationMutation,
} from '@api';
import { Spacer, Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import { ConversationEntry } from '@components';
import { useActiveBot } from '@hooks';
import { DashboardLayout } from '@layouts';
import { useRouter } from 'next/router';
import React from 'react';

function CreateConversation() {
  const activeBot = useActiveBot();
  const [createConversation, { isLoading }] =
    useConversationsControllerCreateConversationMutation();
  const r = useRouter();

  return (
    <Box h="full">
      <SimpleGrid columns={10} h="full">
        <GridItem colSpan={{ base: 10, lg: 7 }} borderRightWidth="1px" p={4}>
          <ConversationEntry
            isLoading={isLoading}
            onDone={(cnv) => {
              if (cnv.name && cnv.script)
                createConversation({
                  botId: activeBot.id,
                  createConversationDto: {
                    name: cnv.name,
                    script: cnv.script,
                  },
                }).then((res: any) => {
                  const data = res.data as Conversation;
                  r.push(`/commands/conversations/edit/${data.id}`);
                });
            }}
          />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

CreateConversation.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Create Conversation"
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

export default CreateConversation;
