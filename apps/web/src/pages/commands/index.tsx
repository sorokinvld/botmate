import React from 'react';
import { DashboardLayout } from '@layouts';
import { IconButton, Spacer } from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import Link from 'next/link';

function Commands() {
  return <div>Commands</div>;
}

Commands.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Commands"
    action={
      <>
        <Spacer />
        <Link href="/commands/create">
          <IconButton
            aria-label="add-command"
            icon={<HiPlus />}
            variant="ghost"
            fontSize={20}
          >
            Create Command
          </IconButton>
        </Link>
      </>
    }
  >
    {page}
  </DashboardLayout>
);

export default Commands;
