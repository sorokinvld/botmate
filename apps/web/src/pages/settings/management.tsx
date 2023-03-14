import React, { useRef } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { DashboardLayout } from '@layouts';
import { SettingsLayout } from '@layouts';
import { SettingsOption } from '@atoms';
import {
  useBotControllerDeleteBotMutation,
  useBotControllerUpdateBotMutation,
} from '@api';
import { useActiveBot } from '@hooks';

function Management() {
  const activeBot = useActiveBot();
  const tokenRef = useRef<HTMLInputElement>(null);
  const [updateBot] = useBotControllerUpdateBotMutation();
  const [deleteBot] = useBotControllerDeleteBotMutation();

  return (
    <Stack spacing={6}>
      <Box>
        <SettingsOption
          label="Bot Token"
          description="Update existing bot token. For new bot, delete this one and create a new one."
        />
        <HStack mt={4} w="lg">
          <Input placeholder="Enter bot token" ref={tokenRef} />
          <Button
            size="md"
            variant="solid"
            onClick={() => {
              updateBot({
                id: activeBot.id,
                updateBotDto: {
                  token: tokenRef.current?.value,
                },
              });
            }}
          >
            Save
          </Button>
        </HStack>
      </Box>

      <Divider />

      <Box>
        <Button
          colorScheme="red"
          variant="danger"
          onClick={() => {
            const conf = confirm('Are you sure you want to delete this bot?');
            if (conf) {
              deleteBot({
                id: activeBot.id,
              }).then(() => {
                window.location.href = '/';
              });
            }
          }}
        >
          Delete bot
        </Button>
      </Box>
    </Stack>
  );
}

Management.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Management" noPadding noOverflow>
    <SettingsLayout>{page}</SettingsLayout>
  </DashboardLayout>
);

export default Management;
