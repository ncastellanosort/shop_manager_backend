export type Supplier = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  is_active: boolean;
  created_at?: string | null;
  updated_at?: string | null;
};
