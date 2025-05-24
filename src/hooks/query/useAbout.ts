import { useQuery } from 'react-query';

import {
  getAbout,
  getAboutQuimea,
  getGlossary,
} from '~services/Api/About/About';

export function useAllInfoAbout() {
  const { isLoading, error, data } = useQuery('aboutData', () => getAbout());
  if (isLoading) return 'loading';
  if (error) return console.log('houve um erro', error);
  return data;
}
export function useAllInfoAboutQuimea() {
  const { isLoading, error, data } = useQuery('aboutQuimeaData', () =>
    getAboutQuimea()
  );
  if (isLoading) return 'loading';
  if (error) return console.log('houve um erro', error);
  return data;
}
export function useAGlossary() {
  const { isLoading, error, data } = useQuery('glossaryData', () =>
    getGlossary()
  );
  if (isLoading) return 'loading';
  if (error) return console.log('houve um erro', error);
  return data;
}
