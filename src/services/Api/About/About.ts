import { instance } from '../http';

export const getAbout = async () => {
  const response = await instance.get(`/portal/about`);
  const data = await response.data.results;
  return data;
};

export const getAboutQuimea = async () => {
  const response = await instance.get(`/portal/about_quimea`);
  const data = await response.data.results;
  return data;
};
export const getGlossary = async () => {
  const response = await instance.get(`/portal/glossary`);
  const data = await response.data.results;
  return data;
};
