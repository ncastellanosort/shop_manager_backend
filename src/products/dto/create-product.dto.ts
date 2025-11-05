export type CreateProductDto = {
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
};
