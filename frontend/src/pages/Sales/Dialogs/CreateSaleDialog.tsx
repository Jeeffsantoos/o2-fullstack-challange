/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import CustomDialog from '../../../components/CustomDialog';
import Button from '../../../components/Button';
import useInput from '../../../hooks/use-input';
import { useAxios } from '../../../hooks/use-axios';
import { CreateSale, Product } from '../../../models/StocksModels';
import { enqueueSnackbar } from 'notistack';
import InputField from '../../../components/InputField';

type salesDialogProps = {
  dialogOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  handleDialog: (open: boolean) => void;
};

interface AxiosResponse {
  success: boolean;
  products: Product[];
}

interface SalesResponse {
  name: string;
  available_quantity: string;
}

const CreateSaleDialog = (props: salesDialogProps) => {
  const [, isLoadingProduct, requestProduct] = useAxios<AxiosResponse>();
  const [, , requestSale] = useAxios<SalesResponse>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const quantityInput = useInput<string>('', (value) => value !== '');
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (props.dialogOpen) {
      onFetchProduct();
    }
  }, [props.dialogOpen]);

  useEffect(() => {
    if (quantityInput.isValid && selectedProduct) {
      setFormIsValid(true);
      return;
    }
    setFormIsValid(false);
  }, [selectedProduct, quantityInput]);

  const onFetchProduct = () => {
    requestProduct(
      {
        url: `products`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },

      (data) => {
        setProducts(data.products);
      }
    ).catch((error) => {
      enqueueSnackbar(error, { variant: 'error' });
    });
  };

  const saleProduct = (item: CreateSale) => {
    requestSale(
      {
        url: `sales/create`,
        method: 'post',
        data: {
          sale_date: new Date(),
          sale_items: [item],
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },

      () => {
        props.handleDialog(false)
        enqueueSnackbar(`Foram vendidas ${quantityInput.value} do item ${selectedProduct?.name}!`, { variant: 'success' });
        quantityInput.reset()
        setSelectedProduct(null)
      }
    ).catch((error) => {
      enqueueSnackbar(error, { variant: 'error' });
    });
  };

  const content = (
    <Grid container component={'form'} spacing={2} p={2}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <FormControl fullWidth>
          <InputLabel id="product-select-label">Produto</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            value={selectedProduct ? selectedProduct.id : null}
            label="Produto"
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              // eslint-disable-next-line eqeqeq
              const product = products.find((p) => p.id == selectedId as unknown as string);
              setSelectedProduct(product || null);
            }}
            error={!selectedProduct}
          >
            <MenuItem value={''}>Selecione um produto</MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <InputField
          required
          fullWidth
          id="quantity"
          label={'Quantidade'}
          value={quantityInput.value}
          error={quantityInput.hasError}
          onBlur={quantityInput.valueBlurHandler}
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^0-9]/g, '');
            quantityInput.valueChangeHandler(newValue);
          }}
        />
      </Grid>
    </Grid>
  );

  const actions = (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      gap={3}
      width={'100%'}
      justifyContent={'flex-end'}
    >
      <Button
        text="Fechar"
        color="error"
        variant="text"
        onClick={() => props.handleDialog(false)}
      />
      <Button
        isLoading={isLoadingProduct}
        disabled={!formIsValid}
        text="Realizar Venda"
        onClick={() => {
          if (selectedProduct) {
            saleProduct({
              quantity: quantityInput.value,
              product_id: selectedProduct.id.toString(),
              unit_price: selectedProduct.unit_price.toString(),
            });
          }
        }}
      />
    </Stack>
  );

  return (
    <>
      <CustomDialog
        title={'Vender Produto'}
        actions={actions}
        fullWidth
        handleClose={() => props.handleDialog(false)}
        open={props.dialogOpen}
        content={content}
      />
    </>
  );
};

export default CreateSaleDialog;

