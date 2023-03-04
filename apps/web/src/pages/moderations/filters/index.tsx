import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import {
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { ModerationsLayout } from '@/layouts/moderations';
import { ChatSelector } from '@/libs/components/moderation';
import { Card } from '@/libs/ui';

const MessageTypes = [
  {
    label: 'Links',
    exceptionExample: 'www.domain.com',
  },
  {
    label: 'Mentions',
  },
  {
    label: 'Emojis',
  },
  {
    label: 'Files',
    exceptionExample: 'png',
    options: {
      limit_file_size: {
        label: 'Limit file size',
        type: 'checkbox',
      },
    },
  },
];

function Filters() {
  return (
    <SimpleGrid columns={3} spacing={6}>
      <Card title="Message Type" description="Configure what must be filtered">
        <Stack>
          {MessageTypes.map(({ label, exceptionExample }) => (
            <HStack key={label}>
              <Text size="sm">{label}</Text>
              <Spacer />
              <Text
                userSelect="none"
                cursor="pointer"
                fontWeight="semibold"
                _hover={{
                  opacity: 0.8,
                }}
                transition="opacity 0.2s"
              >
                Allow all
              </Text>
            </HStack>
          ))}
        </Stack>
      </Card>
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
    </SimpleGrid>
  );
}

Filters.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Filters"
    noPadding
    action={
      <>
        <Spacer />
        <ChatSelector />
      </>
    }
  >
    <ModerationsLayout>{page}</ModerationsLayout>
  </DashboardLayout>
);

export default Filters;
