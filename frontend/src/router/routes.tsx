import { Route, Routes } from "react-router";
import MainLayout from "../components/layout/Main.layout";
import ErrorPage from "../components/layout/Error.layout";
import HomePage from "../pages/Home/Home.page";
import StocksPage from "../pages/Stocks/Stocks.page";
import AddStockPage from "../pages/Stocks/AddStock/AddStockPage";
import EditProductPage from "../pages/Stocks/EditProduct/EditProduct.page";

export const routes = <Routes>
    <Route element={<MainLayout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/stocks/criar" element={<AddStockPage />} />
        <Route path="/products/update/:id" element={<EditProductPage />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
</Routes>
