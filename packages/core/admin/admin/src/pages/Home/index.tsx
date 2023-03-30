import Chart from 'react-apexcharts';
import { TbCheck, TbPlayerPause, TbPlayerPlay } from 'react-icons/tb';
import {
  AppHeader,
  Box,
  Button,
  ButtonGroup,
  Container,
  SimpleGrid,
  Spacer,
  StatsCard,
} from '@botmate/ui';
import { useBots, useService } from '@botmate/helper-plugin';
import { useState } from 'react';

function HomePage() {
  const { activeBot } = useBots();
  const botsService = useService('bots');
  const [status, setStatus] = useState(activeBot.status);

  return (
    <Box flex={1}>
      <AppHeader
        title="Dashboard"
        subtitle="Welcome back, Monawwar!"
        actions={
          <>
            <Spacer />
            <ButtonGroup>
              <Button
                variant={status === 'active' ? 'danger' : 'success'}
                leftIcon={
                  status === 'active' ? <TbPlayerPause size={16} /> : <TbPlayerPlay size={16} />
                }
                onClick={() => {
                  if (status === 'active') {
                    botsService.runService('bot.stop', { botId: activeBot._id }).then(() => {
                      setStatus('inactive');
                    });
                  } else
                    botsService.runService('bot.start', { botId: activeBot._id }).then(() => {
                      setStatus('active');
                    });
                }}
              >
                {status === 'active' ? 'Stop' : 'Start'}
              </Button>
            </ButtonGroup>
          </>
        }
      />

      <Container maxW="full" p={4}>
        <SimpleGrid spacing={4} columns={{ base: 1, lg: 2, xl: 3 }}>
          <StatsCard
            title="Status"
            value={'OK'}
            color="brand"
            desc="Up since 2 days"
            icon={<TbCheck size={66} />}
          />

          <StatsCard
            title="CPU Usage"
            value={'4.5%'}
            color="brand"
            desc="Last 24 hours"
            icon={
              <Chart
                width="150px"
                options={{
                  chart: {
                    animations: {
                      enabled: false,
                    },
                    sparkline: {
                      enabled: true,
                    },
                  },
                  tooltip: {
                    enabled: false,
                  },
                  colors: ['#7888f4'],
                }}
                series={[
                  {
                    name: 'users',
                    data: [55, 54, 56, 50, 54, 66],
                  },
                ]}
                type="area"
              />
            }
          />

          <StatsCard
            title="Messages"
            value={'+456'}
            color="brand"
            desc="Last 24 hours"
            icon={
              <Chart
                width="150px"
                options={{
                  chart: {
                    animations: {
                      enabled: false,
                    },
                    sparkline: {
                      enabled: true,
                    },
                  },
                  tooltip: {
                    enabled: false,
                  },
                  colors: ['#78d3f4'],
                }}
                series={[
                  {
                    name: 'users',
                    data: [35, 24, 36, 30, 40, 45],
                  },
                ]}
                type="area"
              />
            }
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default HomePage;
