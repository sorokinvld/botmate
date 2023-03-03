import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';

function Channels() {
	return <div>Channels</div>;
}

Channels.getLayout = (page: React.ReactElement) => (
	<DashboardLayout title='Channels'>{page}</DashboardLayout>
);

export default Channels;
