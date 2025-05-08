import { IconButton, Tooltip, Zoom } from "@mui/material";
import { ReactNode } from "react";

interface IconButtonProps {
    icon?: ReactNode,
    textColor?: string,
    bgColor?: string,
    disabled?: boolean,
    hoverBgColor?: string,
    borderColor?: string,
    tooltipText?: string,
    padding?: number;
    onClick?: () => void,
}

const IconElementButton: React.FC<IconButtonProps> = (props) => {
    return (
        <Tooltip title={props.tooltipText} arrow TransitionComponent={Zoom}>
            <IconButton
                disabled={props.disabled ?? false}
                onClick={props.onClick}
                sx={{
                    color: props.textColor,
                    backgroundColor: props.bgColor,
                    '&:hover': {
                        backgroundColor: props.hoverBgColor,
                        borderColor: props.borderColor,
                        boxShadow: 'none',
                    },
                }}
            >
                {props.icon}
            </IconButton>
        </Tooltip>
    )
}

export default IconElementButton;