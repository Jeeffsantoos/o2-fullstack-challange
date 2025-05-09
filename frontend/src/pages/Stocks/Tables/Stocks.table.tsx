import {
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  TableValidation,
} from '../../../components/layout/Table.layout';
import LoadingTable from '../../../components/LoadingTable';
import { Settings, Edit, ManageHistoryRounded } from '@mui/icons-material';
import IconElementButton from '../../../components/IconElementButton';
import { Link } from 'react-router';
import { Product } from '../../../models/StocksModels';
import { useEffect, useState } from 'react';
import CreateStockMovement from '../Dialogs/CreateStockMovement';

type stockTableProps = {
  isLoading: boolean;
  stocklist: Product[];
  fetchItems: () => void;
  hasError: string;
};

const StocksTable = (props: stockTableProps) => {
  const theme = useTheme();
  const [stockList, setStockList] = useState<Product[]>([]);
  const [selectedItem, setSelectedItem] = useState<Product | undefined>(undefined)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (props.stocklist) {
      setStockList(props.stocklist);
    }
  }, [props.stocklist]);

  let stockTable = <LoadingTable numeroColunas={6} numeroLinhas={1} tamanhoLinha="small" />;

  if (!props.isLoading) {
    stockTable = (
      <StyledTableContainer>
        <Table>
          <TableHead sx={{ height: 55 }}>
            <TableRow>
              <StyledTableCell align="center">
                <Settings />
              </StyledTableCell>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Nome</StyledTableCell>
              <StyledTableCell align="center">Quantidade Disponível</StyledTableCell>
              <StyledTableCell align="center">Valor</StyledTableCell>
              <StyledTableCell align="center">Descrição</StyledTableCell>
              <StyledTableCell align="center">Categoria</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockList.map((stock, index) => (
              <>
                <StyledTableRow hover={true} key={index}>
                  <StyledTableCell align="center">
                    <Stack
                      direction={'row'}
                      display={'flex'}
                      gap={1}
                      justifyContent={'center'}
                    >
                      <IconElementButton
                        onClick={() => {
                          setDialogOpen(true)
                          setSelectedItem(stock)
                        }}
                        icon={<ManageHistoryRounded />}
                        tooltipText="Adicionar Entrada ou Saída"
                        bgColor={theme.iconButtonTheme.bgCyan}
                        textColor={theme.iconButtonTheme.bgDarkBlue}
                        hoverBgColor={theme.iconButtonTheme.bgDarkBlueHover}
                      />
                      <Link
                        to={`/products/update/${stock.id}`}
                        key={Math.random()}
                      >
                        <IconElementButton
                          icon={<Edit />}
                          tooltipText="Editar Item"
                          bgColor={theme.iconButtonTheme.bgCyan}
                          textColor={theme.iconButtonTheme.bgDarkBlue}
                          hoverBgColor={theme.iconButtonTheme.bgDarkBlueHover}
                        />
                      </Link>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">{stock.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    {stock.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {stock.available_quantity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      parseFloat(stock.unit_price.replace(',', '.')).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {stock.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {stock.category}
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
        <TableValidation
          isLoading={props.isLoading}
          length={stockList.length}
          hasError={props.hasError}
        />
      </StyledTableContainer>
    );
  }

  return (
    <>
      {stockTable}
      <CreateStockMovement fetchItems={props.fetchItems} isLoading={props.isLoading} dialogOpen={dialogOpen} handleDialog={setDialogOpen} item={selectedItem}></CreateStockMovement>
    </>
  );
};

export default StocksTable;
