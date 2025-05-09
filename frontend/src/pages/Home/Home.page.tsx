import { Grid, TextField } from '@mui/material'
import MainCardLayout from '../../components/layout/MainCard.layout'
import { JSX, useState } from 'react'
import QuickStats from './QuickStats.tsx/QuickStats'
import MostSoldItens from './MostSold.tsx/MostSoldItens'
import SalesCountChart from './SalesCountChart/SalesCountChart'
import MiniCardLayout from '../../components/layout/MiniCard.layout'

const Dashboard = (): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value ? new Date(event.target.value) : null)
  }

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value ? new Date(event.target.value) : null)
  }


  return (
    <MainCardLayout>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 12 }} >
          <MiniCardLayout  m={2} p={2} title='Estatísticas Rápidas'>
            <Grid display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
              <QuickStats />
            </Grid>
          </MiniCardLayout>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <MiniCardLayout  m={2} p={2}  title='Produtos Mais Vendidos'>
            <Grid size={{ xs: 12, md: 12 }} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
              <MostSoldItens />
            </Grid>
          </MiniCardLayout>
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-start">

        <Grid size={{ xs: 12, md: 12 }}>
          <MiniCardLayout m={2} p={2}  title='Gráfico de Vendas por Período'>
            <Grid container spacing={2} alignItems="center"  justifyContent='center' size={{ xs: 12, md: 12 }}>
              <Grid>
                <TextField
                  id="start-date"
                  defaultValue={null}
                  label="Data de Início"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={startDate ? startDate.toISOString().split('T')[0] : null}
                  onChange={handleStartDateChange}
                />
              </Grid>
              <Grid>
                <TextField
                  id="end-date"
                  label="Data de Fim"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  defaultValue={null}
                  value={endDate ? endDate.toISOString().split('T')[0] : null}
                  onChange={handleEndDateChange}
                />
              </Grid>
            </Grid>
            <Grid display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
              <SalesCountChart startDate={startDate} endDate={endDate} />
            </Grid>
          </MiniCardLayout>
        </Grid>
      </Grid>
    </MainCardLayout>

  )
}
export default Dashboard
