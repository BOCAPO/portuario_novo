export interface IUserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  hide_email: boolean;
  hide_phone: boolean;
  hide_position: boolean;
  hide_education: boolean;
  description: string | null;
  cpf: string;
  address: IAddress;
  position: string;
  education: string;
  image: string | null;
  highlighted: boolean;
}

export interface IAddress {
  street: string | null;
  number: number | null;
  complement: string | null;
  postal_code: string | null;
  district: string;
  city: string;
  state_name: string;
  state_code: string;
}

export interface IPhotos {
  id: number;
  organization: number;
  created: string;
  file: string;
}

export interface IOds {
  id: number;
  actions: string;
  icon: string;
  ods_description: string;
  ods_subtitle: string;
  ods_title: string;
}

export interface ICampaigns {
  id: number;
  title: string;
  link?: string;
  image?: string;
  profile_visibility: boolean;
}

export type TContact = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'site' | 'other';

export interface IContacts {
  id: number;
  link: string;
  type: TContact;
}

export interface IOrganizationProps {
  id: number;
  cnpj: string | null;
  company_name: string;
  trading_name: string;
  type: string;
  phone: string | null;
  whatsapp_number: string | null;
  environmental_requirements: string;
  photos: IPhotos[];
  ods: IOds[];
  email: string | null;
  activity: string;
  description: string | null;
  abstract: string | null;
  activity_field: string | null;
  logo: string;
  paid_space: boolean;
  residues: string[];
  solutions: string[];
  contacts: IContacts[];
  campaigns: ICampaigns[];
  address: IAddress;
  address_str: string;
  highlighted: boolean;
  google_maps_script: string | null;
}

export interface IGetPartnersData {
  users: {
    count: number;
    next: string | null;
    previous: string | null;
    results: IUserProps[];
  };
  organizations: {
    count: number;
    next: string | null;
    previous: string | null;
    results: IOrganizationProps[];
  };
}

export interface INumberOfPages {
  users: number;
  organizations: number;
}
