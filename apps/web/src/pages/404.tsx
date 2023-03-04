import { DashboardLayout } from '@/layouts/dashboard';
import React from 'react';

function NotFound() {
  return <div>This page is on vacation. Please try again later.</div>;
}

NotFound.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Error: 404">{page}</DashboardLayout>
);

export default NotFound;
