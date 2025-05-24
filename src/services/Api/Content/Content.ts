import { instance } from '../http';
import { IGetAllPosts } from './types';

export const getAllPosts = async (limitPerPage = 10, currentOffset = 0, type = 0, category = 0) => {
  if (type > 0 && category > 0) {
    const response = await instance.get(
      `/contents/full/?econext=1&limit=${limitPerPage}&offset=${currentOffset}&content_type=${type}&categories=${category}`
    );

    const data = await response.data;
    return data as IGetAllPosts;
  }

  if (type > 0 && category === 0) {
    const response = await instance.get(
      `/contents/full/?econext=1&limit=${limitPerPage}&offset=${currentOffset}&content_type=${type}`
    );

    const data = await response.data;
    return data as IGetAllPosts;
  }

  if (type === 0 && category > 0) {
    const response = await instance.get(
      `/contents/full/?econext=1&limit=${limitPerPage}&offset=${currentOffset}&categories=${category}`
    );

    const data = await response.data;
    return data as IGetAllPosts;
  }

  const response = await instance.get(
    `/contents/full/?econext=1&limit=${limitPerPage}&offset=${currentOffset}`
  );
  const data = await response.data;
  return data as IGetAllPosts;
};

export const getPost = async (slug: string) => {
  const response = await instance.get(`/contents/full/${slug}`);

  return response;
};

export const getAllSlugs = async () => {
  const response = await instance.get(`/contents/full/?econext=1`);
  const data = await response.data.results;
  const slugs = data.map((slug: { slug: any }) => {
    return slug.slug;
  });
  return slugs;
};

export const getAllTypesOfPosts = async () => {
  const response = await instance.get(`/contents/types/`);
  const data = await response.data.results;
  return data;
};

export const getAllCategoriesOfPosts = async () => {
  const response = await instance.get(`/contents/categories/?show_econext=1`);
  const data = await response.data.results;
  return data;
};
