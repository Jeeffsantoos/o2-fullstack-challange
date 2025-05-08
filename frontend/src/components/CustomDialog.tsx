import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { type SxProps, type Breakpoint, type Theme, type PaperProps } from '@mui/material';

interface DialogProps {
	paperProps?: Partial<PaperProps> | undefined;
	sx?: SxProps<Theme> | undefined;
	height?: string;
	maxWidth?: Breakpoint;
	title: string | React.ReactNode;
	content: React.ReactNode;
	contentText?: string;
	actions: React.ReactNode;
	open: boolean;
	// maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	fullWidth?: boolean;

	handleClose: () => void;
}

const CustomDialog: React.FC<DialogProps> = (props) => {
	return (
		<Dialog
			PaperProps={props.paperProps ?? { style: { borderRadius: 10, padding: 3} }}
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth={props.maxWidth ?? 'sm'}
			fullWidth={props.fullWidth ?? false}

			transitionDuration={{ enter: 300, exit: 300 }}
		>
			{props.title && (
				<>
					<DialogTitle
						id="alert-dialog-title"
						variant="h5"
						fontWeight={'bold'}
						color={'primary'}
					>
						{props.title}
					</DialogTitle>
				</>
			)}
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{props.contentText}
				</DialogContentText>
				{props.content}
			</DialogContent>
			<Divider />
			<DialogActions sx={{ p: 2 }}>{props.actions}</DialogActions>
		</Dialog>
	);
};

export default CustomDialog;
