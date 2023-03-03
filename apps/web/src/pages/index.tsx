import { Box, Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { RadioButton } from 'ui';
import { DashboardLayout } from '../layouts/dashboard';

function Home() {
	return <>Home</>;
}

Home.getLayout = (page: React.ReactElement) => (
	<DashboardLayout
		title='Dashboard'
		action={
			<Box>
				<RadioButton options={['All', 'Bots', 'Channels']} />
			</Box>
		}
	>
		{page}
	</DashboardLayout>
);

export default Home;
