import React from 'react';
import { ModerationsLayout } from '@layouts';

function Roles() {
  return <div>Filters</div>;
}

Roles.getLayout = (page: React.ReactElement) => (
  <ModerationsLayout title="Roles">{page}</ModerationsLayout>
);

export default Roles;
