import Head from 'next/head';

import Header from '~components/Layout/Header/Header';

import SolidBanner from '../../components/Layout/SolidBanner/SolidBanner';
import GridCards from './components/GridCards/GridCards';
import styles from './Partners.module.scss';

export default function Partners() {
  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <GridCards />
        </main>
      </div>
    </>
  );
}
