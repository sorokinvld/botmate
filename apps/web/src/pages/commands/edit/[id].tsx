import React, { useEffect } from 'react';
import {
  Command,
  UpdateCommandDto,
  useCommandControllerUpdateCommandMutation,
  useLazyCommandControllerGetCommandByIdQuery,
} from '@api';
import { Loader } from '@atoms';
import { GridItem, SimpleGrid, Spacer } from '@chakra-ui/react';
import { CommandEntry } from '@components';
import { DashboardLayout } from '@layouts';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function CommandEdit() {
  const r = useRouter();
  const commandId = Number(r.query.id);
  const [fetch, { data, isLoading }] =
    useLazyCommandControllerGetCommandByIdQuery();

  const [updateCommand, { isLoading: isUpdating }] =
    useCommandControllerUpdateCommandMutation();

  useEffect(() => {
    if (commandId) {
      console.log('fetching command....');
      fetch({ id: commandId });
    }
  }, [fetch, commandId]);

  if (isLoading) {
    return <Loader text="loading command data..." />;
  }

  return (
    <SimpleGrid columns={10} h="full">
      <GridItem colSpan={{ base: 10, lg: 7 }} borderRightWidth="1px" p={4}>
        <CommandEntry
          isLoading={isUpdating}
          initialData={data as Command}
          onDone={(data) => {
            const x = data as UpdateCommandDto;

            updateCommand({
              id: commandId,
              updateCommandDto: x,
            }).then(() => {
              toast.success('Command updated');
            });
          }}
        />
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
