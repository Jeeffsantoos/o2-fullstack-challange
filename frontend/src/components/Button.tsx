import { Button as MaterialButton, type ButtonProps } from '@mui/material';

type CustomButtonProps = {
	text?: string;
	isLoading?: boolean;
	variant?: 'contained' | 'text' | 'outlined';
} & ButtonProps;

const Button = (props: CustomButtonProps) => {
	const { isLoading = false } = props;
	return (
		<MaterialButton
			loading={isLoading}
			size="large"
			variant={props.variant ?? 'contained'}
			style={{ fontWeight: 'bold', padding: '15px' }}
			sx={{ textTransform: 'none', minWidth: 130, borderRadius: 2 }}
			{...props}
		>
			{props.text}
		</MaterialButton>
	);
};

export default Button;
