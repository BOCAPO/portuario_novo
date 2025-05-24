import { useQuery } from 'react-query';

import { getEventCategories } from '~services/Api/Events/Events';

export function useGetEventCategories() {
  const { isLoading, error, data } = useQuery('eventCategories', () => getEventCategories());

  if (isLoading) return [{ id: 0, title: 'Loading...' }];

  if (error) return console.log('Error in useAllEventCategories fetch hook:', error);

  return data ? data.results : null;
}
