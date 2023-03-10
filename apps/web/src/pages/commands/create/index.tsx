import React from 'react';
import { DashboardLayout } from '@layouts';
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import {
  CreateCommandDto,
  useCommandControllerCreateCommandMutation,
} from '@api';
import '@uiw/react-textarea-code-editor/dist.css';
import { useActiveBot } from '@hooks';
import { CommandEntry } from '@components';
import { useRouter } from 'next/router';

function CommandsCreate() {
  const activeBot = useActiveBot();
  const r = useRouter();
  const [createCommand, { isLoading }] =
    useCommandControllerCreateCommandMutation();

  const handleSubmit = async (data: CreateCommandDto) => {
    try {
      await createCommand({
        createCommandDto: {
          ...data,
          bot: activeBot.id,
        },
      }).unwrap();
      r.push('/commands');
    } catch (e) {}
  };

  return (
    <Box h="full">
      <SimpleGrid columns={10} h="full">
        <GridItem colSpan={{ base: 10, lg: 7 }} borderRightWidth="1px" p={4}>
          <CommandEntry
            isLoading={isLoading}
            onDone={(data) => {
              handleSubmit(data as CreateCommandDto);
            }}
          />
        </GridItem>
        <GridItem colSpan={{ base: 10, lg: 3 }} p={4}></GridItem>
      </SimpleGrid>
    </Box>
  );
}

CommandsCreate.getLayout = (page: React.ReactElement) => (
  <DashboardLayout goBack noPadding title="Create Command">
    {page}
  </DashboardLayout>
);

export default CommandsCreate;
