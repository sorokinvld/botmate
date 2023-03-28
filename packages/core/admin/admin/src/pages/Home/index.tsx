import Chart from 'react-apexcharts';
import { TbCheck, TbPlayerPlay } from 'react-icons/tb';
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

function HomePage() {
  return (
    <Box flex={1}>
      <AppHeader
        title="Dashboard"
        subtitle="Welcome back, Monawwar!"
        actions={
          <>
            <Spacer />
            <ButtonGroup>
              <Button variant="success" leftIcon={<TbPlayerPlay />}>
                Start
              </Button>
            </ButtonGroup>
          </>
        }
      />

      <Container maxW="full" py={4}>
        <SimpleGrid spacing={4} columns={{ base: 1, lg: 2, xl: 3 }} mt={2}>
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
