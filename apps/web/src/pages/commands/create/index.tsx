import { DashboardLayout } from '@/layouts/dashboard';
import { Button, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { MdSave } from 'react-icons/md';

function CommandsCreate() {
	return <div>CommandsCreate</div>;
}

CommandsCreate.getLayout = (page: React.ReactElement) => (
	<DashboardLayout
		goBack
		title='Create Command'
		action={
			<>
				{/* <ButtonGroup gap={0}>
					<Button leftIcon={<MdSave />}>Save</Button>
					<Button variant='outline'>Cancel</Button>
				</ButtonGroup> */}
			</>
		}
	>
		{page}
	</DashboardLayout>
);

export default CommandsCreate;
