import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import { IconButton, Spacer } from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';

function Commands() {
	return <div>Commands</div>;
}

Commands.getLayout = (page: React.ReactElement) => (
	<DashboardLayout
		title='Commands'
		action={
			<>
				<Spacer />
				<IconButton aria-label='add-command' icon={<HiPlus />}>
					Create Command
				</IconButton>
			</>
		}
	>
		{page}
	</DashboardLayout>
);

export default Commands;
