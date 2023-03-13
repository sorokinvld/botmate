import React from 'react';
import { DashboardLayout } from '@layouts';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Kbd,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { HiPlus, HiTrash } from 'react-icons/hi';
import Link from 'next/link';
import { useCommandControllerGetCommandsQuery } from '@api';
import { useActiveBot } from '@hooks';

function Commands() {
  const activeBot = useActiveBot();
  const { data } = useCommandControllerGetCommandsQuery({
    botId: activeBot.id,
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6}>
      {data?.map(({ id, name, command, createdAt }) => (
        <Box key={id} p={4} borderWidth="1px" rounded="lg">
          <HStack>
            <Heading size="md">{name}</Heading>
            <Spacer />
            <Kbd opacity={0.8} mt={2}>
              {command}
            </Kbd>
          </HStack>
          <Text fontSize={12} opacity={0.8} mt={2}>
            Last updated 4 minutes ago
          </Text>

          <ButtonGroup mt={4} size="sm">
            <Link href={`/commands/edit/${id}`}>
              <Button variant="solid">edit</Button>
            </Link>
            <Button leftIcon={<HiTrash />}>delete</Button>
          </ButtonGroup>
        </Box>
      ))}
    </SimpleGrid>
  );
}

Commands.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Commands"
    action={
      <>
        <Spacer />
        <Link href="/commands/create">
          <IconButton
            aria-label="add-command"
            icon={<HiPlus />}
            variant="ghost"
            fontSize={20}
          >
            Create Command
          </IconButton>
        </Link>
      </>
    }
  >
    {page}
  </DashboardLayout>
);

export default Commands;
