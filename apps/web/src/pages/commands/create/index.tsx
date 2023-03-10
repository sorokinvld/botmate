import React from 'react';
import { DashboardLayout } from '@layouts';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
  Command,
  CreateCommandDto,
  useCommandControllerCreateCommandMutation,
} from '@api';
import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';
import { useActiveBot } from '@hooks';
import { CommandEntry } from '@components';
import { useRouter } from 'next/router';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false },
);

function CommandsCreate() {
  const activeBot = useActiveBot();
  const toast = useToast();
  const r = useRouter();
  const form = useForm<CreateCommandDto>({
    defaultValues: {
      script: `Bot.reply("Hello, world!");`,
    },
  });
  const [createCommand, { isLoading }] =
    useCommandControllerCreateCommandMutation();

  const handleSubmit = async (data: CreateCommandDto) => {
    try {
      const response = (await createCommand({
        createCommandDto: {
          ...data,
          bot: activeBot.id,
        },
      }).unwrap()) as Command;
      toast({
        title: 'Command created',
        description: `Command ${response.name} created successfully`,
        status: 'success',
      });

      r.push('/commands');
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <Box h="full">
      <SimpleGrid columns={10} h="full">
        <GridItem colSpan={{ base: 10, lg: 7 }} borderRightWidth="1px" p={4}>
          <CommandEntry
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
