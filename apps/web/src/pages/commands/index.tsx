import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';

function Commands() {
	return <div>Commands</div>;
}

Commands.getLayout = (page: React.ReactElement) => (
	<DashboardLayout>{page}</DashboardLayout>
);

export default Commands;
