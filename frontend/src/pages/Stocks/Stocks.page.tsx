import { useEffect, useState } from 'react';
import MainCardLayout from '../../components/layout/MainCard.layout';
import { Product } from '../../models/StocksModels';
import { useAxios } from '../../hooks/use-axios';
import { enqueueSnackbar } from 'notistack';
import StocksTable from './Tables/Stocks.table';
import ElementButton from '../../components/Button';
import { useNavigate } from 'react-router';
import { BoxIcon } from 'lucide-react';

interface StockResponse {
  success: boolean;
  products: Product[]
}

const StocksPage = () => {
  const navigate = useNavigate()
	const [errorStocks, isLoadingStocks, fetchStock] = useAxios<StockResponse>();
	const [stockList, setStockList] = useState<Product[]>([]);

	useEffect(() => {
		fetchStockItems();
	}, []);

	const fetchStockItems = async () => {
		fetchStock(
			{
				url: `products/`,
				method: 'GET',
			},
			(data) => {
        setStockList(data.products)
      }
		).catch((error) => {
			enqueueSnackbar(error, { variant: 'error' });
		});
	};

	return (
		<MainCardLayout width={'100%'} maxWidth={'80em'} title="Estoque">
			<ElementButton
				text="Adicionar Item"
				endIcon={<BoxIcon />}
				onClick={() => navigate('criar')}
			/>
			<StocksTable
        fetchItems={fetchStockItems}
				isLoading={isLoadingStocks}
				stocklist={stockList}
				hasError={errorStocks}
			/>
		</MainCardLayout>
	);
};

export default StocksPage;
