import Head from 'next/head';
import Header from '~components/Layout/Header/Header';
import { Button } from '@mui/material';
import styles from './Home.module.scss';
import Banner from './sections/Banner/Banner';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { UseAuthenticated } from '~hooks/store/UseAuthenticated';
import { useRouter } from 'next/router';
import { RouterRounded } from '@mui/icons-material';

interface IMailConfirmationProps {
  token: string;
}

const mailConfirmation = ({ token }: IMailConfirmationProps) => {
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      await UseAuthenticated(undefined, token);
    };

    if (token) {
      getSession();

      setTimeout(() => {
        router.push("/account");
      }, 3000)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <Banner />
          <h2 className={styles.mailConfirmationTitle}>
            Seu email foi confirmado
          </h2>
          { token ? (
            <>
              <p className={styles.mailConfirmationsubtitle}>
                Aguarde um momento...
              </p>
            </>
          ) : (
            <>
              <p className={styles.mailConfirmationsubtitle}>
                Voltar a pagina inicial?
              </p>
              <Button href="/" variant="outlined" className={styles.buttonSeeMore}>
                Início
              </Button>
            </>
          ) }
        </main>
      </div>
    </>
  );
};

export default mailConfirmation;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;

  return {
    props: {
      token: String(token)
    }
  }
}