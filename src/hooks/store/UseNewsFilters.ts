import CreateStore from '~zustand/index';

type INewsFilters = {
  activePostCategory: number;
  activePostType: number;
  currentPage: number;
};

const initialStore = {
  activePostCategory: 0,
  activePostType: 0,
  currentPage: 1,
};

export const useNewsFiltersStore = CreateStore<INewsFilters>(() => initialStore, 'NewsFilters');

export const setActivePostCategory = (activePostCategory: number) => {
  useNewsFiltersStore.setState({ currentPage: 1 });
  useNewsFiltersStore.setState({ activePostCategory });
};

export const setActivePostType = (activePostType: number) => {
  useNewsFiltersStore.setState({ currentPage: 1 });
  useNewsFiltersStore.setState({ activePostType });
};

export const setCurrentPage = (currentPage: number) => {
  useNewsFiltersStore.setState({ currentPage });
};
