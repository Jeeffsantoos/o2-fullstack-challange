/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import CustomDialog from '../../../components/CustomDialog';
import Button from '../../../components/Button';
import useInput from '../../../hooks/use-input';
import { useAxios } from '../../../hooks/use-axios';
import { Product, StockMovement } from '../../../models/StocksModels';
import { enqueueSnackbar } from 'notistack';

type UpdateProps = {
	item?: Product;
  dialogOpen: boolean;
  isLoading: boolean;
  fetchItems: () => void;
  // eslint-disable-next-line no-unused-vars
  handleDialog: (open: boolean) => void;
};

const CreateStockMovement = (props: UpdateProps) => {
	const [, isLoadingProduct, requestProduct] = useAxios<StockMovement>();

    const quantityInput = useInput<string>('', (value) => value !== '');
    const movementInput = useInput<'in' | 'out' | ''>('', (value) => value !== '')

    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    useEffect(() => {
      setFormIsValid(false);
      if (
        quantityInput.isValid &&
        movementInput.isValid
      ) {
        setFormIsValid(true);
      }
    }, [quantityInput, movementInput]);

    const onUpdateHandler = (product: Omit<StockMovement, 'productId'| 'id' | 'movementDate'>, id?: string) => {
      requestProduct(
        {
          url: `stocks/create`,
          method: 'POST',
          data: {
            product_id: id,
            type: product.type,
            quantity: product.quantity
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
        () => {
          enqueueSnackbar(`Item Atualizado!`, {
            variant: 'success',
          });
          props.handleDialog(false);
          props.fetchItems()
          quantityInput.reset()
          movementInput.reset()
        }
      ).catch((error) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
    };

	const content = (
    <Grid container component={'form'} spacing={2} p={2}>
    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
      <TextField
        required
        fullWidth
        id="quantity"
        label={'Quantidade Disponível'}
        value={quantityInput.value}
        error={quantityInput.hasError}
        onBlur={quantityInput.valueBlurHandler}
        onChange={(e) => {
            const newValue = e.target.value.replace(/[^0-9]/g, '');
            quantityInput.valueChangeHandler(newValue);
        }}
      />
    </Grid>
    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
    <FormControl fullWidth>
        <InputLabel id="movement-type-label">Tipo de Movimentação</InputLabel>
        <Select
          labelId="movement-type-label"
          id="movementType"
          label="Tipo de Movimentação"
          value={movementInput.value}
          onChange={(e) => movementInput.setValue(e.target.value as 'in' | 'out' | '')}
          error={movementInput.hasError}
        >
          <MenuItem value={''}></MenuItem>
          <MenuItem value="in">Entrada</MenuItem>
          <MenuItem value="out">Saída</MenuItem>
        </Select>
      </FormControl>
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
			<Button isLoading={isLoadingProduct} disabled={!formIsValid} text="Alterar Status" onClick={() => {
        onUpdateHandler({
          quantity: quantityInput.value,
          type: movementInput.value as 'in' | 'out'
        }, props.item?.id)
      }} />
		</Stack>
	);

	return (
		<>
			<CustomDialog
				title={'Movimentar produto'}
				actions={actions}
        fullWidth
				handleClose={() => props.handleDialog(false)}
				open={props.dialogOpen}
				content={content}
			/>
		</>
	);
};

export default CreateStockMovement;
