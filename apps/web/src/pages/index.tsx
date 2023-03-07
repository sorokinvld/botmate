import { Box, SimpleGrid } from '@chakra-ui/react';
import { RadioButton, Stats } from '@atoms';
import {
  HiPlay,
  HiStop,
  HiDatabase,
  HiChartBar,
  HiCheck,
  HiChatAlt2,
} from 'react-icons/hi';
import { DashboardLayout } from '@layouts';
import {
  useBotControllerStartBotMutation,
  useBotControllerStopBotMutation,
} from '@api';
import { useActiveBot } from '@hooks';

function Home() {
  const activeBot = useActiveBot();

  return (
    <>
      <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={4}>
        <Stats
          title="Bot Status"
          value={activeBot.status === 'active' ? 'Active' : 'Inactive'}
          icon={activeBot.status === 'active' ? <HiCheck /> : <HiStop />}
          label={
            activeBot.status === 'active'
              ? 'Bot is running and functional'
              : 'Bot is not running'
          }
          index={1}
        />
        <Stats
          title="Messages"
          value={'34,555'}
          icon={<HiChatAlt2 />}
          label="Last 24 hours"
          index={2}
        />
        <Stats
          title="Users Activity"
          value={'340'}
          icon={<HiChartBar />}
          label="Last 30 days"
          index={3}
        />
        <Stats
          title="Errors Reported"
          value={'340'}
          icon={<HiDatabase />}
          label="Last 7 days"
          index={4}
        />
      </SimpleGrid>
    </>
  );
}

const BotStatus = () => {
  const [startBot, { isLoading: startLoading }] =
    useBotControllerStartBotMutation();
  const [stopBot, { isLoading: stopLoading }] =
    useBotControllerStopBotMutation();

  const { id, status } = useActiveBot();

  return (
    <Box>
      <RadioButton
        isLoading={startLoading || stopLoading}
        activeIndex={status === 'active' ? 0 : 1}
        options={[
          {
            label: 'Start',
            value: 'start',
          },
          {
            label: 'Stop',
            value: 'stop',
          },
        ]}
        onChange={(val) => {
          if (val === 'start') {
            startBot({ id });
          } else {
            stopBot({ id });
          }
        }}
      />
    </Box>
  );
};

Home.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Dashboard" action={<BotStatus />}>
    {page}
  </DashboardLayout>
);

export default Home;
