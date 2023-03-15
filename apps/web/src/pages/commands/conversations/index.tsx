import { useConversationsControllerFindConversationsQuery } from '@api';
import {
  Spacer,
  IconButton,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useActiveBot } from '@hooks';
import { DashboardLayout } from '@layouts';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi';

function Conversations() {
  const activeBot = useActiveBot();
  const { data } = useConversationsControllerFindConversationsQuery({
    botId: activeBot.id,
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6}>
      {data?.map(({ id, name, updatedAt }) => (
        <Box key={id} p={4} borderWidth="1px" rounded="lg">
          <HStack>
            <Heading size="md">{name}</Heading>
            <Spacer />
          </HStack>
          <Text fontSize={12} opacity={0.8} mt={2}>
            Last updated {moment(updatedAt).fromNow()}
          </Text>

          <ButtonGroup mt={4} size="sm">
            <Link href={`/commands/conversations/edit/${id}`}>
              <Button variant="solid">Edit</Button>
            </Link>
            <Button leftIcon={<HiTrash />}>Delete</Button>
          </ButtonGroup>
        </Box>
      ))}
    </SimpleGrid>
  );
}

Conversations.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Conversations"
    goBack
    action={
      <>
        <Spacer />
        <Link href="/commands/conversations/create">
          <IconButton
            aria-label="add-conversation"
            icon={<HiPlus />}
            variant="ghost"
            fontSize={20}
          />
        </Link>
      </>
    }
  >
    {page}
  </DashboardLayout>
);

export default Conversations;
