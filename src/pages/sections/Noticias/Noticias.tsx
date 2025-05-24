/* eslint-disable camelcase */
import { Button } from '@mui/material';
import Container from '~components/Layout/Container/Container';
import { IGetAllPosts } from '~services/Api/Content/types';
import { ConvertDate } from '~utils/convertBrlDate';

import { useAllPosts } from '~hooks/query/usePosts';

import SectionNewsCard from './components/SectionNewsCard';
import { INewsCardData } from './types';

import scss from './Noticias.module.scss';

const Noticias = () => {
  const allPosts = useAllPosts();

  const showCardList = () => {
    const postsToView = (allPosts as IGetAllPosts).results?.slice(0, 3);

    return postsToView?.map(({ title, image_dir, date, slug }: INewsCardData) => (
      <SectionNewsCard
        key={title}
        title={title}
        image={image_dir}
        date={ConvertDate(date)}
        link={`conteudos/${slug}`}
        width={320}
      />
    ));
  };

  return (
    <Container id="noticias" backgroundColor="backgroundWhite" className={scss.container}>
      <h2 className={scss.title}>Notícias</h2>
      <div className={scss.cards}>
        {allPosts !== 'loading' ? showCardList() : <p>Carregando...</p>}
      </div>
      <Button href="/conteudos" variant="outlined" className={scss.buttonSeeMore}>
        Ver mais notícias
      </Button>
    </Container>
  );
};
export default Noticias;
