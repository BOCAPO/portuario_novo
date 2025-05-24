import Head from 'next/head';

import { Button } from '@mui/material';

import GridCards from './components/GridCards/GridCards';
import styles from './Partners.module.scss';

export default function Partners() {
  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2 className={styles.title}>Veja quem faz parte do Econext</h2>
          <GridCards />
          <p>Clique no pefil para ver detalhes</p>
          <Button
            href="/parceiros"
            variant="outlined"
            className={styles.buttonSeeMore}
          >
            Ver todos
          </Button>
        </main>
      </div>
    </>
  );
}
