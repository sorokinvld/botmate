import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';

function Moderations() {
	return <div>Moderations</div>;
}

Moderations.getLayout = (page: React.ReactElement) => (
	<DashboardLayout title='Moderations'>{page}</DashboardLayout>
);

export default Moderations;
