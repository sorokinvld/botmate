import React from 'react';
import { DashboardLayout } from '@layouts';
import { Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import { ChatSelector } from '@features/moderation';

function AntiSpam() {
  return <div>Filters</div>;
}

AntiSpam.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Anti-spam"
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

export default AntiSpam;
