import React from 'react';
import { DashboardLayout } from '@layouts';
import { Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import { ChatSelector } from '@features/moderation';

function Federation() {
  return <div>Federation</div>;
}

Federation.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Federation"
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

export default Federation;
