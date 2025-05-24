/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';

import { CircularProgress, Pagination } from '@mui/material';
import Header from '~components/Layout/Header/Header';
import SolidBanner from '~components/Layout/SolidBanner/SolidBanner';
import { getAllPosts } from '~services/Api/Content/Content';
import { ConvertDate } from '~utils/convertBrlDate';

import { setCurrentPage, useNewsFiltersStore } from '~hooks/store/UseNewsFilters';

import BlogNewsCard from './components/BlogNewsCard';
import BlogShortcuts from './components/BlogShortcuts';
import { INewsData } from './types';

import scss from './Blog.module.scss';

export default function Blog() {
  const size = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(size.width < 470);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [news, setNews] = useState<INewsData[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const activePostCategory = useNewsFiltersStore((state) => state.activePostCategory);
  const activePostType = useNewsFiltersStore((state) => state.activePostType);
  const currentPage = useNewsFiltersStore((state) => state.currentPage);

  const showCardList = () => {
    return news?.map(({ title, image_dir, date, slug }: INewsData) => (
      <BlogNewsCard
        key={title}
        title={title}
        image={image_dir}
        date={ConvertDate(date)}
        link={`conteudos/${slug}`}
        width="80%"
      />
    ));
  };

  useEffect(() => {
    const getAllNews = async () => {
      const limitPerPage = 10;
      const newCurrentPage = (currentPage - 1) * limitPerPage;

      setIsLoading(true);

      if (activePostCategory > 0 || activePostType > 0) {
        const getFilteredPosts = await getAllPosts(
          limitPerPage,
          newCurrentPage,
          activePostType,
          activePostCategory
        );
        setNews(getFilteredPosts.results);

        const totalPages = Math.ceil(getFilteredPosts.count / limitPerPage);
        setNumberOfPages(totalPages);

        setIsLoading(false);
        return;
      }

      const getPosts = await getAllPosts(limitPerPage, newCurrentPage);
      setNews(getPosts.results);

      const totalPages = Math.ceil(getPosts.count / limitPerPage);
      setNumberOfPages(totalPages);

      setIsLoading(false);
    };

    getAllNews();
  }, [currentPage, activePostCategory, activePostType]);

  useEffect(() => {
    setIsMobile(size.width < 470);
  }, [size]);

  return (
    <div className={scss.container}>
      <Header />
      <main className={scss.main}>
        <div className={scss.content}>
          <div className={scss.news}>
            {isLoading ? <CircularProgress className={scss.spinner} /> : showCardList()}
            {news.length < 1 && !isLoading && (
              <div className={scss.notFoundPostsMessage}>Nenhuma postagem encontrada...</div>
            )}
            {news.length > 0 && (
              <Pagination
                count={numberOfPages}
                page={currentPage}
                className={scss.pagination}
                onChange={(_, page: number) => setCurrentPage(page)}
                size={isMobile ? 'small' : 'large'}
              />
            )}
          </div>
          <BlogShortcuts />
        </div>
      </main>
    </div>
  );
}
