import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { Chip } from '@mui/material';
import ButtonBack from '~components/Layout/ButtonBack';
import Header from '~components/Layout/Header/Header';
import SolidBanner from '~components/Layout/SolidBanner/SolidBanner';
import { getAllSlugs, getPost } from '~services/Api/Content/Content';
import { ConvertDate } from '~utils/convertBrlDate';

import { useNewsFiltersStore } from '~hooks/store/UseNewsFilters';

import BlogShortcuts from '../components/BlogShortcuts';
import { INewsGetStaticProps, ICategoryNews } from './types';

import scss from './BlogNews.module.scss';

const Blog = ({ title, date, image_dir, categories, text }: INewsGetStaticProps) => {
  const router = useRouter();
  const [firstRender, setFirstRender] = useState(true);
  const activePostCategory = useNewsFiltersStore((state) => state.activePostCategory);
  const activePostType = useNewsFiltersStore((state) => state.activePostType);

  useEffect(() => {
    setFirstRender(false);

    if (!firstRender) {
      router.push('/conteudos');
    }
  }, [activePostCategory, activePostType]);

  return (
    <div className={scss.container}>
      <Header />
      <main className={scss.main}>
        <SolidBanner title="Conteúdos" backgroundColor="orange" />
        <div className={scss.returnButton}>
          <ButtonBack linkTo="/conteudos" label="Retornar a noticias?" />
        </div>
        <div className={scss.content}>
          <div className={scss.news}>
            <h2 className={scss.title}>{title}</h2>
            <div className={scss.headerNews}>
              <div className={scss.categories}>
                <p>Categorias:</p>
                {categories.map((category: ICategoryNews) => (
                  <Chip
                    key={category.id}
                    style={{ margin: '0 8px', fontSize: '1.4rem' }}
                    label={category.title}
                    variant="outlined"
                  />
                ))}
              </div>
              <p className={scss.contentDate}>{ConvertDate(date)}</p>
            </div>
            <img src={image_dir} alt={title} width="100%" />
            <div dangerouslySetInnerHTML={{ __html: `${text}` }} className={scss.contentData} />
          </div>
          <BlogShortcuts />
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths = async () => {
  const allSlugs = await getAllSlugs();

  const paths = allSlugs?.map((post: string) => {
    return {
      params: { slug: post },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { data, status } = await getPost(context.params?.slug as string);

  if (status !== 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: data,
    revalidate: 60 * 60 * 24 * 30, // 1 month
  };
};

export default Blog;
