import React from 'react';
import { DashboardLayout } from '@layouts';
import { Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import { ChatSelector } from '@features/moderation';

function Actions() {
  return <div>Actions</div>;
}

Actions.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Actions"
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
