import { useNavigate } from "react-router";
import MainCardLayout from "../../../components/layout/MainCard.layout";
import { Product } from "../../../models/StocksModels";
import CreateItemForm from "./CreateItem.form";
import { enqueueSnackbar } from "notistack";
import { useAxios } from "../../../hooks/use-axios";

interface AxiosResponse {
  success: boolean;
  product: Product
}
const AddStockPage = () => {
    const [, createIsLoading, createRequest] = useAxios<AxiosResponse>();
    const navigate = useNavigate();

    const onSaveHandler = (item: Omit<Product, 'id' | 'createdAt'>) => {
        createRequest({
            url: "products/create",
            method: "POST",
            data: item,
            headers: {
              'Content-Type': 'application/json',
            },
        },
            (newItem) => {
                enqueueSnackbar(`Item ${newItem.product.name} criado com sucesso!`, { variant: 'success' });
                navigate("/stocks");
            }).catch(error => {
                enqueueSnackbar(error, { variant: "error" });
            })
    }

    return <MainCardLayout
        width={"100%"}
        maxWidth={"80em"}
        title="Adicionar Item"
    >
        <CreateItemForm
            isLoading={createIsLoading}
            onSaveHandler={onSaveHandler}
        />
    </MainCardLayout>
}

export default AddStockPage;
