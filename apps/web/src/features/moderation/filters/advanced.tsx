import {
  useFiltersControllerSaveFiltersMutation,
  useFiltersControllerGetFiltersQuery,
} from '@api';
import { Card } from '@atoms';
import { Button, HStack, Spacer, Stack, Switch, Text } from '@chakra-ui/react';
import { useActiveBot, useActiveChat } from '@hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { toast } from 'react-toastify';

type FiltersBlacklistWordsProps = {};
function FiltersAdvanced({}: FiltersBlacklistWordsProps) {
  const form = useForm();
  const activeBot = useActiveBot();
  const activeChat = useActiveChat();

  const [saveFilter, { isLoading: isSaving }] =
    useFiltersControllerSaveFiltersMutation();
  const { data } = useFiltersControllerGetFiltersQuery({
    botId: activeBot?.id,
    chatId: activeChat?.chat_id,
    type: 'advanced',
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
        type: 'advanced',
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
      title="Advanced Filtering"
      description="Remove duplicates, delete forwards etc."
      action={
        <Button isLoading={isSaving} variant="solid" onClick={saveData}>
          Save
        </Button>
      }
    >
      <Stack>
        <HStack>
          <Text>Delete every forwaded message</Text>
          <Spacer />
          <Switch {...form.register('delete_forwarded_message')} />
        </HStack>
        <HStack>
          <Text>Delete duplicate message</Text>
          <Spacer />
          <Switch {...form.register('delete_duplicate_message')} />
        </HStack>
      </Stack>
    </Card>
  );
}

export { FiltersAdvanced };
