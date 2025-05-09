import { TextField, TextFieldProps } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

type InputFieldProps = {
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	readOnly?: boolean;
} & TextFieldProps;

const InputField = (props: InputFieldProps) => {
	const { readOnly = false, startIcon, endIcon, ...rest } = props;

	return (
		<TextField
			color="primary"
			fullWidth
			slotProps={{
				inputLabel: {
					shrink: true,
				},
				input: {
					readOnly,
					startAdornment: startIcon ? (
						<InputAdornment position="start">{startIcon}</InputAdornment>
					) : undefined,
					endAdornment: endIcon ? (
						<InputAdornment position="end">{endIcon}</InputAdornment>
					) : undefined,
					sx: { borderRadius: 1 },
				},
			}}
			{...rest}
		/>
	);
};

export default InputField;
