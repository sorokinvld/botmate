import React from 'react';
import { DashboardLayout } from '@layouts';

function Analytics() {
  return <div>Analytics</div>;
}

Analytics.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Analytics">{page}</DashboardLayout>
);

export default Analytics;
