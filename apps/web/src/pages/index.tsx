import { Box, SimpleGrid } from '@chakra-ui/react';
import { RadioButton, Stats } from '@/libs/ui';
import { FcDeleteDatabase, FcLineChart, FcOk, FcSms } from 'react-icons/fc';
import { DashboardLayout } from '@/layouts/dashboard';

function Home() {
  return (
    <>
      <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={4}>
        <Stats
          title="Bot Status"
          value={'OK'}
          icon={<FcOk />}
          label="Bot is functional"
          index={1}
        />
        <Stats
          title="Messages"
          value={'34,555'}
          icon={<FcSms />}
          label="Last 24 hours"
          index={2}
        />
        <Stats
          title="Users Activity"
          value={'340'}
          icon={<FcLineChart />}
          label="Last 30 days"
          index={3}
        />
        <Stats
          title="Errors Reported"
          value={'340'}
          icon={<FcDeleteDatabase />}
          label="Last 7 days"
          index={4}
        />
      </SimpleGrid>
    </>
  );
}

Home.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Dashboard"
    action={
      <Box>
        <RadioButton options={['Start', 'Stop']} />
      </Box>
    }
  >
    {page}
  </DashboardLayout>
);

export default Home;
