import React from 'react';
import { DashboardLayout } from '@layouts';
import { Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@layouts';
import { ChatSelector } from '@features/moderation';

function Announcement() {
  return <div>Announcement</div>;
}

Announcement.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Announcement"
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

export default Announcement;
