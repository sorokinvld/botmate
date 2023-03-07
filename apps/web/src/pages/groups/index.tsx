import React from 'react';
import { DashboardLayout } from '@layouts';

function Groups() {
  return <div>Groups</div>;
}

Groups.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Groups">{page}</DashboardLayout>
);

export default Groups;
