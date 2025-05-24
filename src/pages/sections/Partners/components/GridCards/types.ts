import { IOrganizationProps, IUserProps } from "~services/Api/Partners/types";

export type IPartnersData = void | 'loading' | {
  users: {
    count: number,
    next: string,
    previous: string,
    results: IUserProps[];
  }, organizations: {
    count: number,
    next: string,
    previous: string,
    results: IOrganizationProps[];
  };
};
