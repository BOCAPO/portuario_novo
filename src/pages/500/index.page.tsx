import Head from 'next/head';
import Header from '~components/Layout/Header/Header';
import { Button } from '@mui/material';
import styles from '../Home.module.scss';

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <h2 className={styles.mailConfirmationTitle}>
            Houve um erro. Já estamos com as informações para corrigi-lo
            imediatamente
          </h2>
          <p className={styles.mailConfirmationsubtitle}>
            Voltar a pagina inicial?
          </p>
          <Button href="/" variant="outlined" className={styles.buttonSeeMore}>
            Início
          </Button>
        </main>
      </div>
    </>
  );
};

export default Custom500;
