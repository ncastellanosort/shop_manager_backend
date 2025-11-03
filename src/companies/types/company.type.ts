export type Company = {
  inserted_at: Date;
  updated_at: Date;
  id: number;
  tax_id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  password: string;
  is_active: boolean;
};
