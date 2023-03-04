import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import { RadioButton } from '@/libs/ui';

function Marketplace() {
  return <div>Marketplace</div>;
}

Marketplace.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    title="Marketplace"
    action={<RadioButton options={['All', 'Free', 'Paid']} />}
  >
    {page}
  </DashboardLayout>
);

export default Marketplace;
