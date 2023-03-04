import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import { Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@/layouts/moderations';
import { ChatSelector } from '@/libs/components/moderation';

function Filters() {
  return <div>Filters</div>;
}

Filters.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Filters"
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

export default Filters;
