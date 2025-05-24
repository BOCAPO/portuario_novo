import { INewsData } from 'src/pages/conteudos/types';

export interface IGetAllPosts {
  count: number;
  next: null | string;
  previous: null | string;
  results: INewsData[];
}
