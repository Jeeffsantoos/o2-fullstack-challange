/* eslint-disable camelcase */
import { Grid, Stack } from '@mui/material';
import useInput from '../../../hooks/use-input';
import { useEffect, useState } from 'react';
import InputField from '../../../components/InputField';
import ElementButton from '../../../components/Button';
import { useNavigate } from 'react-router';
import { Product, UpdateProduct } from '../../../models/StocksModels';
import Button from '../../../components/Button';

type UpdateProductProps = {
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onUpdateHandler: (item: UpdateProduct) => void;
  product: Product
};

const EditProductForm = (props: UpdateProductProps) => {
  const navigate = useNavigate();
  const nameInput = useInput<string>('', (value) => value !== '');
  const descriptionInput = useInput<string>('', (value) => value !== '');
  const categoryInput = useInput<string>('', (value) => value !== '');
  const priceInput = useInput<string>('', (value) => value !== '');

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  useEffect(() => {
    setFormIsValid(false);
    if (
      nameInput.isValid &&
      priceInput.isValid &&
      categoryInput.isValid &&
      descriptionInput.isValid
    ) {
      setFormIsValid(true);
    }
  }, [nameInput, priceInput, categoryInput, descriptionInput]);

  const nameErrorMessage = nameInput.hasError ? 'O nome é obrigatório' : '';
  const priceErrorMessage = priceInput.hasError ? 'O preço é inválido' : 'O preço é obrigatório';
  const categoryErrorMessage = categoryInput.hasError ? 'A categoria é obrigatória' : '';
  const descriptionInputErrorMessage = descriptionInput.hasError ? 'A descrição é obrigatória' : '';

  const onSaveClick = () => {
    props.onUpdateHandler({
      name: nameInput.value,
      unit_price: priceInput.value.replace(',', '.'),
      category: categoryInput.value,
      description: descriptionInput.value
    });
  };

  useEffect(() => {
    nameInput.setValue(props.product.name)
    priceInput.setValue(props.product.unit_price)
    descriptionInput.setValue(props.product.description)
    categoryInput.setValue(props.product.category)
  },[props.product])

  return (
    <>
      <Grid container component={'form'} spacing={3}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <InputField
            required
            id="name"
            label={'Nome'}
            value={nameInput.value}
            error={nameInput.hasError}
            helperText={nameErrorMessage}
            onBlur={nameInput.valueBlurHandler}
            onChange={(e) => nameInput.valueChangeHandler(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <InputField
            required
            id="description"
            label={'Descrição'}
            value={descriptionInput.value}
            error={descriptionInput.hasError}
            helperText={descriptionInputErrorMessage}
            onBlur={descriptionInput.valueBlurHandler}
            onChange={(e) => descriptionInput.valueChangeHandler(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <InputField
            required
            id="category"
            label={'Categoria'}
            value={categoryInput.value}
            error={categoryInput.hasError}
            helperText={categoryErrorMessage}
            onBlur={categoryInput.valueBlurHandler}
            onChange={(e) => categoryInput.valueChangeHandler(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3, lg: 3 }}>
          <InputField
            required
            id="price"
            label={'Preço Unitário'}
            value={priceInput.value}
            error={priceInput.hasError}
            helperText={priceErrorMessage}
             onBlur={priceInput.valueBlurHandler}
            onChange={(e) => {
                  const newValue = e.target.value.replace(/[^0-9,]/g, '');
                  priceInput.valueChangeHandler(newValue);
            }}
          />
        </Grid>
      </Grid>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={3}
        width={'100%'}
        justifyContent={'flex-end'}
      >
        <ElementButton
          text="Voltar"
          variant="text"
          onClick={() => navigate('/stocks')}
        />
        <Button
          isLoading={props.isLoading}
          text="Atualizar Item"
          disabled={!formIsValid}
          onClick={onSaveClick}
        />
      </Stack>
    </>
  );
};

export default EditProductForm;
