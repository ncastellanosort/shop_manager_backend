export type UpdateSupplierDto = {
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  is_active: boolean;
};
