/* eslint-disable no-nested-ternary */
import { JSX, useEffect, useState } from 'react'
import CustomSkeleton from '../../../components/CustomSkeleton'
import { Paper, Typography, Grid, List, ListItem, ListItemText } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { useAxios } from '../../../hooks/use-axios'

interface MostSoldProduct {
    product_id: number;
    name: string;
    total_sold: number;
}

interface ApiResponse {
  success: boolean;
  mostSoldProducts: MostSoldProduct[];
}

const MostSoldItens = (): JSX.Element => {
  const [mostSoldProducts, setMostSoldProducts] = useState<MostSoldProduct[]| null>(null);
    const [mostSoldProductsHasError, createIsLoading, fetchMostSoldProducts] = useAxios<ApiResponse>();

  useEffect(() => {
    fetchMostSoldProducts({
      url: 'sales/most-sold-products'
    }, (data: ApiResponse) => {
      if (mostSoldProductsHasError) {
        enqueueSnackbar('Ocorreu um erro ao carregar os produtos mais vendidos!', { variant: 'error' })
        setMostSoldProducts([])
        return
      }
      setMostSoldProducts(data.mostSoldProducts);
    })
  }, [fetchMostSoldProducts, mostSoldProductsHasError])


  return (
    <Grid container spacing={2}>
      <Grid>
        <Paper elevation={3} sx={{ padding: 2}}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'orange' }}>
            <WhatshotIcon sx={{ mr: 1 }} /> Produtos Mais Vendidos
          </Typography>
          {createIsLoading ? (
            <CustomSkeleton count={3} />
          ) : mostSoldProducts ? (
            <List>
              {mostSoldProducts.map((product, index) => (
                <ListItem key={index} alignItems="center" sx={{ paddingY: 1 }}>
                  <ListItemText
                    primary={product.name}
                    secondary={`Vendidos: ${product.total_sold}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary">Nenhum produto vendido ainda.</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MostSoldItens
