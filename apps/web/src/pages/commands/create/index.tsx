import React from 'react';
import { DashboardLayout } from '@layouts';
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';

function CommandsCreate() {
  return (
    <Box h="full">
      <SimpleGrid columns={10} h="full">
        <GridItem colSpan={{ base: 10, lg: 7 }} borderRightWidth="1px" p={4}>
          <Box>1</Box>
        </GridItem>
        <GridItem colSpan={{ base: 10, lg: 3 }} p={4}>
          1
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

CommandsCreate.getLayout = (page: React.ReactElement) => (
  <DashboardLayout goBack noPadding title="Create Command">
    {page}
  </DashboardLayout>
);

export default CommandsCreate;
