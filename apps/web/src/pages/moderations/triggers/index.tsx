import React from 'react';
import { DashboardLayout } from '@layouts';
import { Box, Button, Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import { ChatSelector } from '@features/moderation';
import { AlertCard } from '@components';
import { RiAddLine, RiSearch2Line } from 'react-icons/ri';
import Link from 'next/link';

function Actions() {
  return (
    <Box maxW="6xl" m="auto" h="full">
      <AlertCard
        icon={<RiSearch2Line />}
        title="Not found!"
        description="No triggers found, create one."
        action={
          <Link href="/moderations/triggers/create">
            <Button leftIcon={<RiAddLine />} variant="solid">
              Create Trigger
            </Button>
          </Link>
        }
      />
    </Box>
  );
}

Actions.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Triggers"
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

export default Actions;
