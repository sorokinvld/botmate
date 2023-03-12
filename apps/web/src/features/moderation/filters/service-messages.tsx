import { Card } from '@atoms';
import { Stack, HStack, Spacer, Switch, Text, Button } from '@chakra-ui/react';
import { useFilters } from './hook';

type FilterServiceMessagesProps = {};
function FilterServiceMessages({}: FilterServiceMessagesProps) {
  const { form, isSaving, saveData } = useFilters({
    type: 'service_messages',
  });

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
