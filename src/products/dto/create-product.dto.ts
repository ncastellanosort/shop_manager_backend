export type CreateProductDto = {
  sku: string;
  name: string;
  description?: string | null;
  purchase_price: number;
  sale_price: number;
  tax: number;
  stock: number;
  min_stock: number;
  unit: string;
};
