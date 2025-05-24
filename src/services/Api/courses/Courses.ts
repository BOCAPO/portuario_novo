import { instance } from '../http';

export const getAllcourses = async () => {
  const response = await instance.get(`/courses/full/`);
  const data = await response.data.results;
  return data;
};
