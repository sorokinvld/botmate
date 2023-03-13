import React, { useEffect } from 'react';
import {
  Command,
  UpdateCommandDto,
  useCommandControllerUpdateCommandMutation,
  useLazyCommandControllerGetCommandByIdQuery,
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
import { CommandEntry } from '@components';
import { DashboardLayout } from '@layouts';
import { useRouter } from 'next/router';
import { HiPlus } from 'react-icons/hi';
import { useActiveBot } from '@hooks';

function CommandEdit() {
  const r = useRouter();
  const commandId = Number(r.query.id);
  const [fetch, { data, isLoading }] =
    useLazyCommandControllerGetCommandByIdQuery();

  const [updateCommand, { isLoading: isUpdating }] =
    useCommandControllerUpdateCommandMutation();

  useEffect(() => {
    if (commandId) {
      fetch({ id: commandId });
    }
  }, [fetch, commandId]);

  if (isLoading) {
    return <Loader text="loading command data..." />;
  }

  return (
    <SimpleGrid
      columns={10}
      h="full"
      overflow={{ base: 'scroll', lg: 'hidden' }}
    >
      <GridItem colSpan={{ base: 10, lg: 7 }} borderRightWidth="1px" p={4}>
        <CommandEntry
          isLoading={isUpdating}
          initialData={data as Command}
          onDone={(data) => {
            const x = data as UpdateCommandDto;

            updateCommand({
              id: commandId,
              updateCommandDto: x,
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
    title="Edit Command"
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
