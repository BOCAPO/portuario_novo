import { useQuery } from 'react-query';

import { getAllEventos } from '~services/Api/Events/Events';

export function useAllEventos() {
  const { isLoading, error, data } = useQuery('eventosData', () =>
    getAllEventos()
  );

  if (isLoading) return 'loading';

  if (error) return console.log('houve um erro', error);

  return data;
}
