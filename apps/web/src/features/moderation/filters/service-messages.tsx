import { Card } from '@atoms';
import { Stack, HStack, Spacer, Switch, Text } from '@chakra-ui/react';

type FilterServiceMessagesProps = {};
function FilterServiceMessages({}: FilterServiceMessagesProps) {
  return (
    <Card title="Service Messages" description="Filter out Telegram messages">
      <Stack>
        <HStack>
          <Text size="sm">New members</Text>
          <Spacer />
          <Switch />
        </HStack>
        <HStack>
          <Text size="sm">Left members</Text>
          <Spacer />
          <Switch />
        </HStack>
        <HStack>
          <Text size="sm">Pinned message</Text>
          <Spacer />
          <Switch />
        </HStack>
      </Stack>
    </Card>
  );
}

export { FilterServiceMessages };
