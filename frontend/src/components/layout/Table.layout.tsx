import { styled } from '@mui/material/styles';
import { TableContainer, TableRow, TableCell, tableCellClasses, Alert } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(() => ({
    // boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    borderRadius: 5,
    backgroundColor: '#fff'
}));

export const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&.MuiTableRow-hover:hover': {
    },
    '&.MuiTableCell-root': {
        border: 0
    },
    'td': {
        borderBottom: 0,
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

type TableValidationType = {
    isLoading: boolean;
    hasError: string;
    length: number;
}

export const TableValidation = (props: TableValidationType) => {
    return (
        <>
            {!props.isLoading && !props.hasError && props.length == 0 && (
                <Alert severity="info">Nenhum dado encontrado.</Alert>
            )}
            {!props.isLoading && props.hasError && (
                <Alert severity="error">Erro ao se conectar com o servidor.</Alert>
            )}
        </>
    )
}
