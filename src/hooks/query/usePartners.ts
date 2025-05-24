import { useQuery } from 'react-query';

import { getPartners } from '~services/Api/Partners/Partners';

export function useAllPartners() {
  const { isLoading, error, data } = useQuery('partnersData', () =>
    getPartners()
  );
  if (isLoading) return 'loading';

  if (error) return console.log('houve um erro', error);
  return data;
}
