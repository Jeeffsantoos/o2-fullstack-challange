import { enqueueSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import MainCardLayout from '../../../components/layout/MainCard.layout';
import { useAxios } from '../../../hooks/use-axios';
import { Product, UpdateProduct } from '../../../models/StocksModels';
import EditProductForm from './EditProduct.form';

interface AxiosResponse {
  success: boolean;
  product: Product;
}

const EditProductPage = () => {
  const { id } = useParams()
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product>();
	const [, isLoadingProduct, requestProduct] = useAxios<AxiosResponse>();
	const [, , requestUpdate] = useAxios<AxiosResponse>();

	useEffect(() => {
		if (id) {
			fetchItem(id);
		}
	}, [id]);

	const fetchItem = (id: string) => {
		requestProduct(
			{
				url: `products/${id}`,
				method: 'GET',
			},
			(data) => {
				setProduct(data.product);
			}
		).catch((error) => {
			enqueueSnackbar(error, { variant: 'error' });
		});
	};

	const onUpdateHandler = (product: UpdateProduct) => {
		requestUpdate(
			{
				url: `products/update/${id}`,
				method: 'PUT',
				data: product,
        headers: {
          'Content-Type': 'application/json',
        },
			},
			(data) => {
				enqueueSnackbar(`Produto ${data.product.name} alterado com sucesso!`, {
					variant: 'success',
				});
				navigate(`/stocks`);
			}
		).catch((error) => {
			enqueueSnackbar(error, { variant: 'error' });
		});
	};

	let editProductForm = <></>;

	if (!isLoadingProduct && product) {
		editProductForm = (
			<EditProductForm
				onUpdateHandler={onUpdateHandler}
				isLoading={isLoadingProduct}
				product={product}
			/>
		);
	}

	return (
		<MainCardLayout width={'100%'} maxWidth={'80em'} title="Editar Produto">
			{editProductForm}
		</MainCardLayout>
	);
};

export default EditProductPage;
