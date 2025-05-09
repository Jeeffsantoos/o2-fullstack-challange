import { Paper, Stack, useTheme, Typography, StackProps } from "@mui/material";
import { ReactNode } from "react";

type MiniCardProps = {
    title: string;
    children: ReactNode;
    maxWidth?: string;
    margin?: number,
    mobileMargin?: number,
    padding?: number,
    mobilePadding?: number,
} & StackProps

const MiniCardLayout = (props: MiniCardProps) => {
    const theme = useTheme();
    return <Stack
        direction={"column"}
        alignItems={"center"}
        m={{ xs: props.mobileMargin ?? 1, md: props.margin ?? 5 }}
        p={{ xs: props.mobilePadding ?? 2, md: props.mobilePadding ?? 0 }}
    >
        <Paper
            variant="elevation"
            elevation={4}
            square
            color="red"
            sx={{
                borderRadius: '10px',
                border: `1px solid ${theme.palette.primary.main}90`,
                width: '80%'
            }}
        >
            <Stack
                p={3}
                alignItems={"center"}
                justifyContent={'center'}
                {...props}
            >
                <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    align="left"
                    mb={3}
                    color={theme.palette.primary.main}
                >
                    {props.title}
                </Typography>
                {props.children}
            </Stack>
        </Paper>
    </Stack>
}

export default MiniCardLayout;
