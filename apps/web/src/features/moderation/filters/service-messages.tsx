import {
  useFiltersControllerGetFiltersQuery,
  useFiltersControllerSaveFiltersMutation,
} from '@api';
import { Card } from '@atoms';
import { Stack, HStack, Spacer, Switch, Text, Button } from '@chakra-ui/react';
import { useActiveBot, useActiveChat } from '@hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { toast } from 'react-toastify';

type FilterServiceMessagesProps = {};
function FilterServiceMessages({}: FilterServiceMessagesProps) {
  const form = useForm();
  const activeBot = useActiveBot();
  const activeChat = useActiveChat();

  const [saveFilter, { isLoading: isSaving }] =
    useFiltersControllerSaveFiltersMutation();
  const { data } = useFiltersControllerGetFiltersQuery({
    botId: activeBot?.id,
    chatId: activeChat?.chat_id,
    type: 'service_messages',
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
        type: 'service_messages',
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
      title="Service Messages"
      description="Filter out Telegram messages"
      action={
        <Button isLoading={isSaving} variant="solid" onClick={saveData}>
          Save
        </Button>
      }
    >
      <Stack>
        <HStack>
          <Text size="sm">New members</Text>
          <Spacer />
          <Switch {...form.register('new_chat_members')} />
        </HStack>
        <HStack>
          <Text size="sm">Left members</Text>
          <Spacer />
          <Switch {...form.register('left_chat_member')} />
        </HStack>
        <HStack>
          <Text size="sm">Pinned message</Text>
          <Spacer />
          <Switch {...form.register('pinned_message')} />
        </HStack>
      </Stack>
    </Card>
  );
}

export { FilterServiceMessages };
