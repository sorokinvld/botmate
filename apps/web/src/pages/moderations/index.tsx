import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import { Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@/layouts/moderations';
import { ChatSelector } from '@/lib/components/moderation';

function Moderations() {
	return <div>Filters</div>;
}

Moderations.getLayout = (page: React.ReactElement) => (
	<DashboardLayout
		title='Moderations'
		noPadding
		action={
			<>
				<Spacer />
				<ChatSelector />
			</>
		}
	>
		<ModerationsLayout>{page}</ModerationsLayout>
	</DashboardLayout>
);

export default Moderations;
