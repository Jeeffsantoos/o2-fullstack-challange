import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Grid } from '@mui/material';
import { useAxios } from '../../../hooks/use-axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SaleItem {
  id: number;
  quantity: number;
  product_id: number;
  sale_id: number;
  unit_price: string;
}

interface Sale {
  id: number;
  sale_date: string;
  total_value: string;
  sale_items: SaleItem[];
}

interface SalesResponse {
  success: boolean;
  sales: Sale[];
}

interface DailySalesCountData {
  date: string;
  salesCount: number;
}

interface SalesCountChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

const SalesCountChart: React.FC<SalesCountChartProps> = ({ startDate, endDate }) => {
  const [dailySalesCount, setDailySalesCount] = useState<DailySalesCountData[]>([]);
  const [fetchSalesByPeriodHasError, , fetchSalesByPeriod] = useAxios<SalesResponse>();

  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      const start = startDate ? startDate.toISOString().split('T')[0] : null;
      const end = endDate ? endDate.toISOString().split('T')[0] : null;

      if (start && end) {
        await fetchSalesByPeriod(
          {
            url: 'sales/period',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              startDate: start,
              endDate: end,
            },
          },
          (data: SalesResponse) => {
            if (fetchSalesByPeriodHasError) {
              enqueueSnackbar('Erro ao buscar vendas por período!', { variant: 'error' });
              return;
            }
            if (data?.success && data?.sales) {
              const groupedSalesCount: { [monthYear: string]: number } = {};
              data.sales.forEach(sale => {
                const saleDate = new Date(sale.sale_date);
                const monthYear = saleDate.toLocaleDateString('pt-BR', {
                  month: '2-digit',
                  year: 'numeric',
                });
                groupedSalesCount[monthYear] = (groupedSalesCount[monthYear] || 0) + 1;
              });

              const dailySalesCountData = Object.entries(groupedSalesCount).map(([monthYear, salesCount]) => ({
                date: monthYear,
                salesCount,
              }));
              setDailySalesCount(dailySalesCountData);
            }
          }
        );
      }
    };

    if (fetchData) {
      fetchSales();
      setFetchData(false);
    }

  }, [fetchSalesByPeriod, fetchData, fetchSalesByPeriodHasError]);

  useEffect(() => {
    if (startDate && endDate) {
      setFetchData(true);
    }
  }, [startDate, endDate]);

  const chartData = {
    labels: dailySalesCount.map(item => item.date),
    datasets: [
      {
        label: 'Número de Vendas',
        data: dailySalesCount.map(item => item.salesCount),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Número de Vendas por Dia',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Vendas',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Data',
        },
      },
    },
  };

  return (

      <Grid m={4} minHeight={'100'}
      >
        <Bar data={chartData} options={chartOptions} />
      </Grid>
  );
};

export default SalesCountChart;
