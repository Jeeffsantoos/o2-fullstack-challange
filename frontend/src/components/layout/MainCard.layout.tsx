
import { Stack, StackProps, Typography, useTheme } from "@mui/material";

type MainCardType = {
    title?: string;
    margin?: number,
    mobileMargin?: number,
    padding?: number,
    mobilePadding?: number,
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    gap?: number,
    returnButton?: boolean,
} & StackProps

const MainCardLayout = (props: MainCardType) => {
    const theme = useTheme();
    return <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
    >
        <Stack
            bgcolor={theme.palette.background.paper}
            direction={"column"}
            m={{ xs: props.mobileMargin ?? 2, md: props.margin ?? 2 }}
            p={{ xs: props.mobilePadding ?? 2, md: props.mobilePadding ?? 2 }}
            gap={props.gap ?? 1}
            boxSizing={'border-box'}
            position={'relative'}
            width={props.width}
            maxWidth={props.maxWidth}
            sx={{
                borderRadius: '30px',
                boxShadow: '0 10px 15px rgb(0 0 0 / 20%)',
                backgroundBlendMode: 'overlay'
            }}
        >
            <Typography
                variant="h5"
                fontWeight={"bold"}
                mb={1}
                textAlign={'center'}
                color={theme.palette.primary.main}
            >
                {props.title}
            </Typography>

            <Stack gap={1}
            >
                {props.children}
            </Stack>
        </Stack>
    </Stack>
}

export default MainCardLayout;
