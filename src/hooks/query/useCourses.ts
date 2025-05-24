import { useQuery } from 'react-query';

import { getAllcourses } from '~services/Api/courses/Courses';

export function useAllCourses() {
  const { isLoading, error, data } = useQuery('allCourses', () =>
    getAllcourses()
  );
  if (isLoading) return 'loading';
  if (error) return console.log('houve um erro', error);
  return data;
}
