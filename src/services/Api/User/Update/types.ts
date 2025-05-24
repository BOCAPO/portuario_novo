export interface IUserDataToPatch {
  first_name: string;
  last_name: string;
  phone: string;
  image: File | null;
  description: string;
  cpf: string;
  address?: null | IAddressProps;
}

interface IAddressProps {
  id?: number;
  state_code: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  postal_code: string;
}
