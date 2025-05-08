import ReceiptIcon from '@mui/icons-material/Receipt'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { JSX, useEffect, useState } from 'react'
import CustomSkeleton from '../../../components/CustomSkeleton'
import { Paper, Typography, Grid } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useAxios } from '../../../hooks/use-axios'

interface FetchTotalValueResponse {
  success: boolean;
  totalStockValue: number;
}

interface FetchTotalSoldResponse {
  success: boolean;
  totalItemsSold: number;
}

const QuickStats = (): JSX.Element => {

  const [totalStockValue, setTotalStockValue] = useState<number | null>(null)
  const [totalItemsSold, setTotalItemsSold] = useState<number | null>(null)
  const [totalStockValueHasError, totalStockValueIsLoading, fetchTotalStockValue] = useAxios<FetchTotalValueResponse>();
  const [totalSoldHasError, totalSoldIsLoading, fetchTotalSold] = useAxios<FetchTotalSoldResponse>();

  useEffect(() => {
    fetchTotalStockValue({
      url: 'sales/total-stock-value'
    }, (data: {
      totalStockValue: number
    }) => {
      if (totalStockValueHasError) {
        enqueueSnackbar('Ocorreu um erro!', { variant: 'error' })
        setTotalStockValue(0)
        return
      }
      setTotalStockValue(data.totalStockValue)
    })
  }, [])

  useEffect(() => {
    fetchTotalSold({
      url: 'sales/total-items-sold'
    }, (data: {
      totalItemsSold: number
    }) => {
      if (totalSoldHasError) {
        enqueueSnackbar('Ocorreu um erro!', { variant: 'error' })
        setTotalItemsSold(0)
        return
      }
      setTotalItemsSold(data.totalItemsSold)
    })
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid size={{ md: 12, xs:12 }}>
        <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AttachMoneyIcon sx={{ fontSize: 40, color: 'green', marginBottom: 1 }} />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Total em Estoque (R$)
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {totalStockValueIsLoading ? <CustomSkeleton width="40%" /> : `R$ ${totalStockValue?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </Typography>
        </Paper>
      </Grid>
      <Grid size={{ md: 12, xs:12 }}>
        <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ReceiptIcon sx={{ fontSize: 40, color: 'primary', marginBottom: 1 }} />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Total de Itens Vendidos
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {totalSoldIsLoading ? <CustomSkeleton width="40%" /> : totalItemsSold}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default QuickStats
