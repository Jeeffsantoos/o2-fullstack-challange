import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import WarningIcon from '@mui/icons-material/Warning';
import { isRouteErrorResponse, useRouteError } from 'react-router';

const ErrorPage = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<Box bgcolor={'#EEF2F6'} height={'100vh'}>
				<Stack direction="column" justifyContent="center" alignItems="center" gap={4}>
					<Box>
						<Typography
							variant="h4"
							fontWeight={'bold'}
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							Oops!
						</Typography>
						<Typography
							variant="h5"
							fontWeight={'bold'}
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							Ocorreu um erro!
						</Typography>
						<Typography
							variant="h6"
							fontWeight={'bold'}
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							<WarningIcon color="warning" /> Error {error.status}
						</Typography>
						<Typography
							variant="h6"
							fontWeight={'bold'}
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							{error.statusText}
						</Typography>
						{error.data?.message && <p>{error.data.message}</p>}
					</Box>
				</Stack>
			</Box>
		);
	}
	return (
		<Box bgcolor={'#EEF2F6'} height={'100vh'}>
			<Box>
				<Stack direction="column" justifyContent="center" alignItems="center" gap={4}>
					<h1>Oops</h1>
					<h3>An error ocurred!</h3>
				</Stack>
			</Box>
		</Box>
	);
};

export default ErrorPage;
