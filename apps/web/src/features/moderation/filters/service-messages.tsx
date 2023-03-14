import { Card } from '@atoms';
import { Stack, HStack, Spacer, Switch, Text, Button } from '@chakra-ui/react';
import { useFilters } from './hook';

type FilterServiceMessagesProps = {};
function FilterServiceMessages({}: FilterServiceMessagesProps) {
  const { form, isSaving, saveData } = useFilters({
    type: 'service_messages',
  });

  const { new_chat_members, left_chat_member, pinned_message } = form.watch();

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
          <Switch
            isChecked={new_chat_members}
            {...form.register('new_chat_members')}
          />
        </HStack>
        <HStack>
          <Text size="sm">Left members</Text>
          <Spacer />
          <Switch
            isChecked={left_chat_member}
            {...form.register('left_chat_member')}
          />
        </HStack>
        <HStack>
          <Text size="sm">Pinned message</Text>
          <Spacer />
          <Switch
            isChecked={pinned_message}
            {...form.register('pinned_message')}
          />
        </HStack>
      </Stack>
    </Card>
  );
}

export { FilterServiceMessages };
