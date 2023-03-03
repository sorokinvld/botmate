import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';

function Notifications() {
	return <div>Notifications</div>;
}

Notifications.getLayout = (page: React.ReactElement) => (
	<DashboardLayout title='Notifications'>{page}</DashboardLayout>
);

export default Notifications;
