import Head from 'next/head';

import { Button } from '@mui/material';
import Header from '~components/Layout/Header/Header';

import Banner from '../sections/Banner/Banner';

import styles from '../Home.module.scss';

const Custom404 = () => {
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
            Esta página não existe ou está em construção...
          </h2>
          <p className={styles.mailConfirmationsubtitle}>Deseja voltar a página inicial?</p>
          <Button href="/" variant="outlined" className={styles.buttonSeeMore}>
            Início
          </Button>
        </main>
      </div>
    </>
  );
};

export default Custom404;
