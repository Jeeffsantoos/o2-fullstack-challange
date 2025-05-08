import { Box, Stack } from '@mui/material';
import AppbarLayout from './Appbar.layout';
import FooterLayout from './Footer.layout';
import { Outlet } from 'react-router';

const MainLayout = () => {
	return (
		<Box
			minHeight={'100vh'}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Stack width={'100%'}>
				<AppbarLayout>
					<Stack p={{ xs: 2, sm: 2, md: 2 }}>
						<Outlet />
					</Stack>
					<FooterLayout />
				</AppbarLayout>
			</Stack>
		</Box>
	);
};

export default MainLayout;
