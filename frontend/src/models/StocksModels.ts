import { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  available_quantity: string;
  unit_price: string;
  category: string;
  createdAt: Date | string;
  stockMovements?: StockMovement[];
  saleItems?: SaleItem[];
}

export interface CreateProduct {
  name: string;
  description?: string;
  available_quantity: string;
  unit_price: string;
  category?: string;
}
export interface UpdateProduct {
  name: string;
  description?: string;
  unit_price: string;
  category?: string;
}

export interface CreateSale{
  product_id: string;
  quantity: string;
  unit_price: string;
}

export interface StockMovement {
  id: string;
  productId: number;
  type: 'in' | 'out';
  quantity: string;
  movementDate: Date | string;
  product?: Product;
}

export interface SaleItem {
  id: number;
  quantity: number;
  productId: number;
  saleId: number;
  unitPrice: number | string;
}

export interface Sale {
  id: number;
  saleDate: Date | string;
  totalValue: number | string;
  saleItems: SaleItem[];
}

export interface SalesResponse {
  success: boolean;
  sales: Sale[];
}

export interface DailySalesCountData {
  date: string;
  salesCount: number;
}

export interface SalesCountChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

export interface MainCardLayoutProps {
  title: string;
  children: ReactNode;
}

export interface QuickStatsProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string
}
