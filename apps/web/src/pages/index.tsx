import { Heading } from '@chakra-ui/react';
import { DashboardLayout } from '../layouts/dashboard';

function Home() {
	return <>hello</>;
}

Home.getLayout = (page: React.ReactElement) => (
	<DashboardLayout title='Dashboard'>{page}</DashboardLayout>
);

export default Home;
