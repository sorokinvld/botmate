import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';

function Builder() {
	return <div>Builder</div>;
}

Builder.getLayout = (page: React.ReactElement) => (
	<DashboardLayout title='Action Builder'>{page}</DashboardLayout>
);

export default Builder;
