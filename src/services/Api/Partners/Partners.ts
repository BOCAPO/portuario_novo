import { instance } from '../http';
import { IGetPartnersData } from './types';

export const getAllPartners = async (
  currentOffsetUser = 0,
  currentOffsetOrganization = 0,
  limitPerPage = 50
) => {
  const { data: users } = await instance.get(
    `/users/?limit=${limitPerPage}&offset=${currentOffsetUser}`
  );
  const { data: organizations } = await instance.get(
    `/organization/organizations/?econext=1&limit=${limitPerPage}&offset=${currentOffsetOrganization}`
  );

  return { users, organizations } as IGetPartnersData;
};

export const getPartners = async () => {
  const { data: users } = await instance.get(`/users/?econext=1`);
  const { data: organizations } = await instance.get(
    `/organization/organizations/?econext=1`
  );

  return { users, organizations };
};

export const searchAllPartners = async (
  searchValue: string,
  currentOffsetUser = 0,
  currentOffsetOrganization = 0,
  limitPerPage = 50
) => {
  const { data: users } = await instance.get(
    `/users/?limit=${limitPerPage}&offset=${currentOffsetUser}&search=${searchValue}`
  );
  const { data: organizations } = await instance.get(
    `/organization/organizations/?econext=1&limit=${limitPerPage}&offset=${currentOffsetOrganization}&search=${searchValue}`
  );

  return { users, organizations } as IGetPartnersData;
};

export const getUserPartnerByUsername = async (username: string) => {
  return instance.get(`/users/${username}`);
};

export const getOrganiaztionPartnerBySlug = async (slug: string) => {
  return instance.get(`/organization/organizations/${slug}`);
};
