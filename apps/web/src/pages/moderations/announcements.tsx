import React from 'react';
import { DashboardLayout } from '@layouts';
import { Box, GridItem, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import { ChatSelector, CreateAnnouncement } from '@features/moderation';
import { AlertCard } from '@components';
import { FiSmile } from 'react-icons/fi';

function Annoucements() {
  return (
    <Box h="full">
      <SimpleGrid columns={10} h="full">
        <GridItem colSpan={{ base: 10, lg: 6 }} borderRightWidth="1px" p={4}>
          <CreateAnnouncement />
        </GridItem>
        <GridItem colSpan={{ base: 10, lg: 4 }} p={4}>
          <Heading size="md">Scheduled announcement</Heading>
          <AlertCard
            icon={<FiSmile />}
            title="Coming soon"
            description="Stay tuned for this feature!"
          />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

Annoucements.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Annoucements"
    noPadding
    action={
      <>
        <Spacer />
        <ChatSelector />
      </>
    }
  >
    <ModerationsLayout noPadding>{page}</ModerationsLayout>
  </DashboardLayout>
);

export default Annoucements;
