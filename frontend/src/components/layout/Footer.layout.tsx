import { AppBar, Toolbar, Stack, useTheme } from "@mui/material";

const FooterLayout = () => {
    const theme = useTheme()
    return <Stack
        width={"100%"}
    >
        <AppBar
            color="primary"
            position="relative"
            sx={{ boxShadow: 'none', bgcolor: theme.palette.primary.main }}
        >
            <Toolbar>
                <Stack
                    gap={{ xs: 3, md: 1 }}
                    direction={{ xs: "column", md: "row" }}
                    flex={1}
                    justifyContent={'space-between'}
                    alignItems={"center"}
                    paddingX={{ xs: 1, md: 5 }}
                    paddingY={{ xs: 2.5, md: 5 }}
                >
                </Stack>
            </Toolbar>
        </AppBar>
    </Stack>
}

export default FooterLayout;
