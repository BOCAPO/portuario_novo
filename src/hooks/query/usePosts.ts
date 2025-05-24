import { useQuery } from 'react-query';

import { getAllPosts, getAllTypesOfPosts } from '~services/Api/Content/Content';

export function useAllPosts() {
  const { isLoading, error, data } = useQuery('postsData', () => getAllPosts());
  if (isLoading) return 'loading';

  if (error) return console.log('houve um erro', error);
  return data;
}
export function useAllPostsTypes() {
  const { isLoading, error, data } = useQuery('postsDataTypes', () =>
    getAllTypesOfPosts()
  );
  if (isLoading) return 'loading';

  if (error) return console.log('houve um erro', error);
  return data;
}
