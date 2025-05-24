export interface IAccountProps {
  user: IUserData;
}

interface IAddressProps {
  id: number;
  street: string | null;
  number: string | null;
  complement: string | null;
  postal_code: string | null;
  district: string | null;
  city: string;
  city_name: string;
  district_name: string;
  state_name: string;
  state_code: string;
}

interface IUserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  image: string | null;
  hide_email: boolean;
  hide_phone: boolean;
  hide_position: boolean;
  hide_education: boolean;
  description: string | null;
  cpf: string | null;
  address: null | IAddressProps;
  address_str: string | null;
  position: number;
  education: number;
  is_staff: boolean;
  highlighted: boolean;
}

export interface IUserOnSubmitForm {
  first_name: string;
  last_name: string;
  phone: string;
  image: File | null;
  description: string;
  cpf: string;
  state_code: string;
  street: string;
  district: string;
  city: string;
  number: string;
  complement: string;
  postal_code: string;
}

export type TMaskType = 'CPF' | 'Telephone' | 'CEP';

export interface IToastProps {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  title: string;
}
