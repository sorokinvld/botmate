import { Card } from '@atoms';
import { Stack, HStack, Spacer, Switch, Text, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type FilterServiceMessagesProps = {};
function FilterServiceMessages({}: FilterServiceMessagesProps) {
  const form = useForm();
  return (
    <Card
      title="Service Messages"
      description="Filter out Telegram messages"
      action={<Button variant="solid">Save</Button>}
    >
      <Stack>
        <HStack>
          <Text size="sm">New members</Text>
          <Spacer />
          <Switch {...form.register('service_message.new_members')} />
        </HStack>
        <HStack>
          <Text size="sm">Left members</Text>
          <Spacer />
          <Switch {...form.register('service_message.left_members')} />
        </HStack>
        <HStack>
          <Text size="sm">Pinned message</Text>
          <Spacer />
          <Switch {...form.register('service_message.pinned_message')} />
        </HStack>
      </Stack>
    </Card>
  );
}

export { FilterServiceMessages };
