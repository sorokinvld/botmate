import React from 'react';
import { DashboardLayout } from '@/layouts/dashboard';
import { Spacer } from '@chakra-ui/react';
import { ModerationsLayout } from '@/layouts/moderations';
import { ChatSelector } from '@/lib/components/moderation';

function AntiSpam() {
	return <div>Filters</div>;
}

AntiSpam.getLayout = (page: React.ReactElement) => (
	<DashboardLayout
		title='Anti Spam'
		goBack
		action={
			<>
				<Spacer />
				<ChatSelector />
			</>
		}
	>
		{page}
	</DashboardLayout>
);

export default AntiSpam;
