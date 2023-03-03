import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';

function Settings() {
	return <div>Settings</div>;
}

Settings.getLayout = (page: React.ReactElement) => (
	<DashboardLayout title='Settings' goBack>
		{page}
	</DashboardLayout>
);

export default Settings;
