export type Product = {
  id: number;
  company_id: number;
  sku: string;
  name: string;
  description?: string | null;
  category_id?: number | null;
  supplier_id?: number | null;
  purchase_price: number;
  sale_price: number;
  tax: number;
  stock: number;
  min_stock: number;
  unit: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
