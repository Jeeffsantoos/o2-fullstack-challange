import {
	AppBar,
	Toolbar,
	IconButton,
	Stack,
	Drawer,
	List,
	Box,
	Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router';
import logoO2 from '/logo-o2.png';
import React from 'react';
import { ListItemAppBar } from './ListItemAppBar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CreateSaleDialog from '../../pages/Sales/Dialogs/CreateSaleDialog';
type AppBarProps = {
	children: React.ReactNode;
};

const AppbarLayout = (props: AppBarProps) => {
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);

	const drawerWidth = 260;

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const handleNavigate = (url: string) => {
		handleDrawerClose();
		navigate(url);
	};

	const drawer = (
		<Stack display={'flex'} direction={'column'} alignItems={'center'} height={'100%'}>
			<Toolbar>
				<Typography variant="h6" py={3}>
					o2 Challange
				</Typography>
			</Toolbar>

			<Stack flexGrow={1}>
				<List>
					<ListItemAppBar
						action={() => handleNavigate('/')}
						icon={<DashboardIcon color="primary" />}
						text="Dashboard"
					/>
					<ListItemAppBar
						action={() => handleNavigate('/stocks')}
						icon={<Inventory2Icon color="primary" />}
						text="Estoque"
					/>
					<ListItemAppBar
						action={() => setDialogOpen(true)}
						icon={<MonetizationOnIcon color="primary" />}
						text="Realizar Venda"
					/>
				</List>
			</Stack>
		</Stack>
	);

	return (
		<Box display={'flex'} flexDirection={'column'} height={'100vh'}>
			<AppBar
				color="transparent"
				position="relative"
				sx={{
					boxShadow: 'none',
					width: { lg: `calc(100% - ${drawerWidth}px)` },
					ml: { lg: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<Stack
						gap={1}
						direction={'row'}
						flex={1}
						justifyContent={'space-between'}
						paddingX={{ xs: 1, lg: 3 }}
						paddingY={{ xs: 2.5, lg: 3 }}
					>
						<Stack display={{ xs: 'flex', lg: 'none' }}>
							<IconButton
								size="large"
								edge="end"
								onClick={handleDrawerToggle}
							>
								<MenuIcon style={{ color: '#181d19', fontSize: 40 }} />
							</IconButton>
						</Stack>
						<Stack
							gap={1}
							onClick={() => navigate('/')}
							direction={'row'}
							sx={{ cursor: 'pointer' }}
						>
							<img src={logoO2} alt="logo-o2" height={70} />
						</Stack>
						<Stack
							display={{ xs: 'none', lg: 'flex' }}
							justifyContent={'center'}
							alignItems={'center'}
							gap={3}
						>
						</Stack>
					</Stack>
				</Toolbar>
			</AppBar>
			<Box component={'nav'} sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}>
				<Drawer
					open={mobileOpen}
					variant="temporary"
					onClose={handleDrawerClose}
					onTransitionEnd={handleDrawerTransitionEnd}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
							bgcolor: '#181d19',
							color: 'white',
							fontWeight: 'bold',
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
						bgcolor: 'black',
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
							bgcolor: '#181d19',
							color: 'white',
							fontWeight: 'bold',
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				sx={{ flexGrow: 1, width: { lg: `calc(100% - ${drawerWidth}px)` } }}
				component="main"
				marginLeft={{ lg: `${drawerWidth}px` }}
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'space-between'}
			>
				{props.children}
			</Box>
      <CreateSaleDialog dialogOpen={dialogOpen} handleDialog={setDialogOpen}></CreateSaleDialog>
		</Box>
	);
};

export default AppbarLayout;
