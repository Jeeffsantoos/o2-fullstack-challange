import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

type ListItemAppBarProps = {
    icon: React.ReactNode,
    action: () => void,
    text: string,
}

export const ListItemAppBar = (props: ListItemAppBarProps) => {
    return <ListItem sx={{ width: "100%" }} >
        <ListItemButton
            onClick={props.action}
            sx={{
                borderRadius: 2,
                transition: 'background-color 0.5s ease-in-out',
                '&:hover': {
                    backgroundColor: '#E0E0E0',
                    color: 'black'
                },
            }}
        >
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.text} sx={{ fontWeight: "bold" }} />
        </ListItemButton>
    </ListItem>
}