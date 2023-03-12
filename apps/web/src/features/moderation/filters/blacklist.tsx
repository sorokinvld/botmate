import {
  useFiltersControllerSaveFiltersMutation,
  useFiltersControllerGetFiltersQuery,
} from '@api';
import { Card } from '@atoms';
import {
  Button,
  HStack,
  Input,
  Spacer,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useActiveBot, useActiveChat } from '@hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { toast } from 'react-toastify';

type FiltersBlacklistWordsProps = {};
function FiltersBlacklistWords({}: FiltersBlacklistWordsProps) {
  const form = useForm();
  const activeBot = useActiveBot();
  const activeChat = useActiveChat();

  const [saveFilter, { isLoading: isSaving }] =
    useFiltersControllerSaveFiltersMutation();
  const { data } = useFiltersControllerGetFiltersQuery({
    botId: activeBot?.id,
    chatId: activeChat?.chat_id,
    type: 'words',
  });

  useEffect(() => {
    if (data) {
      form.reset(data.value);
    }
  }, [data]);

  const values = form.watch();

  const saveData = () => {
    const data = form.getValues();

    saveFilter({
      botId: activeBot?.id,
      chatId: activeChat?.chat_id,
      saveFilterDto: {
        type: 'words',
        value: data,
      },
    }).then(() => {
      toast.success('Filter saved', {
        icon: <HiCheck />,
        progressStyle: {
          backgroundColor: '#49b793',
        },
      });
    });
  };

  return (
    <Card
      title="Blacklist Words"
      description="Filter out messages containing specific words"
      action={
        <Button isLoading={isSaving} variant="solid" onClick={saveData}>
          Save
        </Button>
      }
    >
      <Stack spacing={4}>
        <HStack>
          <Text size="sm">Warn user on violation</Text>
          <Spacer />
          <Switch {...form.register('warn_user')} />
        </HStack>

        <Input
          placeholder="Add words, comma seperated."
          {...form.register('words')}
        />
      </Stack>
    </Card>
  );
}

export { FiltersBlacklistWords };
