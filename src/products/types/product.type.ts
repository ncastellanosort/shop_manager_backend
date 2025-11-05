export type Product = {
  id: number;
  company_id: number;
  sku: string;
  barcode?: string;
  name: string;
  brand: string;
  tags: string[];
  description?: string | null;
  category_id?: number | null;
  supplier_id?: number | null;

  purchase_price: number;
  sale_price: number;
  tax: number;
  currency: string;

  stock: number;
  min_stock: number;
  unit: string;
  weight?: number | null;

  status: 'active' | 'inactive' | 'discontinued';

  image_urls?: string[];

  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};
