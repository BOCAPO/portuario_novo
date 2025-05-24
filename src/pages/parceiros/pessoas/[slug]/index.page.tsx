import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';

import ButtonBack from '~components/Layout/ButtonBack';
import CardPartnerDetail from '~components/Layout/CardPartner/CardPartnerDetail/CardPartnerDetail';
import Header from '~components/Layout/Header/Header';
import { getPartners, getUserPartnerByUsername } from '~services/Api/Partners/Partners';
import { IUserProps } from '~services/Api/Partners/types';

import { useLoginStore } from '~hooks/store/UseLoginStore';

import scss from './Persons.module.scss';

const Pessoas = (props: IUserProps) => {
  const userIsLogged = useLoginStore((state) => state.user);

  return (
    <>
      <Head>
        <title>{`${props.first_name} ${props.last_name}`}</title>
      </Head>
      <Header />
      <main>
        <div className={scss.container}>
          {userIsLogged ? (
            <div className={scss.main}>
              <ButtonBack linkTo="/parceiros" label="Retornar a parceiros?" />
              <CardPartnerDetail data={props} />
            </div>
          ) : (
            <h1 className={scss.authMessage}>
              Você precisa fazer login para visualizar estes dados
            </h1>
          )}
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await getPartners();

  return {
    paths: users?.results.map((user: { username: string }) => {
      return { params: { slug: user.username.toString() } };
    }),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { data, status } = await getUserPartnerByUsername(context.params?.slug as string);

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

export default Pessoas;
